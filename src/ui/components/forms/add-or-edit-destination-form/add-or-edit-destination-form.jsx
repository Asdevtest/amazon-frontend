import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {Field} from '@components/field/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './add-or-edit-destination-form.style'

const textConsts = getLocalizedTexts(texts, 'en').addOrEditDestinationForm

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
      <Typography variant="h5">{textConsts.mainTitle}</Typography>

      <div className={classNames.form}>
        <Field
          label={textConsts.nameLabel}
          inputProps={{maxLength: 255}}
          value={formFields.name}
          placeholder={textConsts.nameHolder}
          onChange={onChangeField('name')}
        />

        <Field
          label={textConsts.countryLabel}
          inputProps={{maxLength: 255}}
          value={formFields.country}
          placeholder={textConsts.countryHolder}
          onChange={onChangeField('country')}
        />

        <Field
          label={textConsts.cityLabel}
          inputProps={{maxLength: 255}}
          value={formFields.city}
          placeholder={textConsts.cityHolder}
          onChange={onChangeField('city')}
        />

        <Field
          label={textConsts.stateLabel}
          inputProps={{maxLength: 255}}
          value={formFields.state}
          placeholder={textConsts.stateHolder}
          onChange={onChangeField('state')}
        />

        <Field
          label={textConsts.addressLabel}
          inputProps={{maxLength: 255}}
          value={formFields.address}
          placeholder={textConsts.addressHolder}
          onChange={onChangeField('address')}
        />

        <Field
          label={textConsts.zipCodeLabel}
          inputProps={{maxLength: 255}}
          error={!/^[0-9]{5}$/.test(formFields.zipCode) && 'формат в числах пример: 90001'}
          value={formFields.zipCode}
          placeholder={textConsts.zipCodeHolder}
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
          {textConsts.saveBtn}
        </SuccessButton>

        <Button
          disableElevation
          className={classNames.button}
          color="primary"
          variant="text"
          onClick={() => onCloseModal()}
        >
          {textConsts.cancelBtn}
        </Button>
      </div>
    </div>
  )
})
