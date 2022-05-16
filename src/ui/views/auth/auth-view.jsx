import {Component} from 'react'

import {Hidden} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {EntryLeftPanel} from '@components/entry-left-panel'
import {EntryRightPanel} from '@components/entry-right-panel'
import {AuthForm} from '@components/forms/auth-form'
import {LanguageSelector} from '@components/language-selector'

import {t} from '@utils/translations'

import {AuthViewModel} from './auth-view.model'
import {styles} from './auth-view.style'

@observer
export class AuthViewRaw extends Component {
  viewModel = new AuthViewModel({history: this.props.history})
  render() {
    const {classes: classNames} = this.props
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
          {this.renderError()}

          <LanguageSelector />
        </EntryRightPanel>
      </div>
    )
  }

  renderError = () => (
    <h3>
      {this.viewModel.error &&
        ((this.viewModel.error.body && this.viewModel.error.body.message) || this.viewModel.error.message)}
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
