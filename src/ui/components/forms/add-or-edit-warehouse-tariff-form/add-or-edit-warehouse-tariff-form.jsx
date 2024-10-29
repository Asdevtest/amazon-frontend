import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { Field } from '@components/shared/field/field'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { throttle } from '@utils/throttle'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './add-or-edit-warehouse-tariff-form.style'

export const AddOrEditWarehouseTariffForm = observer(({ onCloseModal, onCreateSubmit, onEditSubmit, tariffToEdit }) => {
  const { classes: styles, cx } = useStyles()

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
    <div className={styles.root}>
      <h5 className={styles.modalTitle}>{t(TranslationKey['Adding tariff'])}</h5>

      <div className={styles.form}>
        <Field
          label={t(TranslationKey.Title)}
          inputProps={{ maxLength: 50 }}
          labelClasses={styles.fieldLabel}
          tooltipInfoContent={t(TranslationKey['Rate name'])}
          value={formFields.name}
          placeholder={t(TranslationKey.Title)}
          onChange={onChangeField('name')}
        />

        <Field
          label={t(TranslationKey['Service cost per kg, $']) + '*'}
          inputProps={{ maxLength: 10 }}
          labelClasses={styles.fieldLabel}
          tooltipInfoContent={t(TranslationKey['The cost of providing the service'])}
          value={formFields.price}
          onChange={onChangeField('price')}
        />

        <Field
          multiline
          minRows={4}
          maxRows={4}
          inputProps={{ maxLength: 255 }}
          labelClasses={styles.fieldLabel}
          tooltipInfoContent={t(TranslationKey['Additional information about the rate'])}
          className={styles.descriptionField}
          label={t(TranslationKey.Description)}
          value={formFields.description}
          onChange={onChangeField('description')}
        />
      </div>

      <div className={styles.btnsWrapper}>
        <CustomButton type={ButtonStyle.PRIMARY} disabled={disableSubmitBtn} onClick={throttle(onSubmit)}>
          {t(TranslationKey.Add)}
        </CustomButton>

        <CustomButton onClick={onCloseModal}>{t(TranslationKey.Close)}</CustomButton>
      </div>
    </div>
  )
})
