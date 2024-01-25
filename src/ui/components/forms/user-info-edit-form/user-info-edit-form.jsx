import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Typography } from '@mui/material'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

// import {SettingsModel} from '@models/settings-model'
import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { checkIsResearcher } from '@utils/checks'
import { t } from '@utils/translations'
import { validationMessagesArray } from '@utils/validation'

// import {RegistrationForm} from '../registration-form'
import { useStyles } from './user-info-edit-form.style'

const regExpEmailChecking =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const regExpNameCheking = /^(?! )(?!(?:.* ){1})/

const regExpNameStartCheking = /^(?! )/

export const UserInfoEditForm = observer(
  ({
    user,
    wrongPassword,
    onSubmit,
    onCloseModal,
    clearError,
    checkValidationNameOrEmail,
    resetProfileDataValidation,
  }) => {
    const { classes: styles, cx } = useStyles()

    useEffect(() => {
      return () => {
        resetProfileDataValidation()
      }
    }, [])

    const sourceFields = {
      name: user?.name || '',
      email: user?.email || '',
      oldPassword: '',
      password: '',
      confirmPassword: '',
    }

    const [emailInputError, setEmailInputError] = useState(false)

    const [formFields, setFormFields] = useState(sourceFields)

    const onChangeField = fieldName => event => {
      const newFormFields = { ...formFields }

      if (fieldName === 'email') {
        newFormFields[fieldName] = event.target.value.replace(/ /g, '').toLowerCase()
        setEmailInputError(false)
      } else if (fieldName === 'name') {
        const nameIsValid = regExpNameCheking.test(formFields.name)

        const nameIsValidStart = regExpNameStartCheking.test(event.target.value)

        if (!nameIsValidStart) {
          return
        }

        newFormFields[fieldName] = nameIsValid ? event.target.value : event.target.value.trim()
      } else if (fieldName === 'oldPassword' || fieldName === 'password' || fieldName === 'confirmPassword') {
        clearError(null)
        newFormFields[fieldName] = event.target.value.replace(/ /g, '')
      } else {
        newFormFields[fieldName] = event.target.value.replace(/ /g, '')
      }

      setFormFields(newFormFields)
    }

    const filterUniqFields = () => {
      const keys = Object.keys(sourceFields)

      const values1 = Object.values(sourceFields)

      const values2 = Object.values(formFields)

      let res = {}

      for (let i = 0; i < values1.length; i++) {
        if (values1[i] !== values2[i]) {
          res = { ...res, [keys[i]]: values2[i] }
        }
      }

      return res
    }

    const onClickSubmit = () => {
      const emailIsValid = regExpEmailChecking.test(formFields.email)

      if (startChangePassword) {
        setSubmit(true)
        !errorLowercaseLetter &&
          !errorMinLength &&
          !errorOneNumber &&
          !errorUppercaseLetter &&
          !errorMaxLength &&
          !equalityError &&
          !errorNoEngLetter
      }

      if (
        emailIsValid &&
        !errorLowercaseLetter &&
        !errorMinLength &&
        !errorOneNumber &&
        !errorUppercaseLetter &&
        !errorMaxLength &&
        !equalityError &&
        !errorNoEngLetter
      ) {
        onSubmit(filterUniqFields())
      } else {
        if (!emailIsValid) {
          setEmailInputError(true)
        }
      }
    }

    // const onSubmitForm = event => {
    //   event.preventDefault()
    //   setSubmit(true)
    //   !errorLowercaseLetter &&
    //     !errorMinLength &&
    //     !errorOneNumber &&
    //     !errorUppercaseLetter &&
    //     !errorMaxLength &&
    //     !equalityError &&
    //     !errorNoEngLetter &&
    //     onSubmit()
    // }

    const disabledSubmit =
      JSON.stringify(sourceFields) === JSON.stringify(formFields) ||
      emailInputError ||
      formFields.name === '' ||
      formFields.email === ''

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

    const [startChangePassword, setStartChangePassword] = useState(false)

    useEffect(() => {
      if (formFields.password !== '') {
        setStartChangePassword(true)
      }
      if (formFields.password === '') {
        setStartChangePassword(false)
      }
    }, [formFields.password])

    const regExpNumber = /(?=.*[0-9])/g
    const regExpUpperCase = /(?=.*[A-Z])/g
    const regExpLowerCase = /(?=.*[a-z])/g
    const regExpEngLetter = /(?=.*[A-Za-z])/
    const regExpRuLetter = /(?=.*[А-Яа-я])/

    useEffect(() => {
      if (startChangePassword) {
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
      }
    }, [formFields.oldPassword, formFields.password, formFields.confirmPassword])

    const showError =
      (submit && errorLowercaseLetter) ||
      (submit && errorMinLength) ||
      (submit && errorOneNumber) ||
      (submit && errorUppercaseLetter) ||
      (submit && errorMaxLength)

    return (
      <form className={styles.mainWrapper} onSubmit={onClickSubmit}>
        <Typography variant="h5" className={styles.mainTitle}>
          {t(TranslationKey['Enter information'])}
        </Typography>

        <Field
          label={t(TranslationKey.Name)}
          inputProps={{ maxLength: 25 }}
          labelClasses={styles.labelField}
          error={
            checkValidationNameOrEmail.nameIsUnique === false &&
            t(TranslationKey['A user with this name already exists'])
          }
          className={styles.textField}
          value={formFields.name}
          onChange={onChangeField('name')}
        />

        <Field
          disabled
          label={t(TranslationKey.Email)}
          inputProps={{ maxLength: 35 }}
          labelClasses={styles.labelField}
          error={
            (checkValidationNameOrEmail.emailIsUnique === false &&
              t(TranslationKey['A user with this email already exists'])) ||
            (emailInputError && t(TranslationKey['Invalid email!']))
          }
          className={styles.textField}
          type="email"
          value={formFields.email}
          onChange={onChangeField('email')}
        />

        <div className={styles.field}>
          <Field
            disabled={checkIsResearcher(UserRoleCodeMap[user.role])}
            inputProps={{ maxLength: 128 }}
            labelClasses={styles.labelField}
            error={wrongPassword && t(TranslationKey['Old password'])}
            inputClasses={styles.input}
            label={t(TranslationKey['Old password'])}
            placeholder={t(TranslationKey['Old password'])}
            type={!visibilityOldPass ? 'password' : 'text'}
            value={formFields.oldPassword}
            onChange={onChangeField('oldPassword')}
          />
          <div className={styles.visibilityIcon} onClick={() => setVisibilityOldPass(!visibilityOldPass)}>
            {!visibilityOldPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
        </div>

        <div className={styles.field}>
          <Field
            disabled={checkIsResearcher(UserRoleCodeMap[user.role])}
            inputProps={{ maxLength: 128 }}
            labelClasses={styles.labelField}
            error={showError}
            inputClasses={styles.input}
            label={t(TranslationKey['New password'])}
            placeholder={t(TranslationKey.Password)}
            type={!visibilityPass ? 'password' : 'text'}
            value={formFields.password}
            onChange={onChangeField('password')}
          />
          <div className={styles.visibilityIcon} onClick={() => setVisibilityPass(!visibilityPass)}>
            {!visibilityPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
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
            disabled={checkIsResearcher(UserRoleCodeMap[user.role])}
            inputProps={{ maxLength: 128 }}
            labelClasses={styles.labelField}
            error={submit && equalityError && t(TranslationKey["Passwords don't match"])}
            inputClasses={styles.input}
            label={t(TranslationKey['Re-enter the new password'])}
            placeholder={t(TranslationKey.Password)}
            type={!visibilityPass ? 'password' : 'text'}
            value={formFields.confirmPassword}
            onChange={onChangeField('confirmPassword')}
          />
        </div>

        {/* <RegistrationForm isRecoverPassword formFields={{password: ''}} onChangeFormField={onChangeField} /> */}

        <div className={styles.btnsWrapper}>
          <Button disabled={disabledSubmit} className={styles.actionBtn} /* type="submit"*/ onClick={onClickSubmit}>
            {t(TranslationKey.Save)}
          </Button>

          <Button variant="text" className={[styles.actionBtn, styles.cancelBtn]} onClick={onCloseModal}>
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </form>
    )
  },
)
