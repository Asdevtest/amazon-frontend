import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import {useEffect, useState} from 'react'

import {Button, Checkbox, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {Link} from 'react-router-dom'

import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {Field} from '@components/field'

import {t} from '@utils/translations'

import {styles} from './registration-form.style'

export const RegistrationFormRaw = ({
  classes: classNames,
  formFields,
  onChangeFormField,
  onSubmit,
  checkValidationNameOrEmail,
}) => {
  const [visibilityPass, setVisibilityPass] = useState(false)

  const [error, setError] = useState('')
  const [equalityError, setEqualityError] = useState('')
  const [submit, setSubmit] = useState(false)

  const regExpNumber = /(?=.*[0-9])/g
  const regExpUpperCase = /(?=.*[A-Z])/g
  const regExpLowerCase = /(?=.*[a-z])/g
  const regExpLength = /(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*].{32}/g

  useEffect(() => {
    if (regExpNumber.test(formFields.password) === false) {
      setError(t(TranslationKey['The password must contain the number']))
    } else if (regExpUpperCase.test(formFields.password) === false) {
      setError(t(TranslationKey['The password must contain a uppercase letter']))
    } else if (regExpLowerCase.test(formFields.password) === false) {
      setError(t(TranslationKey['The password must contain a lowercase letter']))
    } else if (regExpLength.test(formFields.password) === true) {
      setError(t(TranslationKey['Password must be no more than 32 characters']))
    } else {
      setError('')
    }
  }, [formFields.password, error, SettingsModel.languageTag])

  useEffect(() => {
    if (formFields.password !== formFields.confirmPassword) {
      setEqualityError(t(TranslationKey['passwords dont match']))
    } else {
      setEqualityError('')
    }
  }, [formFields.password, formFields.confirmPassword, SettingsModel.languageTag])

  const onSubmitForm = event => {
    event.preventDefault()
    setSubmit(true)
    error?.length === 0 && onSubmit()
  }

  console.log(error)
  return (
    <form className={classNames.root} onSubmit={onSubmitForm}>
      <div className={classNames.formFields}>
        <Field
          inputProps={{maxLength: 30}}
          containerClasses={classNames.field}
          label={t(TranslationKey.Name)}
          placeholder={t(TranslationKey.Name)}
          error={checkValidationNameOrEmail.nameIsUnique && t(TranslationKey['A user with this name already exists'])}
          value={formFields.name}
          onChange={onChangeFormField('name')}
        />
        <Field
          inputProps={{maxLength: 30}}
          containerClasses={classNames.field}
          label={t(TranslationKey.Email)}
          placeholder={t(TranslationKey.Email)}
          type="email"
          error={
            checkValidationNameOrEmail?.emailIsUnique ? t(TranslationKey['A user with this email already exists']) : ''
          }
          value={formFields.email}
          onChange={onChangeFormField('email')}
        />
        <div className={classNames.field}>
          <Field
            inputProps={{maxLength: 128}}
            error={submit ? error : ''}
            label={t(TranslationKey.Password)}
            placeholder={t(TranslationKey.Password)}
            type={!visibilityPass ? 'password' : 'text'}
            value={formFields.password}
            onChange={onChangeFormField('password')}
          />
          <div className={classNames.visibilityIcon} onClick={() => setVisibilityPass(!visibilityPass)}>
            {!visibilityPass ? <VisibilityOffIcon color="disabled" /> : <VisibilityIcon color="disabled" />}
          </div>
        </div>
        <div className={classNames.field}>
          <Field
            inputProps={{maxLength: 128}}
            error={submit ? equalityError : ''}
            label={t(TranslationKey['Re-type Password'])}
            placeholder={t(TranslationKey.Password)}
            type={!visibilityPass ? 'password' : 'text'}
            value={formFields.confirmPassword}
            onChange={onChangeFormField('confirmPassword')}
          />
        </div>
      </div>
      <div className={classNames.formFooter}>
        <Checkbox
          className={classNames.checkbox}
          color="primary"
          value={formFields.acceptTerms}
          onChange={onChangeFormField('acceptTerms')}
        />
        <Typography className={classNames.label}>
          {t(TranslationKey['Agree with']) + ' '}
          <Link href="#" to="/terms" target="_blank" rel="noopener">
            {t(TranslationKey['Terms & Conditions'])}
          </Link>
        </Typography>
      </div>
      <Button
        disableElevation
        disabled={
          formFields.name === '' ||
          formFields.email === '' ||
          formFields.password === '' ||
          formFields.acceptTerms === false
        }
        color="primary"
        type="submit"
        variant="contained"
      >
        {t(TranslationKey.Registration)}
      </Button>
    </form>
  )
}
export const RegistrationForm = withStyles(styles)(RegistrationFormRaw)
