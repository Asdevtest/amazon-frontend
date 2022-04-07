import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './user-info-edit-form.style'

const textConsts = getLocalizedTexts(texts, 'ru').userInfoEditForm

const regExpEmailChecking =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const regExpNameCheking = /^(?! )(?!(?:.* ){1})/

const regExpNameStartCheking = /^(?! )/

export const UserInfoEditForm = observer(({user, onSubmit, onCloseModal, checkValidationNameOrEmail}) => {
  const classNames = useClassNames()

  const sourceFields = {
    name: user?.name || '',
    email: user?.email || '',
  }

  const [emailInputError, setEmailInputError] = useState(false)

  const [formFields, setFormFields] = useState(sourceFields)

  const onChangeField = fieldName => event => {
    const newFormFields = {...formFields}

    if (fieldName === 'email') {
      newFormFields[fieldName] = event.target.value.replace(/ /g, '')
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
    <div className={classNames.mainWrapper}>
      <Typography variant="h5">{'Введите данные'}</Typography>

      <Field
        label={textConsts.name}
        inputProps={{maxLength: 25}}
        error={checkValidationNameOrEmail.nameIsUnique && 'Пользователь с таким именем уже существует'}
        className={classNames.textField}
        value={formFields.name}
        onChange={onChangeField('name')}
      />

      <Field
        label={textConsts.email}
        inputProps={{maxLength: 35}}
        error={
          (checkValidationNameOrEmail.emailIsUnique && 'Пользователь с таким email уже существует') ||
          (emailInputError && 'Почта невалидна!')
        }
        className={classNames.textField}
        value={formFields.email}
        onChange={onChangeField('email')}
      />

      <div className={classNames.btnsWrapper}>
        <Button disabled={disabledSubmit} onClick={onClickSubmit}>
          {textConsts.saveBtn}
        </Button>

        <Button variant="text" className={classNames.cancelBtn} onClick={onCloseModal}>
          {textConsts.cancelBtn}
        </Button>
      </div>
    </div>
  )
})
