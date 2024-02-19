import { ChangeEvent, FC, useState } from 'react'

import { Typography } from '@mui/material'

import {
  TaskPriorityStatus,
  colorByTaskPriorityStatus,
  mapTaskPriorityStatusEnum,
  mapTaskPriorityStatusEnumToKey,
  taskPriorityStatusTranslate,
} from '@constants/task/task-priority-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { PrioritySelect } from '@components/shared/priority-select/priority-select'
import { useEditTaskPriorityModalStyles } from '@components/warehouse/edit-task-priority-modal/edit-task-priority-modal.style'

import { t } from '@utils/translations'

import { ButtonType, ButtonVariant } from '@typings/types/button.type'

interface EditTaskPriorityModalProps {
  data: {
    taskId: string
    newPriority: keyof typeof mapTaskPriorityStatusEnum
  }
  withSelect?: boolean
  handleClose: () => void
  onSubmitHandler: (orderId: string, priority: number, reason: string) => void
}

export const EditTaskPriorityModal: FC<EditTaskPriorityModalProps> = props => {
  const { data, onSubmitHandler, handleClose, withSelect } = props
  const { classes: styles } = useEditTaskPriorityModalStyles()

  const [curPriority, setCurPriority] = useState<number>(
    data.newPriority || (mapTaskPriorityStatusEnumToKey as { [key: string]: number })[TaskPriorityStatus.STANDART],
  )

  const [reason, setReason] = useState<string>('')

  return (
    <div className={styles.body}>
      <div className={styles.titleWrapper}>
        <Typography className={styles.title}>
          {t(TranslationKey['Change the priority to'])}{' '}
          {!withSelect && (
            <span style={{ color: colorByTaskPriorityStatus(mapTaskPriorityStatusEnum[data.newPriority]) }}>
              {taskPriorityStatusTranslate(mapTaskPriorityStatusEnum[data.newPriority])}
            </span>
          )}
        </Typography>

        {withSelect && (
          <PrioritySelect setCurrentPriority={priority => setCurPriority(priority)} currentPriority={curPriority} />
        )}
      </div>
      {/* <Typography className={styles.title}>
        {t(TranslationKey['Change the priority to'])}{' '}
        <span style={{color: colorByTaskPriorityStatus(mapTaskPriorityStatusEnum[data.newPriority])}}>
          {taskPriorityStatusTranslate(mapTaskPriorityStatusEnum[data.newPriority])}
        </span>
      </Typography> */}

      <Field
        labelClasses={styles.reasonLabel}
        label={`${t(TranslationKey.Comment)}${
          Number(data.newPriority) ===
          mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.PROBLEMATIC as keyof typeof mapTaskPriorityStatusEnumToKey]
            ? '*'
            : ''
        }`}
        inputComponent={
          <Input
            multiline
            placeholder={t(TranslationKey.Comment)}
            minRows={2}
            maxRows={2}
            className={styles.reasonInput}
            value={reason}
            inputProps={{ maxLength: 250 }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setReason(event.target.value)}
          />
        }
      />

      <div className={styles.controls}>
        <Button
          styleType={ButtonType.SUCCESS}
          disabled={
            Number(curPriority) ===
              mapTaskPriorityStatusEnumToKey[
                TaskPriorityStatus.PROBLEMATIC as keyof typeof mapTaskPriorityStatusEnumToKey
              ] && reason.length < 1
          }
          onClick={() => {
            onSubmitHandler(data.taskId, curPriority, reason)
            handleClose()
          }}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button variant={ButtonVariant.OUTLINED} className={styles.cancel} onClick={handleClose}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
