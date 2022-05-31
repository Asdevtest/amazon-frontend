import React, {useEffect, useState} from 'react'

import {Box, Divider, Paper, TableCell, TableRow, Typography} from '@material-ui/core'

import {loadingStatuses} from '@constants/loading-statuses'
import {OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {CLIENT_WAREHOUSE_HEAD_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'
import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

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
import {t} from '@utils/translations'

import {BoxesToCreateTable} from './boxes-to-create-table'
import {useClassNames} from './edit-order-modal.style'
import {EditOrderSuppliersTable} from './edit-order-suppliers-table'
import {ProductTable} from './product-table'
import {SelectFields} from './select-fields'

const textConsts = getLocalizedTexts(texts, 'ru').ordersViewsModalEditOrder

const orderStatusesThatTriggersEditBoxBlock = [OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]]

const confirmModalModes = {
  STATUS: 'STATUS',
  SUBMIT: 'SUBMIT',
}

const disabledOrderStatuses = [
  OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER],
  OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT],
]

export const EditOrderModal = ({
  requestStatus,
  order,
  boxes,
  onTriggerOpenModal,
  modalHeadCells,
  onSubmitSaveOrder,
  showProgress,
  progressValue,
  volumeWeightCoefficient,
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

  const [headCells, setHeadCells] = useState(CLIENT_WAREHOUSE_HEAD_CELLS)

  const renderHeadRow = () => (
    <TableRow>
      {headCells.map((item, index) => (
        <TableCell key={index}>{item.label}</TableCell>
      ))}
    </TableRow>
  )

  useEffect(() => {
    setHeadCells(CLIENT_WAREHOUSE_HEAD_CELLS)
  }, [SettingsModel.languageTag])

  const onRemoveForCreationBox = boxIndex => {
    const updatedNewBoxes = boxesForCreation.filter((box, i) => i !== boxIndex)
    setBoxesForCreation(updatedNewBoxes)
  }

  const onClickBarcodeCheckbox = boxIndex => e => {
    const newStateFormFields = [...boxesForCreation]

    newStateFormFields[boxIndex].items[0].isBarCodeAlreadyAttachedByTheSupplier = e.target.checked

    setBoxesForCreation(newStateFormFields)
  }

  const onClickUpdateSupplierStandart = boxIndex => e => {
    const newStateFormFields = [...boxesForCreation].map(el => ({...el, tmpUseToUpdateSupplierBoxDimensions: false}))

    newStateFormFields[boxIndex].tmpUseToUpdateSupplierBoxDimensions = e.target.checked

    setBoxesForCreation(newStateFormFields)
  }

  const [orderFields, setOrderFields] = useState({
    ...order,
    status: order?.status || undefined,
    clientComment: order?.clientComment || '',
    buyerComment: order?.buyerComment || '',
    deliveryCostToTheWarehouse: order?.deliveryCostToTheWarehouse || 0,
    trackId: '',
    material: order?.product?.material || '',
    amount: order?.amount || 0,
    trackingNumberChina: order?.trackingNumberChina,
    batchPrice: 0,
    totalPriceChanged: order?.totalPriceChanged || order?.totalPrice,
    yuanToDollarRate: order?.yuanToDollarRate || 6.3,
  })

  const setOrderField = filedName => e => {
    const newOrderFieldsState = {...orderFields}

    if (['totalPriceChanged', 'deliveryCostToTheWarehouse', 'yuanToDollarRate'].includes(filedName)) {
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
        return onSubmitSaveOrder(order, orderFields, boxesForCreation, photosToLoad, hsCode)
    }
  }

  const [photosToLoad, setPhotosToLoad] = useState([])

  const [hsCode, setHsCode] = useState(order.product.hsCode)

  const disableSubmit = requestStatus === loadingStatuses.isLoading || disabledOrderStatuses.includes(order.status)

  return (
    <Box className={classNames.modalWrapper}>
      <Typography className={classNames.modalTitle}>{t(TranslationKey['Editing an order'])}</Typography>

      <Paper elevation={0} className={classNames.paper}>
        <Typography className={classNames.modalText}>{`${t(TranslationKey.Order)} # ${order.id}`}</Typography>

        <SelectFields
          hsCode={hsCode}
          setHsCode={setHsCode}
          photosToLoad={photosToLoad}
          order={order}
          setOrderField={setOrderField}
          orderFields={orderFields}
          showProgress={showProgress}
          progressValue={progressValue}
          setPhotosToLoad={setPhotosToLoad}
        />

        <Divider className={classNames.divider} />

        <ProductTable
          modalHeadCells={modalHeadCells}
          order={order}
          orderFields={orderFields}
          setOrderField={setOrderField}
        />

        <Divider className={classNames.divider} />

        <Typography className={classNames.modalText}>{t(TranslationKey.Suppliers)}</Typography>
        <EditOrderSuppliersTable
          selectedSupplier={orderFields.orderSupplier}
          suppliers={orderFields.product.suppliers}
        />
      </Paper>

      <Box mt={2} className={classNames.buttonsBox}>
        <Button
          disabled={disableSubmit}
          className={classNames.saveBtn}
          onClick={() => {
            if (boxesForCreation.length > 0) {
              setConfirmModalMode(confirmModalModes.SUBMIT)
              setShowConfirmModal(!showConfirmModal)
            } else {
              onSubmitSaveOrder(order, orderFields, boxesForCreation, photosToLoad, hsCode)
            }
          }}
        >
          {t(TranslationKey.Save)}
        </Button>
        <ErrorButton onClick={() => onTriggerOpenModal('showOrderModal')}>{t(TranslationKey.Cancel)}</ErrorButton>
      </Box>

      {orderStatusesThatTriggersEditBoxBlock.includes(parseInt(orderFields.status)) && (
        <Button
          disableElevation
          color="primary"
          variant="contained"
          onClick={() => setCollapseCreateOrEditBoxBlock(!collapseCreateOrEditBoxBlock)}
        >
          {t(TranslationKey['Add a box'])}
        </Button>
      )}

      {boxesForCreation.length > 0 && (
        <BoxesToCreateTable
          volumeWeightCoefficient={volumeWeightCoefficient}
          barcodeIsExist={order.product.barCode}
          newBoxes={boxesForCreation}
          onRemoveBox={onRemoveForCreationBox}
          onClickBarcodeCheckbox={onClickBarcodeCheckbox}
          onClickUpdateSupplierStandart={onClickUpdateSupplierStandart}
        />
      )}

      <div className={classNames.tableWrapper}>
        <Typography className={classNames.modalTitle}>{t(TranslationKey['Boxes on this order:'])}</Typography>
        {boxes.length > 0 ? (
          <Table
            rowsOnly
            data={boxes}
            BodyRow={WarehouseBodyRow}
            renderHeadRow={renderHeadRow()}
            mainProductId={order.product._id}
            volumeWeightCoefficient={volumeWeightCoefficient}
          />
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
          currentSupplier={order.product.currentSupplier}
          volumeWeightCoefficient={volumeWeightCoefficient}
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
