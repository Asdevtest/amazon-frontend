import { FC, ReactNode, memo } from 'react'

import { useCountdown } from '@hooks/use-countdown'

import { useStyles } from './custom-timer.style'

interface CustomTimerProps {
  targetDate: Date | string
  startIcon?: ReactNode
  endIcon?: ReactNode
  className?: string
}

export const CustomTimer: FC<CustomTimerProps> = memo(props => {
  const { targetDate, startIcon, endIcon, className } = props

  const { classes: styles, cx } = useStyles()
  const { days, hours, minutes, seconds } = useCountdown(targetDate)

  return (
    <div className={cx(styles.root, className)}>
      {startIcon}
      {`${days} : ${hours} : ${minutes} : ${seconds}`}
      {endIcon}
    </div>
  )
})
