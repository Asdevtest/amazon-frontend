import { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import LockIcon from '@mui/icons-material/Lock'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PersonIcon from '@mui/icons-material/Person'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Checkbox, InputAdornment } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field'

import { t } from '@utils/translations'
import { validationMessagesArray } from '@utils/validation'

import { useStyles } from './registration-form.style'

export const RegistrationForm = memo(props => {
  const { formFields, disableRegisterButton, onChangeFormField, onSubmit, checkValidationNameOrEmail } = props

  const { classes: styles, cx } = useStyles()
  const [visibilityPass, setVisibilityPass] = useState(false)
  const [errorOneNumber, setErrorOneNumber] = useState(false)
  const [errorUppercaseLetter, setErrorUppercaseLetter] = useState(false)
  const [errorLowercaseLetter, setErrorLowercaseLetter] = useState(false)
  const [errorMinLength, setErrorMinLength] = useState(false)
  const [errorMaxLength, setErrorMaxLength] = useState(false)
  const [errorNoEngLetter, setErrorNoEngLetter] = useState(false)
  const [equalityError, setEqualityError] = useState(false)
  const [submit, setSubmit] = useState(false)

  const regExpNumber = /(?=.*[0-9])/g
  const regExpUpperCase = /(?=.*[A-Z])/g
  const regExpLowerCase = /(?=.*[a-z])/g
  const regExpEngLetter = /(?=.*[A-Za-z])/
  const regExpRuLetter = /(?=.*[А-Яа-я])/
  const regExpEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

  useEffect(() => {
    if (formFields.password.length < 6) {
      setErrorMinLength(true)
    } else {
      setErrorMinLength(false)
    }
    if (formFields.password.length > 32) {
      setErrorMaxLength(true)
    } else {
      setErrorMaxLength(false)
    }
    if (!formFields.password.match(regExpNumber)) {
      setErrorOneNumber(true)
    } else {
      setErrorOneNumber(false)
    }
    if (!formFields.password.match(regExpUpperCase)) {
      setErrorUppercaseLetter(true)
    } else {
      setErrorUppercaseLetter(false)
    }
    if (!formFields.password.match(regExpLowerCase)) {
      setErrorLowercaseLetter(true)
    } else {
      setErrorLowercaseLetter(false)
    }
    if (!formFields.password.match(regExpEngLetter)) {
      setErrorNoEngLetter(true)
    } else {
      setErrorNoEngLetter(false)
    }
    if (formFields.password.match(regExpRuLetter)) {
      setErrorNoEngLetter(true)
    } else {
      setErrorNoEngLetter(false)
    }
    if (formFields.password !== formFields.confirmPassword) {
      setEqualityError(true)
    } else {
      setEqualityError(false)
    }
  }, [formFields.password, formFields.confirmPassword, SettingsModel.languageTag])

  const onSubmitForm = event => {
    event.preventDefault()
    setSubmit(prev => !prev)

    onSubmit()

    setTimeout(() => setSubmit(prev => !prev), 5000)
  }

  const showError =
    (submit && errorLowercaseLetter) ||
    (submit && errorMinLength) ||
    (submit && errorOneNumber) ||
    (submit && errorUppercaseLetter) ||
    (submit && errorMaxLength)
  const disabledButton =
    formFields.name === '' ||
    formFields.email === '' ||
    formFields.password === '' ||
    !formFields.acceptTerms ||
    disableRegisterButton ||
    formFields.password !== formFields.confirmPassword

  return (
    <form className={styles.form} onSubmit={onSubmitForm}>
      <Field
        withIcon
        inputProps={{ maxLength: 30 }}
        inputClasses={styles.input}
        containerClasses={styles.field}
        labelClasses={styles.label}
        label={t(TranslationKey.Name)}
        placeholder={t(TranslationKey.Name)}
        error={
          submit &&
          !checkValidationNameOrEmail?.nameIsUnique &&
          t(TranslationKey['A user with this name already exists'])
        }
        value={formFields.name}
        startAdornment={
          <InputAdornment position="end" className={styles.inputAdornment}>
            <PersonIcon color="primary" />
          </InputAdornment>
        }
        onChange={onChangeFormField('name')}
      />

      <div className={styles.fieldContainer}>
        <Field
          withIcon
          type="text"
          autoComplete="username"
          inputProps={{ maxLength: 30 }}
          inputClasses={styles.input}
          containerClasses={styles.field}
          labelClasses={styles.label}
          label={t(TranslationKey.Email)}
          placeholder={t(TranslationKey.Email)}
          error={
            submit &&
            regExpEmail.test(formFields.email) &&
            !checkValidationNameOrEmail?.emailIsUnique &&
            t(TranslationKey['A user with this email already exists'])
          }
          value={formFields.email}
          startAdornment={
            <InputAdornment position="end" className={styles.inputAdornment}>
              <MailOutlineIcon color="primary" />
            </InputAdornment>
          }
          onChange={onChangeFormField('email')}
        />

        {submit && !regExpEmail.test(formFields.email) && (
          <p className={cx(styles.validationText, styles.red)}>{`${formFields.email} ${t(
            TranslationKey['is not a valid email address'],
          )}`}</p>
        )}
      </div>

      <div className={styles.fieldContainer}>
        <Field
          withIcon
          autoComplete="new-password"
          inputProps={{ maxLength: 128 }}
          labelClasses={styles.label}
          error={showError}
          inputClasses={styles.input}
          containerClasses={styles.field}
          label={t(TranslationKey.Password)}
          placeholder={t(TranslationKey.Password)}
          type={visibilityPass ? 'text' : 'password'}
          value={formFields.password}
          startAdornment={
            <InputAdornment position="end" className={styles.inputAdornment}>
              <LockIcon color="primary" />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="start" onClick={() => setVisibilityPass(prev => !prev)}>
              {visibilityPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </InputAdornment>
          }
          onChange={onChangeFormField('password')}
        />

        <div className={styles.validationMessages}>
          {validationMessagesArray(
            errorMinLength,
            errorOneNumber,
            errorUppercaseLetter,
            errorLowercaseLetter,
            errorNoEngLetter,
          ).map((text, index) => (
            <span key={index} className={cx(styles.validationText, { [styles.red]: submit && text.error })}>
              {text.name}
            </span>
          ))}
        </div>

        {formFields.password.length > 32 && (
          <p className={cx(styles.validationText, styles.red)}>
            {`${t(TranslationKey.maximum)} 32 ${t(TranslationKey.characters)}.`}
          </p>
        )}
      </div>

      <Field
        withIcon
        autoComplete="new-password"
        inputProps={{ maxLength: 128 }}
        labelClasses={styles.label}
        error={equalityError && t(TranslationKey["Passwords don't match"])}
        inputClasses={styles.input}
        containerClasses={styles.field}
        label={t(TranslationKey['Re-type Password'])}
        placeholder={t(TranslationKey.Password)}
        type={!visibilityPass ? 'password' : 'text'}
        value={formFields.confirmPassword}
        startAdornment={
          <InputAdornment position="end" className={styles.inputAdornment}>
            <LockIcon color="primary" />
          </InputAdornment>
        }
        onChange={onChangeFormField('confirmPassword')}
      />

      <div className={styles.footer}>
        <Checkbox color="primary" checked={formFields.acceptTerms} onClick={onChangeFormField('acceptTerms')} />

        <div className={styles.termsContainer}>
          <p>{t(TranslationKey['Agree with'])}</p>

          <Link href="#" to="/terms" target="_blank" rel="noopener" className={styles.link}>
            {t(TranslationKey['Terms & Conditions'])}
          </Link>
        </div>
      </div>

      <Button disabled={disabledButton}>{t(TranslationKey.Registration)}</Button>
    </form>
  )
})
