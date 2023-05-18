import {useEffect, useState} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {TranslationKey} from '@constants/translations/translation-key'

import {EntryLeftPanel} from '@components/auth/entry-left-panel'
import {EntryRightPanel} from '@components/auth/entry-right-panel'
import {RegistrationForm} from '@components/forms/registration-form'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'

import {t} from '@utils/translations'
import {disallowsSpecialCharInEmailField, disallowsSpecialCharInFirstCharEmail} from '@utils/validation'

import {RegistrationViewModel} from './registration-view.model'
import {styles} from './registration-view.style'

export const RegistrationViewRaw = props => {
  const {classes: classNames} = props

  const [viewModel] = useState(() => new RegistrationViewModel({history: props.history}))

  useEffect(() => {
    viewModel.onLoadPage()
  })

  const renderError = () => (
    <h3>{viewModel.error && ((viewModel.error.body && viewModel.error.body.message) || viewModel.error.message)}</h3>
  )

  return (
    <div className={classNames.root}>
      <EntryLeftPanel />

      <EntryRightPanel
        redirect={t(TranslationKey['Already have account?'])}
        title={t(TranslationKey.Registration)}
        onClickRedirect={viewModel.onClickRedirect}
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
          onChangeFormField={viewModel.onChangeFormField}
          onSubmit={viewModel.onSubmitForm}
        />
        {renderError()}
      </EntryRightPanel>

      <SuccessInfoModal
        openModal={viewModel.showSuccessRegistrationModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSuccessRegistrationModal')}
        title={t(TranslationKey['Successful registration'])}
        successBtnText={t(TranslationKey.Ok)}
        onClickSuccessBtn={() => {
          viewModel.onTriggerOpenModal('showSuccessRegistrationModal')
        }}
      />

      <WarningInfoModal
        openModal={viewModel.showErrorRegistrationModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showErrorRegistrationModal')}
        title={t(TranslationKey['Registration error'])}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showErrorRegistrationModal')
        }}
      />
    </div>
  )
}

export const RegistrationView = withStyles(observer(RegistrationViewRaw), styles)
