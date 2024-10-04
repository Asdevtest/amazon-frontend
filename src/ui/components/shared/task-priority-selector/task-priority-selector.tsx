import { RadioChangeEvent } from 'antd'
import { FC } from 'react'

import { mapTaskPriorityStatusEnum, taskPriorityStatusTranslate } from '@constants/task/task-priority-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { CustomRadioButton } from '../custom-radio-button'

interface TaskPrioritySelectorProps {
  currentPriority: string | null
  onActivePriority: (value: RadioChangeEvent) => void
}

export const TaskPrioritySelector: FC<TaskPrioritySelectorProps> = props => {
  const { currentPriority, onActivePriority } = props

  return (
    <CustomRadioButton
      size="large"
      options={[
        { label: t(TranslationKey['All priorities']), value: null },
        ...Object.keys(mapTaskPriorityStatusEnum).map(type => ({
          label:
            taskPriorityStatusTranslate(
              mapTaskPriorityStatusEnum[Number(type) as keyof typeof mapTaskPriorityStatusEnum],
            ) || '',
          value: type,
        })),
      ]}
      defaultValue={currentPriority}
      onChange={onActivePriority}
    />
  )
}
