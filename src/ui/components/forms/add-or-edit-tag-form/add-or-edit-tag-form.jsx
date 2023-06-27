import { useState } from 'react'
import { observer } from 'mobx-react'

import { Typography } from '@mui/material'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { TranslationKey } from '@constants/translations/translation-key'

import { useClassNames } from './add-or-edit-tag-form.style'

export const AddOrEditTagForm = observer(({ onCloseModal, onCreateSubmit, onEditSubmit, tagToEdit }) => {
  const { classes: classNames } = useClassNames()

  const startValue = tagToEdit ? tagToEdit?.name : ''
  const [formField, setFormField] = useState(startValue)

  const handleChangeField = event => {
    setFormField(event.target.value)
  }

  const handleClick = () => {
    if (tagToEdit) {
      onEditSubmit(formField, tagToEdit._id)
    } else {
      onCreateSubmit(formField)
    }
  }

  const disabledButton = formField?.length === 0

  return (
    <div className={classNames.wrapper}>
      <Typography variant="h5" className={classNames.standartText}>
        {t(TranslationKey['Add a new tag'])}
      </Typography>

      <div className={classNames.form}>
        <Field
          label={t(TranslationKey.Title)}
          inputProps={{ maxLength: 255 }}
          value={formField}
          placeholder={t(TranslationKey.Title) + '...'}
          onChange={handleChangeField}
        />
      </div>

      <div className={classNames.btnsWrapper}>
        <Button success color="primary" disabled={disabledButton} variant="contained" onClick={handleClick}>
          {t(TranslationKey.Save)}
        </Button>

        <Button className={classNames.button} variant="text" onClick={() => onCloseModal()}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
})
