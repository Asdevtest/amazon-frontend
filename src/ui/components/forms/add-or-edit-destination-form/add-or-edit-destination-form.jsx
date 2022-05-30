import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {Field} from '@components/field/field'

import {t} from '@utils/translations'

import {useClassNames} from './add-or-edit-destination-form.style'

export const AddOrEditDestinationForm = observer(({onCloseModal, onCreateSubmit, onEditSubmit, destinationToEdit}) => {
  const classNames = useClassNames()

  const sourceFormFields = {
    name: destinationToEdit?.name || '',
    country: destinationToEdit?.country || '',
    zipCode: destinationToEdit?.zipCode || '',
    city: destinationToEdit?.city || '',
    state: destinationToEdit?.state || '',
    address: destinationToEdit?.address || '',
  }

  const [formFields, setFormFields] = useState(sourceFormFields)

  const onChangeField = fieldName => event => {
    const newFormFields = {...formFields}

    newFormFields[fieldName] = event.target.value

    setFormFields(newFormFields)
  }

  const onSubmit = () => {
    if (destinationToEdit) {
      onEditSubmit(destinationToEdit._id, formFields)
    } else {
      onCreateSubmit(formFields)
    }
  }

  const disableSubmitBtn =
    JSON.stringify(sourceFormFields) === JSON.stringify(formFields) ||
    formFields.name === '' ||
    formFields.address === '' ||
    formFields.country === '' ||
    formFields.city === '' ||
    formFields.state === '' ||
    formFields.zipCode === '' ||
    !/^[0-9]{5}$/.test(formFields.zipCode)
  formFields.city === '' || formFields.state === ''

  return (
    <div className={classNames.root}>
      <Typography variant="h5">{t(TranslationKey['Add a new drop off location'])}</Typography>

      <div className={classNames.form}>
        <Field
          label={t(TranslationKey.Title)}
          inputProps={{maxLength: 255}}
          value={formFields.name}
          placeholder={t(TranslationKey.Title) + '...'}
          onChange={onChangeField('name')}
        />

        <Field
          label={t(TranslationKey.Country)}
          inputProps={{maxLength: 255}}
          value={formFields.country}
          placeholder={t(TranslationKey.Country) + '...'}
          onChange={onChangeField('country')}
        />

        <Field
          label={t(TranslationKey.City)}
          inputProps={{maxLength: 255}}
          value={formFields.city}
          placeholder={t(TranslationKey.City) + '...'}
          onChange={onChangeField('city')}
        />

        <Field
          label={t(TranslationKey.State)}
          inputProps={{maxLength: 255}}
          value={formFields.state}
          placeholder={t(TranslationKey.State) + '...'}
          onChange={onChangeField('state')}
        />

        <Field
          label={t(TranslationKey.Address)}
          inputProps={{maxLength: 255}}
          value={formFields.address}
          placeholder={t(TranslationKey.Address) + '...'}
          onChange={onChangeField('address')}
        />

        <Field
          label={t(TranslationKey['ZIP code'])}
          inputProps={{maxLength: 255}}
          error={!/^[0-9]{5}$/.test(formFields.zipCode) && t(TranslationKey['numeric format, example:']) + ' 90001'}
          value={formFields.zipCode}
          placeholder={t(TranslationKey['ZIP code']) + '...'}
          onChange={onChangeField('zipCode')}
        />
      </div>

      <div className={classNames.btnsWrapper}>
        <SuccessButton
          disableElevation
          disabled={disableSubmitBtn}
          color="primary"
          variant="contained"
          onClick={onSubmit}
        >
          {t(TranslationKey.Save)}
        </SuccessButton>

        <Button
          disableElevation
          className={classNames.button}
          color="primary"
          variant="text"
          onClick={() => onCloseModal()}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
})
