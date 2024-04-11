import { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import {
  inchesCoefficient,
  poundsWeightCoefficient,
  unitsOfChangeOptions,
  volumePoundsWeightCoefficient,
} from '@constants/configs/sizes-settings'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { maxBoxSizeFromOption } from '@utils/get-max-box-size-from-option/get-max-box-size-from-option'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { IBox } from '@typings/models/boxes/box'
import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './edit-box-tasks-form.style'

import { Dimensions } from './dimensions'

interface EditBoxTasksFormProps {
  box: IBox
  newBoxes: IBox[]
  volumeWeightCoefficient: number
  setNewBoxes: (boxes: IBox[]) => void
  setEditModal: () => void
  isInStorekeeperWarehouse?: boolean
  storekeeperWarehouseSubmit?: (id: string, box: IBox) => void
}

export const EditBoxTasksForm: FC<EditBoxTasksFormProps> = memo(props => {
  const {
    box,
    newBoxes,
    volumeWeightCoefficient,
    setNewBoxes,
    setEditModal,
    isInStorekeeperWarehouse,
    storekeeperWarehouseSubmit,
  } = props

  const { classes: styles } = useStyles()

  const [editingBox, setEditingBox] = useState<IBox>(box)
  const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)

  useEffect(() => {
    if (box) {
      setEditingBox(box)
    }
  }, [box])

  const setNewBoxField =
    <T extends keyof IBox>(fieldName: T) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const newFormFields: IBox = { ...editingBox }

      if (!checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
        return
      }

      newFormFields[fieldName] = e.target.value as IBox[T]

      setEditingBox(newFormFields)
    }

  const setImagesOfBox = (tmpImages: UploadFileType[]) => {
    setEditingBox((prev: IBox) => ({ ...prev, tmpImages }))
  }

  const onSubmit = () => {
    const lastStepEditBox: IBox = {
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
          : editingBox?.weighGrossKgWarehouse) || 0,
    }

    if (isInStorekeeperWarehouse) {
      storekeeperWarehouseSubmit ? storekeeperWarehouseSubmit(box._id, lastStepEditBox) : undefined
    } else {
      const updatedNewBoxes = newBoxes.map((oldBox: IBox) =>
        oldBox._id === lastStepEditBox._id ? lastStepEditBox : oldBox,
      )

      setNewBoxes(updatedNewBoxes)
      setEditModal()
    }
  }

  const handleChange = (newAlignment: keyof typeof unitsOfChangeOptions) => {
    if (newAlignment !== sizeSetting) {
      const multiplier = newAlignment === unitsOfChangeOptions.US ? 1 / inchesCoefficient : inchesCoefficient
      const weightMultiplier =
        newAlignment === unitsOfChangeOptions.US ? 1 / poundsWeightCoefficient : poundsWeightCoefficient

      setEditingBox((prev: IBox) => ({
        ...prev,
        lengthCmWarehouse: toFixed(editingBox.lengthCmWarehouse * multiplier, 2),
        widthCmWarehouse: toFixed(editingBox.widthCmWarehouse * multiplier, 2),
        heightCmWarehouse: toFixed(editingBox.heightCmWarehouse * multiplier, 2),
        weighGrossKgWarehouse: toFixed(editingBox.weighGrossKgWarehouse * weightMultiplier, 2),
      }))

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
  const weightCoefficient =
    sizeSetting === unitsOfChangeOptions.EU ? volumeWeightCoefficient : volumePoundsWeightCoefficient

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t(TranslationKey['Editing the box'])}</p>

      <CustomSwitcher
        condition={sizeSetting}
        switcherSettings={[
          { label: () => unitsOfChangeOptions.EU, value: unitsOfChangeOptions.EU },
          { label: () => unitsOfChangeOptions.US, value: unitsOfChangeOptions.US },
        ]}
        changeConditionHandler={condition => handleChange(condition as keyof typeof unitsOfChangeOptions)}
      />

      <Dimensions
        box={editingBox}
        sizeSetting={sizeSetting}
        weightCoefficient={weightCoefficient}
        setNewBoxField={setNewBoxField}
      />

      <UploadFilesInput
        withoutLinks
        dragAndDropButtonHeight={60}
        images={editingBox?.tmpImages}
        setImages={setImagesOfBox}
      />

      <div className={styles.buttons}>
        <Button styleType={ButtonStyle.SUCCESS} disabled={disabledSubmit} onClick={onSubmit}>
          {t(TranslationKey.Save)}
        </Button>

        <Button styleType={ButtonStyle.CASUAL} onClick={setEditModal}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
})
