import React, {useState} from 'react'

import {Box, Container, Divider, Typography} from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {ImageFileInput} from '@components/image-file-input'
import {BigImagesModal} from '@components/modals/big-images-modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixed} from '@utils/text'

import {useClassNames} from './edit-box-tasks-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseViewsEditBoxModal

const AttributesEditBlock = ({box, setNewBoxField}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.numberInputFieldsBlocksWrapper}>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          containerClasses={classNames.numberInputField}
          label={textConsts.lengthCmWarehouse}
          value={box.lengthCmWarehouse}
          onChange={setNewBoxField('lengthCmWarehouse')}
        />
        <Field
          containerClasses={classNames.numberInputField}
          label={textConsts.widthCmWarehouse}
          value={box.widthCmWarehouse}
          onChange={setNewBoxField('widthCmWarehouse')}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          containerClasses={classNames.numberInputField}
          label={textConsts.heightCmWarehouse}
          value={box.heightCmWarehouse}
          onChange={setNewBoxField('heightCmWarehouse')}
        />
        <Field
          containerClasses={classNames.numberInputField}
          label={textConsts.weighGrossKgWarehouse}
          value={box.weighGrossKgWarehouse}
          onChange={setNewBoxField('weighGrossKgWarehouse')}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={textConsts.volumeWeightKgWarehouse}
          value={toFixed(box.volumeWeightKgWarehouse, 2)}
          onChange={setNewBoxField('volumeWeightKgWarehouse')}
        />
        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={textConsts.weightFinalAccountingKgWarehouse}
          value={toFixed(box.weightFinalAccountingKgWarehouse, 2)}
        />
      </div>
    </div>
  )
}

export const EditBoxTasksModal = ({setEditModal, box, operationType, setNewBoxes, newBoxes}) => {
  const classNames = useClassNames()

  const [editingBox, setEditingBox] = useState(box)

  const [showPhotosModal, setShowPhotosModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})

  const setNewBoxField = fieldName => e => {
    if (isNaN(e.target.value) || Number(e.target.value) < 0) {
      return
    }
    const newFormFields = {...editingBox}
    newFormFields[fieldName] = e.target.value
    newFormFields.volumeWeightKgWarehouse =
      ((parseFloat(newFormFields.lengthCmWarehouse) || 0) *
        (parseFloat(newFormFields.heightCmWarehouse) || 0) *
        (parseFloat(newFormFields.widthCmWarehouse) || 0)) /
      5000
    newFormFields.weightFinalAccountingKgWarehouse = Math.max(
      parseFloat(newFormFields.volumeWeightKgWarehouse) || 0,
      parseFloat(newFormFields.weighGrossKgWarehouse) || 0,
    )

    setEditingBox(newFormFields)
  }

  const setImagesOfBox = images => {
    const newFormFields = {...editingBox}

    newFormFields.tmpImages = [...images]

    setEditingBox(newFormFields)
  }

  const onSubmith = () => {
    const lastStepEditBox = {
      ...editingBox,
      lengthCmWarehouse: parseFloat(editingBox?.lengthCmWarehouse) || '',
      widthCmWarehouse: parseFloat(editingBox?.widthCmWarehouse) || '',
      heightCmWarehouse: parseFloat(editingBox?.heightCmWarehouse) || '',
      weighGrossKgWarehouse: parseFloat(editingBox?.weighGrossKgWarehouse) || '',
      volumeWeightKgWarehouse: parseFloat(editingBox?.volumeWeightKgWarehouse) || '',
    }

    const updatedNewBoxes = newBoxes.map(oldBox => (oldBox._id === lastStepEditBox._id ? lastStepEditBox : oldBox))
    setNewBoxes([...updatedNewBoxes])
    setEditModal()
  }

  return (
    <Container disableGutters>
      <Typography className={classNames.modalTitle}>{textConsts.title}</Typography>
      <Divider className={classNames.divider} />

      <AttributesEditBlock box={editingBox} operationType={operationType} setNewBoxField={setNewBoxField} />

      <div className={classNames.photoWrapper}>
        <Typography>{'Текущие фотографии:'}</Typography>

        {box.images.length > 0 ? (
          <Carousel autoPlay timeout={100} animation="fade">
            {box.images.map((el, index) => (
              <div key={index}>
                <img
                  alt=""
                  className={classNames.imgBox}
                  src={el}
                  onClick={() => {
                    setShowPhotosModal(!showPhotosModal)

                    setBigImagesOptions({images: box.images, imgIndex: index})
                  }}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <Typography>{'Фотографий пока нет...'}</Typography>
        )}
      </div>

      <Box className={classNames.boxCode}>
        <div className={classNames.imageFileInputWrapper}>
          <ImageFileInput images={editingBox.tmpImages} setImages={setImagesOfBox} maxNumber={50} />
        </div>
      </Box>

      <Divider className={classNames.divider} />

      <div className={classNames.buttonsWrapper}>
        <Box className={classNames.button}>
          <Button onClick={() => onSubmith()}>{textConsts.saveBtn}</Button>
        </Box>

        <Box className={classNames.button}>
          <Button onClick={() => setEditModal()}>{textConsts.closeBtn}</Button>
        </Box>
      </div>

      <BigImagesModal
        isAmazone
        openModal={showPhotosModal}
        setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
        images={bigImagesOptions.images}
        imgIndex={bigImagesOptions.imgIndex}
      />
    </Container>
  )
}
