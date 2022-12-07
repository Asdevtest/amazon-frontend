import {cx} from '@emotion/css'
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import {Box, InputAdornment, Select, MenuItem, Paper, TableCell, TableRow, Typography, Avatar} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {
  getOrderStatusOptionByCode,
  OrderStatus,
  OrderStatusByCode,
  OrderStatusByKey,
  OrderStatusTranslate,
} from '@constants/order-status'
import {CLIENT_WAREHOUSE_HEAD_CELLS} from '@constants/table-head-cells'
import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {CreateBoxForm} from '@components/forms/create-box-form'
import {Input} from '@components/input'
import {Modal} from '@components/modal'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Table} from '@components/table'
import {WarehouseBodyRow} from '@components/table-rows/warehouse'
import {Text} from '@components/text'

import {checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {toFixed} from '@utils/text'
import {t} from '@utils/translations'

import {BoxesToCreateTable} from './boxes-to-create-table'
import {useClassNames} from './edit-order-modal.style'
import {EditOrderSuppliersTable} from './edit-order-suppliers-table'
import {ProductTable} from './product-table'
import {SelectFields} from './select-fields'

const orderStatusesThatTriggersEditBoxBlock = [OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]]

const confirmModalModes = {
  STATUS: 'STATUS',
  SUBMIT: 'SUBMIT',
}

export const EditOrderModal = observer(
  ({
    requestStatus,
    order,
    boxes,
    onTriggerOpenModal,
    modalHeadCells,
    onSubmitSaveOrder,
    showProgress,
    progressValue,
    volumeWeightCoefficient,
    onSaveOrderItem,
  }) => {
    const {classes: classNames} = useClassNames()

    const [collapseCreateOrEditBoxBlock, setCollapseCreateOrEditBoxBlock] = useState(false)

    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const [confirmModalMode, setConfirmModalMode] = useState(confirmModalModes.STATUS)

    const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)

    const [tmpNewOrderFieldsState, setTmpNewOrderFieldsState] = useState({})

    const [showWarningInfoModal, setShowWarningInfoModal] = useState(
      order.status === OrderStatusByKey[OrderStatus.AT_PROCESS],
    )

    const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})
    const [showPhotosModal, setShowPhotosModal] = useState(false)
    const [trackNumber, setTrackNumber] = useState({text: '', files: []})

    const [boxesForCreation, setBoxesForCreation] = useState([])
    const [isEdit, setIsEdit] = useState(false)

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

    const addBoxHandler = () => {
      setCollapseCreateOrEditBoxBlock(!collapseCreateOrEditBoxBlock)
      setIsEdit(false)
    }

    const onEditForCreationBox = () => {
      setCollapseCreateOrEditBoxBlock(!collapseCreateOrEditBoxBlock)

      setIsEdit(true)
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
      totalPriceChanged: toFixed(order?.totalPriceChanged, 2) || toFixed(order?.totalPrice, 2),
      yuanToDollarRate: order?.yuanToDollarRate || 6.3,
      item: order?.item || 0,
    })

    const setOrderField = filedName => e => {
      const newOrderFieldsState = {...orderFields}

      if (['totalPriceChanged', 'deliveryCostToTheWarehouse', 'yuanToDollarRate', 'item'].includes(filedName)) {
        if (!checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
          return
        }

        newOrderFieldsState[filedName] = e.target.value

        if (e.updateTotalPriceChanged && filedName === 'yuanToDollarRate') {
          newOrderFieldsState.totalPriceChanged = e.updateTotalPriceChangedValue
        }
      } else if (filedName === 'status') {
        newOrderFieldsState[filedName] = e.target.value
        setTmpNewOrderFieldsState(newOrderFieldsState)

        setConfirmModalMode(confirmModalModes.STATUS)
        setShowConfirmModal(!showConfirmModal)
        return
      } else {
        newOrderFieldsState[filedName] = e.target.value
      }

      if (filedName === 'totalPriceChanged' && Number(e.target.value) - orderFields.totalPrice > 0) {
        newOrderFieldsState.status = order.status
      }
      setOrderFields(newOrderFieldsState)
    }

    const confirmModalMessageByMode = () => {
      switch (confirmModalMode) {
        case 'STATUS':
          return t(TranslationKey['Within the current edit, you can only change once!'])

        case 'SUBMIT':
          return t(TranslationKey['Are you sure you entered all the data correctly?'])
      }
    }

    const confirmModalActionByMode = () => {
      switch (confirmModalMode) {
        case 'STATUS':
          return setOrderFields(tmpNewOrderFieldsState)

        case 'SUBMIT':
          return onSubmitSaveOrder({
            order,
            orderFields,
            boxesForCreation,
            photosToLoad,
            hsCode,
            trackNumber: trackNumber.text || trackNumber.files.length ? trackNumber : null,
          })
      }
    }

    const allowOrderStatuses = [
      `${OrderStatusByKey[OrderStatus.AT_PROCESS]}`,
      `${OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]}`,
      `${OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]}`,
      `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}`,
      `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`,
      `${OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT]}`,
      `${OrderStatusByKey[OrderStatus.IN_STOCK]}`,
    ]

    const disabledOrderStatuses = [
      `${OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]}`,
      `${OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT]}`,
      // `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`,
      `${OrderStatusByKey[OrderStatus.IN_STOCK]}`,
    ]

    const [photosToLoad, setPhotosToLoad] = useState([])

    const [hsCode, setHsCode] = useState(order.product.hsCode)

    const disableSubmit =
      requestStatus === loadingStatuses.isLoading || disabledOrderStatuses.includes(order.status + '')

    return (
      <Box className={classNames.modalWrapper}>
        <div className={classNames.modalHeader}>
          <div className={classNames.idItemWrapper}>
            <Typography className={classNames.modalText}>
              {`${t(TranslationKey.Order)} № ${order.id} / `} <span className={classNames.modalSpanText}>{'item'}</span>
            </Typography>

            <Input
              className={classNames.itemInput}
              inputProps={{maxLength: 9}}
              value={orderFields.item}
              endAdornment={
                <InputAdornment position="start">
                  {(orderFields.item || (!orderFields.item && order?.item)) && order?.item !== orderFields.item ? (
                    <img
                      src={'/assets/icons/save-discet.svg'}
                      className={classNames.itemInputIcon}
                      onClick={() => onSaveOrderItem(order._id, orderFields.item)}
                    />
                  ) : null}
                </InputAdornment>
              }
              onChange={setOrderField('item')}
            />
          </div>

          <Typography className={classNames.amazonTitle}>
            {order.product.amazonTitle.length > 130
              ? order.product.amazonTitle.slice(0, 130) + '...'
              : order.product.amazonTitle}
          </Typography>
          <div className={classNames.orderStatusWrapper}>
            <Typography className={classNames.orderStatus}>{t(TranslationKey['Order status'])}</Typography>
            <Field
              tooltipInfoContent={t(TranslationKey['Current order status'])}
              value={order.storekeeper?.name}
              labelClasses={classNames.label}
              inputComponent={
                <Select
                  disabled={
                    order.status !== orderFields.status ||
                    +orderFields.totalPriceChanged - orderFields.totalPrice > 0 ||
                    orderFields.status === OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]
                    // orderFields.status === OrderStatusByKey[OrderStatus.IN_STOCK]
                  }
                  variant="filled"
                  value={orderFields.status}
                  classes={{
                    select: cx({
                      [classNames.orange]:
                        `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.AT_PROCESS]}` ||
                        `${orderFields.status}` ===
                          `${OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]}` ||
                        `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]}`,

                      [classNames.green]:
                        `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.IN_STOCK]}` ||
                        `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}`,

                      [classNames.red]:
                        `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}` ||
                        `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT]}`,
                    }),
                  }}
                  input={
                    <Input
                      startAdornment={
                        <InputAdornment position="start">
                          <FiberManualRecordRoundedIcon
                            className={cx({
                              [classNames.orange]:
                                `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.AT_PROCESS]}` ||
                                `${orderFields.status}` ===
                                  `${OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]}` ||
                                `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]}`,

                              [classNames.green]:
                                `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.IN_STOCK]}` ||
                                `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}`,

                              [classNames.red]:
                                `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}` ||
                                `${orderFields.status}` === `${OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT]}`,
                            })}
                          />
                        </InputAdornment>
                      }
                    />
                  }
                  onChange={setOrderField('status')}
                >
                  {Object.keys({
                    ...getObjectFilteredByKeyArrayWhiteList(
                      OrderStatusByCode,
                      allowOrderStatuses.filter(el => el >= order.status),
                    ),
                  }).map((statusCode, statusIndex) => (
                    <MenuItem
                      key={statusIndex}
                      value={statusCode}
                      className={cx(
                        cx(classNames.stantartSelect, {
                          [classNames.orange]:
                            statusCode === `${OrderStatusByKey[OrderStatus.AT_PROCESS]}` ||
                            statusCode === `${OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]}` ||
                            statusCode === `${OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]}`,

                          [classNames.green]:
                            statusCode === `${OrderStatusByKey[OrderStatus.IN_STOCK]}` ||
                            statusCode === `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}`,

                          [classNames.red]:
                            statusCode === `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}` ||
                            statusCode === `${OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT]}`,
                          [classNames.disableSelect]: disabledOrderStatuses.includes(statusCode),
                        }),
                      )}
                      disabled={disabledOrderStatuses.includes(statusCode)}
                    >
                      {OrderStatusTranslate(getOrderStatusOptionByCode(statusCode).key)}
                    </MenuItem>
                  ))}
                </Select>
              }
            />
          </div>
        </div>

        <Paper elevation={0} className={classNames.paper}>
          <SelectFields
            boxes={boxes}
            disableSubmit={disableSubmit}
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

          <Text className={classNames.tableTitle} containerClasses={classNames.tableTitleContainer}>
            {t(TranslationKey.Product)}
          </Text>

          <ProductTable
            modalHeadCells={modalHeadCells}
            order={order}
            orderFields={orderFields}
            setOrderField={setOrderField}
          />

          <Text
            className={classNames.tableTitle}
            containerClasses={classNames.tableTitleContainer}
            tooltipInfoContent={t(TranslationKey['Current supplier through whom the order was placed'])}
          >
            {t(TranslationKey.Suppliers)}
          </Text>

          <EditOrderSuppliersTable
            selectedSupplier={orderFields.orderSupplier}
            suppliers={orderFields.product.suppliers}
          />
        </Paper>

        <Box mt={2} className={classNames.buttonsBox}>
          <Button
            disabled={disableSubmit}
            tooltipInfoContent={t(TranslationKey['Save changes to the order'])}
            className={classNames.saveBtn}
            onClick={() => {
              if (boxesForCreation.length > 0) {
                setConfirmModalMode(confirmModalModes.SUBMIT)
                setShowConfirmModal(!showConfirmModal)
              } else {
                onSubmitSaveOrder({
                  order,
                  orderFields,
                  boxesForCreation,
                  photosToLoad,
                  hsCode,
                  trackNumber: trackNumber.text || trackNumber.files.length ? trackNumber : null,
                })
              }
            }}
          >
            {t(TranslationKey.Save)}
          </Button>
          <Button
            variant="text"
            className={classNames.cancelBtn}
            tooltipInfoContent={t(TranslationKey['Close the "Edit order" window without saving'])}
            onClick={() => onTriggerOpenModal('showOrderModal')}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </Box>

        {orderStatusesThatTriggersEditBoxBlock.includes(parseInt(orderFields.status)) && (
          <div className={classNames.addBtn}>
            <Typography className={classNames.addBoxTitle}>{t(TranslationKey['Add boxes for this order'])}</Typography>
            <div className={classNames.addBoxButtonWrapper}>
              <Button
                tooltipInfoContent={t(TranslationKey['Opens a form to create a box'])}
                className={classNames.addBoxButton}
                onClick={addBoxHandler}
              >
                {t(TranslationKey['Add a box'])}
              </Button>
            </div>
          </div>
        )}

        {boxesForCreation.length > 0 && (
          <>
            <BoxesToCreateTable
              volumeWeightCoefficient={volumeWeightCoefficient}
              barcodeIsExist={order.product.barCode}
              newBoxes={boxesForCreation}
              onRemoveBox={onRemoveForCreationBox}
              onEditBox={onEditForCreationBox}
              onClickBarcodeCheckbox={onClickBarcodeCheckbox}
              onClickUpdateSupplierStandart={onClickUpdateSupplierStandart}
            />

            <div className={classNames.labelsInfoWrapper}>
              <div>
                <Field
                  labelClasses={classNames.label}
                  containerClasses={classNames.containerField}
                  inputClasses={classNames.inputField}
                  inputProps={{maxLength: 255}}
                  label={t(TranslationKey['Set track number for new boxes']) + ':'}
                  value={trackNumber.text}
                  onChange={e => setTrackNumber({...trackNumber, text: e.target.value})}
                />

                <Button
                  className={classNames.trackNumberPhotoBtn}
                  onClick={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
                >
                  {trackNumber.files[0] ? t(TranslationKey['File added']) : 'Photo track numbers'}
                </Button>
              </div>

              <div className={classNames.trackNumberPhotoWrapper}>
                {trackNumber.files[0] ? (
                  <Avatar
                    className={classNames.trackNumberPhoto}
                    src={
                      typeof trackNumber.files[0] === 'string' ? trackNumber.files[0] : trackNumber.files[0]?.data_url
                    }
                    variant="square"
                    onClick={() => {
                      setShowPhotosModal(!showPhotosModal)
                      setBigImagesOptions({
                        ...bigImagesOptions,

                        images: [
                          typeof trackNumber.files[0] === 'string'
                            ? trackNumber.files[0]
                            : trackNumber.files[0]?.data_url,
                        ],
                      })
                    }}
                  />
                ) : (
                  <Typography>{'no photo track number...'}</Typography>
                )}
              </div>
            </div>
          </>
        )}

        <div className={classNames.tableWrapper}>
          <Field
            tooltipInfoContent={t(TranslationKey['All the boxes that the prep center received on order'])}
            label={t(TranslationKey['Boxes on this order:'])}
            inputClasses={classNames.hidden}
            labelClasses={classNames.label}
            containerClasses={classNames.fieldLabel}
          />

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
            <Typography className={classNames.noBoxesText}>{t(TranslationKey['No boxes...'])}</Typography>
          )}
        </div>

        <Modal
          openModal={collapseCreateOrEditBoxBlock}
          setOpenModal={() => setCollapseCreateOrEditBoxBlock(!collapseCreateOrEditBoxBlock)}
          dialogContextClassName={classNames.dialogContextClassName}
        >
          <CreateBoxForm
            isEdit={isEdit}
            order={order}
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
          title={t(TranslationKey['Attention. Are you sure?'])}
          message={confirmModalMessageByMode(confirmModalMode)}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={() => {
            confirmModalActionByMode(confirmModalMode)
            setShowConfirmModal(!showConfirmModal)
          }}
          onClickCancelBtn={() => setShowConfirmModal(!showConfirmModal)}
        />

        <WarningInfoModal
          openModal={showWarningInfoModal}
          setOpenModal={() => setShowWarningInfoModal(!showWarningInfoModal)}
          title={t(TranslationKey['PAY ATTENTION!!!'])}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            setShowWarningInfoModal(!showWarningInfoModal)
          }}
        />

        <Modal openModal={showSetBarcodeModal} setOpenModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}>
          <SetBarcodeModal
            title={'Track number'}
            tmpCode={trackNumber.files}
            onClickSaveBarcode={value => {
              setTrackNumber({...trackNumber, files: value})
              setShowSetBarcodeModal(!showSetBarcodeModal)
            }}
            onCloseModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
          />
        </Modal>

        <BigImagesModal
          openModal={showPhotosModal}
          setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          images={bigImagesOptions.images}
          imgIndex={bigImagesOptions.imgIndex}
        />
      </Box>
    )
  },
)
