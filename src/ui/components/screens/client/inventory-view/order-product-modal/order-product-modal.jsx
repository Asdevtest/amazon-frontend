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
import {OrderModalBodyRow} from '@components/table-rows/client/inventory/order-product-modal/order-modal-body-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './order-product-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrderProductModal

export const OrderProductModal = ({
  onTriggerOpenModal,
  selectedProductsData,
  onClickBarcode,
  onDoubleClickBarcode,
  onDeleteBarcode,
  onSubmit,
}) => {
  const classNames = useClassNames()

  const [orderState, setOrderState] = useState(
    selectedProductsData.map(product => ({
      status: 1,
      amount: 0,
      deliveryMethod: 0,
      warehouse: 0,
      clientComment: '',
      barCode: '',
      product: product._id,
      images: product.images,
    })),
  )

  return (
    <Container disableGutters>
      <Typography className={classNames.modalTitle}>{textConsts.mainTitle}</Typography>
      <Divider className={classNames.divider} />
      <TableContainer className={classNames.tableWrapper}>
        <Table className={classNames.table}>
          <TableHead>
            <TableRow>
              <TableCell className={(classNames.tableCell, classNames.imgCell)}>{textConsts.imgCell}</TableCell>
              <TableCell className={classNames.tableCell}>{textConsts.id}</TableCell>
              <TableCell className={classNames.tableCell}>{textConsts.price}</TableCell>
              <TableCell className={classNames.tableCell}>{textConsts.avgPrice}</TableCell>
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
                orderState={orderState}
                setOrderState={setOrderState}
                itemIndex={index}
                onClickBarcode={onClickBarcode}
                onDoubleClickBarcode={onDoubleClickBarcode}
                onDeleteBarcode={onDeleteBarcode}
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
    </Container>
  )
}
