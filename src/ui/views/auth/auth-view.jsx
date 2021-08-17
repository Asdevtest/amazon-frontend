import {Component} from 'react'

import {Hidden} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {EntryLeftPanel} from '@components/entry-left-panel'
import {EntryRightPanel} from '@components/entry-right-panel'
import {AuthForm} from '@components/forms/auth-form'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {AuthViewModel} from './auth-view.model'
import {styles} from './auth-view.style'

const textConsts = getLocalizedTexts(texts, 'en').authView

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
        <EntryRightPanel redirect={textConsts.redirect} title={textConsts.title} onClickRedirect={this.onClickRedirect}>
          <AuthForm
            formFields={{
              email: this.viewModel.email,
              password: this.viewModel.password,
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
  )

  onClickRedirect = () => {
    this.props.history.push('/registration')
  }

  onChangeFormField = fieldName => event => {
    this.viewModel.setField(fieldName)(event.target.value)
  }
}

export const AuthView = withStyles(styles)(AuthViewRaw)
