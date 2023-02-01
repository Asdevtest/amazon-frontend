/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import {
  Box,
  InputAdornment,
  Select,
  MenuItem,
  Paper,
  TableCell,
  TableRow,
  Typography,
  Avatar,
  Checkbox,
} from '@mui/material'

import React, {useEffect, useState} from 'react'

import AddIcon from '@material-ui/icons/Add'
import AcceptIcon from '@material-ui/icons/Check'
import AcceptRevokeIcon from '@material-ui/icons/Clear'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {
  getOrderStatusOptionByCode,
  OrderStatus,
  OrderStatusByCode,
  OrderStatusByKey,
  OrderStatusTranslate,
} from '@constants/order-status'
import {BUYER_WAREHOUSE_HEAD_CELLS} from '@constants/table-head-cells'
import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {CheckQuantityForm} from '@components/forms/check-quantity-form'
import {CreateBoxForm} from '@components/forms/create-box-form'
import {Input} from '@components/input'
import {Modal} from '@components/modal'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {AddOrEditSupplierModalContent} from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import {Table} from '@components/table'
import {WarehouseBodyRow} from '@components/table-rows/warehouse'
import {Text} from '@components/text'

import {
  calcExchangeDollarsInYuansPrice,
  calcExchangePrice,
  calcOrderTotalPrice,
  calcOrderTotalPriceInYuann,
  calcPriceForItem,
} from '@utils/calculation'
import {checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot, isNotNull} from '@utils/checks'
import {
  formatDateDistanceFromNowStrict,
  formatDateWithoutTime,
  formatNormDateTime,
  getDistanceBetweenDatesInSeconds,
} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {timeToDeadlineInHoursAndMins, toFixed, getShortenStringIfLongerThanCount} from '@utils/text'
import {t} from '@utils/translations'

import {BoxesToCreateTable} from './boxes-to-create-table'
import {useClassNames} from './edit-order-modal.style'
import {EditOrderSuppliersTable} from './edit-order-suppliers-table'
import {ProductTable} from './product-table'
import {SelectFields} from './select-fields'

const orderStatusesThatTriggersEditBoxBlock = [OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]]

const confirmModalModes = {
  STATUS: 'STATUS',
  SUBMIT: 'SUBMIT',
}

export const EditOrderModal = observer(
  ({
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
  }) => {
    const {classes: classNames} = useClassNames()

    const [checkIsPlanningPrice, setCheckIsPlanningPrice] = useState(true)

    const deliveredGoodsCount =
      boxes
        ?.filter(el => !el.isDraft)
        .reduce(
          (acc, cur) =>
            (acc +=
              cur.items.filter(item => item.product._id === order.product._id).reduce((a, c) => (a += c.amount), 0) *
              cur.amount),
          0,
        ) || 0

    // const deliveredGoodsCount = order.amount || 0

    const [usePriceInDollars, setUsePriceInDollars] = useState(false)

    const [collapseCreateOrEditBoxBlock, setCollapseCreateOrEditBoxBlock] = useState(false)

    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const [confirmModalMode, setConfirmModalMode] = useState(confirmModalModes.STATUS)

    const [showCheckQuantityModal, setShowCheckQuantityModal] = useState(false)

    const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)

    const [showAddOrEditSupplierModal, setShowAddOrEditSupplierModal] = useState(false)

    const [tmpNewOrderFieldsState, setTmpNewOrderFieldsState] = useState({})

    const [showWarningInfoModal, setShowWarningInfoModal] = useState(
      order.status === OrderStatusByKey[OrderStatus.AT_PROCESS],
    )

    const [commentToWarehouse, setCommentToWarehouse] = useState('')

    const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})
    const [showPhotosModal, setShowPhotosModal] = useState(false)
    const [trackNumber, setTrackNumber] = useState({text: '', files: []})

    const [boxesForCreation, setBoxesForCreation] = useState([])
    const [isEdit, setIsEdit] = useState(false)

    const [headCells, setHeadCells] = useState(BUYER_WAREHOUSE_HEAD_CELLS)

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
      const newStateFormFields = [...boxesForCreation].map(el => ({...el, tmpUseToUpdateSupplierBoxDimensions: false}))

      newStateFormFields[boxIndex].tmpUseToUpdateSupplierBoxDimensions = e.target.checked

      setBoxesForCreation(newStateFormFields)
    }

    console.log('order', order)

    const [orderFields, setOrderFields] = useState({
      ...order,
      status: order?.status || undefined,
      clientComment: order?.clientComment || '',
      buyerComment: order?.buyerComment || '',
      deliveryCostToTheWarehouse:
        order?.deliveryCostToTheWarehouse ||
        (order.orderSupplier.batchDeliveryCostInDollar / order.orderSupplier.amount) * order.amount,
      priceBatchDeliveryInYuan:
        order?.priceBatchDeliveryInYuan ||
        (order.orderSupplier.batchDeliveryCostInYuan / order.orderSupplier.amount) * order.amount,
      trackId: '',
      material: order?.product?.material || '',
      amount: order?.amount || 0,
      trackingNumberChina: order?.trackingNumberChina,
      batchPrice: 0,
      totalPriceChanged: order?.totalPriceChanged || order?.totalPrice,
      // totalPriceChanged: order?.priceInYuan
      //   ? order?.priceInYuan / order?.yuanToDollarRate
      //   : (order.amount * (order.orderSupplier.batchTotalCostInYuan / order.orderSupplier.amount)) /
      //     order?.yuanToDollarRate,
      yuanToDollarRate: order?.yuanToDollarRate || 6.5,
      item: order?.item || 0,
      tmpRefundToClient: 0,
      // priceInYuan: order?.priceInYuan
      //   ? order?.priceInYuan
      //   : order.amount * (order.orderSupplier.batchTotalCostInYuan / order.orderSupplier.amount),
      priceInYuan: order?.priceInYuan || order.totalPriceChanged * order.yuanToDollarRate,
    })

    const onClickUpdateButton = () => {
      const newOrderFieldsState = {...orderFields}

      newOrderFieldsState.deliveryCostToTheWarehouse =
        (orderFields.orderSupplier.batchDeliveryCostInYuan /
          orderFields.yuanToDollarRate /
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

    console.log('orderFields', orderFields)

    const getDataForSaveOrder = () => ({
      order,
      orderFields,
      boxesForCreation,
      photosToLoad,
      // hsCode,
      trackNumber: trackNumber.text || trackNumber.files.length ? trackNumber : null,
      commentToWarehouse,
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
          batchDeliveryCostInYuan: orderFields.priceBatchDeliveryInYuan,
          batchDeliveryCostInDollar: orderFields.deliveryCostToTheWarehouse,
        },
      }

      if (isPendingOrder) {
        onSubmitSaveOrder(getDataForSaveOrder())
      } else {
        if (updateSupplierData) {
          onSubmitSaveOrder(getDataForSaveOrder())
          onClickUpdataSupplierData(dataForUpdateSupData)
        } else {
          if (costInYuan !== orderFields?.orderSupplier.priceInYuan) {
            onClickSaveWithoutUpdateSupData(getDataForSaveOrder(), orderFields)
          } else {
            onSubmitSaveOrder(getDataForSaveOrder())
          }
        }
      }
    }

    const [selectedSupplier, setSelectedSupplier] = useState(null)

    useEffect(() => {
      setOrderFields({...orderFields, product: order.product, orderSupplier: order.orderSupplier})

      setSelectedSupplier(null)
    }, [order])

    const setOrderField = filedName => e => {
      console.log('filedName', filedName)
      const newOrderFieldsState = {...orderFields}

      if (
        [
          'totalPriceChanged',
          'deliveryCostToTheWarehouse',
          'priceBatchDeliveryInYuan',
          'yuanToDollarRate',
          'item',
          'tmpRefundToClient',
          'priceInYuan',
        ].includes(filedName)
      ) {
        if (
          !checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value) &&
          filedName !== 'deliveryCostToTheWarehouse' &&
          filedName !== 'priceBatchDeliveryInYuan'
        ) {
          return
        }

        if (filedName === 'priceBatchDeliveryInYuan') {
          newOrderFieldsState.priceBatchDeliveryInYuan = e.target.value

          newOrderFieldsState.deliveryCostToTheWarehouse = Number(e.target.value) / orderFields.yuanToDollarRate
        }

        if (filedName === 'yuanToDollarRate') {
          if (usePriceInDollars) {
            newOrderFieldsState.priceInYuan = newOrderFieldsState.totalPriceChanged * e.target.value

            newOrderFieldsState.priceBatchDeliveryInYuan = calcExchangeDollarsInYuansPrice(
              orderFields.deliveryCostToTheWarehouse,
              e.target.value,
            )
          } else {
            newOrderFieldsState.totalPriceChanged = calcExchangePrice(orderFields.priceInYuan, e.target.value)
            newOrderFieldsState.deliveryCostToTheWarehouse = orderFields.priceBatchDeliveryInYuan / e.target.value
          }
        } else if (filedName === 'priceInYuan') {
          // newOrderFieldsState.totalPriceChanged = toFixed(
          //   Number(calcExchangePrice(e.target.value, orderFields.yuanToDollarRate)),
          //   2,
          // )

          newOrderFieldsState.totalPriceChanged = e.target.value / orderFields.yuanToDollarRate
        }
        newOrderFieldsState[filedName] = e.target.value
      } else if (filedName === 'status') {
        newOrderFieldsState[filedName] = e.target.value
        setTmpNewOrderFieldsState(newOrderFieldsState)

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
        newOrderFieldsState[filedName] = e.target.value

        newOrderFieldsState.totalPriceChanged = toFixed(
          calcOrderTotalPrice(orderFields?.orderSupplier, e.target.value),
          2,
        )
        newOrderFieldsState.priceInYuan = toFixed(
          calcOrderTotalPriceInYuann(orderFields?.orderSupplier, e.target.value),
          2,
        )

        newOrderFieldsState.priceBatchDeliveryInYuan =
          (orderFields.orderSupplier.batchDeliveryCostInYuan / orderFields.orderSupplier.amount) * e.target.value

        newOrderFieldsState.deliveryCostToTheWarehouse =
          (orderFields.orderSupplier.batchDeliveryCostInYuan /
            orderFields.orderSupplier.amount /
            orderFields.yuanToDollarRate) *
          e.target.value
      } else {
        newOrderFieldsState[filedName] = e.target.value
      }

      if (filedName === 'totalPriceChanged' && Number(e.target.value) - orderFields.totalPrice > 0) {
        newOrderFieldsState.status = order.status
        newOrderFieldsState.priceInYuan = orderFields.yuanToDollarRate * e.target.value
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
          return onSubmitSaveOrder({
            order,
            orderFields,
            boxesForCreation,
            photosToLoad,
            // hsCode,
            trackNumber: trackNumber.text || trackNumber.files.length ? trackNumber : null,
            commentToWarehouse,
          })
      }
    }

    const onClickSubmitSaveSupplierBtn = requestData => {
      setShowAddOrEditSupplierModal(!showAddOrEditSupplierModal)

      const data = {...requestData, productId: order.product?._id}

      onClickSaveSupplierBtn(data)
    }

    const allowOrderStatuses = [
      `${OrderStatusByKey[OrderStatus.PENDING]}`,
      `${OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]}`,
      `${OrderStatusByKey[OrderStatus.AT_PROCESS]}`,
      `${OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]}`,
      `${OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]}`,
      `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}`,
      `${OrderStatusByKey[OrderStatus.VERIFY_RECEIPT]}`,

      `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`,
      `${OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT]}`,
      `${OrderStatusByKey[OrderStatus.IN_STOCK]}`,
    ]

    const disabledOrderStatuses = [
      `${OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]}`,
      `${OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT]}`,
      // `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`,
      // `${OrderStatusByKey[OrderStatus.IN_STOCK]}`,
      `${OrderStatusByKey[OrderStatus.VERIFY_RECEIPT]}`,
    ]

    const submitDisabledOrderStatuses = [
      `${OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]}`,
      `${OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT]}`,
      // `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`,
      `${OrderStatusByKey[OrderStatus.IN_STOCK]}`,
      // `${OrderStatusByKey[OrderStatus.VERIFY_RECEIPT]}`,
    ]

    const [photosToLoad, setPhotosToLoad] = useState([])

    // const [hsCode, setHsCode] = useState(order.product.hsCode)

    const disableSubmit =
      requestStatus === loadingStatuses.isLoading ||
      submitDisabledOrderStatuses.includes(order.status + '') ||
      !orderFields.orderSupplier

    const isSupplierAcceptRevokeActive = orderFields.orderSupplier?._id === selectedSupplier?._id

    // const [deadlineState, setDeadlineState] = useState({
    //       secondsToDeadline: getDistanceBetweenDatesInSeconds(orderFields.deadline, new Date()),
    //       deadlineText: `(${timeToDeadlineInHoursAndMins({
    //         date: orderFields.deadline,
    //         withSeconds: true,
    //         now: new Date(),
    //       })})`,
    //     })

    //     setInterval(
    //       () =>
    //         setDeadlineState(() => {
    //           // console.log('!!!')
    //           const now = new Date()

    //           console.log('now', now)
    //           return {
    //             secondsToDeadline: getDistanceBetweenDatesInSeconds(orderFields.deadline, new Date()),
    //             deadlineText: `(${timeToDeadlineInHoursAndMins({
    //               date: orderFields.deadline,
    //               withSeconds: true,
    //               now,
    //             })})`,
    //           }
    //         }),
    //       1000,
    //     )

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
                inputProps={{maxLength: 9}}
                value={orderFields.item}
                endAdornment={
                  <InputAdornment position="start">
                    {(orderFields.item || (!orderFields.item && order?.item)) && order?.item !== orderFields.item ? (
                      <img
                        src={'/assets/icons/save-discet.svg'}
                        className={classNames.itemInputIcon}
                        onClick={() => onSaveOrderItem(order._id, orderFields.item)}
                      />
                    ) : null}
                  </InputAdornment>
                }
                onChange={setOrderField('item')}
              />
            </div>

            {orderFields.deadline && (
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
                      {`(${timeToDeadlineInHoursAndMins({date: orderFields.deadline, withSeconds: true})})`}
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
            {/* <Typography className={classNames.orderStatus}>{t(TranslationKey['Order status'])}</Typography> */}
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
                    Number(order.status) === Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT])
                    // orderFields.status === OrderStatusByKey[OrderStatus.IN_STOCK]
                  }
                  variant="filled"
                  value={orderFields.status}
                  classes={{
                    select: cx({
                      [classNames.orange]:
                        `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.PENDING]}` ||
                        `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.AT_PROCESS]}` ||
                        `${orderFields.status}` ===
                          `${OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]}` ||
                        `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]}` ||
                        `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.VERIFY_RECEIPT]}` ||
                        `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}`,

                      [classNames.green]:
                        `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]}` ||
                        `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.IN_STOCK]}`,

                      [classNames.red]:
                        `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}` ||
                        `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT]}`,
                    }),
                  }}
                  input={
                    <Input
                      startAdornment={
                        <InputAdornment position="start">
                          <FiberManualRecordRoundedIcon
                            className={cx({
                              [classNames.orange]:
                                `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.PENDING]}` ||
                                `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.AT_PROCESS]}` ||
                                `${orderFields.status}` ===
                                  `${OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]}` ||
                                `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]}` ||
                                `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.VERIFY_RECEIPT]}` ||
                                `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}`,

                              [classNames.green]:
                                `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]}` ||
                                `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.IN_STOCK]}`,

                              [classNames.red]:
                                `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}` ||
                                `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT]}`,
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
                      allowOrderStatuses
                        .filter(
                          el =>
                            el >= order.status ||
                            (el === `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}` &&
                              order.status < `${OrderStatusByKey[OrderStatus.IN_STOCK]}`),
                        )
                        .filter(el => (isPendingOrder ? el <= OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT] : true)),
                    ),
                  }).map((statusCode, statusIndex) => (
                    <MenuItem
                      key={statusIndex}
                      value={statusCode}
                      className={cx(
                        cx(classNames.stantartSelect, {
                          [classNames.orange]:
                            statusCode === `${OrderStatusByKey[OrderStatus.PENDING]}` ||
                            statusCode === `${OrderStatusByKey[OrderStatus.AT_PROCESS]}` ||
                            statusCode === `${OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]}` ||
                            statusCode === `${OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]}` ||
                            statusCode === `${OrderStatusByKey[OrderStatus.VERIFY_RECEIPT]}` ||
                            statusCode === `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}`,

                          [classNames.green]:
                            statusCode === `${OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]}` ||
                            statusCode === `${OrderStatusByKey[OrderStatus.IN_STOCK]}`,

                          [classNames.red]:
                            statusCode === `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}` ||
                            statusCode === `${OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT]}`,
                          [classNames.disableSelect]: disabledOrderStatuses.includes(statusCode),
                        }),
                      )}
                      disabled={
                        disabledOrderStatuses.includes(statusCode) ||
                        (statusCode === `${OrderStatusByKey[OrderStatus.IN_STOCK]}` &&
                          order.status < OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]) ||
                        (statusCode === `${OrderStatusByKey[OrderStatus.IN_STOCK]}` &&
                          order.status === OrderStatusByKey[OrderStatus.IN_STOCK]) ||
                        (statusCode === `${OrderStatusByKey[OrderStatus.IN_STOCK]}` &&
                          order.status === OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED])
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
            onClickHsCode={onClickHsCode}
            onClickUpdateButton={onClickUpdateButton}
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
                      <Button
                        disabled={checkIsPlanningPrice && !isPendingOrder}
                        className={classNames.iconBtn}
                        onClick={() => setShowAddOrEditSupplierModal(!showAddOrEditSupplierModal)}
                      >
                        {selectedSupplier?.createdBy._id !== userInfo._id &&
                        userInfo?.masterUser?._id !== selectedSupplier?.createdBy?._id ? (
                          <VisibilityOutlinedIcon />
                        ) : (
                          <EditOutlinedIcon />
                        )}
                      </Button>
                      {selectedSupplier?.createdBy._id !== userInfo._id &&
                      userInfo?.masterUser?._id !== selectedSupplier?.createdBy?._id ? (
                        <Typography className={classNames.supplierButtonText}>
                          {t(TranslationKey['Open the parameters supplier'])}
                        </Typography>
                      ) : (
                        <Typography className={classNames.supplierButtonText}>
                          {t(TranslationKey['Edit a supplier'])}
                        </Typography>
                      )}
                    </div>

                    <div className={classNames.supplierButtonWrapper}>
                      <Button
                        disabled={checkIsPlanningPrice && !isPendingOrder}
                        className={cx(classNames.iconBtn, classNames.iconBtnAccept, {
                          [classNames.iconBtnAcceptRevoke]: isSupplierAcceptRevokeActive,
                        })}
                        onClick={() => {
                          if (isSupplierAcceptRevokeActive) {
                            setOrderField('orderSupplier')({target: {value: null}})
                          } else {
                            setOrderField('orderSupplier')({target: {value: selectedSupplier}})
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
              <div className={classNames.supplierCheckboxWrapper} onClick={setUpdateSupplierData}>
                <Checkbox disabled={isPendingOrder} checked={updateSupplierData} color="primary" />
                <Typography className={classNames.checkboxTitle}>
                  {t(TranslationKey['Update supplier data'])}
                </Typography>
              </div>
            </div>
          ) : null}

          <EditOrderSuppliersTable
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

        {orderStatusesThatTriggersEditBoxBlock.includes(parseInt(orderFields.status)) && (
          <div className={classNames.addBtn}>
            <Typography className={classNames.addBoxTitle}>{t(TranslationKey['Add boxes for this order'])}</Typography>
            <div className={classNames.addBoxButtonWrapper}>
              <Button
                tooltipInfoContent={t(TranslationKey['Opens a form to create a box'])}
                className={classNames.addBoxButton}
                onClick={addBoxHandler}
              >
                {t(TranslationKey['Add a box'])}
              </Button>
            </div>
          </div>
        )}

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
                    inputProps={{maxLength: 255}}
                    label={t(TranslationKey['Set track number for new boxes']) + ':'}
                    value={trackNumber.text}
                    onChange={e => setTrackNumber({...trackNumber, text: e.target.value})}
                  />

                  <Button
                    className={classNames.trackNumberPhotoBtn}
                    onClick={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
                  >
                    {trackNumber.files[0] ? t(TranslationKey['File added']) : 'Photo track numbers'}
                  </Button>
                </div>

                <div className={classNames.trackNumberPhotoWrapper}>
                  {trackNumber.files[0] ? (
                    <img
                      className={classNames.trackNumberPhoto}
                      src={
                        typeof trackNumber.files[0] === 'string' ? trackNumber.files[0] : trackNumber.files[0]?.data_url
                      }
                      onClick={() => {
                        setShowPhotosModal(!showPhotosModal)
                        setBigImagesOptions({
                          ...bigImagesOptions,

                          images: [
                            typeof trackNumber.files[0] === 'string'
                              ? trackNumber.files[0]
                              : trackNumber.files[0]?.data_url,
                          ],
                        })
                      }}
                    />
                  ) : (
                    <Typography>{'no photo track number...'}</Typography>
                  )}
                </div>
              </div>
              <div className={classNames.fieldWrapper}>
                <div className={classNames.inputWrapper}>
                  <Field
                    multiline
                    minRows={4}
                    maxRows={4}
                    inputProps={{maxLength: 500}}
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
          }}
          onClickCancelBtn={() => setShowConfirmModal(!showConfirmModal)}
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
            title={'Track number'}
            tmpCode={trackNumber.files}
            onClickSaveBarcode={value => {
              setTrackNumber({...trackNumber, files: value})
              setShowSetBarcodeModal(!showSetBarcodeModal)
            }}
            onCloseModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
          />
        </Modal>

        <BigImagesModal
          openModal={showPhotosModal}
          setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          images={bigImagesOptions.images}
          imgIndex={bigImagesOptions.imgIndex}
        />

        <Modal
          openModal={showCheckQuantityModal}
          setOpenModal={() => setShowCheckQuantityModal(!showCheckQuantityModal)}
        >
          <CheckQuantityForm
            withRefund
            title={t(TranslationKey['Setting the stock status'])}
            description={t(TranslationKey['Enter the amount of goods that came into the warehouse']) + ':'}
            acceptText={t(TranslationKey.Continue) + '?'}
            comparisonQuantity={deliveredGoodsCount}
            onClose={() => setShowCheckQuantityModal(!showCheckQuantityModal)}
            onSubmit={({refundValue}) => {
              setTmpNewOrderFieldsState({...tmpNewOrderFieldsState, tmpRefundToClient: refundValue})

              setConfirmModalMode(confirmModalModes.STATUS)
              setShowConfirmModal(!showConfirmModal)
              setShowCheckQuantityModal(!showCheckQuantityModal)
            }}
          />
        </Modal>

        <Modal
          missClickModalOn={!isOnlyRead}
          openModal={showAddOrEditSupplierModal}
          setOpenModal={() => setShowAddOrEditSupplierModal(!showAddOrEditSupplierModal)}
        >
          <AddOrEditSupplierModalContent
            requestStatus={requestStatus}
            sourceYuanToDollarRate={yuanToDollarRate}
            volumeWeightCoefficient={volumeWeightCoefficient}
            title={t(TranslationKey['Adding and editing a supplier'])}
            supplier={selectedSupplier}
            onlyRead={isOnlyRead}
            // showProgress={showProgress}
            // progressValue={progressValue}
            onClickSaveBtn={onClickSubmitSaveSupplierBtn}
            onTriggerShowModal={() => setShowAddOrEditSupplierModal(!showAddOrEditSupplierModal)}
          />
        </Modal>
      </Box>
    )
  },
)
