import {Typography} from '@mui/material'

import React, {useState} from 'react'

import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'

import {t} from '@utils/translations'

import {RegistrationForm} from '../registration-form'
import {useClassNames} from './user-info-edit-form.style'

const regExpEmailChecking =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const regExpNameCheking = /^(?! )(?!(?:.* ){1})/

const regExpNameStartCheking = /^(?! )/

export const UserInfoEditForm = observer(({user, onSubmit, onCloseModal, checkValidationNameOrEmail}) => {
  const {classes: classNames} = useClassNames()

  const sourceFields = {
    name: user?.name || '',
    email: user?.email || '',
  }

  const [emailInputError, setEmailInputError] = useState(false)

  const [formFields, setFormFields] = useState(sourceFields)

  const onChangeField = fieldName => event => {
    const newFormFields = {...formFields}

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
        res = {...res, [keys[i]]: values2[i]}
      }
    }

    return res
  }

  const onClickSubmit = () => {
    // event.preventDefault()

    const emailIsValid = regExpEmailChecking.test(formFields.email)

    if (emailIsValid) {
      onSubmit(filterUniqFields())
    } else {
      setEmailInputError(true)
    }
  }

  const disabledSubmit =
    JSON.stringify(sourceFields) === JSON.stringify(formFields) ||
    emailInputError ||
    formFields.name === '' ||
    formFields.email === ''

  return (
    <form className={classNames.mainWrapper} onSubmit={onClickSubmit}>
      <Typography variant="h5" className={classNames.mainTitle}>
        {t(TranslationKey['Enter information'])}
      </Typography>

      <Field
        label={t(TranslationKey.Name)}
        inputProps={{maxLength: 25}}
        labelClasses={classNames.labelField}
        error={checkValidationNameOrEmail.nameIsUnique && t(TranslationKey['A user with this name already exists'])}
        className={classNames.textField}
        value={formFields.name}
        onChange={onChangeField('name')}
      />

      <Field
        label={t(TranslationKey.Email)}
        inputProps={{maxLength: 35}}
        labelClasses={classNames.labelField}
        error={
          (checkValidationNameOrEmail.emailIsUnique && t(TranslationKey['A user with this email already exists'])) ||
          (emailInputError && t(TranslationKey['Invalid email!']))
        }
        className={classNames.textField}
        type="email"
        value={formFields.email}
        onChange={onChangeField('email')}
      />

      <RegistrationForm isRecoverPassword formFields={{password: ''}} onChangeFormField={onChangeField} />

      <div className={classNames.btnsWrapper}>
        <Button disabled={disabledSubmit} className={classNames.actionBtn} /* type="submit"*/ onClick={onClickSubmit}>
          {t(TranslationKey.Save)}
        </Button>

        <Button variant="text" className={[classNames.actionBtn, classNames.cancelBtn]} onClick={onCloseModal}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </form>
  )
})
