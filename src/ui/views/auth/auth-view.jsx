import {Typography} from '@mui/material'

import {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

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

    return (
      <div className={classNames.root}>
        <EntryLeftPanel />

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
          {SettingsModel.languageTag && (
            <Typography className={classNames.error}>
              {this.viewModel.error &&
                ((this.viewModel.error.body?.statusCode === 404 && t(TranslationKey['User not found'])) ||
                  (this.viewModel.error.body?.message === 'User blocked by administrator' &&
                    t(TranslationKey['User blocked by administrator'])) ||
                  (this.viewModel.error.body?.statusCode === 403 && t(TranslationKey['Incorrect email or password'])) ||
                  /* t(TranslationKey['The user is waiting for confirmation by the Administrator'])*/ t(
                    TranslationKey.Error,
                  ))}
            </Typography>
          )}
        </EntryRightPanel>
      </div>
    )
  }

  onClickRedirect = () => {
    this.props.history.push('/registration')
  }

  onChangeFormField = fieldName => event => {
    this.viewModel.setField(fieldName)(event.target.value)
  }
}

export const AuthView = withStyles(AuthViewRaw, styles)
