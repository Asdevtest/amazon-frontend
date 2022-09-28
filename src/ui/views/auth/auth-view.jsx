import {Component} from 'react'

import {Hidden} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {EntryLeftPanel} from '@components/entry-left-panel'
import {EntryRightPanel} from '@components/entry-right-panel'
import {AuthForm} from '@components/forms/auth-form'

import {t} from '@utils/translations'

import {AuthViewModel} from './auth-view.model'
import {styles} from './auth-view.style'

@observer
export class AuthViewRaw extends Component {
  viewModel = new AuthViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.onLoadPage()
  }

  componentDidUpdate() {
    this.viewModel.onLoadPage()
  }

  render() {
    const {classes: classNames} = this.props
    console.log(this.viewModel?.error)
    return (
      <div className={classNames.root}>
        <Hidden smDown>
          <EntryLeftPanel />
        </Hidden>
        <EntryRightPanel
          redirect={t(TranslationKey['Create account'])}
          title={t(TranslationKey['Sign in'])}
          onClickRedirect={this.onClickRedirect}
        >
          <AuthForm
            formFields={{
              email: this.viewModel.email,
              password: this.viewModel.password,
              remember: this.viewModel.remember,
            }}
            onChangeFormField={this.onChangeFormField}
            onSubmit={this.viewModel.onSubmitForm}
          />
          {SettingsModel.languageTag && this.renderError()}
        </EntryRightPanel>
      </div>
    )
  }

  renderError = () => (
    <h3>
      {this.viewModel.error &&
        ((this.viewModel.error.body.statusCode === 404 && t(TranslationKey['User not found'])) ||
          (this.viewModel.error.body.statusCode === 403 && t(TranslationKey['Incorrect email or password'])) ||
          t(TranslationKey['The user is waiting for confirmation by the Administrator']))}
    </h3>
  )

  onClickRedirect = () => {
    this.props.history.push('/registration')
  }

  onChangeFormField = fieldName => event => {
    this.viewModel.setField(fieldName)(event.target.value)
  }
}

export const AuthView = withStyles(styles)(AuthViewRaw)
