import {React, useState} from 'react'

import {Box, Divider, Paper, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './edit-order-modal.style'
import {ProductTable} from './product-table'
import {SelectFields} from './select-fields'

const textConsts = getLocalizedTexts(texts, 'ru').ordersViewsModalEditOrder

export const EditOrderModal = ({
  order,
  onTriggerModal,
  onTriggerBarcodeModal,
  modalHeadCells,
  warehouses,
  deliveryTypeByCode,
  orderStatusByCode,
  onClickSaveOrder,
}) => {
  const classNames = useClassNames()
  const [orderFields, setOrderFields] = useState({
    warehouse: (order && order.warehouse) || undefined,
    deliveryMethod: (order && order.deliveryMethod) || undefined,
    status: (order && order.status) || undefined,
    clientComment: (order && order.clientComment) || '',
    buyerscomment: (order && order.product.buyerscomment) || '',
    trackId: '',
    material: (order && order.product && order.product.material) || '',
    amount: 0,
    batchPrice: 0,
  })

  const setOrderField = filedName => e => {
    const newOrderFieldsState = {...orderFields}
    newOrderFieldsState[filedName] = e.target.value
    setOrderFields(newOrderFieldsState)
  }

  if (!order) {
    return <div />
  }

  return (
    <Box className={classNames.modalWrapper}>
      <Typography className={classNames.modalTitle}>{textConsts.title}</Typography>

      <Paper elevation={0} className={classNames.paper}>
        <Typography className={classNames.modalText}>{`${textConsts.orderNum} ${order._id}`}</Typography>

        <SelectFields
          warehouses={warehouses}
          deliveryTypeByCode={deliveryTypeByCode}
          orderStatusByCode={orderStatusByCode}
          setOrderField={setOrderField}
          orderFields={orderFields}
        />

        <Divider className={classNames.divider} />
        <Typography className={classNames.modalText}>{`${textConsts.productNum} ${order.product._id}`}</Typography>

        <ProductTable
          modalHeadCells={modalHeadCells}
          order={order}
          orderFields={orderFields}
          setOrderField={setOrderField}
          onTriggerBarcodeModal={onTriggerBarcodeModal}
        />
      </Paper>

      <Box mt={2} className={classNames.buttonsBox}>
        <Button className={classNames.saveBtn} onClick={() => onClickSaveOrder(order, orderFields)}>
          {textConsts.saveBtn}
        </Button>
        <ErrorButton onClick={onTriggerModal}>{textConsts.cancelBtn}</ErrorButton>
      </Box>
    </Box>
  )
}
