import { cx } from '@emotion/css'
import { Tooltip } from 'antd'
import { FC, ReactNode, memo, useEffect } from 'react'
import { AiOutlinePoweroff } from 'react-icons/ai'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useCountdown } from '@hooks/use-countdown'

import classes from './custom-timer.module.scss'
import { logout } from './helpers/logout'

interface CustomTimerProps {
  targetDate: Date | string
  startIcon?: ReactNode
  endIcon?: ReactNode
  className?: string
  tooltipText?: string
}

export const CustomTimer: FC<CustomTimerProps> = memo(props => {
  const { targetDate, startIcon = <AiOutlinePoweroff />, endIcon, className, tooltipText } = props

  if (new Date() >= new Date(targetDate) || !targetDate) {
    return null
  }

  const { days, hours, minutes, seconds, shouldLogout } = useCountdown(targetDate)

  useEffect(() => {
    if (shouldLogout) {
      logout()
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && shouldLogout) {
        logout()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [shouldLogout])

  if (shouldLogout) {
    return null
  }

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
