import React from 'react'

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
  ({task, onClickOpenCloseModal, onSetBarcode, onEditBox, onClickSolveTask, tmpBarCode}) => {
    const classNames = useClassNames()

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
            value={getWarehousesOptionByCode(task.boxes[0].warehouse).label}
          />

          <Field
            disabled
            containerClasses={classNames.field}
            label={textConsts.deliveryMethodLabel}
            value={getDeliveryOptionByCode(task.boxes[0].deliveryMethod).label}
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
            desiredBoxes={task.boxes}
            tmpBarCode={tmpBarCode}
            onSetBarcode={onSetBarcode}
            onEditBox={onEditBox}
          />
        </div>

        <div className={classNames.buttonsWrapper}>
          <SuccessButton disableElevation className={classNames.submit} variant="contained" onClick={onClickSolveTask}>
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
