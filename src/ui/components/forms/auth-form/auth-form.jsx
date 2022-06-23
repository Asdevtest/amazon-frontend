import LockIcon from '@mui/icons-material/Lock'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import React, {useState} from 'react'

import {Button, Checkbox, InputAdornment, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {TranslationKey} from '@constants/translations/translation-key'

import {Field} from '@components/field'

import {t} from '@utils/translations'

import {styles} from './auth-form.style'

const AuthFormRaw = ({classes: classNames, formFields, onChangeFormField, onSubmit}) => {
  const onSubmitForm = event => {
    event.preventDefault()
    onSubmit()
  }

  const [visibilityPass, setVisibilityPass] = useState(false)

  return (
    <div className={classNames.root}>
      <form className={classNames.formFields} onSubmit={onSubmitForm}>
        <Field
          withIcon
          containerClasses={classNames.field}
          label={t(TranslationKey.Email)}
          placeholder={t(TranslationKey.Email)}
          type="email"
          value={formFields.email}
          startAdornment={
            <InputAdornment position="end" className={classNames.inputAdornment}>
              <MailOutlineIcon color="primary" />
            </InputAdornment>
          }
          onChange={onChangeFormField('email')}
        />
        <div className={classNames.field}>
          <Field
            withIcon
            label={t(TranslationKey.Password)}
            placeholder={t(TranslationKey.Password)}
            type={!visibilityPass ? 'password' : 'text'}
            value={formFields.password}
            startAdornment={
              <InputAdornment position="end" className={classNames.inputAdornment}>
                <LockIcon color="primary" />
              </InputAdornment>
            }
            onChange={onChangeFormField('password')}
          />
          <div className={classNames.visibilityIcon} onClick={() => setVisibilityPass(!visibilityPass)}>
            {!visibilityPass ? <VisibilityOffIcon color="disabled" /> : <VisibilityIcon color="disabled" />}
          </div>
        </div>

        <div className={classNames.formFooter}>
          <div className={classNames.checkboxWrapper} onClick={onChangeFormField('remember')}>
            <Checkbox className={classNames.checkbox} color="primary" checked={formFields.remember} />
            <Typography className={classNames.label}>{t(TranslationKey['Remember me'])}</Typography>
          </div>
          <Typography className={classNames.forgotPassword}>{t(TranslationKey['Forgot password'])}</Typography>
        </div>
        <Button disableElevation type="submit" color="primary" variant="contained">
          {t(TranslationKey.Login)}
        </Button>
      </form>
    </div>
  )
}
export const AuthForm = withStyles(styles)(AuthFormRaw)
