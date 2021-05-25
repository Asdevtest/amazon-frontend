import {Component} from 'react'

import {Hidden} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {EntryLeftPanel} from '@components/entry-left-panel'
import {EntryRightPanel} from '@components/entry-right-panel'
import {RegistrationForm} from '@components/forms/registration-form'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {RegistrationViewModel} from './registration-view.model'
import {styles} from './registration-view.style'

const textConsts = getLocalizedTexts(texts, 'en').registerScreen

@observer
class RegistrstionViewRaw extends Component {
  viewModel = new RegistrationViewModel({history: this.props.history})
  render() {
    const {classes: classNames} = this.props
    return (
      <div className={classNames.root}>
        <Hidden smDown>
          <EntryLeftPanel />
        </Hidden>
        <EntryRightPanel redirect={textConsts.redirect} title={textConsts.title} onClickRedirect={this.onClickRedirect}>
          <RegistrationForm
            formFields={{
              email: this.viewModel.email,
              password: this.viewModel.password,
              confirmPassword: this.viewModel.confirmPassword,
              acceptTerms: this.viewModel.acceptTerms,
            }}
            onChangeFormField={this.onChangeFormField}
            onSubmit={this.viewModel.onSubmitForm}
          />
          {this.renderError()}
        </EntryRightPanel>
      </div>
    )
  }

  renderError = () => (
    <h3>
      {this.viewModel.error &&
        ((this.viewModel.error.body && this.viewModel.error.body.message) || this.viewModel.error.message)}
    </h3>
  ) // TODO: fix error output

  onClickRedirect = () => {
    this.props.history.push('/auth')
  }

  onChangeFormField = fieldName => event => {
    this.viewModel.setField(fieldName)(event.target.value)
  }
}

export const RegistrationView = withStyles(styles)(RegistrstionViewRaw)
