import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { formatNormDateTime } from '@utils/date-time'
import { t } from '@utils/translations'

import { IActiveSession } from '@typings/shared/active-session'

import { useStyles } from './session.style'

import { getBrowserAndVersion } from './helpers/get-browser-and-version'
import { getDeviceIcon } from './helpers/get-device-icon'

interface SessionProps {
  activeSession: IActiveSession
  onLogoutSession: (sessionCreatedAt: string) => void
}

export const Session: FC<SessionProps> = memo(({ activeSession, onLogoutSession }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        {getDeviceIcon(activeSession.device)}
        <div>
          <p className={styles.text}>{getBrowserAndVersion(activeSession.device)}</p>
          <p className={styles.text}>{formatNormDateTime(activeSession.createdAt)}</p>
        </div>
      </div>

      <CustomButton
        danger
        className={styles.button}
        type="primary"
        onClick={e => {
          e.preventDefault()
          onLogoutSession(activeSession.createdAt)
        }}
      >
        {t(TranslationKey['Close the access'])}
      </CustomButton>
    </div>
  )
})
