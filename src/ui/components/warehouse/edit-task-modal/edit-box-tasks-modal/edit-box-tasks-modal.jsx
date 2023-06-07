import { Box, Container, Typography } from '@mui/material'

import React, { useState } from 'react'

import {
  getConversion,
  inchesCoefficient,
  poundsWeightCoefficient,
  unitsOfChangeOptions,
} from '@constants/configs/sizes-settings'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'
import { Field } from '@components/shared/field'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './edit-box-tasks-modal.style'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'

const AttributesEditBlock = ({ box, setNewBoxField, volumeWeightCoefficient, sizeSetting, weightConversion }) => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.numberInputFieldsBlocksWrapper}>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          inputProps={{ maxLength: 6 }}
          error={Number(box.lengthCmWarehouse) === 0 && true}
          className={classNames.numberInputField}
          containerClasses={classNames.numberInputField}
          labelClasses={classNames.label}
          label={t(TranslationKey.Length) + ': '}
          value={toFixed(box.lengthCmWarehouse, 2)}
          onChange={setNewBoxField('lengthCmWarehouse')}
        />

        <Field
          inputProps={{ maxLength: 6 }}
          error={Number(box.heightCmWarehouse) === 0 && true}
          labelClasses={classNames.label}
          className={classNames.numberInputField}
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey.Height) + ': '}
          value={toFixed(box.heightCmWarehouse, 2)}
          onChange={setNewBoxField('heightCmWarehouse')}
        />

        <Field
          disabled
          className={classNames.numberInputField}
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey['Volume weight']) + ': '}
          labelClasses={classNames.label}
          value={toFixed(
            (sizeSetting === unitsOfChangeOptions.US
              ? (box.heightCmWarehouse / inchesCoefficient) *
                (box.widthCmWarehouse / inchesCoefficient) *
                (box.lengthCmWarehouse / inchesCoefficient)
              : box.heightCmWarehouse * box.widthCmWarehouse * box.lengthCmWarehouse) / volumeWeightCoefficient,
            2,
          )}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          inputProps={{ maxLength: 6 }}
          error={Number(box.widthCmWarehouse) === 0 && true}
          className={classNames.numberInputField}
          containerClasses={classNames.numberInputField}
          labelClasses={classNames.label}
          label={t(TranslationKey.Width) + ': '}
          value={toFixed(box.widthCmWarehouse, 2)}
          onChange={setNewBoxField('widthCmWarehouse')}
        />

        <Field
          inputProps={{ maxLength: 6 }}
          error={Number(box.weighGrossKgWarehouse) === 0 && true}
          className={classNames.numberInputField}
          containerClasses={classNames.numberInputField}
          labelClasses={classNames.label}
          label={t(TranslationKey.Weight) + ': '}
          value={toFixed(box.weighGrossKgWarehouse, 2)}
          onChange={e => {
            if (e.target.value === '' || checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
              setNewBoxField('weighGrossKgWarehouse')(e)
            }
          }}
        />

        <Field
          disabled
          className={classNames.numberInputField}
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey['Final weight']) + ': '}
          labelClasses={classNames.label}
          value={Math.max(
            toFixed(
              ((sizeSetting === unitsOfChangeOptions.US
                ? (box.heightCmWarehouse / inchesCoefficient) *
                  (box.widthCmWarehouse / inchesCoefficient) *
                  (box.lengthCmWarehouse / inchesCoefficient)
                : box.heightCmWarehouse * box.widthCmWarehouse * box.lengthCmWarehouse) / volumeWeightCoefficient,
              box.weighGrossKgWarehouse),
              2,
            ),
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
}) => {
  const { classes: classNames } = useClassNames()

  const [editingBox, setEditingBox] = useState(isInStorekeeperWarehouse ? { ...box, tmpImages: [] } : box)

  const setNewBoxField = fieldName => e => {
    const newFormFields = { ...editingBox }
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
    const newFormFields = { ...editingBox }

    newFormFields.tmpImages = [...images]

    setEditingBox(() => newFormFields)
  }

  const onSubmit = () => {
    if (isInStorekeeperWarehouse) {
      const lastStepEditBox = {
        ...editingBox,

        lengthCmWarehouse:
          (sizeSetting === unitsOfChangeOptions.US
            ? Math.round((editingBox.lengthCmWarehouse / inchesCoefficient) * 100) / 100
            : editingBox.lengthCmWarehouse) || 0,

        widthCmWarehouse:
          (sizeSetting === unitsOfChangeOptions.US
            ? Math.round((editingBox.widthCmWarehouse / inchesCoefficient) * 100) / 100
            : editingBox.widthCmWarehouse) || 0,

        heightCmWarehouse:
          (sizeSetting === unitsOfChangeOptions.US
            ? Math.round((editingBox.heightCmWarehouse / inchesCoefficient) * 100) / 100
            : editingBox.heightCmWarehouse) || 0,

        weighGrossKgWarehouse:
          (sizeSetting === unitsOfChangeOptions.US
            ? Math.round(editingBox?.weighGrossKgWarehouse * poundsWeightCoefficient * 100) / 100
            : parseFloat(editingBox?.weighGrossKgWarehouse)) || 0,

        volumeWeightKgWarehouse:
          (sizeSetting === unitsOfChangeOptions.US
            ? Math.round(editingBox?.volumeWeightKgWarehouse * poundsWeightCoefficient * 100) / 100
            : parseFloat(editingBox?.volumeWeightKgWarehouse)) || 0,
      }

      storekeeperWarehouseSubmit(box._id, lastStepEditBox)
    } else {
      const lastStepEditBox = {
        ...editingBox,

        lengthCmWarehouse:
          (sizeSetting === unitsOfChangeOptions.US
            ? Math.round((editingBox.lengthCmWarehouse / inchesCoefficient) * 100) / 100
            : editingBox.lengthCmWarehouse) || 0,

        widthCmWarehouse:
          (sizeSetting === unitsOfChangeOptions.US
            ? Math.round((editingBox.widthCmWarehouse / inchesCoefficient) * 100) / 100
            : editingBox.widthCmWarehouse) || 0,

        heightCmWarehouse:
          (sizeSetting === unitsOfChangeOptions.US
            ? Math.round((editingBox.heightCmWarehouse / inchesCoefficient) * 100) / 100
            : editingBox.heightCmWarehouse) || 0,

        // weighGrossKgWarehouse: parseFloat(editingBox?.weighGrossKgWarehouse) || '',
        // volumeWeightKgWarehouse: parseFloat(editingBox?.volumeWeightKgWarehouse) || '',

        weighGrossKgWarehouse:
          (sizeSetting === unitsOfChangeOptions.US
            ? Math.round(editingBox?.weighGrossKgWarehouse * poundsWeightCoefficient * 100) / 100
            : parseFloat(editingBox?.weighGrossKgWarehouse)) || 0,

        volumeWeightKgWarehouse:
          (sizeSetting === unitsOfChangeOptions.US
            ? Math.round(editingBox?.volumeWeightKgWarehouse * poundsWeightCoefficient * 100) / 100
            : parseFloat(editingBox?.volumeWeightKgWarehouse)) || 0,
      }

      const updatedNewBoxes = newBoxes.map(oldBox => (oldBox._id === lastStepEditBox._id ? lastStepEditBox : oldBox))

      setNewBoxes([...updatedNewBoxes])
      setEditModal()
    }
  }

  const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)

  const weightConversion = getConversion(sizeSetting, poundsWeightCoefficient)

  const handleChange = condition => {
    setSizeSetting(condition)

    if (condition === unitsOfChangeOptions.US) {
      setEditingBox({
        ...editingBox,
        lengthCmWarehouse: toFixed(editingBox.lengthCmWarehouse / inchesCoefficient, 2),
        widthCmWarehouse: toFixed(editingBox.widthCmWarehouse / inchesCoefficient, 2),
        heightCmWarehouse: toFixed(editingBox.heightCmWarehouse / inchesCoefficient, 2),
        weighGrossKgWarehouse: toFixed(editingBox.weighGrossKgWarehouse / poundsWeightCoefficient, 2),
      })
    } else {
      setEditingBox({
        ...editingBox,
        lengthCmWarehouse: toFixed(editingBox.lengthCmWarehouse * inchesCoefficient, 2),
        widthCmWarehouse: toFixed(editingBox.widthCmWarehouse * inchesCoefficient, 2),
        heightCmWarehouse: toFixed(editingBox.heightCmWarehouse * inchesCoefficient, 2),
        weighGrossKgWarehouse: toFixed(editingBox.weighGrossKgWarehouse * poundsWeightCoefficient, 2),
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
      <div className={classNames.modalHeaderWrapper}>
        <Typography className={classNames.modalTitle}>{t(TranslationKey['Editing the box'])}</Typography>

        <div className={classNames.customSwitcherWrapper}>
          <CustomSwitcher
            condition={sizeSetting}
            nameFirstArg={unitsOfChangeOptions.EU}
            nameSecondArg={unitsOfChangeOptions.US}
            firstArgValue={unitsOfChangeOptions.EU}
            secondArgValue={unitsOfChangeOptions.US}
            changeConditionHandler={condition => handleChange(condition)}
          />
        </div>
      </div>

      <AttributesEditBlock
        weightConversion={weightConversion}
        box={editingBox}
        operationType={operationType}
        setNewBoxField={setNewBoxField}
        volumeWeightCoefficient={volumeWeightCoefficient}
        sizeSetting={sizeSetting}
      />

      <Box className={classNames.boxCode}>
        <div className={classNames.imageFileInputWrapper}>
          <UploadFilesInput
            withoutLinks
            dragAndDropBtnHeight={67}
            images={editingBox.tmpImages}
            setImages={setImagesOfBox}
            maxNumber={50}
          />
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
            files={box?.images}
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
