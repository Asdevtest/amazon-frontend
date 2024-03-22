import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { ActiveSession } from '@typings/shared/active-session'

import { useStyles } from './active-sessions.style'

import { Session } from './session'

interface ActiveSessionsProps {
  activeSessions: ActiveSession[]
  onLogoutSession: (sessionCreatedAt: string) => void
}

export const ActiveSessions: FC<ActiveSessionsProps> = memo(({ activeSessions, onLogoutSession }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.wrapper, { [styles.noActiveSessions]: activeSessions.length === 0 })}>
      {activeSessions.length > 0 ? (
        <div className={styles.activeSessions}>
          {activeSessions.map((activeSession, index) => (
            <Session key={index} activeSession={activeSession} onLogoutSession={onLogoutSession} />
          ))}
        </div>
      ) : (
        <p className={styles.title}>{t(TranslationKey['No active sessions'])}</p>
      )}
    </div>
  )
})
