/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC } from 'react'

import { TaskStatus, TaskStatusTranslate, mapTaskStatusKeyToEnum } from '@constants/task/task-status'

import { useStyles } from './task-status-cell.style'

interface TaskStatusCellProps {
  status: string
}

export const TaskStatusCell: FC<TaskStatusCellProps> = React.memo(({ status }) => {
  const { classes: styles } = useStyles()

  // @ts-ignore
  const validStatus = mapTaskStatusKeyToEnum[status]

  const colorByStatus = () => {
    if ([TaskStatus.AT_PROCESS, TaskStatus.NEW].includes(validStatus)) {
      return '#F3AF00'
    } else if ([TaskStatus.SOLVED].includes(validStatus)) {
      return '#00B746'
    } else if ([TaskStatus.NOT_SOLVED].includes(validStatus)) {
      return '#FF1616'
    } else {
      return '#black'
    }
  }

  const colorStatus = colorByStatus()

  return (
    <div className={styles.statusWrapper}>
      <p className={styles.orderStatusText} style={{ color: colorStatus }}>
        {TaskStatusTranslate(validStatus)}
      </p>
    </div>
  )
})
