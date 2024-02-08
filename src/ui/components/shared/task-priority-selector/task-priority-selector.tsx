import { FC } from 'react'

import {
  TaskPriorityStatus,
  mapTaskPriorityStatusEnum,
  taskPriorityStatusTranslate,
} from '@constants/task/task-priority-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { useTaskPrioritySelectorStyles } from '@components/shared/task-priority-selector/task-priority-selector.style'

import { t } from '@utils/translations'

import { CustomSwitcher } from '../custom-switcher'

interface TaskPrioritySelectorProps {
  currentPriority: string
  handleActivePriority: (priority: string | null) => void
  wrapperStyles?: string
}

export const TaskPrioritySelector: FC<TaskPrioritySelectorProps> = props => {
  const { wrapperStyles, currentPriority, handleActivePriority } = props
  const { classes: styles, cx } = useTaskPrioritySelectorStyles()

  return (
    <div
      className={cx(styles.wrapper, {
        wrapperStyles: wrapperStyles !== undefined,
      })}
    >
      <CustomSwitcher
        switchMode={'medium'}
        condition={currentPriority}
        switcherSettings={[
          { label: () => t(TranslationKey['All priorities']), value: null },

          ...Object.keys(mapTaskPriorityStatusEnum)
            .reverse()
            .map(type => ({
              icon: TaskPriorityStatus.URGENT ===
                mapTaskPriorityStatusEnum[Number(type) as keyof typeof mapTaskPriorityStatusEnum] && (
                <img className={styles.rushOrderImg} src="/assets/icons/fire.svg" alt="Fire" />
              ),
              label: () =>
                taskPriorityStatusTranslate(
                  mapTaskPriorityStatusEnum[Number(type) as keyof typeof mapTaskPriorityStatusEnum],
                ) || '',
              value: type,
            })),
        ]}
        changeConditionHandler={value => {
          if (typeof value === 'string' || value === null) {
            handleActivePriority(value)
          }
        }}
      />
    </div>
  )
}
