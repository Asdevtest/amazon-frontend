import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React from 'react'

import { MenuItem, Select } from '@mui/material'

import {
  TaskPriorityStatus,
  colorByTaskPriorityStatus,
  mapTaskPriorityStatusEnum,
  mapTaskPriorityStatusEnumToKey,
  taskPriorityStatusTranslate,
} from '@constants/task/task-priority-status'

import { Input } from '@components/shared/input'
import { usePrioritySelectStyles } from '@components/shared/priority-select/priority-select.styles'

interface PrioritySelectProps {
  currentPriority: number
  setCurrentPriority: (priority: number) => void
  disabled?: boolean
}

export const PrioritySelect = observer((props: PrioritySelectProps) => {
  const { classes: styles } = usePrioritySelectStyles()

  return (
    <>
      <Select
        disabled={props.disabled}
        value={String(props.currentPriority)}
        className={styles.nativeSelect}
        input={<Input className={styles.nativeSelect} />}
        classes={{
          select: cx({
            [styles.colorYellow]:
              props.currentPriority ===
              (mapTaskPriorityStatusEnumToKey as { [key: string]: number })[TaskPriorityStatus.STANDART],
            [styles.colorGreen]:
              props.currentPriority ===
              (mapTaskPriorityStatusEnumToKey as { [key: string]: number })[TaskPriorityStatus.LONG],
            [styles.colorRed]: [
              (mapTaskPriorityStatusEnumToKey as { [key: string]: number })[TaskPriorityStatus.URGENT],
              (mapTaskPriorityStatusEnumToKey as { [key: string]: number })[TaskPriorityStatus.PROBLEMATIC],
            ].includes(props.currentPriority),
          }),
        }}
        onChange={e => props.setCurrentPriority(Number(e.target.value))}
      >
        {Object.keys(mapTaskPriorityStatusEnum)
          // .filter(el => el !== String(curPriority))
          .map((statusCode, statusIndex) => (
            <MenuItem
              key={statusIndex}
              value={statusCode}
              style={{
                color: colorByTaskPriorityStatus((mapTaskPriorityStatusEnum as { [key: string]: string })[statusCode]),
              }}
              className={styles.menuItem}
            >
              {taskPriorityStatusTranslate((mapTaskPriorityStatusEnum as { [key: string]: string })[statusCode])}

              {TaskPriorityStatus.URGENT === (mapTaskPriorityStatusEnum as { [key: string]: string })[statusCode] && (
                <img className={styles.rushOrderImg} src="/assets/icons/fire.svg" alt="Fire" />
              )}
            </MenuItem>
          ))}
      </Select>
    </>
  )
})
