import { memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './edit-asin-checker-modal.style'

export const EditAsinCheckerModal = memo(props => {
  const { asinsToEdit, onSubmit, onClose } = props

  const { classes: styles } = useStyles()

  const sourceFormFields = {
    asin: asinsToEdit?.asin || '',
    reason: asinsToEdit?.reason || '',
    strategy: asinsToEdit?.strategy,
  }
  const [formFields, setFormFields] = useState(sourceFormFields)

  const onChangeField = fieldName => event => {
    const newFormFields = { ...formFields }
    newFormFields[fieldName] = event.target.value
    setFormFields(newFormFields)
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t(TranslationKey['Editing ASIN'])}</p>

      <Field
        inputProps={{ maxLength: 15 }}
        labelClasses={styles.fieldLabel}
        containerClasses={styles.fieldContainer}
        label={t(TranslationKey.ASIN)}
        value={formFields.asin}
        onChange={onChangeField('asin')}
      />

      <Field
        multiline
        minRows={7}
        maxRows={7}
        inputProps={{ maxLength: 1024 }}
        labelClasses={styles.fieldLabel}
        inputClasses={styles.fieldInput}
        containerClasses={styles.fieldContainer}
        label={t(TranslationKey.Reason)}
        value={formFields.reason}
        onChange={onChangeField('reason')}
      />

      <div className={styles.buttons}>
        <Button styleType={ButtonStyle.SUCCESS} onClick={() => onSubmit(asinsToEdit?._id, formFields)}>
          {t(TranslationKey.Save)}
        </Button>

        <Button styleType={ButtonStyle.CASUAL} onClick={onClose}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
})
