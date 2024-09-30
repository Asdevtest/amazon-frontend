import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { appVersion } from '@constants/app-version'
import { TranslationKey } from '@constants/translations/translation-key'

import { AuthForm } from '@components/forms/auth-form'
import { LanguageSelect, ThemeSelect } from '@components/layout/header/components'
import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { HistoryType } from '@typings/types/history'

import { useStyles } from './auth-view.style'

import { AuthViewModel } from '../../model/auth-view.model'
import { Banner } from '../banner/banner'

interface AuthViewProps {
  history: HistoryType
  auth: boolean
}

export const AuthView: FC<AuthViewProps> = observer(({ history, auth }) => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new AuthViewModel({ history, auth }), [])
  const title = auth ? t(TranslationKey['Sign in']) : t(TranslationKey.Registration)

  return (
    <div className={styles.root}>
      <Banner />

      <div className={styles.rightPanel}>
        <div className={styles.formWrapper}>
          <div className={styles.flexContainer}>
            <p className={styles.title}>{title}</p>

            <div className={styles.flexContainer}>
              <ThemeSelect />
              <LanguageSelect />
            </div>
          </div>

          <AuthForm
            auth={auth}
            loading={viewModel.loading}
            onSubmit={viewModel.onSubmitForm}
            onRedirect={viewModel.onRedirect}
          />
        </div>

        <div className={styles.versionContainer}>
          <CustomButton
            disabled={!auth}
            type="link"
            confirmText={t(TranslationKey['Temporary session data will be reset'])}
            onClick={viewModel.onClickVersion}
          >
            {appVersion}
          </CustomButton>
        </div>
      </div>
    </div>
  )
})
