import React, {useState} from 'react'

import {Box, Divider, Paper, TableCell, TableRow, Typography} from '@material-ui/core'

import {OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {CLIENT_WAREHOUSE_HEAD_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button'
import {CreateBoxForm} from '@components/forms/create-box-form'
import {Table} from '@components/table'
import {WarehouseBodyRow} from '@components/table-rows/warehouse'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './edit-order-modal.style'
import {EditOrderSuppliersTable} from './edit-order-suppliers-table'
import {ProductTable} from './product-table'
import {SelectFields} from './select-fields'

const textConsts = getLocalizedTexts(texts, 'ru').ordersViewsModalEditOrder

const orderStatusesThatTriggersEditBoxBlock = [
  OrderStatusByKey[OrderStatus.PAID],
  OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED],
]

const renderHeadRow = (
  <TableRow>
    {CLIENT_WAREHOUSE_HEAD_CELLS.map((item, index) => (
      <TableCell key={index}>{item.label}</TableCell>
    ))}
  </TableRow>
)

export const EditOrderModal = ({
  order,
  boxes,
  onTriggerOpenModal,
  modalHeadCells,
  warehouses,
  deliveryTypeByCode,
  orderStatusByCode,
  onSubmitSaveOrder,
  onSubmitCreateBoxes,
}) => {
  const classNames = useClassNames()

  const [collapseCreateOrEditBoxBlock, setCollapseCreateOrEditBoxBlock] = useState(false)

  const [orderFields, setOrderFields] = useState({
    ...order,
    warehouse: order?.warehouse || undefined,
    deliveryMethod: order?.deliveryMethod || undefined,
    status: order?.status || undefined,
    clientComment: order?.clientComment || '',
    buyerComment: order?.buyerComment || '',
    deliveryCostToTheWarehouse: order?.deliveryCostToTheWarehouse || 0,
    amountPaymentPerConsignmentAtDollars: order?.amountPaymentPerConsignmentAtDollars || 0,
    isBarCodeAlreadyAttachedByTheSupplier: order?.isBarCodeAlreadyAttachedByTheSupplier || false,
    trackId: '',
    material: order?.product?.material || '',
    amount: order?.amount || 0,
    trackingNumberChina: order?.trackingNumberChina,
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

  const resetOrderField = filedName => {
    const newOrderFieldsState = {...orderFields}
    newOrderFieldsState[filedName] = 0

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
          resetOrderField={resetOrderField}
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

        <Divider className={classNames.divider} />

        <Typography className={classNames.modalText}>{textConsts.suppliers}</Typography>
        <EditOrderSuppliersTable
          selectedSupplier={orderFields.product.currentSupplier}
          suppliers={orderFields.product.supplier}
        />
      </Paper>
      {!collapseCreateOrEditBoxBlock && (
        <Box mt={2} className={classNames.buttonsBox}>
          <Button
            className={classNames.saveBtn}
            onClick={() => {
              onSubmitSaveOrder(order, orderFields)
            }}
          >
            {textConsts.saveBtn}
          </Button>
          <ErrorButton onClick={() => onTriggerOpenModal('showOrderModal')}>{textConsts.cancelBtn}</ErrorButton>
        </Box>
      )}

      <div className={classNames.tableWrapper}>
        <Typography className={classNames.modalTitle}>{textConsts.boxesTitle}</Typography>
        {boxes.length > 0 ? (
          <Table rowsOnly data={boxes} BodyRow={WarehouseBodyRow} renderHeadRow={renderHeadRow} />
        ) : (
          <Typography className={classNames.noBoxesText}>{textConsts.noBoxesYat}</Typography>
        )}
      </div>

      {showCreateOrEditBoxBlock && (
        <Button
          disableElevation
          color="primary"
          variant="contained"
          onClick={() => setCollapseCreateOrEditBoxBlock(!collapseCreateOrEditBoxBlock)}
        >
          {collapseCreateOrEditBoxBlock ? 'Не добавлять коробку' : 'Добавить коробку'}
        </Button>
      )}

      {collapseCreateOrEditBoxBlock && (
        <React.Fragment>
          <Typography variant="h5">{textConsts.modalEditBoxTitle}</Typography>
          <CreateBoxForm
            formItem={orderFields}
            onTriggerOpenModal={onTriggerOpenModal}
            onSubmit={(boxId, formFieldsArr) => {
              formFieldsArr.length > 0 && onSubmitCreateBoxes(boxId, formFieldsArr)
              onSubmitSaveOrder(order, orderFields)
            }}
          />
        </React.Fragment>
      )}
    </Box>
  )
}
