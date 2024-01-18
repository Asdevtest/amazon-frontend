import { cx } from '@emotion/css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from 'tss-react/mui'

import LockIcon from '@mui/icons-material/Lock'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PersonIcon from '@mui/icons-material/Person'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Checkbox, InputAdornment, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'

import { t } from '@utils/translations'
import { validationMessagesArray } from '@utils/validation'

import { styles } from './registration-form.style'

export const RegistrationFormRaw = ({
  classes: styles,
  formFields,
  onChangeFormField,
  onSubmit,
  checkValidationNameOrEmail,
  isRecoverPassword,
}) => {
  const [visibilityPass, setVisibilityPass] = useState(false)
  const [visibilityOldPass, setVisibilityOldPass] = useState(false)
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
  }, [formFields.password, formFields.confirmPassword, errorOneNumber, errorUppercaseLetter, SettingsModel.languageTag])

  const onSubmitForm = event => {
    event.preventDefault()
    setSubmit(true)
    !errorLowercaseLetter &&
      !errorMinLength &&
      !errorOneNumber &&
      !errorUppercaseLetter &&
      !errorMaxLength &&
      !equalityError &&
      !errorNoEngLetter &&
      onSubmit()
  }

  const showError =
    (submit && errorLowercaseLetter) ||
    (submit && errorMinLength) ||
    (submit && errorOneNumber) ||
    (submit && errorUppercaseLetter) ||
    (submit && errorMaxLength)

  return (
    <form className={styles.root} onSubmit={onSubmitForm}>
      <div className={styles.formFields}>
        {!isRecoverPassword ? (
          <>
            <Field
              withIcon
              inputProps={{ maxLength: 30 }}
              inputClasses={styles.input}
              containerClasses={styles.field}
              labelClasses={styles.labelField}
              label={t(TranslationKey.Name)}
              placeholder={t(TranslationKey.Name)}
              error={
                checkValidationNameOrEmail.nameIsUnique === false &&
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
            <Field
              withIcon
              autoComplete="username"
              inputProps={{ maxLength: 30 }}
              inputClasses={styles.input}
              containerClasses={styles.field}
              labelClasses={styles.labelField}
              label={t(TranslationKey.Email)}
              placeholder={t(TranslationKey.Email)}
              type="email"
              error={
                checkValidationNameOrEmail?.emailIsUnique === false
                  ? t(TranslationKey['A user with this email already exists'])
                  : ''
              }
              value={formFields.email}
              startAdornment={
                <InputAdornment position="end" className={styles.inputAdornment}>
                  <MailOutlineIcon color="primary" />
                </InputAdornment>
              }
              onChange={onChangeFormField('email')}
              onKeyPress={event => {
                const charCode = event.which || event.keyCode
                const char = String.fromCharCode(charCode)
                const emailRegex = /^[a-zA-Z0-9._%+-@]+$/

                if (!emailRegex.test(char)) {
                  event.preventDefault()
                }
              }}
            />
          </>
        ) : null}
        {isRecoverPassword && (
          <div className={styles.field}>
            <Field
              disabled={isRecoverPassword}
              withIcon={!isRecoverPassword}
              inputProps={{ maxLength: 128 }}
              labelClasses={styles.labelField}
              error={showError}
              inputClasses={styles.input}
              label={t(TranslationKey['Old password'])}
              placeholder={t(TranslationKey.Password)}
              type={!visibilityOldPass ? 'password' : 'text'}
              value={formFields.password}
              startAdornment={
                !isRecoverPassword ? (
                  <InputAdornment position="end" className={styles.inputAdornment}>
                    <LockIcon color="primary" />
                  </InputAdornment>
                ) : null
              }
              endAdornment={
                <InputAdornment
                  position="start"
                  className={styles.inputAdornmentVisibility}
                  onClick={() => setVisibilityOldPass(!visibilityOldPass)}
                >
                  {visibilityOldPass ? (
                    <VisibilityIcon className={styles.visibilityIcon} />
                  ) : (
                    <VisibilityOffIcon className={styles.visibilityIcon} />
                  )}
                </InputAdornment>
              }
              onChange={onChangeFormField('password')}
            />
          </div>
        )}

        <div className={styles.field}>
          <Field
            autoComplete="new-password"
            disabled={isRecoverPassword}
            withIcon={!isRecoverPassword}
            inputProps={{ maxLength: 128 }}
            labelClasses={styles.labelField}
            error={showError}
            inputClasses={styles.input}
            label={isRecoverPassword ? t(TranslationKey['New password']) : t(TranslationKey.Password)}
            placeholder={t(TranslationKey.Password)}
            type={!visibilityPass ? 'password' : 'text'}
            value={formFields.password}
            startAdornment={
              !isRecoverPassword ? (
                <InputAdornment position="end" className={styles.inputAdornment}>
                  <LockIcon color="primary" />
                </InputAdornment>
              ) : null
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

          <div className={styles.validationMessage}>
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
          <div className={styles.validationHiddenMessage}>
            <Typography
              className={cx(
                styles.validationHiddenText,
                { [styles.red]: submit && errorMaxLength },
                { [styles.visibility]: errorMaxLength },
              )}
            >
              {`${t(TranslationKey.maximum)} 32 ${t(TranslationKey.characters)}`}
            </Typography>
          </div>
        </div>
        <div className={styles.field}>
          <Field
            autoComplete="new-password"
            disabled={isRecoverPassword}
            withIcon={!isRecoverPassword}
            inputProps={{ maxLength: 128 }}
            labelClasses={styles.labelField}
            error={submit && equalityError && t(TranslationKey["Passwords don't match"])}
            inputClasses={styles.input}
            label={
              isRecoverPassword ? t(TranslationKey['Re-enter the new password']) : t(TranslationKey['Re-type Password'])
            }
            placeholder={t(TranslationKey.Password)}
            type={!visibilityPass ? 'password' : 'text'}
            value={formFields.confirmPassword}
            startAdornment={
              !isRecoverPassword ? (
                <InputAdornment position="end" className={styles.inputAdornment}>
                  <LockIcon color="primary" />
                </InputAdornment>
              ) : null
            }
            onChange={onChangeFormField('confirmPassword')}
          />
        </div>
      </div>
      {!isRecoverPassword ? (
        <>
          <div className={styles.formFooter} onClick={onChangeFormField('acceptTerms')}>
            <Checkbox className={styles.checkbox} color="primary" checked={formFields.acceptTerms} />

            <div className={styles.labelWrapper}>
              <Typography className={styles.label}>{t(TranslationKey['Agree with']) + ' '}</Typography>
              <Link href="#" to="/terms" target="_blank" rel="noopener" className={styles.link}>
                {t(TranslationKey['Terms & Conditions'])}
              </Link>
            </div>
          </div>
          <Button
            disabled={
              formFields.name === '' ||
              formFields.email === '' ||
              formFields.password === '' ||
              formFields.acceptTerms === false
            }
            color="primary"
            type="submit"
            variant="contained"
            className={styles.button}
          >
            {t(TranslationKey.Registration)}
          </Button>
        </>
      ) : null}
    </form>
  )
}
export const RegistrationForm = withStyles(RegistrationFormRaw, styles)
