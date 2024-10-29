import { memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { ArrowBackIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import '@typings/enums/button-style'

import { useStyles } from './user-info-edit-form.style'

import { AuthForm } from '../auth-form'

import { ActiveSessions } from './active-sessions'

export const UserInfoEditForm = memo(props => {
  const {
    user,
    onSubmit,
    onCloseModal,
    activeSessions,
    userInfoEditFormFlag,
    onToggleUserInfoEditFormFlag,
    onLogoutSession,
  } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleContainer}>
        {userInfoEditFormFlag ? (
          <>
            <p className={styles.title}>{t(TranslationKey['Change user details'])}</p>
            <button className={styles.activeSessions} onClick={onToggleUserInfoEditFormFlag}>
              {t(TranslationKey['Active sessions'])}
            </button>
          </>
        ) : (
          <>
            <CustomButton iconButton onClick={onToggleUserInfoEditFormFlag}>
              <ArrowBackIcon />
            </CustomButton>
            <p className={styles.title}>{t(TranslationKey['Active sessions'])}</p>
          </>
        )}
      </div>

      {userInfoEditFormFlag ? (
        <AuthForm editUser data={user} onSubmit={onSubmit} onRedirect={onCloseModal} />
      ) : (
        <ActiveSessions activeSessions={activeSessions} onLogoutSession={onLogoutSession} />
      )}
    </div>
  )
})
