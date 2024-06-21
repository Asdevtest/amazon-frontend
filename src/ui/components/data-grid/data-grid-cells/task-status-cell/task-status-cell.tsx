import { FC, memo } from 'react'

import { TaskStatus, TaskStatusTranslate, mapTaskStatusKeyToEnum } from '@constants/task/task-status'

import { useStyles } from './task-status-cell.style'

interface TaskStatusCellProps {
  status: string
}

export const TaskStatusCell: FC<TaskStatusCellProps> = memo(({ status }) => {
  const { classes: styles } = useStyles()

  const actualStatus = mapTaskStatusKeyToEnum[status as unknown as keyof typeof mapTaskStatusKeyToEnum]

  const colorByStatus = () => {
    if ([TaskStatus.AT_PROCESS, TaskStatus.NEW].includes(actualStatus)) {
      return '#F3AF00'
    } else if ([TaskStatus.SOLVED].includes(actualStatus)) {
      return '#00B746'
    } else if ([TaskStatus.NOT_SOLVED].includes(actualStatus)) {
      return '#FF1616'
    } else {
      return '#black'
    }
  }

  const colorStatus = colorByStatus()

  return (
    <div className={styles.statusWrapper}>
      <p className={styles.orderStatusText} style={{ color: colorStatus }}>
        {TaskStatusTranslate(actualStatus)}
      </p>
    </div>
  )
})
