import {Button, Checkbox, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {Link} from 'react-router-dom'

import {texts} from '@constants/texts'

import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {styles} from './registration-form.style'

const textConsts = getLocalizedTexts(texts, 'en').registerScreen

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
          containerClasses={classNames.field}
          label={'Your Name'}
          placeholder={'name'}
          error={checkValidationNameOrEmail.nameIsUnique && 'Пользователь с таким именем уже существует'}
          value={formFields.name.replace(/[^а-яА-Яa-zA-Z0-9]/g, '')}
          onChange={onChangeFormField('name')}
        />
        <Field
          containerClasses={classNames.field}
          label={textConsts.emailLabel}
          placeholder={textConsts.emailPlaceholder}
          type="email"
          error={checkValidationNameOrEmail.emailIsUnique && 'Пользователь с таким email уже существует'}
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
        <Field
          containerClasses={classNames.field}
          label={textConsts.rePasswordLabel}
          placeholder={textConsts.rePasswordPlaceholder}
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
          {textConsts.checkboxLabel}
          <Link href="#" to="/terms" target="_blank" rel="noopener">
            {textConsts.termsAndConditions}
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
        {textConsts.button}
      </Button>
    </form>
  )
}
export const RegistrationForm = withStyles(styles)(RegistrationFormRaw)
