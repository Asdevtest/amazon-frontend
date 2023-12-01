import React, { FC } from 'react'

import { TaskStatus, TaskStatusTranslate } from '@constants/task/task-status'

import { useStyles } from './task-status-cell.style'

interface TaskStatusCellProps {
  status: string
}

export const TaskStatusCell: FC<TaskStatusCellProps> = React.memo(({ status }) => {
  const { classes: styles } = useStyles()

  const colorByStatus = () => {
    if ([TaskStatus.AT_PROCESS, TaskStatus.NEW].includes(status)) {
      return '#F3AF00'
    } else if ([TaskStatus.SOLVED].includes(status)) {
      return '#00B746'
    } else if ([TaskStatus.NOT_SOLVED].includes(status)) {
      return '#FF1616'
    } else {
      return '#black'
    }
  }

  const colorStatus = colorByStatus()

  return (
    <div className={styles.statusWrapper}>
      <p className={styles.orderStatusText} style={{ color: colorStatus }}>
        {TaskStatusTranslate(status)}
      </p>
    </div>
  )
})
