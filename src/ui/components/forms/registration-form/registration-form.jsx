import {Button, Checkbox, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {Link} from 'react-router-dom'

import {texts} from '@constants/texts'

import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {styles} from './registration-form.style'

const textConsts = getLocalizedTexts(texts, 'en').registerScreen

export const RegistrationFormRaw = ({classes: classNames, formFields, onChangeFormField, onSubmit}) => (
  <div className={classNames.root}>
    <div className={classNames.formFields}>
      <Field
        containerClasses={classNames.field}
        label={'Your Name'}
        placeholder={'name'}
        type="text"
        value={formFields.name}
        onChange={onChangeFormField('name')}
      />
      <Field
        containerClasses={classNames.field}
        label={textConsts.emailLabel}
        placeholder={textConsts.emailPlaceholder}
        type="email"
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
        <Link href="#" to="/terms">
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
        formFields.password === ''
      }
      color="primary"
      variant="contained"
      onClick={onSubmit}
    >
      {textConsts.button}
    </Button>
  </div>
)

export const RegistrationForm = withStyles(styles)(RegistrationFormRaw)
