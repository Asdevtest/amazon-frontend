import React, {useState} from 'react'

import {Typography} from '@material-ui/core'

// import {mapProductStrategyStatusEnumToKey} from '@constants/product-strategy-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'

import {t} from '@utils/translations'

import {useClassNames} from './edit-asin-checker-modal.style'

export const EditAsinCheckerModal = ({asinsToEdit, onSubmit, onClose}) => {
  const classNames = useClassNames()

  const sourceFormFields = {
    asin: asinsToEdit?.asin || '',
    reason: asinsToEdit?.reason || '',
    strategy: asinsToEdit?.strategy,
  }

  const [formFields, setFormFields] = useState(sourceFormFields)

  const onChangeField = fieldName => event => {
    const newFormFields = {...formFields}

    newFormFields[fieldName] = event.target.value

    setFormFields(newFormFields)
  }

  console.log(formFields)

  return (
    <div className={classNames.modalMessageWrapper}>
      <div className={classNames.modalTitle}>
        <Typography variant="h5" className={classNames.modalMessageTitle}>
          {t(TranslationKey['Editing ASIN'])}
        </Typography>
      </div>
      <div className={classNames.modalFieldsWrapper}>
        <Field
          multiline
          rows={1}
          rowsMax={1}
          inputProps={{maxLength: 24}}
          labelClasses={classNames.commentLabelText}
          containerClasses={classNames.commentContainer}
          label={t(TranslationKey.ASIN)}
          value={formFields.asin}
          onChange={onChangeField('asin')}
        />
        <Field
          multiline
          className={classNames.heightFieldAuto}
          rows={7}
          rowsMax={7}
          inputProps={{maxLength: 1024}}
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
          onClick={() => onSubmit(asinsToEdit?._id, formFields)}
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
