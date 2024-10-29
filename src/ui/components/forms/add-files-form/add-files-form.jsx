import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './add-files-form.style'

export const AddFilesForm = props => {
  const { item, allItemsArray, setAllItemsArray, onCloseModal } = props

  const { classes: styles } = useStyles()
  const [editingItem, setEditingItem] = useState(item)

  const setImagesOfItem = images => {
    setEditingItem(prev => ({ ...prev, images }))
  }

  const onSubmith = () => {
    const updatedNewItems = allItemsArray.map(oldItem => (oldItem._id === editingItem._id ? editingItem : oldItem))

    setAllItemsArray(updatedNewItems)

    onCloseModal()
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t(TranslationKey['Add files'])}</p>

      <UploadFilesInput withoutTitles images={editingItem.images} setImages={setImagesOfItem} />

      <div className={styles.btnsWrapper}>
        <CustomButton type={ButtonStyle.PRIMARY} onClick={onSubmith}>
          {t(TranslationKey.Save)}
        </CustomButton>
      </div>
    </div>
  )
}
