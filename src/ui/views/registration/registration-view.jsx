import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AuthFormWrapper } from '@components/auth/auth-form-wrapper'
import { AuthPageBanner } from '@components/auth/auth-page-banner'
import { RegistrationForm } from '@components/forms/registration-form'

import { t } from '@utils/translations'
import { disallowsSpecialCharInEmailField, disallowsSpecialCharInFirstCharEmail } from '@utils/validation'

import { useStyles } from './registration-view.style'

import { RegistrationViewModel } from './registration-view.model'

export const RegistrationView = observer(({ history }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new RegistrationViewModel({ history }))

  useEffect(() => {
    viewModel.onLoadPage()
  })

  const renderError = () => (
    <h3>{viewModel.error && ((viewModel.error.body && viewModel.error.body.message) || viewModel.error.message)}</h3>
  )

  return (
    <div className={styles.root}>
      <AuthPageBanner />

      <AuthFormWrapper
        redirect={t(TranslationKey['Already have account?'])}
        title={t(TranslationKey.Registration)}
        onClickRedirect={viewModel.onClickRedirect}
        onClickThemeIcon={viewModel.onClickThemeIcon}
      >
        <RegistrationForm
          checkValidationNameOrEmail={viewModel.checkValidationNameOrEmail}
          formFields={{
            name: viewModel.name,
            email:
              disallowsSpecialCharInFirstCharEmail(viewModel.email) &&
              disallowsSpecialCharInEmailField(viewModel.email),
            password: viewModel.password,
            confirmPassword: viewModel.confirmPassword,
            acceptTerms: viewModel.acceptTerms,
          }}
          disableRegisterButton={viewModel.disableRegisterButton}
          onChangeFormField={viewModel.onChangeFormField}
          onSubmit={viewModel.onSubmitForm}
        />
        {renderError()}
      </AuthFormWrapper>
    </div>
  )
})
