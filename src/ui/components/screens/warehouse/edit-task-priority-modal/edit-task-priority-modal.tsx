import {Typography} from '@mui/material'

import React, {FC, useState} from 'react'

import {
  colorByTaskPriorityStatus,
  mapTaskPriorityStatusEnum,
  mapTaskPriorityStatusEnumToKey,
  TaskPriorityStatus,
  taskPriorityStatusTranslate,
} from '@constants/task-priority-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Input} from '@components/input'
import {useEditTaskPriorityModalStyles} from '@components/screens/warehouse/edit-task-priority-modal/edit-task-priority-modal.styles'

import {t} from '@utils/translations'

interface EditTaskPriorityModalProps {
  data: {
    taskId: string
    newPriority: keyof typeof mapTaskPriorityStatusEnum
  }
  handleClose: () => void
  onSubmitHandler: (orderId: string, priority: number, reason: string) => void
}

export const EditTaskPriorityModal: FC<EditTaskPriorityModalProps> = props => {
  const {data, onSubmitHandler, handleClose} = props
  const {classes: styles} = useEditTaskPriorityModalStyles()

  const [reason, setReason] = useState<string>('')

  return (
    <div className={styles.body}>
      <Typography className={styles.title}>
        {t(TranslationKey['Change the priority to'])}{' '}
        <span style={{color: colorByTaskPriorityStatus(mapTaskPriorityStatusEnum[data.newPriority])}}>
          {taskPriorityStatusTranslate(mapTaskPriorityStatusEnum[data.newPriority])}
          {Number(data.newPriority) ===
            mapTaskPriorityStatusEnumToKey[
              TaskPriorityStatus.PROBLEMATIC as keyof typeof mapTaskPriorityStatusEnumToKey
            ] && '*'}
        </span>
      </Typography>

      <Field
        labelClasses={styles.reasonLabel}
        label={t(TranslationKey.Comment)}
        inputComponent={
          <Input
            multiline
            placeholder={t(TranslationKey.Comment)}
            minRows={2}
            maxRows={2}
            className={styles.reasonInput}
            value={reason}
            inputProps={{maxLength: 250}}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setReason(event.target.value)}
          />
        }
      />

      <div className={styles.controls}>
        <Button
          success
          disabled={
            Number(data.newPriority) ===
              mapTaskPriorityStatusEnumToKey[
                TaskPriorityStatus.PROBLEMATIC as keyof typeof mapTaskPriorityStatusEnumToKey
              ] && reason.length < 1
          }
          onClick={() => {
            onSubmitHandler(data.taskId, data.newPriority, reason)
            handleClose()
          }}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button variant="text" className={styles.cancel} onClick={handleClose}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
