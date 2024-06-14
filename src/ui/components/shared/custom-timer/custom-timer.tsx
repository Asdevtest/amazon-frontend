import { cx } from '@emotion/css'
import { Tooltip } from 'antd'
import { FC, ReactNode, memo } from 'react'
import { AiOutlinePoweroff } from 'react-icons/ai'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useCountdown } from '@hooks/use-countdown'

import classes from './custom-timer.module.scss'

interface CustomTimerProps {
  targetDate?: Date | string
  startIcon?: ReactNode
  endIcon?: ReactNode
  className?: string
  tooltipText?: string
}

export const CustomTimer: FC<CustomTimerProps> = memo(props => {
  const { targetDate, startIcon = <AiOutlinePoweroff />, endIcon, className, tooltipText } = props

  if (!targetDate) {
    return null
  }

  const { days, hours, minutes, seconds } = useCountdown(targetDate)

  const tooltip = tooltipText
    ? `${t(TranslationKey[tooltipText as TranslationKey])}: ${days} : ${hours} : ${minutes} : ${seconds}`
    : ''

  return (
    <Tooltip title={tooltip} rootClassName={classes.tooltip}>
      <div className={cx(classes.root, className)}>
        {startIcon}
        {`${days} : ${hours} : ${minutes} : ${seconds}`}
        {endIcon}
      </div>
    </Tooltip>
  )
})
