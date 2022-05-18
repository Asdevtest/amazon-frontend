import {Button, Checkbox, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {Link} from 'react-router-dom'

import {TranslationKey} from '@constants/translations/translation-key'

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
  const onSubmitForm = event => {
    event.preventDefault()
    onSubmit()
  }

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
        <Field
          inputProps={{maxLength: 16}}
          containerClasses={classNames.field}
          label={t(TranslationKey.Password)}
          placeholder={t(TranslationKey.Password)}
          type="password"
          value={formFields.password}
          onChange={onChangeFormField('password')}
        />
        <Field
          inputProps={{maxLength: 16}}
          error={formFields.password !== formFields.confirmPassword && t(TranslationKey['passwords dont match'])}
          containerClasses={classNames.field}
          label={t(TranslationKey['Re-type Password'])}
          placeholder={t(TranslationKey.Password)}
          type="password"
          value={formFields.confirmPassword}
          onChange={onChangeFormField('confirmPassword')}
        />
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
          formFields.password !== formFields.confirmPassword ||
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
