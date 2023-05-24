/* eslint-disable no-unused-vars */
import LockIcon from '@mui/icons-material/Lock'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Button, Checkbox, InputAdornment, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'

import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'

import { t } from '@utils/translations'

import { styles } from './auth-form.style'

const AuthFormRaw = ({ classes: classNames, formFields, onChangeFormField, onSubmit }) => {
  const onSubmitForm = event => {
    event.preventDefault()
    setIsSubmit(true)
    !emptyEmail && !emptyPassword && onSubmit()
  }

  useEffect(() => {
    if (formFields.email === '') {
      setEmptyEmail(true)
    }
    if (formFields.password === '') {
      setEmptyPassword(true)
    }
    if (formFields.email !== '') {
      setEmptyEmail(false)
    }
    if (formFields.password !== '') {
      setEmptyPassword(false)
    }
  }, [formFields.email, formFields.password])

  const [visibilityPass, setVisibilityPass] = useState(false)
  const [emptyEmail, setEmptyEmail] = useState(false)
  const [emptyPassword, setEmptyPassword] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  return (
    <div className={classNames.root}>
      <form className={classNames.formFields} onSubmit={onSubmitForm}>
        <Field
          withIcon
          error={isSubmit && emptyEmail && t(TranslationKey['The field must be filled in'])}
          containerClasses={classNames.field}
          inputClasses={classNames.input}
          label={t(TranslationKey.Email)}
          labelClasses={classNames.labelField}
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
            error={isSubmit && emptyPassword && t(TranslationKey['The field must be filled in'])}
            label={t(TranslationKey.Password)}
            labelClasses={classNames.labelField}
            inputClasses={classNames.input}
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
            {!visibilityPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
        </div>

        <div className={classNames.formFooter}>
          <div className={classNames.checkboxWrapper} onClick={onChangeFormField('remember')}>
            <Checkbox className={classNames.checkbox} color="primary" checked={formFields.remember} />
            <Typography className={classNames.label}>{t(TranslationKey['Remember me'])}</Typography>
          </div>
          <Typography className={classNames.forgotPassword}>{t(TranslationKey['Forgot password'])}</Typography>
        </div>
        <Button type="submit" variant="contained" className={classNames.loginBtn}>
          {t(TranslationKey.Login)}
        </Button>
      </form>
    </div>
  )
}
export const AuthForm = withStyles(AuthFormRaw, styles)
