import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { AuthFormWrapper } from '@components/auth/auth-form-wrapper'
import { AuthPageBanner } from '@components/auth/auth-page-banner'
import { AuthForm } from '@components/forms/auth-form'

import { t } from '@utils/translations'

import { styles } from './auth-view.style'

import { AuthViewModel } from './auth-view.model'

export const AuthViewRaw = props => {
  const [viewModel] = useState(() => new AuthViewModel({ history: props.history }))
  const { classes: styles } = props

  useEffect(() => {
    viewModel.onLoadPage()
  }, [])

  const onChangeFormField = fieldName => event => {
    viewModel.setField(fieldName)(event.target.value)
  }

  const onClickRedirect = () => {
    props.history.push('/registration')
  }

  return (
    <div className={styles.root}>
      <AuthPageBanner />

      <AuthFormWrapper
        redirect={t(TranslationKey['Create account'])}
        title={t(TranslationKey['Sign in'])}
        showConfirmModal={viewModel.showConfirmModal}
        confirmModalSettings={viewModel.confirmModalSettings}
        onClickRedirect={onClickRedirect}
        onClickThemeIcon={viewModel.onClickThemeIcon}
        onToggleModal={viewModel.onToggleModal}
        onClickVersion={viewModel.onClickVersion}
      >
        <AuthForm
          formFields={{
            email: viewModel.email,
            password: viewModel.password,
            remember: viewModel.remember,
          }}
          onChangeFormField={onChangeFormField}
          onSubmit={viewModel.onSubmitForm}
        />
        {SettingsModel.languageTag && (
          <Typography className={styles.error}>
            {viewModel.error &&
              ((viewModel.error.body?.statusCode === 404 && t(TranslationKey['User not found'])) ||
                (viewModel.error.body?.message === 'User blocked by administrator' &&
                  t(TranslationKey['User blocked by administrator'])) ||
                (viewModel.error?.message === 'The user is waiting for confirmation by the Administrator' &&
                  t(TranslationKey['The user is waiting for confirmation by the Administrator'])) ||
                (viewModel.error.body?.statusCode === 403 && t(TranslationKey['Incorrect email or password'])) ||
                t(TranslationKey.Error))}
          </Typography>
        )}
      </AuthFormWrapper>
    </div>
  )
}

export const AuthView = withStyles(observer(AuthViewRaw), styles)
