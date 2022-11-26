import {Box, Container, Typography} from '@mui/material'

import React, {useState} from 'react'

import {inchesCoefficient, sizesType} from '@constants/sizes-settings'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field'
import {ToggleBtnGroup} from '@components/toggle-btn-group/toggle-btn-group'
import {ToggleBtn} from '@components/toggle-btn-group/toggle-btn/toggle-btn'
import {UploadFilesInput} from '@components/upload-files-input'

import {toFixed} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './product-lot-data-modal.style'

const AttributesEditBlock = ({box, setNewBoxField, volumeWeightCoefficient, sizeSetting}) => {
  const {classes: classNames} = useClassNames()
  return (
    <div className={classNames.numberInputFieldsBlocksWrapper}>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          inputProps={{maxLength: 6}}
          error={Number(box.lengthCmWarehouse) === 0 && true}
          containerClasses={classNames.numberInputField}
          labelClasses={classNames.label}
          label={t(TranslationKey.Length) + ': '}
          value={box.lengthCmWarehouse}
          onChange={setNewBoxField('lengthCmWarehouse')}
        />

        <Field
          inputProps={{maxLength: 6}}
          error={Number(box.heightCmWarehouse) === 0 && true}
          labelClasses={classNames.label}
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey.Height) + ': '}
          value={box.heightCmWarehouse}
          onChange={setNewBoxField('heightCmWarehouse')}
        />

        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey['Volume weight']) + ', ' + t(TranslationKey.Kg) + ': '}
          labelClasses={classNames.label}
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
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          inputProps={{maxLength: 6}}
          error={Number(box.widthCmWarehouse) === 0 && true}
          containerClasses={classNames.numberInputField}
          labelClasses={classNames.label}
          label={t(TranslationKey.Width) + ': '}
          value={box.widthCmWarehouse}
          onChange={setNewBoxField('widthCmWarehouse')}
        />

        <Field
          inputProps={{maxLength: 6}}
          error={Number(box.weighGrossKgWarehouse) === 0 && true}
          containerClasses={classNames.numberInputField}
          labelClasses={classNames.label}
          label={t(TranslationKey.Weight) + ', ' + t(TranslationKey.Kg) + ': '}
          value={box.weighGrossKgWarehouse}
          onChange={setNewBoxField('weighGrossKgWarehouse')}
        />

        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey['Final weight']) + ', ' + t(TranslationKey.Kg) + ': '}
          labelClasses={classNames.label}
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
  isInStorekeeperWarehouse,
  setEditModal,
  box,
  operationType,
  setNewBoxes,

  newBoxes,
  volumeWeightCoefficient,
  storekeeperWarehouseSubmit,
  // isReceive,
  // primarySizeSuitableCheckbox,
}) => {
  const {classes: classNames} = useClassNames()

  const [editingBox, setEditingBox] = useState(isInStorekeeperWarehouse ? {...box, tmpImages: []} : box)

  const setNewBoxField = fieldName => e => {
    const newFormFields = {...editingBox}
    if (fieldName === 'fitsInitialDimensions') {
      newFormFields[fieldName] = e.target.checked
    } else {
      if (isNaN(e.target.value) || Number(e.target.value) < 0) {
        return
      }

      newFormFields[fieldName] = e.target.value
    }

    setEditingBox(newFormFields)
  }

  const setImagesOfBox = images => {
    const newFormFields = {...editingBox}

    newFormFields.tmpImages = [...images]

    setEditingBox(() => newFormFields)
  }

  const onSubmit = () => {
    if (isInStorekeeperWarehouse) {
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
      }

      storekeeperWarehouseSubmit(box._id, lastStepEditBox)
    } else {
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

  const disabledSubmit =
    !Number(editingBox.lengthCmWarehouse) ||
    !Number(editingBox.widthCmWarehouse) ||
    !Number(editingBox.heightCmWarehouse) ||
    !Number(editingBox.weighGrossKgWarehouse)

  return (
    <Container disableGutters className={classNames.modalWrapper}>
      <Typography className={classNames.modalTitle}>{t(TranslationKey['Editing the box'])}</Typography>

      <div className={classNames.sizesSubWrapper}>
        <ToggleBtnGroup exclusive size="small" color="primary" value={sizeSetting} onChange={handleChange}>
          <ToggleBtn disabled={sizeSetting === sizesType.INCHES} value={sizesType.INCHES}>
            {'In'}
          </ToggleBtn>
          <ToggleBtn disabled={sizeSetting === sizesType.CM} value={sizesType.CM}>
            {'Cm'}
          </ToggleBtn>
        </ToggleBtnGroup>
      </div>

      <AttributesEditBlock
        box={editingBox}
        operationType={operationType}
        setNewBoxField={setNewBoxField}
        volumeWeightCoefficient={volumeWeightCoefficient}
        sizeSetting={sizeSetting}
      />

      <Box className={classNames.boxCode}>
        <div className={classNames.imageFileInputWrapper}>
          <UploadFilesInput images={editingBox.tmpImages} setImages={setImagesOfBox} maxNumber={50} />
        </div>
      </Box>
      <div className={classNames.photoWrapper}>
        <Typography className={classNames.photoAndFilesTitle}>
          {t(TranslationKey['Photos and documents of the box']) + ': '}
        </Typography>
        <div className={classNames.photoAndFilesTitleMobileWrapper}>
          <PhotoAndFilesCarousel
            small
            direction={window.screen.width < 768 ? 'column' : 'row'}
            files={box.images}
            width={window.screen.width < 768 ? '400px' : '300px'}
          />
        </div>
      </div>

      <div className={classNames.buttonsWrapper}>
        <Button success disabled={disabledSubmit} className={classNames.saveButton} onClick={onSubmit}>
          {t(TranslationKey.Save)}
        </Button>

        <Button variant="text" className={classNames.cancelButton} onClick={() => setEditModal()}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </Container>
  )
}
