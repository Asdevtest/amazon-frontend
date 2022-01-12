import React, {useState} from 'react'

import {Box, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {ImageFileInput} from '@components/image-file-input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './add-images-form.style'

const textConsts = getLocalizedTexts(texts, 'ru').addImagesFormText

export const AddImagesForm = ({item, allItemsArray, setAllItemsArray, onCloseModal}) => {
  const classNames = useClassNames()

  const [editingItem, setEditingItem] = useState(item)

  const setImagesOfItem = images => {
    const newFormFields = {...editingItem}

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
        <Typography className={(classNames.modalText, classNames.typoCode)}>{textConsts.addPhotos}</Typography>

        <div className={classNames.imageFileInputWrapper}>
          <ImageFileInput images={editingItem.tmpImages} setImages={setImagesOfItem} maxNumber={50} />
        </div>
      </Box>

      <Button onClick={() => onSubmith()}>{textConsts.saveBtn}</Button>
    </div>
  )
}
