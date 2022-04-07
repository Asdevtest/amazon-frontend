import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {Field} from '@components/field/field'

import {checkIsPositiveNummberAndNoMoreNCharactersAfterDot} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './add-or-edit-warehouse-tariff-form.style'

const textConsts = getLocalizedTexts(texts, 'en').addOrEditWarehouseTariffForm

export const AddOrEditWarehouseTariffForm = observer(({onCloseModal, onCreateSubmit, onEditSubmit, tariffToEdit}) => {
  const classNames = useClassNames()

  const sourceFormFields = {
    name: tariffToEdit?.name || '',
    description: tariffToEdit?.description || '',
    price: tariffToEdit?.price || '',
  }

  const [formFields, setFormFields] = useState(sourceFormFields)

  const onChangeField = fieldName => event => {
    const newFormFields = {...formFields}

    if (['price'].includes(fieldName)) {
      if (checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 2)) {
        newFormFields[fieldName] = event.target.value
      }
    } else {
      newFormFields[fieldName] = event.target.value
    }

    setFormFields(newFormFields)
  }

  const onSubmit = () => {
    if (tariffToEdit) {
      onEditSubmit(tariffToEdit._id, formFields)
    } else {
      onCreateSubmit(formFields)
    }
  }

  const disableSubmitBtn =
    JSON.stringify(sourceFormFields) === JSON.stringify(formFields) ||
    formFields.name === '' ||
    formFields.description === '' ||
    formFields.price === ''

  return (
    <div className={classNames.root}>
      <Typography variant="h5">{textConsts.mainTitle}</Typography>

      <div className={classNames.form}>
        <Field
          label={textConsts.nameLabel}
          value={formFields.name}
          placeholder={textConsts.nameHolder}
          onChange={onChangeField('name')}
        />

        <Field
          label={textConsts.priceField}
          placeholder={textConsts.priceHolder}
          value={formFields.price}
          onChange={onChangeField('price')}
        />

        <Field
          multiline
          minRows={4}
          rowsMax={4}
          className={classNames.descriptionField}
          placeholder={textConsts.descriptionHolder}
          label={textConsts.descriptionField}
          value={formFields.description}
          onChange={onChangeField('description')}
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
