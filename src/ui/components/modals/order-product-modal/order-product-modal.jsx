import { isPast, isToday, isTomorrow } from 'date-fns'
import { memo, useEffect, useState } from 'react'

import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'
import { OrderModalBodyRow } from '@components/table/table-rows/client/inventory/order-product-modal/order-modal-body-row'

import { calcProductsPriceWithDelivery } from '@utils/calculation'
import { checkIsPositiveNum, isNotUndefined } from '@utils/checks'
import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './order-product-modal.style'

import { SetFilesModal } from '../set-files-modal'

export const OrderProductModal = memo(props => {
  const { classes: styles } = useStyles()

  const {
    platformSettings,
    destinations,
    storekeepers,
    onTriggerOpenModal,
    selectedProductsData,
    onDoubleClickBarcode,
    onSubmit,
    onClickCancel,
    reorderOrdersData,
    destinationsFavourites,
    setDestinationsFavouritesItem,
    isPendingOrdering,
    isSetDeadline,
    isInventory,
    statusesForChecking,
  } = props

  const [submitIsClicked, setSubmitIsClicked] = useState(false)
  const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)
  const [tmpOrderIndex, setTmpOrderIndex] = useState(undefined)
  const [showSetFilesModal, setShowSetFilesModal] = useState(false)
  const [filesConditions, setFilesConditions] = useState({ tmpFiles: [], currentFiles: '', index: undefined })

  const [isPendingOrder, setIsPendingOrder] = useState(false)
  const [isResearchSupplier, setIsResearchSupplier] = useState(false)

  useEffect(() => {
    if (!isPendingOrder) {
      setIsResearchSupplier(false)
    }
  }, [isPendingOrder])

  const triggerBarcodeModal = () => {
    setShowSetBarcodeModal(!showSetBarcodeModal)
  }

  const [productsForRender, setProductsForRender] = useState(
    reorderOrdersData?.length
      ? reorderOrdersData.map(reorderOrder => {
          const validDate = new Date(reorderOrder.deadline)
          const isValidDeadline = !(isPast(validDate) || isToday(validDate) || isTomorrow(validDate))
          const isSetCurrentDeadline =
            ((isSetDeadline && statusesForChecking.some(status => status === reorderOrder.status)) ||
              isPendingOrdering) &&
            isValidDeadline

          return {
            ...reorderOrder.product,

            amount: reorderOrder.amount,

            // @refactor: need to create function
            destinationId: destinations?.find(el => el._id === reorderOrder?.destination?._id)?._id || '',
            storekeeperId: storekeepers?.find(el => el._id === reorderOrder?.storekeeper?._id)?._id || '',

            logicsTariffId: storekeepers
              .find(el => el._id === reorderOrder.storekeeper?._id)
              ?.tariffLogistics.map(el => el._id)
              .includes(reorderOrder.logicsTariff?._id)
              ? reorderOrder.logicsTariff?._id
              : '',
            expressChinaDelivery: isPendingOrdering ? false : reorderOrder.expressChinaDelivery || false,
            priority: isPendingOrdering ? '30' : reorderOrder.priority || '30',
            deadline: isSetCurrentDeadline ? reorderOrder.deadline : null,
          }
        })
      : selectedProductsData.map(product => ({
          ...product,
          amount: 1,
          expressChinaDelivery: false,
          priority: '30',
          deadline: null,
          currentVariationTariffId: product.variationTariff?._id,
        })),
  )

  const [orderState, setOrderState] = useState(
    reorderOrdersData?.length
      ? reorderOrdersData.map(reorderOrder => {
          const validDate = new Date(reorderOrder.deadline)
          const isValidDeadline = !(isPast(validDate) || isToday(validDate) || isTomorrow(validDate))
          const isSetCurrentDeadline =
            ((isSetDeadline && statusesForChecking.some(status => status === reorderOrder.status)) ||
              isPendingOrdering) &&
            isValidDeadline

          return {
            amount: reorderOrder.amount,
            clientComment: '',
            barCode: reorderOrder?.product?.barCode || '',
            tmpBarCode: [],

            transparency: reorderOrder?.product?.transparency,
            transparencyFile: '',
            tmpTransparencyFile: [],

            productId: reorderOrder.product._id,
            images: [],

            // @refactor: need to create function
            destinationId: destinations?.find(el => el._id === reorderOrder?.destination?._id)?._id || '',
            storekeeperId: storekeepers?.find(el => el._id === reorderOrder?.storekeeper?._id)?._id || '',

            logicsTariffId: storekeepers
              .find(el => el._id === reorderOrder.storekeeper?._id)
              ?.tariffLogistics.map(el => el._id)
              .includes(reorderOrder.logicsTariff?._id)
              ? reorderOrder.logicsTariff?._id
              : '',
            expressChinaDelivery: isPendingOrdering ? false : reorderOrder.expressChinaDelivery || false,
            priority: isPendingOrdering ? '30' : reorderOrder.priority || '30',
            _id: reorderOrder._id,
            deadline: isSetCurrentDeadline ? reorderOrder.deadline : null,
            buyerId: reorderOrder.buyer?._id || null,
          }
        })
      : selectedProductsData.map(product => ({
          amount: 1,
          clientComment: '',
          barCode: product?.barCode || '',
          productId: product._id,
          images: [],
          deadline: null,

          transparency: product.transparency,
          tmpBarCode: [],
          tmpTransparencyFile: [],

          destinationId: null,

          storekeeperId: null,
          logicsTariffId: null,
          expressChinaDelivery: false,
          priority: '30',
          buyerId: product.buyer?._id || null,
        })),
  )

  useEffect(() => {
    if (!orderState?.length) {
      onTriggerOpenModal('showOrderModal')
    }
  }, [orderState])

  const onRemoveProduct = itemId => {
    const newStateOrderState = [...orderState].filter(el => el.productId !== itemId)
    const newRenderOrderState = productsForRender.filter(el => el._id !== itemId)

    setProductsForRender(newRenderOrderState)
    setOrderState(newStateOrderState)
  }

  const setOrderStateFiled = index => fieldsName => value => {
    const newStateOrderState = [...orderState]

    const newRenderOrderState = [...productsForRender]

    if (['expressChinaDelivery'].includes(fieldsName)) {
      newStateOrderState[index][fieldsName] = value

      newRenderOrderState[index][fieldsName] = value
    } else if (['amount'].includes(fieldsName)) {
      if (!checkIsPositiveNum(value)) {
        return
      }

      newStateOrderState[index][fieldsName] = parseInt(value) || 0

      newRenderOrderState[index][fieldsName] = parseInt(value) || 0
    } else if (fieldsName === 'tariff') {
      newStateOrderState[index] = {
        ...newStateOrderState[index],
        ...value,
      }
      newRenderOrderState[index] = {
        ...newRenderOrderState[index],
        ...value,
      }
    } else {
      newStateOrderState[index][fieldsName] = value

      newRenderOrderState[index][fieldsName] = value
    }

    setProductsForRender(newRenderOrderState)
    setOrderState(newStateOrderState)
  }

  const totalOrdersCost = toFixedWithDollarSign(
    productsForRender.reduce((ac, cur) => (ac += calcProductsPriceWithDelivery(cur, cur)), 0),
    2,
  )

  const onClickSubmit = () => {
    const ordersData = orderState.map((el, i) => ({
      ...el,
      destinationId: el.destinationId ? el.destinationId : null,
      totalPrice: productsForRender[i]?.currentSupplier?.price
        ? (productsForRender[i]?.currentSupplier.price +
            productsForRender[i]?.currentSupplier.batchDeliveryCostInDollar /
              productsForRender[i]?.currentSupplier.amount) *
          el?.amount
        : 0,

      needsResearch: isResearchSupplier,
      tmpIsPendingOrder: isPendingOrder,
    }))

    onSubmit({
      ordersDataState: ordersData,
      totalOrdersCost,
    })
    setSubmitIsClicked(true)

    setTimeout(() => setSubmitIsClicked(false), 3000)
  }

  const storekeeperEqualsDestination = orderState.some(
    order => order.storekeeperId === destinations.find(el => el._id === order.destinationId)?.storekeeper?._id,
  )

  const isHaveSomeSupplier = productsForRender.some(item => item.currentSupplier)

  const disabledSubmit =
    orderState.some((order, index) => {
      const isDeadlineTodayOrTomorrow = isPast(order.deadline) || isToday(order.deadline) || isTomorrow(order.deadline)

      return (
        (productsForRender[index].currentSupplier &&
          toFixed(calcProductsPriceWithDelivery(productsForRender[index], order), 2) <
            platformSettings.orderAmountLimit) ||
        order.storekeeperId === '' ||
        order.logicsTariffId === '' ||
        Number(order.amount) <= 0 ||
        !Number.isInteger(Number(order.amount)) ||
        (isPendingOrder && !order.deadline) ||
        ((!!isInventory || !!reorderOrdersData?.length || !!isPendingOrdering) && isDeadlineTodayOrTomorrow) ||
        (productsForRender[index].currentSupplier?.multiplicity &&
          productsForRender[index].currentSupplier?.boxProperties?.amountInBox &&
          order.amount % productsForRender[index].currentSupplier?.boxProperties?.amountInBox !== 0)
      )
    }) ||
    storekeeperEqualsDestination ||
    (!isHaveSomeSupplier && productsForRender.some(order => !order.deadline)) ||
    !orderState.length ||
    submitIsClicked ||
    (orderState.some(order => order.transparency && !order.transparencyFile && !order.tmpTransparencyFile.length) &&
      !isPendingOrder)

  return (
    <div className={styles.wrapper}>
      <Typography className={styles.modalTitle}>{t(TranslationKey['Order products'])}</Typography>
      <TableContainer className={styles.tableWrapper}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow className={styles.tableRow}>
              <TableCell className={styles.imgCell}>
                <p className={styles.cellText}>{t(TranslationKey.Image)}</p>
              </TableCell>
              <TableCell className={styles.productCell}>
                <p className={styles.cellText}>{t(TranslationKey.Product)}</p>
              </TableCell>
              <TableCell className={styles.priceCell}>
                <Button
                  disabled
                  className={styles.priceCellBtn}
                  tooltipInfoContent={t(TranslationKey['Unit price of the selected supplier'])}
                >
                  {t(TranslationKey['Price without delivery']) + ' $'}
                </Button>
              </TableCell>

              <TableCell className={styles.deliveryCell}>
                <Button
                  disabled
                  className={styles.deliveryCellBtn}
                  tooltipInfoContent={t(TranslationKey['Delivery costs to the prep center'])}
                >
                  {t(TranslationKey['Delivery per unit.']) + ' $'}
                </Button>
              </TableCell>
              <TableCell className={styles.qntCell}>
                <Button
                  disabled
                  className={styles.qntCellBtn}
                  tooltipInfoContent={t(TranslationKey['Specify the amount of goods you want to order'])}
                >
                  {t(TranslationKey.Quantity)}
                </Button>
              </TableCell>
              <TableCell className={styles.totalCell}>
                <Button
                  disabled
                  className={styles.totalCellBtn}
                  tooltipInfoContent={t(TranslationKey['Order amount for a specific product'])}
                >
                  {t(TranslationKey.Total) + ' $'}
                </Button>
              </TableCell>
              <TableCell className={styles.totalCell}>
                <Button disabled className={styles.totalCellBtn}>
                  {t(TranslationKey['Price variations'])}
                </Button>
              </TableCell>
              <TableCell className={styles.barCodeCell}>
                <Button disabled className={styles.barCodeCellBtn}>
                  {`${t(TranslationKey.BarCode)} / ${t(TranslationKey['Transparency codes'])}`}
                </Button>
              </TableCell>
              <TableCell className={styles.tariffCell}>
                <Button
                  disabled
                  className={styles.tariffCellBtn}
                  tooltipInfoContent={t(
                    TranslationKey['Choose a prep center in China and the rate at which the delivery will take place'],
                  )}
                >
                  {`Storekeeper ${t(TranslationKey.and)} ${t(TranslationKey.Tariff)}`}
                </Button>
              </TableCell>
              <TableCell className={styles.warehouseCell}>
                <Button
                  disabled
                  className={styles.warehouseCellBtn}
                  tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the United States"])}
                >
                  {t(TranslationKey.Destination)}
                </Button>
              </TableCell>

              <TableCell className={styles.commentCell}>
                <Button
                  disabled
                  className={styles.commentCellBtn}
                  tooltipInfoContent={t(TranslationKey['Comments on the order for the Buyer and the Prep Center'])}
                >
                  {t(TranslationKey['Client comment'])}
                </Button>
              </TableCell>
              <TableCell className={styles.deadlineCell}>
                <p className={styles.cellText}>{'Deadline'}</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsForRender.map((product, index) => (
              <OrderModalBodyRow
                key={index}
                platformSettings={platformSettings}
                destinations={destinations}
                storekeepers={storekeepers}
                item={product}
                withRemove={selectedProductsData?.length > 1}
                orderState={orderState[index]}
                destinationsFavourites={destinationsFavourites}
                setOrderStateFiled={setOrderStateFiled(index)}
                itemIndex={index}
                onClickPriority={() => {
                  setOrderStateFiled(index)('priority')(product.priority === '30' ? '40' : '30')
                }}
                onClickExpressChinaDelivery={() => {
                  setOrderStateFiled(index)('expressChinaDelivery')(!product.expressChinaDelivery)
                }}
                onClickSetDestinationFavourite={setDestinationsFavouritesItem}
                onDoubleClickBarcode={onDoubleClickBarcode}
                onClickBarcode={() => {
                  setTmpOrderIndex(index)
                  triggerBarcodeModal()
                }}
                onClickTransparency={value => {
                  setShowSetFilesModal(true)
                  setFilesConditions(value)
                }}
                onDeleteBarcode={() => {
                  setOrderStateFiled(index)('barCode')('')
                  setOrderStateFiled(index)('tmpBarCode')([])
                }}
                onRemoveProduct={onRemoveProduct}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={styles.sumWrapper}>
        <Typography className={styles.sumText}>{`${t(TranslationKey['Total amount'])}: ${totalOrdersCost}`}</Typography>
      </div>

      <div className={styles.buttonsWrapper}>
        <div className={styles.pendingOrderWrapper} onClick={() => setIsResearchSupplier(!isResearchSupplier)}>
          <Checkbox
            checked={isResearchSupplier}
            color="primary"
            classes={{
              root: styles.checkbox,
            }}
          />
          <Typography className={styles.sumText}>{t(TranslationKey['Re-search supplier'])}</Typography>
        </div>

        {!isPendingOrdering ? (
          <div className={styles.pendingOrderWrapper} onClick={() => setIsPendingOrder(!isPendingOrder)}>
            <Checkbox
              checked={isPendingOrder}
              color="primary"
              classes={{
                root: styles.checkbox,
              }}
            />
            <Typography className={styles.sumText}>{t(TranslationKey['Pending order'])}</Typography>
          </div>
        ) : null}

        <Button
          tooltipInfoContent={t(
            TranslationKey['Complete the order (freezes the required amount of the order from the balance)'],
          )}
          tooltipAttentionContent={
            storekeeperEqualsDestination && t(TranslationKey['Storekeeper and destination match'])
          }
          className={(styles.modalButton, styles.buyNowBtn)}
          disabled={disabledSubmit}
          onClick={onClickSubmit}
        >
          {t(TranslationKey['Order a batch of products'])}
        </Button>

        <Button
          tooltipInfoContent={t(TranslationKey['Close the checkout window without saving'])}
          className={(styles.modalButton, styles.cancelBtn)}
          onClick={() => (onClickCancel ? onClickCancel() : onTriggerOpenModal('showOrderModal'))}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
      <Modal openModal={showSetBarcodeModal} setOpenModal={() => triggerBarcodeModal()}>
        <SetBarcodeModal
          tmpCode={isNotUndefined(tmpOrderIndex) && orderState[tmpOrderIndex].tmpBarCode}
          barCode={isNotUndefined(tmpOrderIndex) && orderState[tmpOrderIndex]?.barCode}
          onClickSaveBarcode={barCode => {
            setOrderStateFiled(tmpOrderIndex)('tmpBarCode')(barCode)
            setTmpOrderIndex(undefined)
            triggerBarcodeModal()
          }}
          onCloseModal={triggerBarcodeModal}
        />
      </Modal>
      <Modal openModal={showSetFilesModal} setOpenModal={setShowSetFilesModal}>
        <SetFilesModal
          modalTitle={t(TranslationKey.Transparency)}
          LabelTitle={t(TranslationKey['Transparency codes'])}
          currentFiles={filesConditions.currentFiles}
          tmpFiles={filesConditions.tmpFiles}
          onClickSave={value => {
            setOrderStateFiled(filesConditions.index)('tmpTransparencyFile')(value)
            setShowSetFilesModal(false)
          }}
          onCloseModal={setShowSetFilesModal}
        />
      </Modal>
    </div>
  )
})
