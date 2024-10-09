import { isPast, isToday, isTomorrow } from 'date-fns'
import { memo, useEffect, useState } from 'react'

import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { Button } from '@components/shared/button'
import { Modal } from '@components/shared/modal'
import { TooltipAttentionIcon } from '@components/shared/svg-icons'
import { OrderModalBodyRow } from '@components/table/table-rows/client/inventory/order-product-modal/order-modal-body-row'

import { calcProductsPriceWithDelivery } from '@utils/calculation'
import { checkIsPositiveNum, isNotUndefined } from '@utils/checks'
import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './order-product-modal.style'

import { SetFilesModal } from '../set-files-modal'

export const OrderProductModal = memo(props => {
  const { classes: styles, cx } = useStyles()

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
    pendingOrderQuantity,
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
  console.log('pendingOrderQuantity', pendingOrderQuantity)
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
            clientComment: isPendingOrdering ? reorderOrder.clientComment : '',

            destination: {
              _id: destinations?.find(el => el._id === reorderOrder?.destination?._id)?._id || '',
            },
            logicsTariff: {
              _id: storekeepers
                .find(el => el._id === reorderOrder.storekeeper?._id)
                ?.tariffLogistics.map(el => el._id)
                .includes(reorderOrder.logicsTariff?._id)
                ? reorderOrder?.logicsTariff?._id
                : '',
            },
            variationTariff: {
              ...reorderOrder?.variationTariff,
            },
            // @refactor: need to create function
            destinationId: destinations?.find(el => el._id === reorderOrder?.destination?._id)?._id || '',
            storekeeperId: storekeepers?.find(el => el._id === reorderOrder?.storekeeper?._id)?._id || '',

            logicsTariffId: storekeepers
              .find(el => el._id === reorderOrder.storekeeper?._id)
              ?.tariffLogistics.map(el => el._id)
              .includes(reorderOrder.logicsTariff?._id)
              ? reorderOrder.logicsTariff?._id
              : '',
            variationTariffId: reorderOrder?.variationTariffId,
            expressChinaDelivery: isPendingOrdering ? false : reorderOrder.expressChinaDelivery || false,
            priority: isPendingOrdering ? '30' : reorderOrder.priority || '30',
            deadline: isSetCurrentDeadline ? reorderOrder.deadline : null,
            productId: reorderOrder?.product?._id,
          }
        })
      : selectedProductsData.map(product => ({
          ...product,
          amount: pendingOrderQuantity || 1,
          clientComment: isPendingOrdering ? product?.clientComment : '',
          expressChinaDelivery: false,
          priority: '30',
          deadline: null,
          variationTariffId: product?.variationTariff?._id,

          destination: {
            _id: null,
          },
          logicsTariff: {
            _id: null,
          },
          variationTariff: {
            _id: null,
          },
          productId: product?._id,
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
            clientComment: isPendingOrdering ? reorderOrder.clientComment : '',
            barCode: reorderOrder?.product?.barCode || '',
            tmpBarCode: [],

            transparency: reorderOrder?.product?.transparency,
            transparencyFile: '',
            tmpTransparencyFile: [],

            productId: reorderOrder?.product?._id,
            images: [],

            destination: {
              _id: destinations?.find(el => el._id === reorderOrder?.destination?._id)?._id || '',
            },
            logicsTariff: {
              _id: storekeepers
                .find(el => el._id === reorderOrder.storekeeper?._id)
                ?.tariffLogistics.map(el => el._id)
                .includes(reorderOrder?.logicsTariff?._id)
                ? reorderOrder.logicsTariff?._id
                : '',
            },
            variationTariff: {
              ...reorderOrder?.variationTariff,
            },

            // @refactor: need to create function
            destinationId: destinations?.find(el => el._id === reorderOrder?.destination?._id)?._id || '',
            storekeeperId: storekeepers?.find(el => el._id === reorderOrder?.storekeeper?._id)?._id || '',
            variationTariffId: reorderOrder?.variationTariffId,
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
          amount: pendingOrderQuantity || 1,
          clientComment: isPendingOrdering ? product?.clientComment : '',
          barCode: product?.barCode || '',
          productId: product?._id,
          images: [],
          deadline: null,

          transparency: product?.transparency,
          tmpBarCode: [],
          tmpTransparencyFile: [],

          destination: {
            _id: null,
          },
          logicsTariff: {
            _id: null,
          },
          variationTariff: {
            _id: null,
          },

          destinationId: null,

          storekeeperId: null,
          logicsTariffId: null,
          expressChinaDelivery: false,
          priority: '30',
          buyerId: product?.buyer?._id || null,
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
      const changeObject = {
        logicsTariffId: value.logicsTariffId,
        variationTariffId: value.variationTariffId,
        destinationId: value.destinationId,
        storekeeperId: value.storekeeperId,
        storekeeper: value.storekeeper,
        destination: value.destination,
        logicsTariff: value.logicsTariff,
        variationTariff: value.variationTariff,
      }

      newStateOrderState[index] = {
        ...newStateOrderState[index],
        ...changeObject,
      }
      newRenderOrderState[index] = {
        ...newRenderOrderState[index],
        ...changeObject,
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
      images: [], // reset images to create an order(onClickSubmit), because in the useTariffVariations they are added again - need to fix order product modal
    }))

    onSubmit({
      ordersDataState: ordersData,
      totalOrdersCost,
    })
    setSubmitIsClicked(true)

    setTimeout(() => setSubmitIsClicked(false), 3000)
  }

  const storekeeperEqualsDestination = orderState.some(
    order => order?.storekeeperId === destinations?.find(el => el?._id === order?.destinationId)?.storekeeper?._id,
  )

  const isHaveSomeSupplier = productsForRender.some(item => item.currentSupplier)

  const disabledSubmit =
    orderState.some((order, index) => {
      const isDeadlineTodayOrTomorrow =
        !!order.deadline &&
        (isPast(new Date(order.deadline)) || isToday(new Date(order.deadline)) || isTomorrow(new Date(order.deadline)))

      return (
        (productsForRender[index].currentSupplier &&
          toFixed(calcProductsPriceWithDelivery(productsForRender[index], order), 2) <
            platformSettings?.orderAmountLimit) ||
        !order.storekeeperId ||
        !order.logicsTariffId ||
        Number(order.amount) <= 0 ||
        !Number.isInteger(Number(order.amount)) ||
        (isPendingOrder && !order.deadline) ||
        ((!!isInventory || !!reorderOrdersData?.length) && isDeadlineTodayOrTomorrow) ||
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
              <TableCell className={styles.productCell}>
                <p className={styles.cellText}>{t(TranslationKey.Product)}</p>
              </TableCell>
              <TableCell className={styles.priceCell}>
                <p className={styles.priceCellBtn} title={t(TranslationKey['Unit price of the selected supplier'])}>
                  {t(TranslationKey['Price without delivery']) + ' $'}
                </p>
              </TableCell>

              <TableCell className={styles.deliveryCell}>
                <p className={styles.deliveryCellBtn} title={t(TranslationKey['Delivery costs to the prep center'])}>
                  {t(TranslationKey['Delivery per unit.']) + ' $'}
                </p>
              </TableCell>
              <TableCell className={styles.qntCell}>
                <p
                  className={styles.qntCellBtn}
                  title={t(TranslationKey['Specify the amount of goods you want to order'])}
                >
                  {t(TranslationKey.Quantity)}
                </p>
              </TableCell>
              <TableCell className={styles.totalCell}>
                <p className={styles.totalCellBtn} title={t(TranslationKey['Order amount for a specific product'])}>
                  {t(TranslationKey.Total) + ' $'}
                </p>
              </TableCell>
              <TableCell className={styles.totalCell}>
                <p className={styles.totalCellBtn}>{t(TranslationKey['Price variations'])}</p>
              </TableCell>
              <TableCell className={styles.barCodeCell}>
                <p className={styles.barCodeCellBtn}>{`${t(TranslationKey.BarCode)} / Transparency Codes`}</p>
              </TableCell>
              <TableCell className={styles.tariffCell}>
                <p
                  className={styles.tariffCellBtn}
                  title={t(
                    TranslationKey['Choose a prep center in China and the rate at which the delivery will take place'],
                  )}
                >
                  {`Storekeeper ${t(TranslationKey.and)} ${t(TranslationKey.Tariff)}`}
                </p>
              </TableCell>
              <TableCell className={styles.warehouseCell}>
                <p
                  className={styles.warehouseCellBtn}
                  title={t(TranslationKey["Amazon's final warehouse in the United States"])}
                >
                  {t(TranslationKey.Destination)}
                </p>
              </TableCell>

              <TableCell className={styles.commentCell}>
                <p
                  className={styles.commentCellBtn}
                  title={t(TranslationKey['Comments on the order for the Buyer and the Prep Center'])}
                >
                  {t(TranslationKey['Client comment'])}
                </p>
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
                isPendingOrder={isPendingOrder}
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
            <div className={styles.tooltipPositionStyle}>
              <Tooltip arrow title={t(TranslationKey['Specify a deadline'])}>
                <div>
                  {isPendingOrder && !orderState[0].deadline && (
                    <TooltipAttentionIcon className={styles.attentionTooltip} />
                  )}
                </div>
              </Tooltip>
            </div>
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
          tooltipInfoContent={
            !disabledSubmit &&
            t(TranslationKey['Complete the order (freezes the required amount of the order from the balance)'])
          }
          tooltipAttentionContent={
            disabledSubmit &&
            t(
              TranslationKey[
                'Choose the most efficient rate, split batches into multiple purchases if you need to ship to different warehouses'
              ],
            )
          }
          disabled={disabledSubmit}
          onClick={onClickSubmit}
        >
          {t(TranslationKey['Order a batch of products'])}
        </Button>

        <Button
          styleType={ButtonStyle.CASUAL}
          tooltipInfoContent={t(TranslationKey['Close the checkout window without saving'])}
          onClick={() => (onClickCancel ? onClickCancel() : onTriggerOpenModal('showOrderModal'))}
        >
          {t(TranslationKey.Close)}
        </Button>
      </div>
      <Modal openModal={showSetBarcodeModal} setOpenModal={() => triggerBarcodeModal()}>
        <SetBarcodeModal
          tmpCode={isNotUndefined(tmpOrderIndex) && orderState[tmpOrderIndex].tmpBarCode}
          barCode={isNotUndefined(tmpOrderIndex) && orderState[tmpOrderIndex]?.barCode}
          onClickSaveBarcode={barCode => {
            setOrderStateFiled(tmpOrderIndex)('tmpBarCode')(barCode)
            setTmpOrderIndex(undefined)
          }}
          onCloseModal={triggerBarcodeModal}
        />
      </Modal>
      <Modal openModal={showSetFilesModal} setOpenModal={setShowSetFilesModal}>
        <SetFilesModal
          modalTitle={t(TranslationKey.Transparency)}
          LabelTitle="Transparency Codes"
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
