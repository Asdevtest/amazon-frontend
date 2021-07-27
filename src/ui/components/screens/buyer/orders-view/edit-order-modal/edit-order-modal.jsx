import React, {useState} from 'react'

import {Box, Divider, Paper, Typography} from '@material-ui/core'

import {OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button'
import {CreateOrEditBoxForm} from '@components/forms/create-or-edit-box-form'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './edit-order-modal.style'
import {ProductTable} from './product-table'
import {SelectFields} from './select-fields'

const textConsts = getLocalizedTexts(texts, 'ru').ordersViewsModalEditOrder

const orderStatusesThatTriggersEditBoxBlock = [
  OrderStatusByKey[OrderStatus.PAID],
  OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED],
]

export const EditOrderModal = ({
  order,
  onTriggerModal,
  modalHeadCells,
  warehouses,
  deliveryTypeByCode,
  orderStatusByCode,
  onSubmitSaveOrder,
  onSubmitCreateBoxes,
}) => {
  const classNames = useClassNames()

  const [orderFields, setOrderFields] = useState({
    ...order,
    warehouse: order?.warehouse || undefined,
    deliveryMethod: order?.deliveryMethod || undefined,
    status: order?.status || undefined,
    clientComment: order?.clientComment || '',
    buyerscomment: order?.product.buyerscomment || '',
    deliveryCostToTheWarehouse: order?.deliveryCostToTheWarehouse || 0,
    amountPaymentPerConsignmentAtDollars: order?.deliveryCostToTheWarehouse || 0,
    isBarCodeAlreadyAttachedByTheSupplier: order?.isBarCodeAlreadyAttachedByTheSupplier || false,
    trackId: '',
    material: order?.product?.material || '',
    amount: order?.amount || 0,
    trackingNumberChina: order?.trackingNumberChina,
    barCode: order?.barCode,
    batchPrice: 0,
  })

  const [showCreateOrEditBoxBlock, setShowCreateOrEditBoxBlock] = useState(
    orderStatusesThatTriggersEditBoxBlock.includes(orderFields.status),
  )

  const setOrderField = filedName => e => {
    const newOrderFieldsState = {...orderFields}
    newOrderFieldsState[filedName] =
      filedName === 'deliveryCostToTheWarehouse' ? parseInt(e.target.value.match(/\d+/)) : e.target.value
    if (filedName === 'status') {
      setShowCreateOrEditBoxBlock(() => !!orderStatusesThatTriggersEditBoxBlock.includes(parseInt(e.target.value)))
    }
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
        />
      </Paper>
      {!showCreateOrEditBoxBlock ? (
        <Box mt={2} className={classNames.buttonsBox}>
          <Button
            className={classNames.saveBtn}
            onClick={() => {
              onSubmitSaveOrder(order, orderFields)
            }}
          >
            {textConsts.saveBtn}
          </Button>
          <ErrorButton onClick={onTriggerModal}>{textConsts.cancelBtn}</ErrorButton>
        </Box>
      ) : undefined}

      {showCreateOrEditBoxBlock ? (
        <React.Fragment>
          <Typography variant="h5">{textConsts.modalEditBoxTitle}</Typography>
          <CreateOrEditBoxForm
            selectFieldsArePreDefined
            canBeMasterBox
            formItem={orderFields}
            onSubmit={(boxId, formFieldsArr) => {
              onSubmitCreateBoxes(boxId, formFieldsArr)
              onSubmitSaveOrder(order, orderFields)
            }}
          />
        </React.Fragment>
      ) : undefined}
    </Box>
  )
}
