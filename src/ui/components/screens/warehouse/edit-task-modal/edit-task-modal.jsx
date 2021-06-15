import React from 'react'

import {Divider, NativeSelect, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'
import {warehouses} from '@constants/warehouses'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button'
import {Field} from '@components/field'
import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {BeforeAfterBlock} from '../before-after-block'
import {BoxOrder} from './box-order'
import {useClassNames} from './edit-task-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseTaskForm

const warehouseOptions = [
  {value: 0, label: warehouses[0]},
  {value: 25, label: warehouses[25]},
]

const deliveryMethodOptions = [
  {value: 1, label: 'Air'},
  {value: 2, label: 'Sea'},
]

const statusOptions = [
  {value: 0, label: 'Formed'},
  {value: 1, label: 'New'},
  {value: 10, label: 'ReadyToProcess'},
  {value: 15, label: 'At process'},
  {value: 20, label: 'Paid'},
  {value: 25, label: 'Track number issued'},
  {value: 30, label: 'In stock'},
  {value: 35, label: 'Return order'},
]

export const EditTaskModal = ({task, onClickOpenCloseModal, onSetBarcode, onEditBox}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.root}>
      <div className={classNames.form}>
        <Typography paragraph className={classNames.subTitle}>
          {textConsts.taskTitle}
        </Typography>

        <Field
          containerClasses={classNames.field}
          label={textConsts.warehouseLabel}
          inputComponent={
            <NativeSelect variant="filled" input={<Input fullWidth />}>
              {warehouseOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelect>
          }
        />

        <Field
          containerClasses={classNames.field}
          label={textConsts.deliveryMethodLabel}
          inputComponent={
            <NativeSelect variant="filled" input={<Input fullWidth />}>
              {deliveryMethodOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelect>
          }
        />

        <Field
          containerClasses={classNames.field}
          label={textConsts.statusLabel}
          inputComponent={
            <NativeSelect variant="filled" input={<Input fullWidth />}>
              {statusOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelect>
          }
        />

        <BeforeAfterBlock
          incomingBoxes={task.incomingBoxes}
          desiredBoxes={task.desiredBoxes}
          onSetBarcode={onSetBarcode}
          onEditBox={onEditBox}
        />

        <Divider className={classNames.divider} />

        <Typography paragraph className={classNames.subTitle}>
          {textConsts.incomingBoxes}
        </Typography>

        <Divider className={classNames.divider} />

        <div className={classNames.ordersWrapper}>
          {task.incomingBoxes.map((box, boxIndex) => (
            <BoxOrder key={boxIndex} box={box} onSetBarcode={onSetBarcode} />
          ))}
        </div>
      </div>

      <div className={classNames.buttonsWrapper}>
        <SuccessButton
          disableElevation
          className={classNames.submit}
          variant="contained"
          onClick={onClickOpenCloseModal}
        >
          {textConsts.saveChangesBtn}
        </SuccessButton>

        <Button disableElevation color="primary" variant="contained" onClick={onClickOpenCloseModal}>
          {textConsts.cancelChangesBtn}
        </Button>
      </div>
    </div>
  )
}
