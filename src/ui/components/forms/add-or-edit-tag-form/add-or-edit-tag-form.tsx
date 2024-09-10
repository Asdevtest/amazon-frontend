import { ColorPicker } from 'antd'
import { Color } from 'antd/es/color-picker'
import { observer } from 'mobx-react'
import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react'
import { AiOutlineBgColors } from 'react-icons/ai'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'
import { CustomTag } from '@components/shared/custom-tag'

import { throttle } from '@utils/throttle'
import { t } from '@utils/translations'

import { ITag } from '@typings/shared/tag'

import { useStyles } from './add-or-edit-tag-form.style'

interface AddOrEditTagFormProps {
  tags: ITag[]
  tagToEdit?: ITag
  onCloseModal: () => void
  onCreateSubmit: (tag: ITag) => void
  onEditSubmit?: (id: string, tag: ITag) => void
}

export const AddOrEditTagForm: FC<AddOrEditTagFormProps> = observer(props => {
  const { tags, tagToEdit, onCloseModal, onCreateSubmit, onEditSubmit } = props

  const { classes: styles } = useStyles()

  const [formField, setFormField] = useState<ITag>({
    title: tagToEdit?.title || '',
    color: tagToEdit?.color || '',
  } as ITag)

  const isExistsTag = useMemo(() => {
    const existingTag = tags?.find(tag => tag?.title === formField.title)

    return !!existingTag && existingTag?.color === formField.color
  }, [formField])

  const disabledButton = useMemo(() => formField?.title?.length === 0 || isExistsTag, [formField.title, isExistsTag])

  const handleClick = useCallback(() => {
    if (tagToEdit && onEditSubmit) {
      onEditSubmit(tagToEdit?._id, formField)
    } else {
      onCreateSubmit(formField)
    }
  }, [formField, tagToEdit])

  const handleChangeTitle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setFormField(state => ({ ...state, title: event.target.value })),
    [],
  )

  const handleChangeColor = useCallback(
    (color: Color) => setFormField(state => ({ ...state, color: color.toHexString() })),
    [],
  )

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{tagToEdit ? t(TranslationKey['Edit tag']) : t(TranslationKey['Add a new tag'])}</p>

      <CustomInput
        label="Title"
        placeholder="Title"
        addonAfter={
          <button>
            <ColorPicker
              disabledAlpha
              disabled={!formField?.title}
              value={formField?.color}
              onChange={handleChangeColor}
            >
              <AiOutlineBgColors size={20} />
            </ColorPicker>
          </button>
        }
        maxLength={255}
        value={formField.title}
        onChange={handleChangeTitle}
      />

      {formField.title ? (
        <div className={styles.previewTagWrapper}>
          <p className={styles.label}>{t(TranslationKey['Tag preview'])}</p>

          <div className={styles.tagsWrapper}>
            <CustomTag title={formField.title} color={formField.color} prefix="#" tooltipText={formField.title} />
            <CustomTag title={formField.title} color={formField.color} prefix="#" tooltipText={formField.title} />
          </div>
        </div>
      ) : null}

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
