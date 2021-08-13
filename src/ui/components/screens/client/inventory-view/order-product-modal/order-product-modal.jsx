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

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Modal} from '@components/modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {OrderModalBodyRow} from '@components/table-rows/client/inventory/order-product-modal/order-modal-body-row'

import {isNotUndefined} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './order-product-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrderProductModal

export const OrderProductModal = ({onTriggerOpenModal, selectedProductsData, onDoubleClickBarcode, onSubmit}) => {
  const classNames = useClassNames()
  const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)
  const [tmpOrderIndex, setTmpOrderIndex] = useState(undefined)

  const triggerBarcodeModal = () => {
    setShowSetBarcodeModal(!showSetBarcodeModal)
  }

  const [orderState, setOrderState] = useState(
    selectedProductsData.map(product => ({
      status: 1,
      amount: 0,
      deliveryMethod: '',
      warehouse: '',
      clientComment: '',
      barCode: product.barCode || '',
      product: product._id,
      images: product.images,
    })),
  )

  const setOrderStateFiled = index => fieldsName => value => {
    const newStateOrderState = [...orderState]
    newStateOrderState[index][fieldsName] = value
    setOrderState(newStateOrderState)
  }

  return (
    <Container disableGutters>
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
              <TableCell className={classNames.tableCell}>{textConsts.deliveryMethod}</TableCell>
              <TableCell className={classNames.tableCell}>{textConsts.warehouse}</TableCell>
              <TableCell className={classNames.tableCell}>{textConsts.comment}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedProductsData.map((product, index) => (
              <OrderModalBodyRow
                key={index}
                item={product}
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
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classNames.buttonsWrapper}>
        <Button
          disableElevation
          variant="contained"
          className={(classNames.modalButton, classNames.buyNowBtn)}
          disabled={orderState.some(order => order.deliveryMethod === '' || order.warehouse === '')}
          onClick={() => {
            onTriggerOpenModal('showOrderModal')
            onSubmit(orderState)
          }}
        >
          {textConsts.buyNowBtn}
        </Button>

        <Button
          disableElevation
          variant="contained"
          className={(classNames.modalButton, classNames.buyNowBtn)}
          onClick={() => onTriggerOpenModal('showOrderModal')}
        >
          {textConsts.addBasketBtn}
        </Button>

        <Button
          disableElevation
          variant="contained"
          className={(classNames.modalButton, classNames.cancelBtn)}
          onClick={() => onTriggerOpenModal('showOrderModal')}
        >
          {textConsts.cancelBtn}
        </Button>
      </div>
      <Modal openModal={showSetBarcodeModal} setOpenModal={() => onTriggerOpenModal('showSetBarcodeModal')}>
        <SetBarcodeModal
          order={isNotUndefined(tmpOrderIndex) && orderState[tmpOrderIndex]}
          onClickSaveBarcode={barCode => {
            setOrderStateFiled(tmpOrderIndex)('barCode')(barCode)
            triggerBarcodeModal()
            setTmpOrderIndex(undefined)
          }}
          onCloseModal={triggerBarcodeModal}
        />
      </Modal>
    </Container>
  )
}
