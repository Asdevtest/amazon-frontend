import {ToggleButton, ToggleButtonGroup} from '@mui/material'

import React, {useState} from 'react'

import {Box, Container, Divider, Typography} from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'

import {inchesCoefficient, sizesType} from '@constants/sizes-settings'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {UploadFilesInput} from '@components/upload-files-input'

import {checkIsImageLink} from '@utils/checks'
import {toFixed} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './edit-box-tasks-modal.style'

const AttributesEditBlock = ({box, setNewBoxField, volumeWeightCoefficient, sizeSetting}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.numberInputFieldsBlocksWrapper}>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          inputProps={{maxLength: 6}}
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey.Length) + ': '}
          value={box.lengthCmWarehouse}
          onChange={setNewBoxField('lengthCmWarehouse')}
        />
        <Field
          inputProps={{maxLength: 6}}
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey.Width) + ': '}
          value={box.widthCmWarehouse}
          onChange={setNewBoxField('widthCmWarehouse')}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          inputProps={{maxLength: 6}}
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey.Height) + ': '}
          value={box.heightCmWarehouse}
          onChange={setNewBoxField('heightCmWarehouse')}
        />
        <Field
          inputProps={{maxLength: 6}}
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey.Weight) + ', ' + t(TranslationKey.Kg) + ': '}
          value={box.weighGrossKgWarehouse}
          onChange={setNewBoxField('weighGrossKgWarehouse')}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey['Volume weight']) + ', ' + t(TranslationKey.Kg) + ': '}
          value={toFixed(
            (sizeSetting === sizesType.INCHES
              ? box.heightCmWarehouse *
                inchesCoefficient *
                box.widthCmWarehouse *
                inchesCoefficient *
                box.lengthCmWarehouse *
                inchesCoefficient
              : box.heightCmWarehouse * box.widthCmWarehouse * box.lengthCmWarehouse) / volumeWeightCoefficient,
            2,
          )}
        />
        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey['Final weight']) + ', ' + t(TranslationKey.Kg) + ': '}
          value={Math.max(
            toFixed(
              (sizeSetting === sizesType.INCHES
                ? box.heightCmWarehouse *
                  inchesCoefficient *
                  box.widthCmWarehouse *
                  inchesCoefficient *
                  box.lengthCmWarehouse *
                  inchesCoefficient
                : box.heightCmWarehouse * box.widthCmWarehouse * box.lengthCmWarehouse) / volumeWeightCoefficient,
              2,
            ),
            box.weighGrossKgWarehouse,
          )}
        />
      </div>
    </div>
  )
}

export const EditBoxTasksModal = ({
  setEditModal,
  box,
  operationType,
  setNewBoxes,
  newBoxes,
  volumeWeightCoefficient,
}) => {
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

    setEditingBox(newFormFields)
  }

  const setImagesOfBox = images => {
    const newFormFields = {...editingBox}

    newFormFields.tmpImages = [...images]

    setEditingBox(newFormFields)
  }

  const onSubmit = () => {
    const lastStepEditBox = {
      ...editingBox,

      lengthCmWarehouse:
        (sizeSetting === sizesType.INCHES
          ? Math.round(editingBox.lengthCmWarehouse * inchesCoefficient * 100) / 100
          : editingBox.lengthCmWarehouse) || 0,

      widthCmWarehouse:
        (sizeSetting === sizesType.INCHES
          ? Math.round(editingBox.widthCmWarehouse * inchesCoefficient * 100) / 100
          : editingBox.widthCmWarehouse) || 0,

      heightCmWarehouse:
        (sizeSetting === sizesType.INCHES
          ? Math.round(editingBox.heightCmWarehouse * inchesCoefficient * 100) / 100
          : editingBox.heightCmWarehouse) || 0,

      weighGrossKgWarehouse: parseFloat(editingBox?.weighGrossKgWarehouse) || '',
      volumeWeightKgWarehouse: parseFloat(editingBox?.volumeWeightKgWarehouse) || '',
    }

    const updatedNewBoxes = newBoxes.map(oldBox => (oldBox._id === lastStepEditBox._id ? lastStepEditBox : oldBox))
    setNewBoxes([...updatedNewBoxes])
    setEditModal()
  }

  const [sizeSetting, setSizeSetting] = useState(sizesType.CM)

  const handleChange = (event, newAlignment) => {
    setSizeSetting(newAlignment)

    if (newAlignment === sizesType.INCHES) {
      setEditingBox({
        ...editingBox,
        lengthCmWarehouse: toFixed(editingBox.lengthCmWarehouse / inchesCoefficient, 4),
        widthCmWarehouse: toFixed(editingBox.widthCmWarehouse / inchesCoefficient, 4),
        heightCmWarehouse: toFixed(editingBox.heightCmWarehouse / inchesCoefficient, 4),
      })
    } else {
      setEditingBox({
        ...editingBox,
        lengthCmWarehouse: toFixed(editingBox.lengthCmWarehouse * inchesCoefficient, 4),
        widthCmWarehouse: toFixed(editingBox.widthCmWarehouse * inchesCoefficient, 4),
        heightCmWarehouse: toFixed(editingBox.heightCmWarehouse * inchesCoefficient, 4),
      })
    }
  }

  return (
    <Container disableGutters>
      <Typography className={classNames.modalTitle}>{t(TranslationKey['Editing the box'])}</Typography>
      <Divider className={classNames.divider} />

      <div className={classNames.sizesSubWrapper}>
        <ToggleButtonGroup exclusive size="small" color="primary" value={sizeSetting} onChange={handleChange}>
          <ToggleButton disabled={sizeSetting === sizesType.INCHES} value={sizesType.INCHES}>
            {'In'}
          </ToggleButton>
          <ToggleButton disabled={sizeSetting === sizesType.CM} value={sizesType.CM}>
            {'Cm'}
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <AttributesEditBlock
        box={editingBox}
        operationType={operationType}
        setNewBoxField={setNewBoxField}
        volumeWeightCoefficient={volumeWeightCoefficient}
        sizeSetting={sizeSetting}
      />

      <div className={classNames.photoWrapper}>
        <Typography>{t(TranslationKey['Box photos:'])}</Typography>

        {box.images.length > 0 ? (
          <Carousel autoPlay timeout={100} animation="fade">
            {box.images
              ?.filter(el => checkIsImageLink(el))
              .map((el, index) => (
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
          <Typography>{t(TranslationKey['No photos yet...'])}</Typography>
        )}
      </div>

      <Box className={classNames.boxCode}>
        <div className={classNames.imageFileInputWrapper}>
          <UploadFilesInput images={editingBox.tmpImages} setImages={setImagesOfBox} maxNumber={50} />
        </div>
      </Box>

      <Divider className={classNames.divider} />

      <div className={classNames.buttonsWrapper}>
        <Box className={classNames.button}>
          <Button onClick={onSubmit}>{t(TranslationKey.Save)}</Button>
        </Box>

        <Box className={classNames.button}>
          <Button onClick={() => setEditModal()}>{t(TranslationKey.Close)}</Button>
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
