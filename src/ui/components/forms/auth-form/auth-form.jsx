import { memo, useState } from 'react'

import LockIcon from '@mui/icons-material/Lock'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Checkbox, InputAdornment } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field'

import { t } from '@utils/translations'

import { useStyles } from './auth-form.style'

export const AuthForm = memo(props => {
  const { formFields, disableLoginButton, onChangeFormField, onSubmit } = props

  const { classes: styles } = useStyles()

  const [visibilityPass, setVisibilityPass] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

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

  return (
    <form className={styles.form} onSubmit={onSubmitForm}>
      <Field
        withIcon
        autoComplete="username"
        error={isSubmit && formFields.email === '' && t(TranslationKey['The field must be filled in'])}
        containerClasses={styles.field}
        inputClasses={styles.input}
        label={t(TranslationKey.Email)}
        labelClasses={styles.label}
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

      <Field
        withIcon
        autoComplete="current-password"
        error={isSubmit && formFields.password === '' && t(TranslationKey['The field must be filled in'])}
        label={t(TranslationKey.Password)}
        containerClasses={styles.field}
        labelClasses={styles.label}
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

      <div className={styles.formFooter}>
        <div className={styles.checkboxWrapper} onClick={onChangeFormField('remember')}>
          <Checkbox color="primary" checked={formFields.remember} />
          <p className={styles.rememberText}>{t(TranslationKey['Remember me'])}</p>
        </div>

        <p className={styles.forgotPassword}>{t(TranslationKey['Forgot password'])}</p>
      </div>

      <Button disabled={disableLoginButton} type="submit">
        {t(TranslationKey.Login)}
      </Button>
    </form>
  )
})
