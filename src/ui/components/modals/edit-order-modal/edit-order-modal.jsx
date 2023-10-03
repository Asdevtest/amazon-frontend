import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import AddIcon from '@material-ui/icons/Add'
import AcceptIcon from '@material-ui/icons/Check'
import AcceptRevokeIcon from '@material-ui/icons/Clear'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { Box, Checkbox, InputAdornment, MenuItem, Paper, Select, TableCell, TableRow, Typography } from '@mui/material'

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
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { BUYER_WAREHOUSE_HEAD_CELLS } from '@constants/table/table-head-cells'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { CheckQuantityForm } from '@components/forms/check-quantity-form'
import { CreateBoxForm } from '@components/forms/create-box-form'
import { PaymentMethodsForm } from '@components/forms/payment-methods-form'
import { SupplierPaymentForm } from '@components/forms/supplier-payment-form'
import { CommentsForm } from '@components/forms/сomments-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { ImageModal } from '@components/modals/image-modal/image-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { AddOrEditSupplierModalContent } from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'
import { Input } from '@components/shared/input'
import { Modal } from '@components/shared/modal'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { SaveIcon } from '@components/shared/svg-icons'
import { Table } from '@components/shared/table'
import { Text } from '@components/shared/text'
import { WarehouseBodyRow } from '@components/table/table-rows/warehouse'

import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot, isNotNull } from '@utils/checks'
import { formatDateWithoutTime, getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import {
  clearEverythingExceptNumbers,
  getShortenStringIfLongerThanCount,
  timeToDeadlineInHoursAndMins,
  toFixed,
} from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './edit-order-modal.style'

import { BoxesToCreateTable } from './boxes-to-create-table'
import { EditOrderSuppliersTable } from './edit-order-suppliers-table'
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

export const EditOrderModal = observer(
  ({
    platformSettings,
    paymentMethods,
    imagesForLoad,
    yuanToDollarRate,
    isPendingOrder,
    userInfo,
    requestStatus,
    order,
    boxes,
    onTriggerOpenModal,
    modalHeadCells,
    onSubmitSaveOrder,
    showProgress,
    hsCodeData,
    progressValue,
    volumeWeightCoefficient,
    onSaveOrderItem,
    onSubmitChangeBoxFields,
    onClickSaveSupplierBtn,
    onClickHsCode,
    updateSupplierData,
    setUpdateSupplierData,
    onClickSaveWithoutUpdateSupData,
    onClickUpdataSupplierData,
    onChangeImagesForLoad,
  }) => {
    const { classes: classNames } = useClassNames()

    const [checkIsPlanningPrice, setCheckIsPlanningPrice] = useState(true)
    const [usePriceInDollars, setUsePriceInDollars] = useState(false)
    const [collapseCreateOrEditBoxBlock, setCollapseCreateOrEditBoxBlock] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [confirmModalMode, setConfirmModalMode] = useState(confirmModalModes.STATUS)
    const [showCheckQuantityModal, setShowCheckQuantityModal] = useState(false)
    const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)
    const [showAddOrEditSupplierModal, setShowAddOrEditSupplierModal] = useState(false)
    const [supplierPaymentModal, setSupplierPaymentModal] = useState(false)
    const [paymentMethodsModal, setPaymentMethodsModal] = useState(false)
    const [commentModal, setCommentModalModal] = useState(false)
    const [tmpNewOrderFieldsState, setTmpNewOrderFieldsState] = useState({})
    const [showWarningInfoModal, setShowWarningInfoModal] = useState(
      order.status === OrderStatusByKey[OrderStatus.AT_PROCESS],
    )
    const [commentToWarehouse, setCommentToWarehouse] = useState('')
    const [bigImagesOptions, setBigImagesOptions] = useState({ images: [], imgIndex: 0 })
    const [showPhotosModal, setShowPhotosModal] = useState(false)
    const [trackNumber, setTrackNumber] = useState({ text: '', files: [] })
    const [boxesForCreation, setBoxesForCreation] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [headCells, setHeadCells] = useState(BUYER_WAREHOUSE_HEAD_CELLS)
    const [forceReadOnly, setForceReadOnly] = useState(false)

    const deliveredGoodsCount =
      boxes
        ?.filter(el => !el.isDraft)
        ?.reduce(
          (acc, cur) =>
            acc +
            cur.items
              .filter(item => item.product._id === order.product._id && item.order.id === order.id)
              .reduce((acc, cur) => (acc += cur.amount), 0) *
              cur.amount,
          0,
        ) || 0

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
      yuanToDollarRate: order?.yuanToDollarRate || yuanToDollarRate,
      item: order?.item || 0,
      tmpRefundToClient: 0,
      priceInYuan: order?.priceInYuan || order?.totalPriceChanged * order?.yuanToDollarRate,
      paymentDetails: order?.paymentDetails || [],
      payments: order?.payments || [],
      orderSupplier: order?.orderSupplier || {},
      partialPaymentAmountRmb: order?.partialPaymentAmountRmb || 0,
      partiallyPaid: order?.partiallyPaid || 0,
      partialPayment: order?.partialPayment || false,
    }

    const [orderFields, setOrderFields] = useState(initialState)

    const [hsCode, setHsCode] = useState({ ...hsCodeData })
    const [selectedSupplier, setSelectedSupplier] = useState(null)

    const validOrderPayments = orderFields?.orderSupplier?.paymentMethods?.length
      ? orderFields?.orderSupplier?.paymentMethods.filter(
          method => !orderFields?.payments.some(payment => payment.paymentMethod._id === method._id),
        )
      : paymentMethods.filter(
          method => !orderFields?.payments.some(payment => payment.paymentMethod._id === method._id),
        )

    const [orderPayments, setOrderPayments] = useState([...orderFields.payments, ...validOrderPayments])
    const [photosToLoad, setPhotosToLoad] = useState([])
    const [paymentDetailsPhotosToLoad, setPaymentDetailsPhotosToLoad] = useState([])
    const [editPaymentDetailsPhotos, setEditPaymentDetailsPhotos] = useState(orderFields.paymentDetails)

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
      setHeadCells(BUYER_WAREHOUSE_HEAD_CELLS)
    }, [SettingsModel.languageTag])

    useEffect(() => {
      setOrderFields({ ...orderFields, product: order.product, orderSupplier: order.orderSupplier })

      setSelectedSupplier(null)
    }, [order])

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

    const onClickUpdateButton = () => {
      const newOrderFieldsState = { ...orderFields }

      newOrderFieldsState.deliveryCostToTheWarehouse =
        (orderFields.orderSupplier.batchDeliveryCostInYuan /
          orderFields?.yuanToDollarRate /
          orderFields.orderSupplier.amount) *
        orderFields.amount

      newOrderFieldsState.priceBatchDeliveryInYuan =
        (orderFields.orderSupplier.batchDeliveryCostInYuan / orderFields.orderSupplier.amount) * orderFields.amount

      newOrderFieldsState.priceInYuan =
        (orderFields?.orderSupplier.priceInYuan +
          orderFields?.orderSupplier.batchDeliveryCostInYuan / orderFields?.orderSupplier.amount) *
        orderFields?.amount

      newOrderFieldsState.totalPriceChanged =
        ((orderFields?.orderSupplier.priceInYuan +
          orderFields?.orderSupplier.batchDeliveryCostInYuan / orderFields?.orderSupplier.amount) *
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
      paymentDetailsPhotosToLoad,
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
          deliveredGoodsCount < orderFields.amount
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

    const onClickSubmitSaveSupplierBtn = requestData => {
      setShowAddOrEditSupplierModal(!showAddOrEditSupplierModal)

      const data = { ...requestData, productId: order.product?._id }

      onClickSaveSupplierBtn(data)
    }

    const onClickSavePaymentDetails = (loadedFiles, editedFiles) => {
      setPaymentDetailsPhotosToLoad(loadedFiles)
      setEditPaymentDetailsPhotos(editedFiles)
    }

    const disableSubmit =
      requestStatus === loadingStatuses.isLoading ||
      buyerOrderModalSubmitDisabledOrderStatuses.includes(order.status + '') ||
      !orderFields.orderSupplier ||
      !orderFields?.yuanToDollarRate ||
      !orderFields.amount ||
      (order.status === OrderStatusByKey[OrderStatus.VERIFY_RECEIPT] &&
        orderFields.status === `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}` &&
        !boxesForCreation.length)

    const updateSuplierDisable =
      isPendingOrder ||
      (orderFields?.orderSupplier?.createdBy?._id !== userInfo?._id &&
        userInfo?.masterUser?._id !== orderFields?.orderSupplier?.createdBy?._id) ||
      !orderFields?.orderSupplier

    const isSupplierAcceptRevokeActive = orderFields.orderSupplier?._id === selectedSupplier?._id

    const isOnlyRead =
      selectedSupplier?.createdBy._id !== userInfo._id &&
      userInfo?.masterUser?._id !== selectedSupplier?.createdBy?._id &&
      isNotNull(selectedSupplier)

    return (
      <Box className={classNames.modalWrapper}>
        <div className={classNames.modalHeader}>
          <div>
            <div className={classNames.idItemWrapper}>
              <Typography className={classNames.modalText}>
                {`${t(TranslationKey.Order)} № ${order.id} / `}{' '}
                <span className={classNames.modalSpanText}>{'item'}</span>
              </Typography>

              <Input
                disabled={Number(order.status) === Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT])}
                className={classNames.itemInput}
                inputProps={{ maxLength: 9 }}
                value={orderFields.item}
                endAdornment={
                  <InputAdornment position="start">
                    {(orderFields.item || (!orderFields.item && order?.item)) && order?.item !== orderFields.item ? (
                      <SaveIcon
                        className={classNames.itemInputIcon}
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
                labelClasses={classNames.label}
                inputComponent={
                  <div className={classNames.deadlineWrapper}>
                    <Typography className={cx(classNames.deadlineText)}>
                      {formatDateWithoutTime(orderFields.deadline)}
                    </Typography>

                    <Typography
                      className={cx(classNames.deadlineText, {
                        [classNames.alertText]: getDistanceBetweenDatesInSeconds(orderFields.deadline) < 86400,
                      })}
                    >
                      {`(${timeToDeadlineInHoursAndMins({ date: orderFields.deadline, withSeconds: true })})`}
                    </Typography>
                  </div>
                }
              />
            )}
          </div>

          <Typography className={classNames.amazonTitle}>
            {getShortenStringIfLongerThanCount(order.product.amazonTitle, 130)}
          </Typography>

          <div className={classNames.priorityWrapper}>
            <Typography className={classNames.priorityTitle}>{`${t(TranslationKey.Priority)}:`}</Typography>
            {order.priority === '40' ? (
              <div className={classNames.rushOrderWrapper}>
                <img className={classNames.rushOrderImg} src="/assets/icons/fire.svg" />
                <Typography className={classNames.rushOrder}>{t(TranslationKey['Rush order'])}</Typography>
              </div>
            ) : null}
            {order.expressChinaDelivery ? (
              <div className={classNames.rushOrderWrapper}>
                <img className={classNames.rushOrderImg} src="/assets/icons/truck.svg" />
                <Typography className={classNames.rushOrder}>{t(TranslationKey['Express delivery'])}</Typography>
              </div>
            ) : null}
            {order.priority !== '40' && !order.expressChinaDelivery ? (
              <div className={classNames.rushOrderWrapper}>
                <Typography className={classNames.rushOrder}>{t(TranslationKey['Medium priority'])}</Typography>
              </div>
            ) : null}
          </div>

          <div className={classNames.orderStatusWrapper}>
            <Field
              tooltipInfoContent={t(TranslationKey['Current order status'])}
              value={order.storekeeper?.name}
              label={t(TranslationKey['Order status'])}
              labelClasses={classNames.label}
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
                    // orderFields.status === OrderStatusByKey[OrderStatus.IN_STOCK]
                  }
                  variant="filled"
                  value={orderFields.status}
                  classes={{
                    select: cx({
                      [classNames.orange]: statusColorGroups.orange.includes(
                        Number(tmpNewOrderFieldsState?.status) || orderFields.status,
                      ),
                      [classNames.green]: statusColorGroups.green.includes(
                        Number(tmpNewOrderFieldsState?.status) || orderFields.status,
                      ),
                      [classNames.red]: statusColorGroups.red.includes(
                        Number(tmpNewOrderFieldsState?.status) || orderFields.status,
                      ),
                      [classNames.blue]: statusColorGroups.blue.includes(
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
                              [classNames.orange]: statusColorGroups.orange.includes(
                                Number(tmpNewOrderFieldsState?.status) || orderFields.status,
                              ),
                              [classNames.green]: statusColorGroups.green.includes(
                                Number(tmpNewOrderFieldsState?.status) || orderFields.status,
                              ),
                              [classNames.red]: statusColorGroups.red.includes(
                                Number(tmpNewOrderFieldsState?.status) || orderFields.status,
                              ),
                              [classNames.blue]: statusColorGroups.blue.includes(
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
                      // .filter(el => (isPendingOrder ? el <= OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT] : true))
                    ),
                  }).map((statusCode, statusIndex) => (
                    <MenuItem
                      key={statusIndex}
                      value={statusCode}
                      className={cx(classNames.stantartSelect, {
                        [classNames.orange]: statusColorGroups.orange.includes(Number(statusCode)),
                        [classNames.green]: statusColorGroups.green.includes(Number(statusCode)),
                        [classNames.red]: statusColorGroups.red.includes(Number(statusCode)),
                        [classNames.blue]: statusColorGroups.blue.includes(Number(statusCode)),
                        [classNames.disableSelect]: buyerOrderModalDisabledOrderStatuses.includes(statusCode),
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

        <Paper elevation={0} className={classNames.paper}>
          <SelectFields
            orderPayments={orderPayments}
            imagesForLoad={imagesForLoad}
            userInfo={userInfo}
            paymentDetailsPhotosToLoad={paymentDetailsPhotosToLoad}
            hsCode={hsCode}
            setHsCode={setHsCode}
            yuanToDollarRate={yuanToDollarRate}
            checkIsPlanningPrice={checkIsPlanningPrice}
            setCheckIsPlanningPrice={setCheckIsPlanningPrice}
            isPendingOrder={isPendingOrder}
            updateSupplierData={updateSupplierData}
            usePriceInDollars={usePriceInDollars}
            deliveredGoodsCount={deliveredGoodsCount}
            disableSubmit={disableSubmit}
            photosToLoad={photosToLoad}
            order={order}
            setOrderField={setOrderField}
            orderFields={orderFields}
            showProgress={showProgress}
            progressValue={progressValue}
            setPhotosToLoad={setPhotosToLoad}
            setUsePriceInDollars={setUsePriceInDollars}
            setPaymentMethodsModal={() => setPaymentMethodsModal(!paymentMethodsModal)}
            onChangeImagesForLoad={onChangeImagesForLoad}
            onClickHsCode={onClickHsCode}
            onClickUpdateButton={onClickUpdateButton}
            onClickSupplierPaymentButton={() => setSupplierPaymentModal(!supplierPaymentModal)}
          />

          <Text className={classNames.tableTitle} containerClasses={classNames.tableTitleContainer}>
            {t(TranslationKey.Product)}
          </Text>

          <ProductTable
            checkIsPlanningPrice={checkIsPlanningPrice}
            modalHeadCells={modalHeadCells}
            order={order}
            orderFields={orderFields}
            setOrderField={setOrderField}
          />

          <Text
            className={classNames.tableTitle}
            containerClasses={classNames.tableTitleContainer}
            tooltipInfoContent={t(TranslationKey['Current supplier through whom the order was placed'])}
          >
            {t(TranslationKey.Suppliers)}
          </Text>

          {((isPendingOrder ||
            orderFields.status === OrderStatusByKey[OrderStatus.AT_PROCESS] ||
            orderFields.status === OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]) &&
            Number(order.status) < Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT])) ||
          orderFields.status === OrderStatusByKey[OrderStatus.AT_PROCESS] ||
          orderFields.status === OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE] ? (
            <div className={classNames.supplierActionsWrapper}>
              <div className={classNames.supplierContainer}>
                <div className={classNames.supplierButtonWrapper}>
                  <Button
                    disabled={checkIsPlanningPrice && !isPendingOrder}
                    tooltipInfoContent={t(TranslationKey['Add a new supplier to this product'])}
                    className={classNames.iconBtn}
                    onClick={() => {
                      setSelectedSupplier(null)
                      setShowAddOrEditSupplierModal(!showAddOrEditSupplierModal)
                    }}
                  >
                    <AddIcon />
                  </Button>
                  <Typography className={classNames.supplierButtonText}>{t(TranslationKey['Add supplier'])}</Typography>
                </div>

                {selectedSupplier ? (
                  <>
                    <div className={classNames.supplierButtonWrapper}>
                      {selectedSupplier?.createdBy._id !== userInfo._id &&
                      userInfo?.masterUser?._id !== selectedSupplier?.createdBy?._id ? (
                        <></>
                      ) : (
                        <>
                          <Button
                            disabled={checkIsPlanningPrice && !isPendingOrder}
                            className={classNames.iconBtn}
                            onClick={() => setShowAddOrEditSupplierModal(!showAddOrEditSupplierModal)}
                          >
                            <EditOutlinedIcon />
                          </Button>
                          <Typography className={classNames.supplierButtonText}>
                            {t(TranslationKey['Edit a supplier'])}
                          </Typography>
                        </>
                      )}

                      <div className={classNames.supplierButtonWrapper}>
                        <Button
                          className={classNames.iconBtn}
                          onClick={() => {
                            setForceReadOnly(true)
                            setShowAddOrEditSupplierModal(!showAddOrEditSupplierModal)
                          }}
                        >
                          <VisibilityOutlinedIcon />
                        </Button>
                        <Typography className={classNames.supplierButtonText}>
                          {t(TranslationKey['Open the parameters supplier'])}
                        </Typography>
                      </div>
                    </div>

                    <div className={classNames.supplierButtonWrapper}>
                      <Button
                        danger={isSupplierAcceptRevokeActive}
                        success={!isSupplierAcceptRevokeActive}
                        disabled={checkIsPlanningPrice && !isPendingOrder}
                        className={cx(classNames.iconBtn, classNames.iconBtnAccept, {
                          [classNames.iconBtnAcceptRevoke]: isSupplierAcceptRevokeActive,
                        })}
                        onClick={() => {
                          if (isSupplierAcceptRevokeActive) {
                            setOrderField('orderSupplier')({ target: { value: null } })
                            !isPendingOrder && setUpdateSupplierData(false)
                          } else {
                            setOrderField('orderSupplier')({ target: { value: selectedSupplier } })
                            !isPendingOrder && setUpdateSupplierData(false)
                          }
                        }}
                      >
                        {isSupplierAcceptRevokeActive ? <AcceptRevokeIcon /> : <AcceptIcon />}
                      </Button>
                      <Typography className={classNames.supplierButtonText}>
                        {isSupplierAcceptRevokeActive
                          ? t(TranslationKey['Remove the main supplier status'])
                          : t(TranslationKey['Make the supplier the main'])}
                      </Typography>
                    </div>
                  </>
                ) : null}
              </div>
              <div
                className={cx(classNames.supplierCheckboxWrapper, {
                  [classNames.supplierCheckboxWrapperDisabled]: updateSuplierDisable,
                })}
                onClick={() => {
                  if (!updateSuplierDisable) {
                    setUpdateSupplierData(!updateSupplierData)
                  }
                }}
              >
                <Checkbox disabled={updateSuplierDisable} checked={updateSupplierData} color="primary" />
                <Typography className={classNames.checkboxTitle}>
                  {t(TranslationKey['Update supplier data'])}
                </Typography>
              </div>
            </div>
          ) : null}

          <EditOrderSuppliersTable
            platformSettings={platformSettings}
            productBaseData={order}
            orderFields={orderFields}
            isPendingOrder={isPendingOrder}
            selectedSupplier={orderFields.orderSupplier}
            curSelectedSupplier={selectedSupplier}
            suppliers={orderFields.product.suppliers}
            setSelectedSupplier={setSelectedSupplier}
          />
        </Paper>

        <Box mt={2} className={classNames.buttonsBox}>
          <Button
            disabled={disableSubmit}
            tooltipInfoContent={t(TranslationKey['Save changes to the order'])}
            className={classNames.saveBtn}
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
            variant="text"
            className={classNames.cancelBtn}
            tooltipInfoContent={t(TranslationKey['Close the "Edit order" window without saving'])}
            onClick={() => onTriggerOpenModal('showOrderModal')}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </Box>

        <div className={classNames.addBoxButtonAndCommentsWrapper}>
          {orderStatusesThatTriggersEditBoxBlock.includes(parseInt(orderFields.status)) ? (
            <div className={classNames.addBoxButtonWrapper}>
              <Typography className={classNames.addBoxTitle}>
                {t(TranslationKey['Add boxes for this order'])}
              </Typography>

              <Box width="fit-content">
                <Button
                  tooltipInfoContent={t(TranslationKey['Opens a form to create a box'])}
                  className={classNames.addBoxButton}
                  onClick={addBoxHandler}
                >
                  {t(TranslationKey['Add a box'])}
                </Button>
              </Box>
            </div>
          ) : (
            <div />
          )}

          <Button className={classNames.seeCommentsButton} onClick={() => setCommentModalModal(!commentModal)}>
            <Typography className={classNames.seeCommentsText}>{t(TranslationKey['See comments'])}</Typography>
            <VisibilityIcon className={classNames.seeCommentsIcon} />
          </Button>
        </div>

        {boxesForCreation.length > 0 && (
          <>
            <BoxesToCreateTable
              volumeWeightCoefficient={volumeWeightCoefficient}
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
            />

            <div className={classNames.InfoWrapper}>
              <div className={classNames.labelsInfoWrapper}>
                <div>
                  <Field
                    labelClasses={classNames.label}
                    containerClasses={classNames.containerField}
                    inputClasses={classNames.inputField}
                    inputProps={{ maxLength: 255 }}
                    label={t(TranslationKey['Set track number for new boxes']) + ':'}
                    value={trackNumber.text}
                    onChange={e => setTrackNumber({ ...trackNumber, text: e.target.value })}
                  />

                  <Button
                    className={classNames.trackNumberPhotoBtn}
                    onClick={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
                  >
                    {trackNumber.files[0] ? t(TranslationKey['File added']) : t(TranslationKey['Photo track numbers'])}
                  </Button>
                </div>

                <div className={classNames.trackNumberPhotoWrapper}>
                  {trackNumber.files[0] ? (
                    <PhotoAndFilesSlider withoutFiles customSlideHeight={85} files={trackNumber.files} />
                  ) : (
                    <Typography>{`${t(TranslationKey['no photo track number'])}...`}</Typography>
                  )}
                </div>
              </div>
              <div className={classNames.fieldWrapper}>
                <div className={classNames.inputWrapper}>
                  <Field
                    multiline
                    minRows={4}
                    maxRows={4}
                    inputProps={{ maxLength: 500 }}
                    inputClasses={classNames.commentInput}
                    value={commentToWarehouse}
                    labelClasses={classNames.label}
                    label={`${t(TranslationKey['Buyer comment to the warehouse'])}:`}
                    onChange={e => setCommentToWarehouse(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <div className={classNames.tableWrapper}>
          <Field
            tooltipInfoContent={t(TranslationKey['All the boxes that the prep center received on order'])}
            label={t(TranslationKey['Boxes on this order:'])}
            inputClasses={classNames.hidden}
            labelClasses={classNames.label}
            containerClasses={classNames.fieldLabel}
          />

          {boxes.length > 0 ? (
            <Table
              rowsOnly
              data={boxes}
              BodyRow={WarehouseBodyRow}
              renderHeadRow={renderHeadRow()}
              mainProductId={order.product._id}
              userInfo={userInfo}
              volumeWeightCoefficient={volumeWeightCoefficient}
              onSubmitChangeBoxFields={onSubmitChangeBoxFields}
              onClickHsCode={onClickHsCode}
            />
          ) : (
            <Typography className={classNames.noBoxesText}>{t(TranslationKey['No boxes...'])}</Typography>
          )}
        </div>

        <Modal
          openModal={collapseCreateOrEditBoxBlock}
          setOpenModal={() => setCollapseCreateOrEditBoxBlock(!collapseCreateOrEditBoxBlock)}
          dialogContextClassName={classNames.dialogContextClassName}
        >
          <CreateBoxForm
            isEdit={isEdit}
            order={order}
            currentSupplier={order.orderSupplier}
            volumeWeightCoefficient={volumeWeightCoefficient}
            formItem={orderFields}
            boxesForCreation={boxesForCreation}
            setBoxesForCreation={setBoxesForCreation}
            onTriggerOpenModal={() => setCollapseCreateOrEditBoxBlock(!collapseCreateOrEditBoxBlock)}
          />
        </Modal>

        <ConfirmationModal
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

        <WarningInfoModal
          openModal={showWarningInfoModal}
          setOpenModal={() => setShowWarningInfoModal(!showWarningInfoModal)}
          title={t(TranslationKey['PAY ATTENTION!!!'])}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            setShowWarningInfoModal(!showWarningInfoModal)
          }}
        />

        <Modal openModal={showSetBarcodeModal} setOpenModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}>
          <SetBarcodeModal
            title={t(TranslationKey['Track number'])}
            tmpCode={trackNumber.files}
            maxNumber={50 - trackNumber.files.length}
            onClickSaveBarcode={value => {
              setTrackNumber({ ...trackNumber, files: value })
              setShowSetBarcodeModal(!showSetBarcodeModal)
            }}
            onCloseModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
          />
        </Modal>

        <ImageModal
          currentImageIndex={bigImagesOptions.imgIndex}
          imageList={bigImagesOptions.images}
          handleOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          isOpenModal={showPhotosModal}
          handleCurrentImageIndex={imgIndex => setBigImagesOptions(() => ({ ...bigImagesOptions, imgIndex }))}
        />

        <Modal
          openModal={showCheckQuantityModal}
          setOpenModal={() => setShowCheckQuantityModal(!showCheckQuantityModal)}
        >
          <CheckQuantityForm
            withRefund
            maxRefundNumber={orderFields.totalPrice}
            title={t(TranslationKey['Setting the stock status'])}
            description={t(TranslationKey['Enter the amount of goods that came into the warehouse']) + ':'}
            acceptText={t(TranslationKey.Continue) + '?'}
            comparisonQuantity={deliveredGoodsCount}
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
            item={orderFields}
            uploadedFiles={paymentDetailsPhotosToLoad}
            editPaymentDetailsPhotos={editPaymentDetailsPhotos}
            onClickSaveButton={onClickSavePaymentDetails}
            onCloseModal={() => setSupplierPaymentModal(!supplierPaymentModal)}
          />
        </Modal>

        <Modal
          missClickModalOn
          openModal={paymentMethodsModal}
          setOpenModal={() => setPaymentMethodsModal(!paymentMethodsModal)}
        >
          <PaymentMethodsForm
            payments={(!!orderPayments.length && orderPayments) || paymentMethods}
            onClickSaveButton={setOrderPayments}
            onClickCancelButton={() => setPaymentMethodsModal(!paymentMethodsModal)}
          />
        </Modal>

        <Modal
          missClickModalOn={!isOnlyRead}
          openModal={showAddOrEditSupplierModal}
          setOpenModal={() => {
            setForceReadOnly(false)
            setShowAddOrEditSupplierModal(!showAddOrEditSupplierModal)
          }}
        >
          <AddOrEditSupplierModalContent
            paymentMethods={paymentMethods}
            requestStatus={requestStatus}
            sourceYuanToDollarRate={yuanToDollarRate}
            volumeWeightCoefficient={volumeWeightCoefficient}
            title={t(TranslationKey['Adding and editing a supplier'])}
            supplier={selectedSupplier}
            onlyRead={isOnlyRead || forceReadOnly}
            onClickSaveBtn={onClickSubmitSaveSupplierBtn}
            onTriggerShowModal={() => {
              setForceReadOnly(false)
              setShowAddOrEditSupplierModal(!showAddOrEditSupplierModal)
            }}
          />
        </Modal>

        <Modal
          openModal={commentModal}
          setOpenModal={() => {
            setCommentModalModal(!commentModal)
          }}
        >
          <CommentsForm
            comments={orderFields.commentsFromTask}
            onCloseModal={() => {
              setCommentModalModal(!commentModal)
            }}
          />
        </Modal>
      </Box>
    )
  },
)
