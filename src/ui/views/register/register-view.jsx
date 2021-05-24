import {Component} from 'react'

import {Button, Checkbox, Hidden, Link, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {EntryLeftPanel} from '@components/entry-left-panel'
import {EntryRightPanel} from '@components/entry-right-panel'
import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {styles} from './register-view.style'

const textConsts = getLocalizedTexts(texts, 'en').registerScreen

class RegisterViewRaw extends Component {
  state = {}

  render() {
    const {classes} = this.props

    return (
      <div className={classes.root}>
        <Hidden smDown>
          <EntryLeftPanel />
        </Hidden>
        <EntryRightPanel
          handleRedirectClick={this.redirectOnClick}
          redirect={textConsts.redirect}
          title={textConsts.title}
        >
          {this.renderFormFields(classes)}

          <div className={classes.formFooter}>
            <Checkbox className={classes.checkbox} color="primary" />
            <Typography className={classes.label}>
              {textConsts.checkboxLabel}
              <Link href="#">{textConsts.termsAndConditions}</Link>
            </Typography>
          </div>
          <Button color="primary" disableElevation variant="contained">
            {textConsts.button}
          </Button>
        </EntryRightPanel>
      </div>
    )
  }
  renderFormFields = classes => (
    <div className={classes.formFields}>
      <Field
        containerClasses={clsx(classes.field, classes.fullWidth)}
        label={textConsts.emailLabel}
        placeholder={textConsts.emailPlaceholder}
        type="email"
      />
      <Field
        containerClasses={classes.field}
        label={textConsts.passwordLabel}
        placeholder={textConsts.passwordPlaceholder}
        type="password"
      />
      <Field
        containerClasses={classes.field}
        label={textConsts.rePasswordLabel}
        placeholder={textConsts.rePasswordPlaceholder}
        type="password"
      />
    </div>
  )
  redirectOnClick = () => {
    this.props.history.push('/auth')
  }
}

const RegisterView = withStyles(styles)(RegisterViewRaw)

export {RegisterView}
