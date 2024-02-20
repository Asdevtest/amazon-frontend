import { observer } from 'mobx-react'
import { useState } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { ButtonType, ButtonVariant } from '@typings/types/button.type'

import { useStyles } from './add-or-edit-tag-form.style'

export const AddOrEditTagForm = observer(({ tags, tagToEdit, onCloseModal, onCreateSubmit, onEditSubmit }) => {
  const { classes: styles } = useStyles()

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

  const isExistsTag = !!tags.find(tag => tag.title === formField.title)

  const disabledButton = formField.title.length === 0 || isExistsTag

  return (
    <div className={styles.wrapper}>
      <Typography variant="h5" className={styles.standartText}>
        {tagToEdit ? t(TranslationKey['Edit tag']) : t(TranslationKey['Add a new tag'])}
      </Typography>

      <div className={styles.form}>
        <Field
          label={t(TranslationKey.Title)}
          labelClasses={styles.label}
          inputProps={{ maxLength: 255 }}
          value={formField.title}
          placeholder={t(TranslationKey.Title) + '...'}
          onChange={handleChangeField}
        />
      </div>

      <div className={styles.btnsWrapper}>
        <Button styleType={ButtonType.SUCCESS} disabled={disabledButton} onClick={handleClick}>
          {t(TranslationKey.Save)}
        </Button>

        <Button className={styles.button} variant={ButtonVariant.OUTLINED} onClick={() => onCloseModal()}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
})
