import React, { FC } from 'react'

import { PrioritySelect } from '@components/shared/priority-select/priority-select'

interface TaskPriorityCellProps {
  curPriority: number
  onChangePriority: (taskId: string, priority: number) => void
  taskId: string
  disabled?: boolean
}

export const TaskPriorityCell: FC<TaskPriorityCellProps> = React.memo(props => {
  const { curPriority, onChangePriority, taskId, disabled } = props

  return (
    <PrioritySelect
      setCurrentPriority={priority => onChangePriority(taskId, priority)}
      currentPriority={curPriority}
      disabled={disabled}
    />
  )
})
