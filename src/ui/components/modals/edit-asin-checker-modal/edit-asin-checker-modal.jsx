import { useState } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './edit-asin-checker-modal.style'

export const EditAsinCheckerModal = ({ asinsToEdit, onSubmit, onClose, strategy }) => {
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
    <div className={styles.modalMessageWrapper}>
      <div className={styles.modalTitle}>
        <Typography variant="h5" className={styles.modalMessageTitle}>
          {t(TranslationKey['Editing ASIN'])}
        </Typography>
      </div>
      <div className={styles.modalFieldsWrapper}>
        <Field
          inputProps={{ maxLength: 15 }}
          labelClasses={styles.commentLabelText}
          containerClasses={styles.commentContainer}
          label={t(TranslationKey.ASIN)}
          value={formFields.asin}
          onChange={onChangeField('asin')}
        />
        <Field
          multiline
          className={styles.heightFieldAuto}
          minRows={7}
          maxRows={7}
          inputProps={{ maxLength: 1024 }}
          containerClasses={styles.commentContainer}
          labelClasses={styles.commentLabelText}
          label={t(TranslationKey.Reason)}
          value={formFields.reason}
          onChange={onChangeField('reason')}
        />
      </div>

      <div className={styles.buttonsWrapper}>
        <Button
          type={ButtonType.SUCCESS}
          className={styles.buttonOk}
          onClick={() => onSubmit(asinsToEdit?._id, formFields, strategy)}
        >
          {t(TranslationKey.Save)}
        </Button>

        <Button className={styles.buttonCancel} onClick={onClose}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
