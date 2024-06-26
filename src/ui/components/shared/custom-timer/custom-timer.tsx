import { Tooltip } from 'antd'
import { FC, ReactNode, memo, useEffect, useMemo } from 'react'
import { AiOutlinePoweroff } from 'react-icons/ai'

import { TranslationKey } from '@constants/translations/translation-key'

import { UserModel } from '@models/user-model'

import { checkIsAdmin } from '@utils/checks'
import { t } from '@utils/translations'

import { Roles } from '@typings/enums/roles'
import { IFullUser } from '@typings/shared/full-user'

import { useCountdown } from '@hooks/use-countdown'

import { useStyles } from './custom-timer.style'

interface CustomTimerProps {
  targetDate: Date | string
  startIcon?: ReactNode
  endIcon?: ReactNode
  className?: string
  tooltipText?: string
}

export const CustomTimer: FC<CustomTimerProps> = memo(props => {
  const { targetDate, startIcon = <AiOutlinePoweroff />, endIcon, className, tooltipText } = props

  if (new Date() >= new Date(targetDate)) {
    return null
  }

  const { classes: styles, cx, theme } = useStyles()
  const { days, hours, minutes, seconds } = useCountdown(targetDate)

  const shouldLogout = useMemo(() => {
    return Number(days) + Number(hours) + Number(minutes) + Number(seconds) === 0
  }, [days, hours, minutes, seconds])

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible' && shouldLogout) {
      const userInfo = UserModel.userInfo as unknown as IFullUser
      const logoutCondition = !checkIsAdmin(Roles[userInfo?.role])

      if (logoutCondition) {
        UserModel.signOut()
      }
    }
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [targetDate])

  const tooltip = useMemo(() => {
    return tooltipText
      ? `${t(TranslationKey[tooltipText as TranslationKey])}: ${days} : ${hours} : ${minutes} : ${seconds}`
      : ''
  }, [tooltipText, days, hours, minutes, seconds])

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
