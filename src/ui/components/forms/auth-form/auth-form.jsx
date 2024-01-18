import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import LockIcon from '@mui/icons-material/Lock'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Checkbox, InputAdornment, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'

import { t } from '@utils/translations'

import { styles } from './auth-form.style'

const AuthFormRaw = ({ classes: styles, formFields, onChangeFormField, onSubmit }) => {
  const onSubmitForm = event => {
    event.preventDefault()
    setIsSubmit(true)

    if (formFields.email === '' || formFields.password === '') {
      setTimeout(() => {
        setIsSubmit(false)
      }, 3000)

      return
    }

    onSubmit()
  }

  const [visibilityPass, setVisibilityPass] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  return (
    <div className={styles.root}>
      <form className={styles.formFields} onSubmit={onSubmitForm}>
        <Field
          withIcon
          autoComplete="username"
          error={isSubmit && formFields.email === '' && t(TranslationKey['The field must be filled in'])}
          containerClasses={styles.field}
          inputClasses={styles.input}
          label={t(TranslationKey.Email)}
          labelClasses={styles.labelField}
          placeholder={t(TranslationKey.Email)}
          type="email"
          value={formFields.email}
          startAdornment={
            <InputAdornment position="end" className={styles.inputAdornment}>
              <MailOutlineIcon color="primary" />
            </InputAdornment>
          }
          onChange={onChangeFormField('email')}
        />
        <div className={styles.field}>
          <Field
            withIcon
            autoComplete="current-password"
            error={isSubmit && formFields.password === '' && t(TranslationKey['The field must be filled in'])}
            label={t(TranslationKey.Password)}
            labelClasses={styles.labelField}
            inputClasses={styles.input}
            placeholder={t(TranslationKey.Password)}
            type={visibilityPass ? 'text' : 'password'}
            value={formFields.password}
            startAdornment={
              <InputAdornment position="end" className={styles.inputAdornment}>
                <LockIcon color="primary" />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment
                position="start"
                className={styles.inputAdornmentVisibility}
                onClick={() => setVisibilityPass(!visibilityPass)}
              >
                {visibilityPass ? (
                  <VisibilityIcon className={styles.visibilityIcon} />
                ) : (
                  <VisibilityOffIcon className={styles.visibilityIcon} />
                )}
              </InputAdornment>
            }
            onChange={onChangeFormField('password')}
          />
        </div>

        <div className={styles.formFooter}>
          <div className={styles.checkboxWrapper} onClick={onChangeFormField('remember')}>
            <Checkbox className={styles.checkbox} color="primary" checked={formFields.remember} />
            <Typography className={styles.label}>{t(TranslationKey['Remember me'])}</Typography>
          </div>
          <Typography className={styles.forgotPassword}>{t(TranslationKey['Forgot password'])}</Typography>
        </div>
        <Button type="submit" className={styles.loginBtn}>
          {t(TranslationKey.Login)}
        </Button>
      </form>
    </div>
  )
}
export const AuthForm = withStyles(observer(AuthFormRaw), styles)
