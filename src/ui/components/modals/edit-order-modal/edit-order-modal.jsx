import { memo, useEffect, useState } from 'react'

import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { InputAdornment, MenuItem, Select, Typography } from '@mui/material'

import {
  OrderStatus,
  OrderStatusByCode,
  OrderStatusByKey,
  OrderStatusTranslate,
  buyerOrderModalAllowOrderStatuses,
  buyerOrderModalDisabledOrderStatuses,
  buyerOrderModalSubmitDisabledOrderStatuses,
  getOrderStatusOptionByCode,
} from '@constants/orders/order-status'
import { ONE_DAY_IN_SECONDS } from '@constants/time'
import { TranslationKey } from '@constants/translations/translation-key'

import { CheckQuantityForm } from '@components/forms/check-quantity-form'
import { CreateBoxForm } from '@components/forms/create-box-form'
import { PaymentMethodsForm } from '@components/forms/payment-methods-form'
import { SupplierPaymentForm } from '@components/forms/supplier-payment-form'
import { CommentsForm } from '@components/forms/сomments-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { Button } from '@components/shared/button'
import { Checkbox } from '@components/shared/checkbox'
import { Field } from '@components/shared/field/field'
import { Input } from '@components/shared/input'
import { Modal } from '@components/shared/modal'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { SaveIcon, TruckIcon } from '@components/shared/svg-icons'
import { BoxesToOrder } from '@components/shared/tables/boxes-to-order'
import { ListSuppliers } from '@components/shared/tables/list-suppliers'

import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { formatDateWithoutTime, getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { clearEverythingExceptNumbers, timeToDeadlineInHoursAndMins, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './edit-order-modal.style'

import { BoxesToCreateTable } from './boxes-to-create-table'
import { ProductTable } from './product-table'
import { SelectFields } from './select-fields'

const orderStatusesThatTriggersEditBoxBlock = [OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]]

const confirmModalModes = {
  STATUS: 'STATUS',
  SUBMIT: 'SUBMIT',
}

const statusColorGroups = {
  orange: [
    OrderStatusByKey[OrderStatus.PENDING],
    OrderStatusByKey[OrderStatus.AT_PROCESS],
    OrderStatusByKey[OrderStatus.PARTIALLY_PAID],
    OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED],
  ],
  green: [
    OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT],
    OrderStatusByKey[OrderStatus.IN_STOCK],
    OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER],
  ],
  red: [
    OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER],
    OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT],
    OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE],
  ],
  blue: [
    OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT],
    OrderStatusByKey[OrderStatus.VERIFY_RECEIPT],
    OrderStatusByKey[OrderStatus.READY_TO_PROCESS],
  ],
}

export const EditOrderModal = memo(
  ({
    platformSettings,
    paymentMethods,
    isPendingOrder,
    userInfo,
    requestStatus,
    order,
    hsCodeData,
    onTriggerOpenModal,
    modalHeadCells,
    onSubmitSaveOrder,
    showProgress,
    progressValue,
    onSaveOrderItem,
    onClickSaveSupplierBtn,
    updateSupplierData,
    onClickSaveWithoutUpdateSupData,
    onClickUpdataSupplierData,
    setUpdateSupplierData,
  }) => {
    const { classes: styles, cx } = useStyles()

    const [checkIsPlanningPrice, setCheckIsPlanningPrice] = useState(true)
    const [usePriceInDollars, setUsePriceInDollars] = useState(false)
    const [collapseCreateOrEditBoxBlock, setCollapseCreateOrEditBoxBlock] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [confirmModalMode, setConfirmModalMode] = useState(confirmModalModes.STATUS)
    const [showCheckQuantityModal, setShowCheckQuantityModal] = useState(false)
    const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)
    const [supplierPaymentModal, setSupplierPaymentModal] = useState(false)
    const [paymentMethodsModal, setPaymentMethodsModal] = useState(false)
    const [commentModal, setCommentModalModal] = useState(false)
    const [tmpNewOrderFieldsState, setTmpNewOrderFieldsState] = useState({})
    const [commentToWarehouse, setCommentToWarehouse] = useState('')
    const [trackNumber, setTrackNumber] = useState({ text: '', files: [] })
    const [boxesForCreation, setBoxesForCreation] = useState([])
    const [isEdit, setIsEdit] = useState(false)

    const initialState = {
      ...order,
      status: order?.status || undefined,
      clientComment: order?.clientComment || '',
      buyerComment: order?.buyerComment || '',
      deliveryCostToTheWarehouse:
        order?.deliveryCostToTheWarehouse ||
        (order?.priceInYuan !== 0 && Number(order?.deliveryCostToTheWarehouse) === 0 && '0') ||
        (order?.orderSupplier?.batchDeliveryCostInDollar / order?.orderSupplier?.amount) * order?.amount ||
        0,
      priceBatchDeliveryInYuan:
        order?.priceBatchDeliveryInYuan ||
        (order?.priceInYuan !== 0 && Number(order?.priceBatchDeliveryInYuan) === 0 && '0') ||
        (order?.orderSupplier?.batchDeliveryCostInYuan / order?.orderSupplier?.amount) * order?.amount ||
        0,
      trackId: '',
      material: order?.product?.material || '',
      amount: order?.amount || 0,
      trackingNumberChina: order?.trackingNumberChina || '',
      batchPrice: 0,
      totalPriceChanged: order?.totalPriceChanged || order?.totalPrice,
      yuanToDollarRate: order?.yuanToDollarRate || platformSettings?.yuanToDollarRate,
      item: order?.item || 0,
      tmpRefundToClient: 0,
      priceInYuan: order?.priceInYuan || order?.totalPriceChanged * order?.yuanToDollarRate,
      paymentDetails: order?.paymentDetails || [],
      payments: order?.payments || [],
      orderSupplier: order?.orderSupplier || {},
      partialPaymentAmountRmb: order?.partialPaymentAmountRmb || 0,
      partiallyPaid: order?.partiallyPaid || 0,
      partialPayment: order?.partialPayment || false,
      deliveredQuantity: order?.deliveredQuantity || 0,
    }

    const [orderFields, setOrderFields] = useState(initialState)

    const [hsCode, setHsCode] = useState({
      _id: '',
      chinaTitle: '',
      hsCode: '',
      material: '',
      productUsage: '',
      productId: '',
    })

    useEffect(() => {
      if (hsCodeData) {
        setHsCode(hsCodeData)
      }
    }, [hsCodeData])

    const [orderPayments, setOrderPayments] = useState(orderFields.payments)
    const [photosToLoad, setPhotosToLoad] = useState(orderFields.images)
    const [editPaymentDetailsPhotos, setEditPaymentDetailsPhotos] = useState(orderFields.paymentDetails)

    useEffect(() => {
      setOrderFields({ ...orderFields, product: order.product, orderSupplier: order.orderSupplier })
    }, [order])

    const handleSaveProduct = product => {
      setOrderFields(prev => ({ ...prev, product, orderSupplier: product.currentSupplier }))
    }

    useEffect(() => {
      if (isPendingOrder) {
        onClickUpdateButton()
      }
    }, [orderFields.orderSupplier])

    const onRemoveForCreationBox = boxIndex => {
      const updatedNewBoxes = boxesForCreation.filter((box, i) => i !== boxIndex)
      setBoxesForCreation(updatedNewBoxes)
    }

    const addBoxHandler = () => {
      setCollapseCreateOrEditBoxBlock(!collapseCreateOrEditBoxBlock)
      setIsEdit(false)
    }

    const onEditForCreationBox = () => {
      setCollapseCreateOrEditBoxBlock(!collapseCreateOrEditBoxBlock)

      setIsEdit(true)
    }

    const onClickBarcodeCheckbox = boxIndex => e => {
      const newStateFormFields = [...boxesForCreation]
      newStateFormFields[boxIndex].items[0].isBarCodeAlreadyAttachedByTheSupplier = e.target.checked
      setBoxesForCreation(newStateFormFields)
    }

    const onClickUpdateSupplierStandart = boxIndex => e => {
      const newStateFormFields = [...boxesForCreation].map(el => ({
        ...el,
        tmpUseToUpdateSupplierBoxDimensions: false,
      }))
      newStateFormFields[boxIndex].tmpUseToUpdateSupplierBoxDimensions = e.target.checked
      setBoxesForCreation(newStateFormFields)
    }

    const onClickTransparency = boxIndex => e => {
      const newStateFormFields = [...boxesForCreation]

      newStateFormFields[boxIndex].items[0] = {
        ...newStateFormFields[boxIndex].items[0],
        isTransparencyFileAlreadyAttachedByTheSupplier: e.target.checked,
      }

      setBoxesForCreation(newStateFormFields)
    }

    const onClickUpdateButton = () => {
      const newOrderFieldsState = { ...orderFields }

      newOrderFieldsState.deliveryCostToTheWarehouse =
        (orderFields?.orderSupplier?.batchDeliveryCostInYuan /
          orderFields?.yuanToDollarRate /
          orderFields?.orderSupplier?.amount) *
        orderFields?.amount

      newOrderFieldsState.priceBatchDeliveryInYuan =
        (orderFields?.orderSupplier?.batchDeliveryCostInYuan / orderFields?.orderSupplier?.amount) * orderFields?.amount

      newOrderFieldsState.priceInYuan =
        (orderFields?.orderSupplier?.priceInYuan +
          orderFields?.orderSupplier?.batchDeliveryCostInYuan / orderFields?.orderSupplier?.amount) *
        orderFields?.amount

      newOrderFieldsState.totalPriceChanged =
        ((orderFields?.orderSupplier?.priceInYuan +
          orderFields?.orderSupplier?.batchDeliveryCostInYuan / orderFields?.orderSupplier?.amount) *
          orderFields?.amount) /
        orderFields?.yuanToDollarRate

      setOrderFields(newOrderFieldsState)
    }

    const getDataForSaveOrder = () => ({
      order,
      orderFields,
      boxesForCreation,
      photosToLoad,
      hsCode,
      trackNumber: trackNumber.text || trackNumber.files.length ? trackNumber : null,
      commentToWarehouse,
      editPaymentDetailsPhotos,
      orderPayments,
    })

    const onClickSaveOrder = () => {
      const cost = (orderFields.totalPriceChanged - orderFields.deliveryCostToTheWarehouse) / orderFields.amount
      const costInYuan = (orderFields.priceInYuan - orderFields.priceBatchDeliveryInYuan) / orderFields.amount

      const dataForUpdateSupData = {
        supplier: orderFields.orderSupplier,
        productId: order.product?._id,
        orderFields: {
          amount: orderFields.amount,
          price: cost,
          priceInYuan: costInYuan,
          batchDeliveryCostInYuan: orderFields.priceBatchDeliveryInYuan || 0,
          batchDeliveryCostInDollar: orderFields.deliveryCostToTheWarehouse || 0,
          batchTotalCostInDollar: orderFields.totalPriceChanged || 0,
          partialPaymentAmountRmb: orderFields.partialPaymentAmountRmb || 0,
          partiallyPaid: orderFields.partiallyPaid || 0,
          partialPayment: orderFields.partialPayment || false,
        },
      }

      if (isPendingOrder) {
        onSubmitSaveOrder(getDataForSaveOrder())
      } else {
        if (updateSupplierData) {
          onSubmitSaveOrder(getDataForSaveOrder())
          onClickUpdataSupplierData(dataForUpdateSupData)
        } else {
          if (toFixed(costInYuan, 2) !== toFixed(orderFields?.orderSupplier.priceInYuan, 2)) {
            onClickSaveWithoutUpdateSupData(getDataForSaveOrder(), orderFields)
          } else {
            onSubmitSaveOrder(getDataForSaveOrder())
          }
        }
      }
    }

    const setOrderField = filedName => e => {
      const newOrderFieldsState = { ...orderFields }

      if (
        [
          'totalPriceChanged',
          'deliveryCostToTheWarehouse',
          'yuanToDollarRate',
          'item',
          'tmpRefundToClient',
          'priceInYuan',
        ].includes(filedName)
      ) {
        if (
          (!checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value) &&
            filedName !== 'deliveryCostToTheWarehouse' &&
            filedName !== 'priceBatchDeliveryInYuan') ||
          (filedName === 'tmpRefundToClient' && e.target.value > orderFields.totalPrice)
        ) {
          return
        }

        if (filedName === 'yuanToDollarRate') {
          if (usePriceInDollars) {
            newOrderFieldsState.priceInYuan = newOrderFieldsState.totalPriceChanged * e.target.value

            newOrderFieldsState.priceBatchDeliveryInYuan = orderFields.deliveryCostToTheWarehouse * e.target.value || 0
          } else {
            newOrderFieldsState.yuanToDollarRate = e.target.value
            newOrderFieldsState.totalPriceChanged = orderFields.priceInYuan / (e.target.value || 1)
            newOrderFieldsState.deliveryCostToTheWarehouse =
              orderFields.priceBatchDeliveryInYuan / (e.target.value || 1)
          }
        } else if (filedName === 'priceInYuan') {
          newOrderFieldsState.totalPriceChanged = e.target.value / orderFields?.yuanToDollarRate
        }
        newOrderFieldsState[filedName] = e.target.value
      } else if (filedName === 'priceBatchDeliveryInYuan') {
        newOrderFieldsState.priceBatchDeliveryInYuan = e.target.value || 0
        newOrderFieldsState.deliveryCostToTheWarehouse = Number(e.target.value) / orderFields?.yuanToDollarRate || 0
      } else if (filedName === 'status') {
        newOrderFieldsState[filedName] = e.target.value
        setTmpNewOrderFieldsState(newOrderFieldsState)

        setOrderFields(initialState)

        if (
          e.target.value === `${OrderStatusByKey[OrderStatus.IN_STOCK]}` &&
          orderFields.deliveredQuantity < orderFields.amount
        ) {
          setShowCheckQuantityModal(!showCheckQuantityModal)
        } else {
          setConfirmModalMode(confirmModalModes.STATUS)
          setShowConfirmModal(!showConfirmModal)
        }

        return
      } else if (filedName === 'amount') {
        newOrderFieldsState[filedName] = clearEverythingExceptNumbers(e.target.value)

        newOrderFieldsState.priceInYuan =
          (orderFields?.orderSupplier.priceInYuan +
            orderFields?.orderSupplier.batchDeliveryCostInYuan / orderFields?.orderSupplier.amount) *
            clearEverythingExceptNumbers(e.target.value) || ''

        newOrderFieldsState.totalPriceChanged =
          ((orderFields?.orderSupplier.priceInYuan +
            orderFields?.orderSupplier.batchDeliveryCostInYuan / orderFields?.orderSupplier.amount) *
            clearEverythingExceptNumbers(e.target.value)) /
            orderFields?.yuanToDollarRate || ''

        newOrderFieldsState.priceBatchDeliveryInYuan =
          (orderFields.orderSupplier.batchDeliveryCostInYuan / orderFields.orderSupplier.amount) *
            clearEverythingExceptNumbers(e.target.value) || 0

        newOrderFieldsState.deliveryCostToTheWarehouse =
          (orderFields.orderSupplier.batchDeliveryCostInYuan /
            orderFields.orderSupplier.amount /
            orderFields?.yuanToDollarRate) *
            clearEverythingExceptNumbers(e.target.value) || 0
      } else {
        newOrderFieldsState[filedName] = e.target.value
      }

      if (filedName === 'totalPriceChanged' && Number(e.target.value) - orderFields.totalPrice > 0) {
        newOrderFieldsState.status = order.status
        newOrderFieldsState.priceInYuan = orderFields?.yuanToDollarRate * e.target.value
      }

      setOrderFields(newOrderFieldsState)
    }

    const confirmModalMessageByMode = () => {
      switch (confirmModalMode) {
        case 'STATUS':
          return t(TranslationKey['Within the current edit, you can only change once!'])
        case 'SUBMIT':
          return t(TranslationKey['Are you sure you entered all the data correctly?'])
      }
    }

    const confirmModalActionByMode = () => {
      switch (confirmModalMode) {
        case 'STATUS':
          return setOrderFields(tmpNewOrderFieldsState)
        case 'SUBMIT':
          return onSubmitSaveOrder(getDataForSaveOrder())
      }
    }

    const disableSubmit =
      requestStatus === loadingStatus.IS_LOADING ||
      buyerOrderModalSubmitDisabledOrderStatuses.includes(order.status + '') ||
      !orderFields.orderSupplier ||
      !orderFields?.yuanToDollarRate ||
      !orderFields.amount ||
      (order.status === OrderStatusByKey[OrderStatus.VERIFY_RECEIPT] &&
        orderFields.status === `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}` &&
        !boxesForCreation.length)

    return (
      <div className={styles.modalWrapper}>
        <div className={styles.modalHeader}>
          <div>
            <div className={styles.idItemWrapper}>
              <Typography className={styles.modalText}>
                {`${t(TranslationKey.Order)} № ${order.id} / `} <span className={styles.modalSpanText}>{'item'}</span>
              </Typography>

              <Input
                disabled={Number(order.status) === Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT])}
                className={styles.itemInput}
                inputProps={{ maxLength: 9 }}
                value={orderFields.item}
                endAdornment={
                  <InputAdornment position="start">
                    {(orderFields.item || (!orderFields.item && order?.item)) && order?.item !== orderFields.item ? (
                      <SaveIcon
                        className={styles.itemInputIcon}
                        onClick={() => {
                          onSaveOrderItem(order._id, orderFields.item)
                          order.item = orderFields.item
                        }}
                      />
                    ) : null}
                  </InputAdornment>
                }
                onChange={setOrderField('item')}
              />
            </div>

            {orderFields.deadline && orderFields.status < 20 && (
              <Field
                oneLine
                label={'Deadline:'}
                labelClasses={styles.label}
                inputComponent={
                  <div className={styles.deadlineWrapper}>
                    <Typography className={cx(styles.deadlineText)}>
                      {formatDateWithoutTime(orderFields.deadline)}
                    </Typography>

                    <Typography
                      className={cx(styles.deadlineText, {
                        [styles.alertText]: getDistanceBetweenDatesInSeconds(orderFields.deadline) < ONE_DAY_IN_SECONDS,
                      })}
                    >
                      {`(${timeToDeadlineInHoursAndMins({ date: orderFields.deadline, withSeconds: true })})`}
                    </Typography>
                  </div>
                }
              />
            )}
          </div>

          <p className={styles.amazonTitle}>{order.product.amazonTitle}</p>

          <div className={styles.priorityWrapper}>
            <Typography className={styles.priorityTitle}>{`${t(TranslationKey.Priority)}:`}</Typography>
            {order.priority === '40' ? (
              <div className={styles.rushOrderWrapper}>
                <img className={styles.rushOrderImg} src="/assets/icons/fire.svg" />
                <Typography className={styles.rushOrder}>{t(TranslationKey['Rush order'])}</Typography>
              </div>
            ) : null}
            {order.expressChinaDelivery ? (
              <div className={styles.rushOrderWrapper}>
                <TruckIcon className={styles.rushOrderImg} />
                <Typography className={styles.rushOrder}>{t(TranslationKey['Express delivery'])}</Typography>
              </div>
            ) : null}
            {order.priority !== '40' && !order.expressChinaDelivery ? (
              <div className={styles.rushOrderWrapper}>
                <Typography className={styles.rushOrder}>{t(TranslationKey['Medium priority'])}</Typography>
              </div>
            ) : null}
          </div>

          <div className={styles.orderStatusWrapper}>
            <Field
              tooltipInfoContent={t(TranslationKey['Current order status'])}
              value={order.storekeeper?.name}
              label={t(TranslationKey['Order status'])}
              labelClasses={styles.label}
              inputComponent={
                <Select
                  disabled={
                    order.status !== orderFields.status ||
                    (Number(orderFields.totalPriceChanged) - orderFields.totalPrice > 0 &&
                      Number(order.status) > Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT])) ||
                    orderFields.status === OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER] ||
                    Number(order.status) === Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]) ||
                    Number(order.status) === Number(OrderStatusByKey[OrderStatus.IN_STOCK]) ||
                    !checkIsPlanningPrice
                  }
                  variant="filled"
                  value={orderFields.status}
                  classes={{
                    select: cx({
                      [styles.orange]: statusColorGroups.orange.includes(
                        Number(tmpNewOrderFieldsState?.status) || orderFields.status,
                      ),
                      [styles.green]: statusColorGroups.green.includes(
                        Number(tmpNewOrderFieldsState?.status) || orderFields.status,
                      ),
                      [styles.red]: statusColorGroups.red.includes(
                        Number(tmpNewOrderFieldsState?.status) || orderFields.status,
                      ),
                      [styles.blue]: statusColorGroups.blue.includes(
                        Number(tmpNewOrderFieldsState?.status) || orderFields.status,
                      ),
                    }),
                  }}
                  input={
                    <Input
                      startAdornment={
                        <InputAdornment position="start">
                          <FiberManualRecordRoundedIcon
                            className={cx({
                              [styles.orange]: statusColorGroups.orange.includes(
                                Number(tmpNewOrderFieldsState?.status) || orderFields.status,
                              ),
                              [styles.green]: statusColorGroups.green.includes(
                                Number(tmpNewOrderFieldsState?.status) || orderFields.status,
                              ),
                              [styles.red]: statusColorGroups.red.includes(
                                Number(tmpNewOrderFieldsState?.status) || orderFields.status,
                              ),
                              [styles.blue]: statusColorGroups.blue.includes(
                                Number(tmpNewOrderFieldsState?.status) || orderFields.status,
                              ),
                            })}
                          />
                        </InputAdornment>
                      }
                    />
                  }
                  onChange={setOrderField('status')}
                >
                  {Object.keys({
                    ...getObjectFilteredByKeyArrayWhiteList(
                      OrderStatusByCode,
                      buyerOrderModalAllowOrderStatuses.filter(el => {
                        return (
                          el >= order.status ||
                          (el === `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}` &&
                            order.status < `${OrderStatusByKey[OrderStatus.IN_STOCK]}`) ||
                          (el === OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT].toString() &&
                            order.status === OrderStatusByKey[OrderStatus.PARTIALLY_PAID]) ||
                          (el === OrderStatusByKey[OrderStatus.AT_PROCESS].toString() &&
                            order.status === OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT])
                        )
                      }),
                    ),
                  }).map((statusCode, statusIndex) => (
                    <MenuItem
                      key={statusIndex}
                      value={statusCode}
                      className={cx(styles.stantartSelect, {
                        [styles.orange]: statusColorGroups.orange.includes(Number(statusCode)),
                        [styles.green]: statusColorGroups.green.includes(Number(statusCode)),
                        [styles.red]: statusColorGroups.red.includes(Number(statusCode)),
                        [styles.blue]: statusColorGroups.blue.includes(Number(statusCode)),
                        [styles.disableSelect]: buyerOrderModalDisabledOrderStatuses.includes(statusCode),
                      })}
                      disabled={
                        buyerOrderModalDisabledOrderStatuses.includes(statusCode) ||
                        (statusCode === `${OrderStatusByKey[OrderStatus.IN_STOCK]}` &&
                          order.status < OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]) ||
                        (statusCode === `${OrderStatusByKey[OrderStatus.IN_STOCK]}` &&
                          order.status === OrderStatusByKey[OrderStatus.IN_STOCK]) ||
                        (statusCode === `${OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT]}` &&
                          ![
                            OrderStatusByKey[OrderStatus.AT_PROCESS],
                            OrderStatusByKey[OrderStatus.PARTIALLY_PAID],
                          ].includes(order.status)) ||
                        (statusCode === `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}` &&
                          order.status === OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]) ||
                        (statusCode === `${OrderStatusByKey[OrderStatus.AT_PROCESS]}` &&
                          order.status === OrderStatusByKey[OrderStatus.AT_PROCESS]) ||
                        (statusCode === `${OrderStatusByKey[OrderStatus.PENDING]}` &&
                          order.status === OrderStatusByKey[OrderStatus.PENDING]) ||
                        (statusCode === `${OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]}` &&
                          order.status === OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]) ||
                        (statusCode === `${OrderStatusByKey[OrderStatus.IN_STOCK]}` &&
                          order.status === OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]) ||
                        (statusCode === `${OrderStatusByKey[OrderStatus.PARTIALLY_PAID]}` &&
                          order.status !== OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT]) ||
                        (order.status === OrderStatusByKey[OrderStatus.PENDING] &&
                          statusCode !== `${OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]}` &&
                          statusCode !== `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`)
                      }
                    >
                      {OrderStatusTranslate(getOrderStatusOptionByCode(statusCode).key)}
                    </MenuItem>
                  ))}
                </Select>
              }
            />
          </div>
        </div>

        <div className={styles.paper}>
          <SelectFields
            orderPayments={orderPayments}
            userInfo={userInfo}
            editPaymentDetailsPhotos={editPaymentDetailsPhotos}
            hsCode={hsCode}
            setHsCode={setHsCode}
            yuanToDollarRate={platformSettings?.yuanToDollarRate}
            checkIsPlanningPrice={checkIsPlanningPrice}
            setCheckIsPlanningPrice={setCheckIsPlanningPrice}
            isPendingOrder={isPendingOrder}
            usePriceInDollars={usePriceInDollars}
            disableSubmit={disableSubmit}
            photosToLoad={photosToLoad}
            order={order}
            deliveredQuantity={orderFields.deliveredQuantity}
            setOrderField={setOrderField}
            orderFields={orderFields}
            showProgress={showProgress}
            progressValue={progressValue}
            setPhotosToLoad={setPhotosToLoad}
            setUsePriceInDollars={setUsePriceInDollars}
            setPaymentMethodsModal={() => setPaymentMethodsModal(!paymentMethodsModal)}
            onClickUpdateButton={onClickUpdateButton}
            onClickSupplierPaymentButton={() => setSupplierPaymentModal(!supplierPaymentModal)}
          />

          <p>{t(TranslationKey.Product)}</p>

          <ProductTable
            checkIsPlanningPrice={checkIsPlanningPrice}
            modalHeadCells={modalHeadCells}
            order={order}
            orderFields={orderFields}
            setOrderField={setOrderField}
          />

          <div className={styles.supplierCheckboxWrapper} onClick={() => setUpdateSupplierData(!updateSupplierData)}>
            <Checkbox checked={updateSupplierData} color="primary">
              <p className={styles.checkboxTitle}>{t(TranslationKey['Update supplier data'])}</p>
            </Checkbox>
          </div>

          <ListSuppliers
            formFields={orderFields}
            defaultSupplierId={order?.orderSupplier?._id}
            checkIsPlanningPrice={checkIsPlanningPrice}
            onClickSaveSupplier={onClickSaveSupplierBtn}
            onSaveProduct={handleSaveProduct}
          />
        </div>

        <div className={styles.buttonsBox}>
          <Button
            styleType={ButtonStyle.SUCCESS}
            disabled={disableSubmit}
            tooltipInfoContent={t(TranslationKey['Save changes to the order'])}
            onClick={() => {
              if (boxesForCreation.length > 0) {
                setConfirmModalMode(confirmModalModes.SUBMIT)
                setShowConfirmModal(!showConfirmModal)
              } else {
                onClickSaveOrder()
              }
            }}
          >
            {t(TranslationKey.Save)}
          </Button>
          <Button
            styleType={ButtonStyle.CASUAL}
            tooltipInfoContent={t(TranslationKey['Close the "Edit order" window without saving'])}
            onClick={() => onTriggerOpenModal('showOrderModal')}
          >
            {t(TranslationKey.Close)}
          </Button>
        </div>

        <div className={styles.addBoxButtonAndCommentsWrapper}>
          {orderStatusesThatTriggersEditBoxBlock.includes(parseInt(orderFields.status)) ? (
            <div className={styles.addBoxButtonWrapper}>
              <Typography className={styles.addBoxTitle}>{t(TranslationKey['Add boxes for this order'])}</Typography>

              <Button tooltipInfoContent={t(TranslationKey['Opens a form to create a box'])} onClick={addBoxHandler}>
                {t(TranslationKey['Add a box'])}
              </Button>
            </div>
          ) : (
            <div />
          )}

          <Button onClick={() => setCommentModalModal(!commentModal)}>
            {t(TranslationKey['See comments'])}
            <VisibilityIcon className={styles.seeCommentsIcon} />
          </Button>
        </div>

        {boxesForCreation.length > 0 && (
          <>
            <BoxesToCreateTable
              orderGoodsAmount={orderFields?.amount}
              barcodeIsExist={order.product.barCode}
              isNoBuyerSupplier={
                userInfo._id !== order.orderSupplier.createdBy?._id &&
                userInfo?.masterUser?._id !== order.orderSupplier?.createdBy?._id &&
                order.orderSupplier.createdBy
              }
              newBoxes={boxesForCreation}
              onRemoveBox={onRemoveForCreationBox}
              onEditBox={onEditForCreationBox}
              onClickBarcodeCheckbox={onClickBarcodeCheckbox}
              onClickUpdateSupplierStandart={onClickUpdateSupplierStandart}
              onClickTransparency={onClickTransparency}
            />

            <div className={styles.InfoWrapper}>
              <div className={styles.labelsInfoWrapper}>
                <div>
                  <Field
                    labelClasses={styles.label}
                    containerClasses={styles.containerField}
                    inputClasses={styles.inputField}
                    inputProps={{ maxLength: 255 }}
                    label={t(TranslationKey['Set track number for new boxes']) + ':'}
                    value={trackNumber.text}
                    onChange={e => setTrackNumber({ ...trackNumber, text: e.target.value })}
                  />

                  <Button onClick={() => setShowSetBarcodeModal(!showSetBarcodeModal)}>
                    {trackNumber.files[0] ? t(TranslationKey['File added']) : t(TranslationKey['Photo track numbers'])}
                  </Button>
                </div>

                <div className={styles.trackNumberPhotoWrapper}>
                  {trackNumber.files[0] ? (
                    <SlideshowGallery hiddenPreviews slidesToShow={1} files={trackNumber.files} />
                  ) : (
                    <Typography>{`${t(TranslationKey['no photo track number'])}...`}</Typography>
                  )}
                </div>
              </div>

              <Field
                multiline
                minRows={4}
                maxRows={4}
                inputProps={{ maxLength: 500 }}
                inputClasses={styles.commentInput}
                value={commentToWarehouse}
                labelClasses={styles.label}
                label={`${t(TranslationKey['Buyer comment to the warehouse'])}:`}
                onChange={e => setCommentToWarehouse(e.target.value)}
              />
            </div>
          </>
        )}

        <div className={styles.boxesWrapper}>
          <BoxesToOrder formFields={order} platformSettings={platformSettings} />
        </div>

        <Modal
          openModal={collapseCreateOrEditBoxBlock}
          setOpenModal={() => setCollapseCreateOrEditBoxBlock(!collapseCreateOrEditBoxBlock)}
        >
          <CreateBoxForm
            isEdit={isEdit}
            order={order}
            currentSupplier={order.orderSupplier}
            volumeWeightCoefficient={platformSettings?.volumeWeightCoefficient}
            formItem={orderFields}
            boxesForCreation={boxesForCreation}
            setBoxesForCreation={setBoxesForCreation}
            onTriggerOpenModal={() => setCollapseCreateOrEditBoxBlock(!collapseCreateOrEditBoxBlock)}
          />
        </Modal>

        {showConfirmModal ? (
          <ConfirmationModal
            // @ts-ignore
            openModal={showConfirmModal}
            setOpenModal={() => setShowConfirmModal(!showConfirmModal)}
            title={t(TranslationKey['Attention. Are you sure?'])}
            message={confirmModalMessageByMode(confirmModalMode)}
            successBtnText={t(TranslationKey.Yes)}
            cancelBtnText={t(TranslationKey.No)}
            onClickSuccessBtn={() => {
              confirmModalActionByMode(confirmModalMode)
              setShowConfirmModal(!showConfirmModal)

              if (Number(tmpNewOrderFieldsState.status) === Number(OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT])) {
                setPaymentMethodsModal(!paymentMethodsModal)
              }
            }}
            onClickCancelBtn={() => {
              if (confirmModalMode === confirmModalModes.STATUS) {
                setTmpNewOrderFieldsState(prevState => ({ ...prevState, status: '' }))
              }
              setShowConfirmModal(!showConfirmModal)
            }}
          />
        ) : null}

        <Modal openModal={showSetBarcodeModal} setOpenModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}>
          <SetBarcodeModal
            title={t(TranslationKey['Track number'])}
            tmpCode={trackNumber.files}
            maxNumber={50}
            onClickSaveBarcode={value => setTrackNumber({ ...trackNumber, files: value })}
            onCloseModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
          />
        </Modal>

        <Modal
          openModal={showCheckQuantityModal}
          setOpenModal={() => setShowCheckQuantityModal(!showCheckQuantityModal)}
        >
          <CheckQuantityForm
            withRefund
            maxRefundNumber={orderFields.totalPrice}
            title={t(TranslationKey['Setting the stock status'])}
            description={t(TranslationKey['Enter the amount of goods that came into the warehouse']) + ':'}
            deliveredQuantity={orderFields.deliveredQuantity}
            acceptText={t(TranslationKey.Continue) + '?'}
            onClose={() => setShowCheckQuantityModal(!showCheckQuantityModal)}
            onSubmit={({ refundValue }) => {
              setTmpNewOrderFieldsState({ ...tmpNewOrderFieldsState, tmpRefundToClient: refundValue })
              setConfirmModalMode(confirmModalModes.STATUS)
              setShowConfirmModal(!showConfirmModal)
              setShowCheckQuantityModal(!showCheckQuantityModal)
            }}
          />
        </Modal>

        <Modal
          missClickModalOn
          openModal={supplierPaymentModal}
          setOpenModal={() => setSupplierPaymentModal(!supplierPaymentModal)}
        >
          <SupplierPaymentForm
            editPaymentDetailsPhotos={editPaymentDetailsPhotos}
            setEditPaymentDetailsPhotos={setEditPaymentDetailsPhotos}
            onCloseModal={() => setSupplierPaymentModal(!supplierPaymentModal)}
          />
        </Modal>

        <Modal
          missClickModalOn
          openModal={paymentMethodsModal}
          setOpenModal={() => setPaymentMethodsModal(!paymentMethodsModal)}
        >
          <PaymentMethodsForm
            orderPayments={orderPayments}
            allPayments={paymentMethods}
            onClickSaveButton={setOrderPayments}
            onClickCancelButton={() => setPaymentMethodsModal(!paymentMethodsModal)}
          />
        </Modal>

        <Modal openModal={commentModal} setOpenModal={() => setCommentModalModal(!commentModal)}>
          <CommentsForm
            comments={orderFields.commentsFromTask}
            onCloseModal={() => setCommentModalModal(!commentModal)}
          />
        </Modal>
      </div>
    )
  },
)
