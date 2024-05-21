import { Dayjs } from 'dayjs'
import { FC, memo } from 'react'

import { PickersCalendarHeaderProps } from '@mui/x-date-pickers/PickersCalendarHeader'

import { ArrowLeftIcon, ArrowRightIcon } from '@components/shared/svg-icons'

import { useStyles } from './custom-header.style'

export const CustomHeader: FC<PickersCalendarHeaderProps<Dayjs>> = memo(({ currentMonth, onMonthChange }) => {
  const { classes: styles } = useStyles()

  const selectNextMonth = () => onMonthChange(currentMonth.add(1, 'month'), 'left')
  const selectPreviousMonth = () => onMonthChange(currentMonth.subtract(1, 'month'), 'right')

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={selectPreviousMonth}>
        <ArrowLeftIcon className={styles.icon} />
      </button>

      <p className={styles.title}>{currentMonth.format('MMMM YYYY')}</p>

      <button className={styles.button} onClick={selectNextMonth}>
        <ArrowRightIcon className={styles.icon} />
      </button>
    </div>
  )
})
