import React, { useState } from 'react'

import { Box, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { useClassNames } from './add-files-form.style'

export const AddFilesForm = ({ item, allItemsArray, setAllItemsArray, onCloseModal }) => {
  const { classes: classNames } = useClassNames()

  const [editingItem, setEditingItem] = useState(item)

  const setImagesOfItem = images => {
    const newFormFields = { ...editingItem }

    newFormFields.tmpImages = [...images]

    setEditingItem(newFormFields)
  }

  const onSubmith = () => {
    const updatedNewItems = allItemsArray.map(oldItem => (oldItem._id === editingItem._id ? editingItem : oldItem))

    setAllItemsArray([...updatedNewItems])

    onCloseModal()
  }

  return (
    <div className={classNames.root}>
      <Box className={classNames.boxCode}>
        <Typography className={classNames.modalText}>{t(TranslationKey['Add files'])}</Typography>
        <div className={classNames.imageFileInputWrapper}>
          <UploadFilesInput withoutTitle images={editingItem.tmpImages} setImages={setImagesOfItem} maxNumber={50} />
        </div>
      </Box>

      <Button className={classNames.saveButton} onClick={() => onSubmith()}>
        {t(TranslationKey.Save)}
      </Button>
    </div>
  )
}
