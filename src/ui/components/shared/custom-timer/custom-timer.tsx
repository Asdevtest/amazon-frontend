import { Tooltip } from 'antd'
import { FC, ReactNode, memo, useEffect } from 'react'
import { AiOutlinePoweroff } from 'react-icons/ai'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useCountdown } from '@hooks/use-countdown'

import { useStyles } from './custom-timer.style'

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

  const { classes: styles, cx, theme } = useStyles()
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
    <Tooltip
      title={tooltip}
      overlayInnerStyle={{
        color: theme.palette.text.general,
        background: theme.palette.background.general,
        maxWidth: 200,
      }}
    >
      <div className={cx(styles.root, className)}>
        {startIcon}
        {`${days} : ${hours} : ${minutes} : ${seconds}`}
        {endIcon}
      </div>
    </Tooltip>
  )
})
