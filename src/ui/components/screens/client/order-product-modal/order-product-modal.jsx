import React, {useState} from 'react'

import {
  Container,
  Divider,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
} from '@material-ui/core'

import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Modal} from '@components/modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {OrderModalBodyRow} from '@components/table-rows/client/inventory/order-product-modal/order-modal-body-row'

import {calcProductsPriceWithDelivery} from '@utils/calculation'
import {checkIsPositiveNum, isNotUndefined} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign} from '@utils/text'

import {useClassNames} from './order-product-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrderProductModal

export const OrderProductModal = ({
  destinations,
  storekeepers,
  requestStatus,
  onTriggerOpenModal,
  selectedProductsData,
  onDoubleClickBarcode,
  onSubmit,
  onClickCancel,
}) => {
  const classNames = useClassNames()
  const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)
  const [tmpOrderIndex, setTmpOrderIndex] = useState(undefined)

  const triggerBarcodeModal = () => {
    setShowSetBarcodeModal(!showSetBarcodeModal)
  }

  const [productsForRender, setProductsForRender] = useState(
    selectedProductsData.map(product => ({
      ...product,
      amount: 1,
    })),
  )

  const [orderState, setOrderState] = useState(
    selectedProductsData.map(product => ({
      amount: 1,
      clientComment: '',
      barCode: product.barCode || '',
      productId: product._id,
      images: [],
      tmpBarCode: [],
      destinationId: '',

      storekeeperId: '',
      logicsTariffId: '',
    })),
  )

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

  const onClickSubmit = () => {
    onTriggerOpenModal('showOrderModal')
    onSubmit(orderState)
  }

  return (
    <Container disableGutters maxWidth={'xl'}>
      <Typography className={classNames.modalTitle}>{textConsts.mainTitle}</Typography>
      <Divider className={classNames.divider} />
      <TableContainer className={classNames.tableWrapper}>
        <Table className={classNames.table}>
          <TableHead>
            <TableRow>
              <TableCell className={(classNames.tableCell, classNames.imgCell)}>{textConsts.imgCell}</TableCell>
              <TableCell className={classNames.tableCell}>{textConsts.product}</TableCell>
              <TableCell className={classNames.tableCell}>{textConsts.price}</TableCell>
              <TableCell className={classNames.tableCell}>{textConsts.avgDeliveryPrice}</TableCell>
              <TableCell className={classNames.tableCell}>{textConsts.amount}</TableCell>
              <TableCell className={classNames.tableCell}>{textConsts.total}</TableCell>
              <TableCell className={classNames.tableCell}>{textConsts.barCode}</TableCell>
              <TableCell className={classNames.tableCell}>{textConsts.warehouse}</TableCell>

              <TableCell className={classNames.tableCell}>{'Storekeeper / Tariff'}</TableCell>

              <TableCell className={classNames.tableCell}>{textConsts.comment}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsForRender.map((product, index) => (
              <OrderModalBodyRow
                key={product._id}
                destinations={destinations}
                storekeepers={storekeepers}
                item={product}
                withRemove={selectedProductsData.length > 1}
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
        <Typography className={classNames.sumText}>{`Итого сумма заказов: ${toFixedWithDollarSign(
          productsForRender.reduce((ac, cur) => (ac += calcProductsPriceWithDelivery(cur, cur)), 0),
          2,
        )}`}</Typography>
      </div>

      <div className={classNames.buttonsWrapper}>
        <Button
          disableElevation
          variant="contained"
          className={(classNames.modalButton, classNames.buyNowBtn)}
          disabled={
            orderState.some(
              order =>
                order.storekeeperId === '' ||
                order.logicsTariffId === '' ||
                order.destinationId === '' ||
                Number(order.amount) <= 0 ||
                !Number.isInteger(Number(order.amount)),
            ) ||
            requestStatus === loadingStatuses.isLoading ||
            productsForRender.some(item => !item.currentSupplier) ||
            !orderState.length
          }
          onClick={onClickSubmit}
        >
          {textConsts.buyNowBtn}
        </Button>

        <Button
          disableElevation
          color="primary"
          variant="contained"
          className={(classNames.modalButton, classNames.cancelBtn)}
          onClick={() => (onClickCancel ? onClickCancel() : onTriggerOpenModal('showOrderModal'))}
        >
          {textConsts.cancelBtn}
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
