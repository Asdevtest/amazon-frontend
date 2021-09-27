/* eslint-disable no-unused-vars */
import React, {useState} from 'react'

import {Box, Divider, Paper, TableCell, TableRow, Typography} from '@material-ui/core'

import {OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {CLIENT_WAREHOUSE_HEAD_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button'
import {CreateBoxForm} from '@components/forms/create-box-form'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Table} from '@components/table'
import {WarehouseBodyRow} from '@components/table-rows/warehouse'

import {checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {BoxesToCreateTable} from './boxes-to-create-table'
import {useClassNames} from './edit-order-modal.style'
import {EditOrderSuppliersTable} from './edit-order-suppliers-table'
import {ProductTable} from './product-table'
import {SelectFields} from './select-fields'

const textConsts = getLocalizedTexts(texts, 'ru').ordersViewsModalEditOrder

const orderStatusesThatTriggersEditBoxBlock = [OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]]

const renderHeadRow = (
  <TableRow>
    {CLIENT_WAREHOUSE_HEAD_CELLS.map((item, index) => (
      <TableCell key={index}>{item.label}</TableCell>
    ))}
  </TableRow>
)

const confirmModalModes = {
  STATUS: 'STATUS',
  SUBMIT: 'SUBMIT',
}

export const EditOrderModal = ({
  order,
  boxes,
  onTriggerOpenModal,
  modalHeadCells,
  warehouses,
  deliveryTypeByCode,
  onSubmitSaveOrder,
}) => {
  const classNames = useClassNames()

  const [collapseCreateOrEditBoxBlock, setCollapseCreateOrEditBoxBlock] = useState(false)

  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const [confirmModalMode, setConfirmModalMode] = useState(confirmModalModes.STATUS)

  const [tmpNewOrderFieldsState, setTmpNewOrderFieldsState] = useState({})

  const [showWarningInfoModal, setShowWarningInfoModal] = useState(
    order.status === OrderStatusByKey[OrderStatus.AT_PROCESS],
  )

  const [boxesForCreation, setBoxesForCreation] = useState([])

  const onRemoveForCreationBox = boxIndex => {
    const updatedNewBoxes = boxesForCreation.filter((box, i) => i !== boxIndex)
    setBoxesForCreation(updatedNewBoxes)
  }

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
    totalPriceChanged: order?.totalPriceChanged || order?.totalPrice,
  })

  const setOrderField = filedName => e => {
    const newOrderFieldsState = {...orderFields}

    if (['totalPriceChanged', 'deliveryCostToTheWarehouse'].includes(filedName)) {
      if (!checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
        return
      }

      newOrderFieldsState[filedName] = e.target.value
    } else if (filedName === 'status') {
      newOrderFieldsState[filedName] = e.target.value
      setTmpNewOrderFieldsState(newOrderFieldsState)

      setConfirmModalMode(confirmModalModes.STATUS)
      setShowConfirmModal(!showConfirmModal)
      return
    } else {
      newOrderFieldsState[filedName] = e.target.value
    }

    setOrderFields(newOrderFieldsState)
  }

  const resetOrderField = filedName => {
    const newOrderFieldsState = {...orderFields}
    newOrderFieldsState[filedName] = 0

    setOrderFields(newOrderFieldsState)
  }

  const confirmModalMessageByMode = () => {
    switch (confirmModalMode) {
      case 'STATUS':
        return textConsts.confirmStatusMessage

      case 'SUBMIT':
        return textConsts.confirmSubmitMessage
    }
  }

  const confirmModalActionByMode = () => {
    switch (confirmModalMode) {
      case 'STATUS':
        return setOrderFields(tmpNewOrderFieldsState)

      case 'SUBMIT':
        return onSubmitSaveOrder(order, orderFields, boxesForCreation)
    }
  }

  return (
    <Box className={classNames.modalWrapper}>
      <Typography className={classNames.modalTitle}>{textConsts.title}</Typography>

      <Paper elevation={0} className={classNames.paper}>
        <Typography className={classNames.modalText}>{`${textConsts.orderNum} ${order._id}`}</Typography>

        <SelectFields
          warehouses={warehouses}
          deliveryTypeByCode={deliveryTypeByCode}
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

      <Box mt={2} className={classNames.buttonsBox}>
        <Button
          className={classNames.saveBtn}
          onClick={() => {
            if (boxesForCreation.length > 0) {
              setConfirmModalMode(confirmModalModes.SUBMIT)
              setShowConfirmModal(!showConfirmModal)
            } else {
              onSubmitSaveOrder(order, orderFields, boxesForCreation)
            }
          }}
        >
          {textConsts.saveBtn}
        </Button>
        <ErrorButton onClick={() => onTriggerOpenModal('showOrderModal')}>{textConsts.cancelBtn}</ErrorButton>
      </Box>

      {orderStatusesThatTriggersEditBoxBlock.includes(parseInt(orderFields.status)) && (
        <Button
          disableElevation
          color="primary"
          variant="contained"
          onClick={() => setCollapseCreateOrEditBoxBlock(!collapseCreateOrEditBoxBlock)}
        >
          {textConsts.addBoxBtn}
        </Button>
      )}

      {boxesForCreation.length > 0 && (
        <BoxesToCreateTable newBoxes={boxesForCreation} onRemoveBox={onRemoveForCreationBox} />
      )}

      <div className={classNames.tableWrapper}>
        <Typography className={classNames.modalTitle}>{textConsts.boxesTitle}</Typography>
        {boxes.length > 0 ? (
          <Table rowsOnly data={boxes} BodyRow={WarehouseBodyRow} renderHeadRow={renderHeadRow} />
        ) : (
          <Typography className={classNames.noBoxesText}>{textConsts.noBoxesYat}</Typography>
        )}
      </div>

      <Modal
        openModal={collapseCreateOrEditBoxBlock}
        setOpenModal={() => setCollapseCreateOrEditBoxBlock(!collapseCreateOrEditBoxBlock)}
        dialogContextClassName={classNames.dialogContextClassName}
      >
        <Typography variant="h5">{textConsts.modalEditBoxTitle}</Typography>
        <CreateBoxForm
          formItem={orderFields}
          boxesForCreation={boxesForCreation}
          setBoxesForCreation={setBoxesForCreation}
          onTriggerOpenModal={() => setCollapseCreateOrEditBoxBlock(!collapseCreateOrEditBoxBlock)}
        />
      </Modal>

      <ConfirmationModal
        openModal={showConfirmModal}
        setOpenModal={() => setShowConfirmModal(!showConfirmModal)}
        title={textConsts.confirmTitle}
        message={confirmModalMessageByMode(confirmModalMode)}
        successBtnText={textConsts.yesBtn}
        cancelBtnText={textConsts.noBtn}
        onClickSuccessBtn={() => {
          confirmModalActionByMode(confirmModalMode)
          setShowConfirmModal(!showConfirmModal)
        }}
        onClickCancelBtn={() => setShowConfirmModal(!showConfirmModal)}
      />

      <WarningInfoModal
        openModal={showWarningInfoModal}
        setOpenModal={() => setShowWarningInfoModal(!showWarningInfoModal)}
        title={textConsts.firstWarning}
        btnText={textConsts.okBtn}
        onClickBtn={() => {
          setShowWarningInfoModal(!showWarningInfoModal)
        }}
      />
    </Box>
  )
}
