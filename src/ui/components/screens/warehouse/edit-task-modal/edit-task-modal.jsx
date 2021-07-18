import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {getDeliveryOptionByCode} from '@constants/delivery-options'
import {getOrderStatusOptionByCode} from '@constants/order-status'
import {texts} from '@constants/texts'
import {getWarehousesOptionByCode} from '@constants/warehouses'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button'
import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {BeforeAfterBlock} from '../before-after-block'
import {useClassNames} from './edit-task-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseTaskForm

export const EditTaskModal = observer(
  ({
    task,
    onClickOpenCloseModal,
    onSetBarcode,
    onEditBox,
    onClickSolveTask,
    tmpBarCode,
    showEditBoxModal,
    onTriggerShowEditBoxModal,
    onSubmitUpdateBoxes,
  }) => {
    const classNames = useClassNames()

    const [newBoxes, setNewBoxes] = useState([
      ...task.boxes.map(
        box =>
          (box = {
            ...box,
            lengthCmWarehouse: box?.lengthCmWarehouse || '',
            widthCmWarehouse: box?.widthCmWarehouse || '',
            heightCmWarehouse: box?.heightCmWarehouse || '',
            weighGrossKgWarehouse: box?.weighGrossKgWarehouse || '',
            volumeWeightKgWarehouse: box?.volumeWeightKgWarehouse || '',
            weightFinalAccountingKgWarehouse: box?.weightFinalAccountingKgWarehouse || '',
          }),
      ),
    ])

    const setNewBoxField = (fieldName, boxId) => e => {
      const newFormFields = {...newBoxes.find(el => el._id === boxId)}
      newFormFields[fieldName] = Number(e.target.value)
      newFormFields.volumeWeightKgWarehouse =
        ((parseFloat(newFormFields.lengthCmWarehouse) || 0) *
          (parseFloat(newFormFields.heightCmWarehouse) || 0) *
          (parseFloat(newFormFields.widthCmWarehouse) || 0)) /
        5000
      newFormFields.weightFinalAccountingKgWarehouse = Math.max(
        parseFloat(newFormFields.volumeWeightKgWarehouse) || 0,
        parseFloat(newFormFields.weighGrossKgWarehouse) || 0,
      )

      const updatedNewBoxes = newBoxes.map(oldBox => (oldBox._id === boxId ? newFormFields : oldBox))
      setNewBoxes(updatedNewBoxes)
    }

    const setAmountFieldNewBox = boxId => e => {
      let newFormFields = {...newBoxes.find(el => el._id === boxId)}
      newFormFields = {
        ...newFormFields,
        items: [
          {
            ...newFormFields.items[0],
            amount: e.target.value,
          },
        ],
      }

      const updatedNewBoxes = newBoxes.map(oldBox => (oldBox._id === boxId ? newFormFields : oldBox))
      setNewBoxes(updatedNewBoxes)
    }

    if (!task) {
      return <div />
    }

    return (
      <div className={classNames.root}>
        <div className={classNames.form}>
          <Typography paragraph className={classNames.subTitle}>
            {textConsts.taskTitle}
          </Typography>

          <Field
            disabled
            containerClasses={classNames.field}
            label={textConsts.warehouseLabel}
            value={task.boxes[0].warehouse && getWarehousesOptionByCode(task.boxes[0].warehouse).label}
          />

          <Field
            disabled
            containerClasses={classNames.field}
            label={textConsts.deliveryMethodLabel}
            value={task.boxes[0].deliveryMethod && getDeliveryOptionByCode(task.boxes[0].deliveryMethod).label}
          />

          {/* тут статус ордера? сейчас , да*/}
          <Field
            disabled
            containerClasses={classNames.field}
            label={textConsts.statusLabel}
            value={getOrderStatusOptionByCode(task.boxes[0].status).label}
          />

          <BeforeAfterBlock
            incomingBoxes={task.boxesBefore}
            desiredBoxes={newBoxes}
            taskType={task.operationType}
            tmpBarCode={tmpBarCode}
            setNewBoxes={setNewBoxField}
            setAmountFieldNewBox={setAmountFieldNewBox}
            showEditBoxModal={showEditBoxModal}
            onTriggerShowEditBoxModal={onTriggerShowEditBoxModal}
            onSetBarcode={onSetBarcode}
            onEditBox={onEditBox}
          />
        </div>

        <div className={classNames.buttonsWrapper}>
          <SuccessButton
            disableElevation
            className={classNames.submit}
            variant="contained"
            onClick={() => {
              onSubmitUpdateBoxes(newBoxes)
              onClickSolveTask(newBoxes)
            }}
          >
            {textConsts.saveChangesBtn}
          </SuccessButton>

          <Button disableElevation color="primary" variant="contained" onClick={onClickOpenCloseModal}>
            {textConsts.cancelChangesBtn}
          </Button>
        </div>
      </div>
    )
  },
)
