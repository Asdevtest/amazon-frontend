import { isPast, isValid, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { Container, Divider, Paper, TableCell, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material'

import { OrderStatus, OrderStatusByCode, OrderStatusByKey, OrderStatusText } from '@constants/orders/order-status'
import { CLIENT_WAREHOUSE_HEAD_CELLS } from '@constants/table/table-head-cells'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { TableSupplier } from '@components/product/table-supplier'
import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'
import { Table } from '@components/shared/table'
import { Text } from '@components/shared/text'
import { WarehouseBodyRow } from '@components/table/table-rows/warehouse'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { formatShortDateTime } from '@utils/date-time'
import { getObjectFilteredByKeyArrayBlackList } from '@utils/object'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './order-content.style'

import { DeliveryParameters } from './delivery-parameters'
import { ExtraOrderInfo } from './extra-order-info'
import { LeftPanel } from './left-panel'

const MEDIA_SCALE_POINTS = '1812'

export const OrderContent = ({
  storekeepers,
  destinationsFavourites,
  setDestinationsFavouritesItem,
  destinations,
  order,
  boxes,
  onClickCancelOrder,
  volumeWeightCoefficient,
  userInfo,
  onSubmitChangeBoxFields,
  isClient,
  onSubmitSaveOrder,
  onClickReorder,
  platformSettings,
  selectedSupplier,
  onChangeSelectedSupplier,
  onTriggerAddOrEditSupplierModal,
  onClickHsCode,
  setCurrentOpenedBox,
}) => {
  const { classes: styles, cx } = useStyles()

  const [collapsed, setCollapsed] = useState(false)
  const [updatedOrder, setUpdatedOrder] = useState(order)
  const theme = useTheme()
  const narrow = useMediaQuery(theme.breakpoints.down(MEDIA_SCALE_POINTS))

  const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)

  const [headCells, setHeadCells] = useState(CLIENT_WAREHOUSE_HEAD_CELLS)

  const [formFields, setFormFields] = useState({
    ...order,

    destinationId: order?.destination?._id || null,
    storekeeperId: order?.storekeeper?._id || '',
    logicsTariffId: order?.logicsTariff?._id || '',
    variationTariffId: order?.variationTariff?._id || null,

    deadline: order?.deadline || null,
    tmpBarCode: [],
  })

  useEffect(() => {
    setFormFields({
      ...formFields,
      ...order,
    })
  }, [order])

  const onChangeField = fieldName => event => {
    const newFormFields = { ...formFields }

    if ('deadline' === fieldName) {
      newFormFields[fieldName] = event
    } else if ('amount' === fieldName) {
      if (!checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 0)) {
        return
      }

      newFormFields[fieldName] = event.target.value ? parseInt(event.target.value) : ''
    } else if ('barCode' === fieldName) {
      newFormFields.product[fieldName] = event
      newFormFields.tmpBarCode = []
    } else if ('tmpBarCode' === fieldName) {
      newFormFields[fieldName] = event
    } else {
      newFormFields[fieldName] = event.target.value
    }

    setFormFields(newFormFields)
  }

  const renderHeadRow = () => (
    <TableRow>
      {headCells.map((item, index) => (
        <TableCell key={index}>
          <div className={styles[item.className]}>{item.label}</div>
        </TableCell>
      ))}
    </TableRow>
  )

  useEffect(() => {
    setHeadCells(CLIENT_WAREHOUSE_HEAD_CELLS)
  }, [SettingsModel.languageTag])

  useEffect(() => {
    setUpdatedOrder(() => ({ ...order }))
  }, [SettingsModel.languageTag, order])

  const triggerBarcodeModal = () => {
    setShowSetBarcodeModal(!showSetBarcodeModal)
  }

  const isOrderEditable = updatedOrder.status <= OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]

  const disabledSaveSubmit =
    (!isValid(parseISO(formFields.deadline)) && isPast(parseISO(formFields.deadline))) || !formFields.amount

  return (
    <Paper>
      <Container disableGutters maxWidth={false}>
        <div className={styles.orderContainer}>
          <OrderStatusText
            isClient={isClient}
            status={OrderStatusByCode[updatedOrder.status]}
            className={styles.containerTitle}
          />

          <div className={styles.infosWrapper}>
            <div className={styles.orderItemWrapper}>
              <Typography className={styles.orderTitle}>{t(TranslationKey['Order number'])}</Typography>
              <Typography className={styles.orderText}>{`№ ${updatedOrder.id}`}</Typography>
            </div>

            <div className={styles.orderItemWrapper}>
              <Field
                oneLine
                tooltipInfoContent={t(TranslationKey['Total order amount'])}
                label={t(TranslationKey['Order amount'])}
                labelClasses={styles.orderTitle}
                containerClasses={styles.field}
                inputComponent={
                  <Typography className={styles.orderText}>
                    {toFixedWithDollarSign(formFields.totalPrice, 2)}
                  </Typography>
                }
              />
            </div>

            <div className={styles.orderItemWrapper}>
              <Typography className={styles.orderTitle}>{'item'}</Typography>
              <Typography className={styles.orderText}>{updatedOrder.item || '-'}</Typography>
            </div>

            <div className={styles.orderItemWrapper}>
              <Typography className={styles.orderTitle}>{t(TranslationKey.Created)}</Typography>
              <Typography className={styles.orderText}>{formatShortDateTime(updatedOrder.createdAt)}</Typography>
            </div>
          </div>
        </div>

        <Divider orientation={'horizontal'} />

        <div className={styles.panelsWrapper}>
          <LeftPanel
            isCanChange={isOrderEditable}
            order={updatedOrder}
            formFields={formFields}
            collapsed={collapsed}
            narrow={narrow}
            setCollapsed={setCollapsed}
            onChangeField={onChangeField}
            onClickBarcode={() => {
              triggerBarcodeModal()
            }}
            onDeleteBarcode={() => {
              onChangeField('barCode')('')
            }}
          />

          <Divider orientation={'vertical'} className={styles.divider} />

          <DeliveryParameters
            isCanChange={isOrderEditable}
            storekeepers={storekeepers}
            order={updatedOrder}
            formFields={formFields}
            destinations={destinations}
            destinationsFavourites={destinationsFavourites}
            setDestinationsFavouritesItem={setDestinationsFavouritesItem}
            setFormFields={setFormFields}
            onChangeField={onChangeField}
          />

          <Divider orientation={'vertical'} className={styles.divider} />

          <ExtraOrderInfo
            order={updatedOrder}
            isClient={isClient}
            formFields={formFields}
            onChangeField={onChangeField}
          />
        </div>

        <div className={styles.btnsWrapper}>
          {(updatedOrder.status === OrderStatusByKey[OrderStatus.READY_TO_PROCESS] || (isClient && isOrderEditable)) &&
            onClickCancelOrder && (
              <Button
                styleType={ButtonType.DANGER}
                tooltipInfoContent={
                  updatedOrder.status === OrderStatusByKey[OrderStatus.READY_TO_PROCESS] &&
                  t(TranslationKey['Cancel order, refund of frozen funds'])
                }
                className={cx(styles.button, styles.cancelBtn)}
                onClick={onClickCancelOrder}
              >
                {t(TranslationKey['Cancel order'])}
              </Button>
            )}
          {isClient && isOrderEditable ? (
            <div className={styles.btnsSubWrapper}>
              {isClient && updatedOrder.status <= OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT] && (
                <Button styleType={ButtonType.SUCCESS} className={styles.button} onClick={onClickReorder}>
                  {t(TranslationKey['To order'])}
                </Button>
              )}

              <Button
                disabled={disabledSaveSubmit}
                className={styles.button}
                onClick={() => {
                  onSubmitSaveOrder(
                    {
                      data: getObjectFilteredByKeyArrayBlackList(
                        { ...formFields, images: formFields.images ? formFields.images : [] },
                        formFields.deadline ? [] : ['deadline'],
                        true,
                      ),
                    },
                    // update(),
                  )
                }}
              >
                {t(TranslationKey.Save)}
              </Button>
            </div>
          ) : null}
        </div>

        <div className={styles.suppliersWrapper}>
          <Typography className={styles.supplierTitle}>{t(TranslationKey['List of suppliers'])}</Typography>

          <div className={styles.supplierButtonWrapper}>
            <Button
              disabled={!selectedSupplier}
              tooltipInfoContent={t(TranslationKey['Open the parameters supplier'])}
              className={styles.iconBtn}
              onClick={onTriggerAddOrEditSupplierModal}
            >
              <VisibilityOutlinedIcon />
            </Button>
            <Typography className={styles.supplierButtonText}>
              {t(TranslationKey['Open the parameters supplier'])}
            </Typography>
          </div>

          <TableSupplier
            isClient
            platformSettings={platformSettings}
            product={updatedOrder.product}
            productBaseData={updatedOrder}
            selectedSupplier={selectedSupplier}
            onClickSupplier={onChangeSelectedSupplier}
          />
        </div>

        <div className={styles.tableWrapper}>
          <Text
            tooltipInfoContent={t(TranslationKey['All boxes received/received by the prep center on order'])}
            className={styles.tableText}
            containerClasses={styles.container}
          >
            {t(TranslationKey['Boxes to order'])}
          </Text>

          {boxes.length > 0 ? (
            <Table
              rowsOnly
              data={boxes}
              BodyRow={WarehouseBodyRow}
              renderHeadRow={renderHeadRow()}
              mainProductId={updatedOrder.product._id}
              volumeWeightCoefficient={volumeWeightCoefficient}
              userInfo={userInfo}
              setCurrentOpenedBox={setCurrentOpenedBox}
              onSubmitChangeBoxFields={onSubmitChangeBoxFields}
              onClickHsCode={onClickHsCode}
            />
          ) : (
            <Typography className={styles.noBoxesText}>{t(TranslationKey['No boxes...'])}</Typography>
          )}
        </div>

        <Modal openModal={showSetBarcodeModal} setOpenModal={() => triggerBarcodeModal()}>
          <SetBarcodeModal
            tmpCode={formFields.tmpBarCode}
            barCode={formFields.product?.barCode}
            onClickSaveBarcode={barCode => onChangeField('tmpBarCode')(barCode)}
            onCloseModal={triggerBarcodeModal}
          />
        </Modal>
      </Container>
    </Paper>
  )
}
