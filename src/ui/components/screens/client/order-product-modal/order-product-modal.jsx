/* eslint-disable no-unused-vars */
import {Container, Typography, Table, TableBody, TableCell, TableHead, TableContainer, TableRow} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Modal} from '@components/modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {OrderModalBodyRow} from '@components/table-rows/client/inventory/order-product-modal/order-modal-body-row'

import {calcProductsPriceWithDelivery} from '@utils/calculation'
import {checkIsPositiveNum, isNotUndefined} from '@utils/checks'
import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './order-product-modal.style'

export const OrderProductModal = ({
  volumeWeightCoefficient,
  destinations,
  storekeepers,
  onTriggerOpenModal,
  selectedProductsData,
  onDoubleClickBarcode,
  onSubmit,
  onClickCancel,
  reorderOrder,
}) => {
  const {classes: classNames} = useClassNames()

  const [submitIsClicked, setSubmitIsClicked] = useState(false)
  const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)
  const [tmpOrderIndex, setTmpOrderIndex] = useState(undefined)

  const triggerBarcodeModal = () => {
    setShowSetBarcodeModal(!showSetBarcodeModal)
  }

  const [productsForRender, setProductsForRender] = useState(
    reorderOrder
      ? [
          {
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
          },
        ]
      : selectedProductsData.map(product => ({
          ...product,
          amount: 1,
        })),
  )

  const [orderState, setOrderState] = useState(
    reorderOrder
      ? [
          {
            amount: reorderOrder.amount,
            clientComment: '',
            barCode: reorderOrder.product.barCode || '',
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
          },
        ]
      : selectedProductsData.map(product => ({
          amount: 1,
          clientComment: '',
          barCode: product.barCode || '',
          productId: product._id,
          images: [],
          tmpBarCode: [],

          destinationId: null,

          storekeeperId: '',
          logicsTariffId: '',
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

    if (['amount'].includes(fieldsName)) {
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
    onSubmit(
      orderState.map(el => ({...el, destinationId: el.destinationId ? el.destinationId : null})),
      totalOrdersCost,
    )
    setSubmitIsClicked(true)

    setTimeout(() => setSubmitIsClicked(false), 3000)
  }

  const disabledSubmit =
    orderState.some(
      order =>
        order.storekeeperId === '' ||
        order.logicsTariffId === '' ||
        Number(order.amount) <= 0 ||
        !Number.isInteger(Number(order.amount)),
    ) ||
    productsForRender.some(item => !item.currentSupplier) ||
    !orderState.length ||
    submitIsClicked

  return (
    <Container disableGutters maxWidth={'xl'}>
      <Typography className={classNames.modalTitle}>{t(TranslationKey['Order products'])}</Typography>
      <TableContainer className={classNames.tableWrapper}>
        <Table className={classNames.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classNames.imgCell}>{t(TranslationKey.Image)}</TableCell>
              <TableCell className={classNames.productCell}>{t(TranslationKey.Product)}</TableCell>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {productsForRender.map((product, index) => (
              <OrderModalBodyRow
                key={product._id}
                volumeWeightCoefficient={volumeWeightCoefficient}
                destinations={destinations}
                storekeepers={storekeepers}
                item={product}
                withRemove={selectedProductsData?.length > 1}
                orderState={orderState[index]}
                setOrderStateFiled={setOrderStateFiled(index)}
                itemIndex={index}
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
        <Button
          disableElevation
          tooltipInfoContent={t(
            TranslationKey['Complete the order (freezes the required amount of the order from the balance)'],
          )}
          variant="contained"
          className={(classNames.modalButton, classNames.buyNowBtn)}
          disabled={disabledSubmit}
          onClick={onClickSubmit}
        >
          {t(TranslationKey['Order a batch of products'])}
        </Button>

        <Button
          disableElevation
          variant="contained"
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
    </Container>
  )
}
