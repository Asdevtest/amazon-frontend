import { Typography } from '@mui/material'

import { useState } from 'react'

import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { useClassNames } from './add-or-edit-tag-form.style'

export const AddOrEditTagForm = observer(({ tags, tagToEdit, onCloseModal, onCreateSubmit, onEditSubmit }) => {
  const { classes: classNames } = useClassNames()

  const startValue = {
    title: tagToEdit?.title ?? '',
  }
  const [formField, setFormField] = useState(startValue)

  const handleChangeField = event => {
    setFormField(state => ({ ...state, title: event.target.value }))
  }

  const handleClick = () => {
    if (tagToEdit) {
      onEditSubmit(tagToEdit._id, formField)
    } else {
      onCreateSubmit(formField.title)
    }
  }

  const isExistsTag = tags.find(tag => tag.title === formField.title)
  const disabledButton = formField.title.length === 0 || isExistsTag

  return (
    <div className={classNames.wrapper}>
      <Typography variant="h5" className={classNames.standartText}>
        {tagToEdit ? t(TranslationKey['Edit tag']) : t(TranslationKey['Add a new tag'])}
      </Typography>

      <div className={classNames.form}>
        <Field
          label={t(TranslationKey.Title)}
          labelClasses={classNames.label}
          inputProps={{ maxLength: 255 }}
          value={formField.title}
          error={disabledButton}
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
