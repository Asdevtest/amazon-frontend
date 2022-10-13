import {Hidden} from '@mui/material'

import {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {TranslationKey} from '@constants/translations/translation-key'

import {EntryLeftPanel} from '@components/entry-left-panel'
import {EntryRightPanel} from '@components/entry-right-panel'
import {RegistrationForm} from '@components/forms/registration-form'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'

import {t} from '@utils/translations'
import {disallowsSpecialCharInEmailField, disallowsSpecialCharInFirstCharEmail} from '@utils/validation'

import {RegistrationViewModel} from './registration-view.model'
import {styles} from './registration-view.style'

@observer
class RegistrationViewRaw extends Component {
  viewModel = new RegistrationViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.onLoadPage()
  }

  componentDidUpdate() {
    this.viewModel.onLoadPage()
  }

  render() {
    const {classes: classNames} = this.props

    const {
      name,
      email,
      password,
      confirmPassword,
      acceptTerms,
      checkValidationNameOrEmail,
      showErrorRegistrationModal,
      showSuccessRegistrationModal,
      onTriggerOpenModal,
      onSubmitForm,
      onClickRedirect,
      onChangeFormField,
    } = this.viewModel

    return (
      <div className={classNames.root}>
        <Hidden smDown>
          <EntryLeftPanel />
        </Hidden>
        <EntryRightPanel
          redirect={t(TranslationKey['Already have account?'])}
          title={t(TranslationKey.Registration)}
          onClickRedirect={onClickRedirect}
        >
          <RegistrationForm
            checkValidationNameOrEmail={checkValidationNameOrEmail}
            formFields={{
              name,
              email: disallowsSpecialCharInFirstCharEmail(email) && disallowsSpecialCharInEmailField(email),
              password,
              confirmPassword,
              acceptTerms,
            }}
            onChangeFormField={onChangeFormField}
            onSubmit={onSubmitForm}
          />
          {this.renderError()}
        </EntryRightPanel>

        <SuccessInfoModal
          openModal={showSuccessRegistrationModal}
          setOpenModal={() => onTriggerOpenModal('showSuccessRegistrationModal')}
          title={t(TranslationKey['Successful registration'])}
          successBtnText={t(TranslationKey.Ok)}
          onClickSuccessBtn={() => {
            onTriggerOpenModal('showSuccessRegistrationModal')
          }}
        />

        <WarningInfoModal
          openModal={showErrorRegistrationModal}
          setOpenModal={() => onTriggerOpenModal('showErrorRegistrationModal')}
          title={t(TranslationKey['Registration error'])}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showErrorRegistrationModal')
          }}
        />
      </div>
    )
  }

  renderError = () => (
    <h3>
      {this.viewModel.error &&
        ((this.viewModel.error.body && this.viewModel.error.body.message) || this.viewModel.error.message)}
    </h3>
  )
}

export const RegistrationView = withStyles(RegistrationViewRaw, styles)
