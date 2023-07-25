import { cx } from '@emotion/css'
import React, { FC } from 'react'

import { Button } from '@mui/material'

import {
  TaskPriorityStatus,
  mapTaskPriorityStatusEnum,
  taskPriorityStatusTranslate,
} from '@constants/task/task-priority-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { useTaskPrioritySelectorStyles } from '@components/shared/task-priority-selector/task-priority-selector.styles'

import { t } from '@utils/translations'

interface TaskPrioritySelectorProps {
  currentPriority: string
  handleActivePriority: (priority: string | null) => void
  wrapperStyles?: string
}

export const TaskPrioritySelector: FC<TaskPrioritySelectorProps> = props => {
  const { wrapperStyles, currentPriority, handleActivePriority } = props
  const { classes: styles } = useTaskPrioritySelectorStyles()

  return (
    <div
      className={cx(styles.wrapper, {
        wrapperStyles: wrapperStyles !== undefined,
      })}
    >
      <Button
        disabled={currentPriority === null}
        className={cx(styles.button, { [styles.selectedButton]: currentPriority === null })}
        variant="text"
        onClick={() => handleActivePriority(null)}
      >
        {t(TranslationKey['All priorities'])}
      </Button>

      {Object.keys(mapTaskPriorityStatusEnum)
        .reverse()
        .map(type => (
          <Button
            key={type}
            disabled={currentPriority === type}
            className={cx(styles.button, {
              [styles.selectedButton]: currentPriority === type,
            })}
            variant="text"
            onClick={() => handleActivePriority(type)}
          >
            {taskPriorityStatusTranslate(
              mapTaskPriorityStatusEnum[Number(type) as keyof typeof mapTaskPriorityStatusEnum],
            )}

            {TaskPriorityStatus.URGENT ===
              mapTaskPriorityStatusEnum[Number(type) as keyof typeof mapTaskPriorityStatusEnum] && (
              <img className={styles.rushOrderImg} src="/assets/icons/fire.svg" alt="Fire" />
            )}
          </Button>
        ))}
    </div>
  )
}
