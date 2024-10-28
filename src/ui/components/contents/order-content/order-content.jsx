import { isPast, isValid, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'

import { Divider, useMediaQuery, useTheme } from '@mui/material'

import { OrderStatus, OrderStatusByCode, OrderStatusByKey, OrderStatusText } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'
import { BoxesToOrder } from '@components/shared/tables/boxes-to-order'
import { ListSuppliers } from '@components/shared/tables/list-suppliers'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { formatShortDateTime } from '@utils/date-time'
import { getObjectFilteredByKeyArrayBlackList } from '@utils/object'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

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
  onClickCancelOrder,
  isClient,
  onSubmitSaveOrder,
  onClickReorder,
  platformSettings,
}) => {
  const { classes: styles } = useStyles()

  const [updatedOrder, setUpdatedOrder] = useState(order)
  const theme = useTheme()
  const narrow = useMediaQuery(theme.breakpoints.down(MEDIA_SCALE_POINTS))

  const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)

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

  useEffect(() => {
    setUpdatedOrder(() => ({ ...order }))
  }, [SettingsModel.languageTag, order])

  const triggerBarcodeModal = () => {
    setShowSetBarcodeModal(!showSetBarcodeModal)
  }

  const multiplicity = formFields.orderSupplier?.multiplicity
  const amountInBox = formFields.orderSupplier?.boxProperties?.amountInBox
  const amount = formFields.amount
  const isNotMultiple = multiplicity && amountInBox && (amount % amountInBox !== 0 || !amount)
  const isMultiple = multiplicity && amountInBox && amount % amountInBox === 0 && !!amount
  const isOrderEditable = updatedOrder.status <= OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]
  const disabledSaveSubmit =
    (!isValid(parseISO(formFields.deadline)) && isPast(parseISO(formFields.deadline))) ||
    !formFields.amount ||
    isNotMultiple

  return (
    <div className={styles.wrapper}>
      <div className={styles.orderContainer}>
        <OrderStatusText
          isClient={isClient}
          status={OrderStatusByCode[updatedOrder.status]}
          className={styles.containerTitle}
        />

        <div className={styles.infosWrapper}>
          <div className={styles.orderItemWrapper}>
            <p className={styles.orderTitle}>{t(TranslationKey['Order number'])}</p>
            <p className={styles.orderText}>{`№ ${updatedOrder.xid}`}</p>
          </div>

          <div className={styles.orderItemWrapper}>
            <Field
              oneLine
              tooltipInfoContent={t(TranslationKey['Total order amount'])}
              label={t(TranslationKey['Order amount'])}
              labelClasses={styles.orderTitle}
              containerClasses={styles.field}
              inputComponent={<p className={styles.orderText}>{toFixedWithDollarSign(formFields.totalPrice, 2)}</p>}
            />
          </div>

          <div className={styles.orderItemWrapper}>
            <p className={styles.orderTitle}>{'item'}</p>
            <p className={styles.orderText}>{updatedOrder.item || '-'}</p>
          </div>

          <div className={styles.orderItemWrapper}>
            <p className={styles.orderTitle}>{t(TranslationKey.Created)}</p>
            <p className={styles.orderText}>{formatShortDateTime(updatedOrder.createdAt)}</p>
          </div>
        </div>
      </div>

      <Divider orientation={'horizontal'} />

      <div className={styles.panelsWrapper}>
        <LeftPanel
          amountInBox={amountInBox}
          isNotMultiple={isNotMultiple}
          isMultiple={isMultiple}
          isCanChange={isOrderEditable}
          order={updatedOrder}
          formFields={formFields}
          narrow={narrow}
          onChangeField={onChangeField}
          onClickBarcode={triggerBarcodeModal}
          onDeleteBarcode={() => onChangeField('barCode')('')}
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
              styleType={ButtonStyle.DANGER}
              tooltipInfoContent={
                updatedOrder.status === OrderStatusByKey[OrderStatus.READY_TO_PROCESS] &&
                t(TranslationKey['Cancel order, refund of frozen funds'])
              }
              onClick={onClickCancelOrder}
            >
              {t(TranslationKey['Cancel order'])}
            </Button>
          )}
        {isClient && isOrderEditable ? (
          <div className={styles.btnsSubWrapper}>
            {isClient && updatedOrder.status <= OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT] && (
              <Button
                disabled={isNotMultiple}
                styleType={ButtonStyle.SUCCESS}
                className={styles.button}
                onClick={onClickReorder}
              >
                {t(TranslationKey['To order'])}
              </Button>
            )}

            <Button
              disabled={disabledSaveSubmit}
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

      <ListSuppliers readOnly formFields={updatedOrder} />

      <BoxesToOrder formFields={updatedOrder} platformSettings={platformSettings} />

      <Modal openModal={showSetBarcodeModal} setOpenModal={triggerBarcodeModal}>
        <SetBarcodeModal
          tmpCode={formFields.tmpBarCode}
          barCode={formFields.product?.barCode}
          onClickSaveBarcode={barCode => onChangeField('tmpBarCode')(barCode)}
          onCloseModal={triggerBarcodeModal}
        />
      </Modal>
    </div>
  )
}
