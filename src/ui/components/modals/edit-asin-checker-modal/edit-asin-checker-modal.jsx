import { Typography } from '@mui/material'

import React, { useState } from 'react'

// import {mapProductStrategyStatusEnumToKey} from '@constants/product-strategy-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { useClassNames } from './edit-asin-checker-modal.style'

export const EditAsinCheckerModal = ({ asinsToEdit, onSubmit, onClose, strategy }) => {
  const { classes: classNames } = useClassNames()

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
    <div className={classNames.modalMessageWrapper}>
      <div className={classNames.modalTitle}>
        <Typography variant="h5" className={classNames.modalMessageTitle}>
          {t(TranslationKey['Editing ASIN'])}
        </Typography>
      </div>
      <div className={classNames.modalFieldsWrapper}>
        <Field
          inputProps={{ maxLength: 15 }}
          labelClasses={classNames.commentLabelText}
          containerClasses={classNames.commentContainer}
          label={t(TranslationKey.ASIN)}
          value={formFields.asin}
          onChange={onChangeField('asin')}
        />
        <Field
          multiline
          className={classNames.heightFieldAuto}
          minRows={7}
          maxRows={7}
          inputProps={{ maxLength: 1024 }}
          containerClasses={classNames.commentContainer}
          labelClasses={classNames.commentLabelText}
          label={t(TranslationKey.Reason)}
          value={formFields.reason}
          onChange={onChangeField('reason')}
        />
      </div>

      <div className={classNames.buttonsWrapper}>
        <Button
          success
          // disabled={submitIsClicked}
          variant="contained"
          className={classNames.buttonOk}
          onClick={() => onSubmit(asinsToEdit?._id, formFields, strategy)}
        >
          {t(TranslationKey.Save)}
        </Button>

        <Button
          // disabled={submitIsClicked}
          color="primary"
          variant="contained"
          className={classNames.buttonCancel}
          onClick={onClose}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
