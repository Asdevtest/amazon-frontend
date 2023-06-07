import React, { useState } from 'react'
import { usePriorityFormStyles } from '@components/shared/priority-form/priority-form.styles'
import { Field } from '@components/shared/field'
import { TranslationKey } from '@constants/translations/translation-key'
import { t } from '@utils/translations'
import { Input } from '@components/shared/input'
import { mapTaskPriorityStatusEnumToKey, TaskPriorityStatus } from '@constants/task/task-priority-status'
import { PrioritySelect } from '@components/shared/priority-select/priority-select'

interface PriorityFormProps {
  currentPriority?: number
  setCurrentPriority: (priority: number) => void
  comment?: string
  setComment: (comment: string) => void
}

export const PriorityForm = (props: PriorityFormProps) => {
  const { classes: styles } = usePriorityFormStyles()
  const [curPriority, setCurPriority] = useState<number>(
    props.currentPriority || (mapTaskPriorityStatusEnumToKey as { [key: string]: number })[TaskPriorityStatus.STANDART],
  )
  const [reason, setReason] = useState<string>(props.comment || '')

  return (
    <div>
      <Field
        labelClasses={styles.label}
        label={t(TranslationKey.Priority)}
        inputComponent={
          <PrioritySelect
            currentPriority={curPriority}
            setCurrentPriority={priority => {
              setCurPriority(priority)
              props.setCurrentPriority(priority)
            }}
          />
        }
      />

      <Field
        labelClasses={styles.label}
        label={`${t(TranslationKey.Comment)}${
          Number(curPriority) ===
          mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.PROBLEMATIC as keyof typeof mapTaskPriorityStatusEnumToKey]
            ? '*'
            : ''
        }`}
        inputComponent={
          <Input
            multiline
            placeholder={t(TranslationKey['Comments on priority'])}
            minRows={3}
            maxRows={3}
            className={styles.reasonInput}
            value={reason}
            inputProps={{ maxLength: 250 }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setReason(event.target.value)
              props.setComment(event.target.value)
            }}
          />
        }
      />
    </div>
  )
}
