import { useState } from 'react'

import { Typography } from '@mui/material'

import {
  getConversion,
  inchesCoefficient,
  poundsWeightCoefficient,
  unitsOfChangeOptions,
} from '@constants/configs/sizes-settings'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Field } from '@components/shared/field'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { calcVolumeWeightForBox } from '@utils/calculation'
import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { maxBoxSizeFromOption } from '@utils/get-max-box-size-from-option/get-max-box-size-from-option'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './edit-box-tasks-modal.style'

const AttributesEditBlock = props => {
  const { box, setNewBoxField, volumeWeightCoefficient, sizeSetting } = props

  const { classes: styles } = useStyles()

  const isNormalLength = !Number(box.lengthCmWarehouse) || maxBoxSizeFromOption(sizeSetting, box.lengthCmWarehouse)

  const isNormalWidth = !Number(box.widthCmWarehouse) || maxBoxSizeFromOption(sizeSetting, box.widthCmWarehouse)

  const isNormalHeight = !Number(box.heightCmWarehouse) || maxBoxSizeFromOption(sizeSetting, box.heightCmWarehouse)
  return (
    <div className={styles.numberInputFieldsBlocksWrapper}>
      <div className={styles.numberInputFieldsWrapper}>
        <Field
          error={isNormalLength}
          inputProps={{ maxLength: 6 }}
          containerClasses={styles.numberInputField}
          labelClasses={styles.label}
          label={t(TranslationKey.Length) + ': '}
          value={toFixed(box.lengthCmWarehouse, 2)}
          onChange={setNewBoxField('lengthCmWarehouse')}
        />

        <Field
          inputProps={{ maxLength: 6 }}
          error={isNormalHeight}
          labelClasses={styles.label}
          containerClasses={styles.numberInputField}
          label={t(TranslationKey.Height) + ': '}
          value={toFixed(box.heightCmWarehouse, 2)}
          onChange={setNewBoxField('heightCmWarehouse')}
        />

        <Field
          disabled
          className={styles.numberInputField}
          containerClasses={styles.numberInputField}
          label={t(TranslationKey['Volume weight']) + ': '}
          labelClasses={styles.label}
          value={toFixed(calcVolumeWeightForBox(box, volumeWeightCoefficient), 2)}
        />
      </div>
      <div className={styles.numberInputFieldsWrapper}>
        <Field
          inputProps={{ maxLength: 6 }}
          error={isNormalWidth}
          containerClasses={styles.numberInputField}
          labelClasses={styles.label}
          label={t(TranslationKey.Width) + ': '}
          value={toFixed(box.widthCmWarehouse, 2)}
          onChange={setNewBoxField('widthCmWarehouse')}
        />

        <Field
          inputProps={{ maxLength: 6 }}
          error={Number(box.weighGrossKgWarehouse) === 0 && true}
          className={styles.numberInputField}
          containerClasses={styles.numberInputField}
          labelClasses={styles.label}
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
          className={styles.numberInputField}
          containerClasses={styles.numberInputField}
          label={t(TranslationKey['Final weight']) + ': '}
          labelClasses={styles.label}
          value={toFixed(
            Math.max(
              (box.heightCmWarehouse * box.widthCmWarehouse * box.lengthCmWarehouse) / volumeWeightCoefficient,
              box.weighGrossKgWarehouse,
            ),
            2,
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
  const { classes: styles, cx } = useStyles()

  const [editingBox, setEditingBox] = useState(isInStorekeeperWarehouse ? { ...box, tmpImages: [] } : box)

  const setNewBoxField = fieldName => e => {
    const newFormFields = { ...editingBox }
    if (fieldName === 'fitsInitialDimensions') {
      newFormFields[fieldName] = e.target.checked
    } else {
      if (!checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
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
            ? toFixed(editingBox.lengthCmWarehouse * inchesCoefficient, 2)
            : editingBox.lengthCmWarehouse) || 0,

        widthCmWarehouse:
          (sizeSetting === unitsOfChangeOptions.US
            ? toFixed(editingBox.widthCmWarehouse * inchesCoefficient, 2)
            : editingBox.widthCmWarehouse) || 0,

        heightCmWarehouse:
          (sizeSetting === unitsOfChangeOptions.US
            ? toFixed(editingBox.heightCmWarehouse * inchesCoefficient, 2)
            : editingBox.heightCmWarehouse) || 0,

        weighGrossKgWarehouse:
          (sizeSetting === unitsOfChangeOptions.US
            ? toFixed(editingBox.weighGrossKgWarehouse * poundsWeightCoefficient, 2)
            : parseFloat(editingBox?.weighGrossKgWarehouse)) || 0,
      }

      storekeeperWarehouseSubmit(box._id, lastStepEditBox)
    } else {
      const lastStepEditBox = {
        ...editingBox,

        lengthCmWarehouse:
          (sizeSetting === unitsOfChangeOptions.US
            ? toFixed(editingBox.lengthCmWarehouse * inchesCoefficient, 2)
            : editingBox.lengthCmWarehouse) || 0,

        widthCmWarehouse:
          (sizeSetting === unitsOfChangeOptions.US
            ? toFixed(editingBox.widthCmWarehouse * inchesCoefficient, 2)
            : editingBox.widthCmWarehouse) || 0,

        heightCmWarehouse:
          (sizeSetting === unitsOfChangeOptions.US
            ? toFixed(editingBox.heightCmWarehouse * inchesCoefficient, 2)
            : editingBox.heightCmWarehouse) || 0,

        weighGrossKgWarehouse:
          (sizeSetting === unitsOfChangeOptions.US
            ? toFixed(editingBox.weighGrossKgWarehouse * poundsWeightCoefficient, 2)
            : parseFloat(editingBox?.weighGrossKgWarehouse)) || 0,
      }

      const updatedNewBoxes = newBoxes.map(oldBox => (oldBox._id === lastStepEditBox._id ? lastStepEditBox : oldBox))

      setNewBoxes([...updatedNewBoxes])
      setEditModal()
    }
  }

  const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)

  const weightConversion = getConversion(sizeSetting, poundsWeightCoefficient)

  const handleChange = newAlignment => {
    if (newAlignment !== sizeSetting) {
      const multiplier = newAlignment === unitsOfChangeOptions.US ? inchesCoefficient : 1 / inchesCoefficient

      setEditingBox({
        ...editingBox,
        lengthCmWarehouse: toFixed(editingBox.lengthCmWarehouse / multiplier, 2),
        widthCmWarehouse: toFixed(editingBox.widthCmWarehouse / multiplier, 2),
        heightCmWarehouse: toFixed(editingBox.heightCmWarehouse / multiplier, 2),
        weighGrossKgWarehouse: toFixed(editingBox.weighGrossKgWarehouse / multiplier, 2),
      })

      setSizeSetting(newAlignment)
    }
  }

  const disabledSubmit =
    !Number(editingBox.lengthCmWarehouse) ||
    !Number(editingBox.widthCmWarehouse) ||
    !Number(editingBox.heightCmWarehouse) ||
    !Number(editingBox.weighGrossKgWarehouse) ||
    maxBoxSizeFromOption(sizeSetting, editingBox.lengthCmWarehouse) ||
    maxBoxSizeFromOption(sizeSetting, editingBox.widthCmWarehouse) ||
    maxBoxSizeFromOption(sizeSetting, editingBox.heightCmWarehouse)
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalHeaderWrapper}>
        <p className={styles.modalTitle}>{t(TranslationKey['Editing the box'])}</p>

        <CustomSwitcher
          condition={sizeSetting}
          switcherSettings={[
            { label: () => unitsOfChangeOptions.EU, value: unitsOfChangeOptions.EU },
            { label: () => unitsOfChangeOptions.US, value: unitsOfChangeOptions.US },
          ]}
          changeConditionHandler={condition => handleChange(condition)}
        />
      </div>

      <AttributesEditBlock
        weightConversion={weightConversion}
        box={editingBox}
        operationType={operationType}
        setNewBoxField={setNewBoxField}
        volumeWeightCoefficient={volumeWeightCoefficient}
        sizeSetting={sizeSetting}
      />

      <UploadFilesInput
        withoutLinks
        fullWidth
        dragAndDropBtnHeight={67}
        images={editingBox?.tmpImages?.length > 0 ? editingBox?.tmpImages : box?.images}
        setImages={setImagesOfBox}
        maxNumber={50}
      />

      <div className={styles.photoWrapper}>
        <Typography className={styles.photoAndFilesTitle}>
          {t(TranslationKey['Photos and documents of the box']) + ': '}
        </Typography>
        <PhotoAndFilesSlider
          smallSlider
          files={editingBox?.tmpImages?.length > 0 ? editingBox?.tmpImages : box?.images}
        />
      </div>

      <div className={styles.buttonsWrapper}>
        <Button success disabled={disabledSubmit} className={styles.button} onClick={onSubmit}>
          {t(TranslationKey.Save)}
        </Button>

        <Button variant="text" className={cx(styles.button, styles.cancelButton)} onClick={() => setEditModal()}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
}
