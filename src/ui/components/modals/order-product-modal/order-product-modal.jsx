import { isPast, isToday, isTomorrow, isValid } from 'date-fns'
import { useEffect, useState } from 'react'

import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'
import { OrderModalBodyRow } from '@components/table/table-rows/client/inventory/order-product-modal/order-modal-body-row'

import { calcProductsPriceWithDelivery } from '@utils/calculation'
import { checkIsPositiveNum, isNotUndefined } from '@utils/checks'
import { getObjectFilteredByKeyArrayBlackList } from '@utils/object'
import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './order-product-modal.style'

export const OrderProductModal = ({
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
}) => {
  const { classes: classNames } = useClassNames()

  const [submitIsClicked, setSubmitIsClicked] = useState(false)
  const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)
  const [tmpOrderIndex, setTmpOrderIndex] = useState(undefined)

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
      ? reorderOrdersData.map(reorderOrder => ({
          ...reorderOrder.product,

          amount: reorderOrder.amount,

          destinationId: destinations.map(el => el._id).includes(reorderOrder.destination?._id)
            ? reorderOrder.destination?._id
            : '',
          storekeeperId: storekeepers.map(el => el._id).includes(reorderOrder.storekeeper?._id)
            ? reorderOrder.storekeeper?._id
            : '',
          logicsTariffId: storekeepers
            .find(el => el._id === reorderOrder.storekeeper?._id)
            ?.tariffLogistics.map(el => el._id)
            .includes(reorderOrder.logicsTariff?._id)
            ? reorderOrder.logicsTariff?._id
            : '',
          expressChinaDelivery: isPendingOrdering ? false : reorderOrder.expressChinaDelivery || false,
          priority: isPendingOrdering ? '30' : reorderOrder.priority || '30',
          deadline:
            isPendingOrdering &&
            !(
              isPast(new Date(reorderOrder.deadline)) ||
              isToday(new Date(reorderOrder.deadline)) ||
              isTomorrow(new Date(reorderOrder.deadline))
            )
              ? reorderOrder.deadline
              : null,
        }))
      : selectedProductsData.map(product => ({
          ...product,
          amount: 1,
          expressChinaDelivery: false,
          priority: '30',
        })),
  )

  const [orderState, setOrderState] = useState(
    reorderOrdersData?.length
      ? reorderOrdersData.map(reorderOrder => ({
          amount: reorderOrder.amount,
          clientComment: '',
          barCode: reorderOrder?.product?.barCode || '',
          productId: reorderOrder.product._id,
          images: [],
          tmpBarCode: [],

          destinationId: destinations.map(el => el._id).includes(reorderOrder.destination?._id)
            ? reorderOrder.destination?._id
            : '',
          storekeeperId: storekeepers.map(el => el._id).includes(reorderOrder.storekeeper?._id)
            ? reorderOrder.storekeeper?._id
            : '',
          logicsTariffId: storekeepers
            .find(el => el._id === reorderOrder.storekeeper?._id)
            ?.tariffLogistics.map(el => el._id)
            .includes(reorderOrder.logicsTariff?._id)
            ? reorderOrder.logicsTariff?._id
            : '',
          expressChinaDelivery: isPendingOrdering ? false : reorderOrder.expressChinaDelivery || false,
          priority: isPendingOrdering ? '30' : reorderOrder.priority || '30',
          _id: reorderOrder._id,
          deadline:
            isPendingOrdering &&
            !(
              isPast(new Date(reorderOrder.deadline)) ||
              isToday(new Date(reorderOrder.deadline)) ||
              isTomorrow(new Date(reorderOrder.deadline))
            )
              ? reorderOrder.deadline
              : null,
          buyerId: reorderOrder.buyer?._id || null,
        }))
      : selectedProductsData.map(product => ({
          amount: 1,
          clientComment: '',
          barCode: product?.barCode || '',
          productId: product._id,
          images: [],
          deadline: null,
          tmpBarCode: [],

          destinationId: null,

          storekeeperId: '',
          logicsTariffId: '',
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
    const ordersData = orderState.map((el, i) =>
      getObjectFilteredByKeyArrayBlackList(
        {
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
        },
        el.deadline ? [] : ['deadline'],
      ),
    )

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
    orderState.some(
      (order, index) =>
        (productsForRender[index].currentSupplier &&
          toFixed(calcProductsPriceWithDelivery(productsForRender[index], order), 2) <
            platformSettings.orderAmountLimit) ||
        order.storekeeperId === '' ||
        order.logicsTariffId === '' ||
        Number(order.amount) <= 0 ||
        !Number.isInteger(Number(order.amount)) ||
        (isPendingOrder && !order.deadline) ||
        (!!order.deadline &&
          isValid(order.deadline) &&
          (!reorderOrdersData?.length ||
            isPast(order.deadline) ||
            isToday(order.deadline) ||
            isTomorrow(order.deadline))) ||
        (productsForRender[index].currentSupplier?.multiplicity &&
          productsForRender[index].currentSupplier?.boxProperties?.amountInBox &&
          order.amount % productsForRender[index].currentSupplier?.boxProperties?.amountInBox !== 0),
    ) ||
    storekeeperEqualsDestination ||
    // productsForRender.some(item => !item.currentSupplier) ||
    (!isHaveSomeSupplier && productsForRender.some(order => !order.deadline)) ||
    !orderState.length ||
    submitIsClicked

  return (
    <div>
      <Typography className={classNames.modalTitle}>{t(TranslationKey['Order products'])}</Typography>
      <TableContainer className={classNames.tableWrapper}>
        <Table className={classNames.table}>
          <TableHead>
            <TableRow className={classNames.tableRow}>
              <TableCell className={classNames.imgCell}>
                <p className={classNames.cellText}>{t(TranslationKey.Image)}</p>
              </TableCell>
              <TableCell className={classNames.productCell}>
                <p className={classNames.cellText}>{t(TranslationKey.Product)}</p>
              </TableCell>
              <TableCell className={classNames.priceCell}>
                <Button
                  disabled
                  className={classNames.priceCellBtn}
                  tooltipInfoContent={t(TranslationKey['Unit price of the selected supplier'])}
                >
                  {t(TranslationKey['Price per unit.']) + ' $'}
                </Button>
              </TableCell>

              <TableCell className={classNames.deliveryCell}>
                <Button
                  disabled
                  className={classNames.deliveryCellBtn}
                  tooltipInfoContent={t(TranslationKey['Delivery costs to the prep center'])}
                >
                  {t(TranslationKey['Delivery per unit.']) + ' $'}
                </Button>
              </TableCell>
              <TableCell className={classNames.qntCell}>
                <Button
                  disabled
                  className={classNames.qntCellBtn}
                  tooltipInfoContent={t(TranslationKey['Specify the amount of goods you want to order'])}
                >
                  {t(TranslationKey.Quantity)}
                </Button>
              </TableCell>
              <TableCell className={classNames.totalCell}>
                <Button
                  disabled
                  className={classNames.totalCellBtn}
                  tooltipInfoContent={t(TranslationKey['Order amount for a specific product'])}
                >
                  {t(TranslationKey.Total) + ' $'}
                </Button>
              </TableCell>
              <TableCell className={classNames.totalCell}>
                <Button disabled className={classNames.totalCellBtn}>
                  {t(TranslationKey['Price variations'])}
                </Button>
              </TableCell>
              <TableCell className={classNames.barCodeCell}>
                <Button
                  disabled
                  className={classNames.barCodeCellBtn}
                  tooltipInfoContent={t(TranslationKey['Product barcode'])}
                >
                  {t(TranslationKey.BarCode)}
                </Button>
              </TableCell>
              <TableCell className={classNames.tariffCell}>
                <Button
                  disabled
                  className={classNames.tariffCellBtn}
                  tooltipInfoContent={t(
                    TranslationKey['Choose a prep center in China and the rate at which the delivery will take place'],
                  )}
                >
                  {`Storekeeper ${t(TranslationKey.and)} ${t(TranslationKey.Tariff)}`}
                </Button>
              </TableCell>
              <TableCell className={classNames.warehouseCell}>
                <Button
                  disabled
                  className={classNames.warehouseCellBtn}
                  tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the United States"])}
                >
                  {t(TranslationKey.Destination)}
                </Button>
              </TableCell>

              <TableCell className={classNames.commentCell}>
                <Button
                  disabled
                  className={classNames.commentCellBtn}
                  tooltipInfoContent={t(TranslationKey['Comments on the order for the Buyer and the Prep Center'])}
                >
                  {t(TranslationKey['Client comment'])}
                </Button>
              </TableCell>
              <TableCell className={classNames.deadlineCell}>
                <p className={classNames.cellText}>{'Deadline'}</p>
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
                onClickBarcode={() => {
                  setTmpOrderIndex(index)
                  triggerBarcodeModal()
                }}
                onDoubleClickBarcode={onDoubleClickBarcode}
                onDeleteBarcode={() => {
                  setOrderStateFiled(index)('barCode')('')
                }}
                onRemoveProduct={onRemoveProduct}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={classNames.sumWrapper}>
        <Typography className={classNames.sumText}>{`${t(
          TranslationKey['Total amount'],
        )}: ${totalOrdersCost}`}</Typography>
      </div>

      <div className={classNames.buttonsWrapper}>
        <div className={classNames.pendingOrderWrapper} onClick={() => setIsResearchSupplier(!isResearchSupplier)}>
          <Checkbox
            checked={isResearchSupplier}
            color="primary"
            classes={{
              root: classNames.checkbox,
            }}
          />
          <Typography className={classNames.sumText}>{t(TranslationKey['Re-search supplier'])}</Typography>
        </div>

        {!isPendingOrdering ? (
          <div className={classNames.pendingOrderWrapper} onClick={() => setIsPendingOrder(!isPendingOrder)}>
            <Checkbox
              checked={isPendingOrder}
              color="primary"
              classes={{
                root: classNames.checkbox,
              }}
            />
            <Typography className={classNames.sumText}>{t(TranslationKey['Pending order'])}</Typography>
          </div>
        ) : null}

        <Button
          tooltipInfoContent={t(
            TranslationKey['Complete the order (freezes the required amount of the order from the balance)'],
          )}
          tooltipAttentionContent={
            storekeeperEqualsDestination && t(TranslationKey['Storekeeper and destination match'])
          }
          className={(classNames.modalButton, classNames.buyNowBtn)}
          disabled={disabledSubmit}
          onClick={onClickSubmit}
        >
          {t(TranslationKey['Order a batch of products'])}
        </Button>

        <Button
          tooltipInfoContent={t(TranslationKey['Close the checkout window without saving'])}
          className={(classNames.modalButton, classNames.cancelBtn)}
          onClick={() => (onClickCancel ? onClickCancel() : onTriggerOpenModal('showOrderModal'))}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
      <Modal openModal={showSetBarcodeModal} setOpenModal={() => triggerBarcodeModal()}>
        <SetBarcodeModal
          tmpCode={isNotUndefined(tmpOrderIndex) && orderState[tmpOrderIndex].tmpBarCode}
          item={isNotUndefined(tmpOrderIndex) && orderState[tmpOrderIndex]}
          onClickSaveBarcode={barCode => {
            setOrderStateFiled(tmpOrderIndex)('tmpBarCode')(barCode)
            triggerBarcodeModal()
            setTmpOrderIndex(undefined)
          }}
          onCloseModal={triggerBarcodeModal}
        />
      </Modal>
    </div>
  )
}
