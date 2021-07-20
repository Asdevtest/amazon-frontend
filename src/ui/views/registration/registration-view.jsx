import {Component} from 'react'

import {Hidden} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {EntryLeftPanel} from '@components/entry-left-panel'
import {EntryRightPanel} from '@components/entry-right-panel'
import {RegistrationForm} from '@components/forms/registration-form'
import {ErrorInfoModal} from '@components/modals/error-info-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {RegistrationViewModel} from './registration-view.model'
import {styles} from './registration-view.style'

const textConsts = getLocalizedTexts(texts, 'en').registerScreen

@observer
class RegistrationViewRaw extends Component {
  viewModel = new RegistrationViewModel({history: this.props.history})
  render() {
    const {classes: classNames} = this.props

    const {
      name,
      email,
      password,
      confirmPassword,
      acceptTerms,
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
        <EntryRightPanel redirect={textConsts.redirect} title={textConsts.title} onClickRedirect={onClickRedirect}>
          <RegistrationForm
            formFields={{
              name,
              email,
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
          title={textConsts.successRegistration}
          successBtnText={textConsts.okBtn}
          onClickSuccessBtn={() => {
            onTriggerOpenModal('showSuccessRegistrationModal')
          }}
        />

        <ErrorInfoModal
          openModal={showErrorRegistrationModal}
          setOpenModal={() => onTriggerOpenModal('showErrorRegistrationModal')}
          title={textConsts.errorRegistration}
          btnText={textConsts.okBtn}
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
  ) // TODO: fix error output
}

export const RegistrationView = withStyles(styles)(RegistrationViewRaw)
