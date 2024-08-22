import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { Field } from '@components/shared/field/field'

import { throttle } from '@utils/throttle'
import { t } from '@utils/translations'

import { useStyles } from './add-or-edit-tag-form.style'

export const AddOrEditTagForm = observer(props => {
  const { tags, tagToEdit, onCloseModal, onCreateSubmit, onEditSubmit } = props

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
      <p className={styles.title}>{tagToEdit ? t(TranslationKey['Edit tag']) : t(TranslationKey['Add a new tag'])}</p>

      <Field
        label={t(TranslationKey.Title)}
        labelClasses={styles.label}
        inputProps={{ maxLength: 255 }}
        value={formField.title}
        placeholder={t(TranslationKey.Title) + '...'}
        onChange={handleChangeField}
      />

      <div className={styles.btnsWrapper}>
        <CustomButton type="primary" size="large" disabled={disabledButton} onClick={throttle(handleClick)}>
          {t(TranslationKey.Save)}
        </CustomButton>

        <CustomButton size="large" onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </CustomButton>
      </div>
    </div>
  )
})
