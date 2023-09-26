import { cx } from '@emotion/css'
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

import { useClassNames } from './order-content.style'

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
}) => {
  const { classes: classNames } = useClassNames()

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
          <div className={classNames[item.className]}>{item.label}</div>
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
        <div className={classNames.orderContainer}>
          <OrderStatusText
            isClient={isClient}
            status={OrderStatusByCode[updatedOrder.status]}
            className={classNames.containerTitle}
          />

          <div className={classNames.infosWrapper}>
            <div className={classNames.orderItemWrapper}>
              <Typography className={classNames.orderTitle}>{t(TranslationKey['Order number'])}</Typography>
              <Typography className={classNames.orderText}>{`№ ${updatedOrder.id}`}</Typography>
            </div>

            <div className={classNames.orderItemWrapper}>
              <Field
                oneLine
                tooltipInfoContent={t(TranslationKey['Total order amount'])}
                label={t(TranslationKey['Order amount'])}
                labelClasses={classNames.orderTitle}
                containerClasses={classNames.field}
                inputComponent={
                  <Typography className={classNames.orderText}>
                    {toFixedWithDollarSign(formFields.totalPrice, 2)}
                  </Typography>
                }
              />
            </div>

            <div className={classNames.orderItemWrapper}>
              <Typography className={classNames.orderTitle}>{'item'}</Typography>
              <Typography className={classNames.orderText}>{updatedOrder.item || '-'}</Typography>
            </div>

            <div className={classNames.orderItemWrapper}>
              <Typography className={classNames.orderTitle}>{t(TranslationKey.Created)}</Typography>
              <Typography className={classNames.orderText}>{formatShortDateTime(updatedOrder.createdAt)}</Typography>
            </div>
          </div>
        </div>

        <Divider orientation={'horizontal'} />

        <div className={classNames.panelsWrapper}>
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

          <Divider orientation={'vertical'} className={classNames.divider} />

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

          <Divider orientation={'vertical'} className={classNames.divider} />

          <ExtraOrderInfo
            order={updatedOrder}
            isClient={isClient}
            formFields={formFields}
            onChangeField={onChangeField}
          />
        </div>

        <div className={classNames.btnsWrapper}>
          {(updatedOrder.status === OrderStatusByKey[OrderStatus.READY_TO_PROCESS] || (isClient && isOrderEditable)) &&
            onClickCancelOrder && (
              <Button
                danger
                tooltipInfoContent={
                  updatedOrder.status === OrderStatusByKey[OrderStatus.READY_TO_PROCESS] &&
                  t(TranslationKey['Cancel order, refund of frozen funds'])
                }
                className={cx(classNames.button, classNames.cancelBtn)}
                onClick={onClickCancelOrder}
              >
                {t(TranslationKey['Cancel order'])}
              </Button>
            )}
          {isClient && isOrderEditable ? (
            <div className={classNames.btnsSubWrapper}>
              {isClient && updatedOrder.status <= OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT] && (
                <Button success className={classNames.button} onClick={onClickReorder}>
                  {t(TranslationKey['To order'])}
                </Button>
              )}

              <Button
                disabled={disabledSaveSubmit}
                className={classNames.button}
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

        <div className={classNames.suppliersWrapper}>
          <Typography className={classNames.supplierTitle}>{t(TranslationKey['List of suppliers'])}</Typography>

          <div className={classNames.supplierButtonWrapper}>
            <Button
              disabled={!selectedSupplier}
              tooltipInfoContent={t(TranslationKey['Open the parameters supplier'])}
              className={classNames.iconBtn}
              onClick={onTriggerAddOrEditSupplierModal}
            >
              <VisibilityOutlinedIcon />
            </Button>
            <Typography className={classNames.supplierButtonText}>
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

        <div className={classNames.tableWrapper}>
          <Text
            tooltipInfoContent={t(TranslationKey['All boxes received/received by the prep center on order'])}
            className={classNames.tableText}
            containerClasses={classNames.container}
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
              onSubmitChangeBoxFields={onSubmitChangeBoxFields}
              onClickHsCode={onClickHsCode}
            />
          ) : (
            <Typography className={classNames.noBoxesText}>{t(TranslationKey['No boxes...'])}</Typography>
          )}
        </div>

        <Modal openModal={showSetBarcodeModal} setOpenModal={() => triggerBarcodeModal()}>
          <SetBarcodeModal
            tmpCode={formFields.tmpBarCode}
            item={formFields.product}
            onClickSaveBarcode={barCode => {
              onChangeField('tmpBarCode')(barCode)
              triggerBarcodeModal()
            }}
            onCloseModal={triggerBarcodeModal}
          />
        </Modal>
      </Container>
    </Paper>
  )
}
