import { Typography } from '@mui/material'

import React, { useState } from 'react'

import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { t } from '@utils/translations'

import { useClassNames } from './add-or-edit-warehouse-tariff-form.style'

export const AddOrEditWarehouseTariffForm = observer(({ onCloseModal, onCreateSubmit, onEditSubmit, tariffToEdit }) => {
  const { classes: classNames } = useClassNames()

  const [submitIsClicked, setSubmitIsClicked] = useState(false)

  const sourceFormFields = {
    name: tariffToEdit?.name || '',
    description: tariffToEdit?.description || '',
    price: tariffToEdit?.price || '',
  }

  const [formFields, setFormFields] = useState(sourceFormFields)

  const onChangeField = fieldName => event => {
    const newFormFields = { ...formFields }

    if (['price'].includes(fieldName)) {
      if (
        checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 2) &&
        Number(event.target.value) < 100000
      ) {
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

    setSubmitIsClicked(true)
  }

  const disableSubmitBtn =
    JSON.stringify(sourceFormFields) === JSON.stringify(formFields) ||
    formFields.name === '' ||
    formFields.description === '' ||
    Number(formFields.price) <= 0 ||
    Number(formFields.price) > 100000 ||
    submitIsClicked

  return (
    <div className={classNames.root}>
      <Typography variant="h5" className={classNames.modalTitle}>
        {t(TranslationKey['Adding tariff'])}
      </Typography>

      <div className={classNames.form}>
        <Field
          label={t(TranslationKey.Title)}
          inputProps={{ maxLength: 50 }}
          labelClasses={classNames.fieldLabel}
          tooltipInfoContent={t(TranslationKey['Rate name'])}
          value={formFields.name}
          placeholder={t(TranslationKey.Title)}
          onChange={onChangeField('name')}
        />

        <Field
          label={t(TranslationKey['Service cost per kg, $']) + '*'}
          inputProps={{ maxLength: 10 }}
          labelClasses={classNames.fieldLabel}
          tooltipInfoContent={t(TranslationKey['The cost of providing the service'])}
          value={formFields.price}
          onChange={onChangeField('price')}
        />

        <Field
          multiline
          minRows={4}
          maxRows={4}
          inputProps={{ maxLength: 255 }}
          labelClasses={classNames.fieldLabel}
          tooltipInfoContent={t(TranslationKey['Additional information about the rate'])}
          className={classNames.descriptionField}
          label={t(TranslationKey.Description)}
          value={formFields.description}
          onChange={onChangeField('description')}
        />
      </div>

      <div className={classNames.btnsWrapper}>
        <Button
          success
          disableElevation
          className={classNames.button}
          disabled={disableSubmitBtn}
          color="primary"
          variant="contained"
          onClick={onSubmit}
        >
          {t(TranslationKey.Add)}
        </Button>

        <Button
          disableElevation
          className={[classNames.button, classNames.closeButton]}
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
