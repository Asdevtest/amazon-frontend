import React from 'react'

import {Button, Checkbox, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {texts} from '@constants/texts'

import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {styles} from './auth-form.style'

const textConsts = getLocalizedTexts(texts, 'en').authView

const AuthFormRaw = ({classes: classNames, formFields, onChangeFormField, onSubmit}) => (
  <div className={classNames.root}>
    <div className={classNames.formFields}>
      <Field
        containerClasses={classNames.field}
        label={textConsts.emailLabel}
        placeholder={textConsts.emailPlaceholder}
        type="email"
        value={formFields.email}
        onChange={onChangeFormField('email')}
      />
      <Field
        containerClasses={classNames.field}
        label={textConsts.passwordLabel}
        placeholder={textConsts.passwordPlaceholder}
        type="password"
        value={formFields.password}
        onChange={onChangeFormField('password')}
      />
      <div className={classNames.formFooter}>
        <div className={classNames.checkboxWrapper}>
          <Checkbox
            className={classNames.checkbox}
            color="primary"
            value={formFields.remember}
            onChange={onChangeFormField('remember')}
          />
          <Typography className={classNames.label}>{textConsts.checkboxLabel}</Typography>
        </div>
        <Typography className={classNames.forgotPassword}>{textConsts.forgotPassword}</Typography>
      </div>
      <Button disableElevation color="primary" variant="contained" onClick={onSubmit}>
        {textConsts.button}
      </Button>
    </div>
  </div>
)

export const AuthForm = withStyles(styles)(AuthFormRaw)
