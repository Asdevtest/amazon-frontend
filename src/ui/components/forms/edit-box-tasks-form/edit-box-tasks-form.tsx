import { FC, memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { SizeSwitcher } from '@components/shared/size-switcher'
import { UploadFilesInput } from '@components/shared/upload-files-input'
import { WarehouseDimensions } from '@components/shared/warehouse-dimensions'

import { maxBoxSizeFromOption } from '@utils/get-max-box-size-from-option/get-max-box-size-from-option'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { Dimensions } from '@typings/enums/dimensions'
import { IBox } from '@typings/models/boxes/box'
import { UploadFileType } from '@typings/shared/upload-file'

import { INCHES_COEFFICIENT, POUNDS_COEFFICIENT, useChangeDimensions } from '@hooks/dimensions/use-change-dimensions'

import { useStyles } from './edit-box-tasks-form.style'

interface EditBoxTasksFormProps {
  box: IBox
  newBoxes: IBox[]
  setNewBoxes: (boxes: IBox[]) => void
  setEditModal: () => void
  isInStorekeeperWarehouse?: boolean
  storekeeperWarehouseSubmit?: (id: string, box: IBox) => void
}

export const EditBoxTasksForm: FC<EditBoxTasksFormProps> = memo(props => {
  const { box, newBoxes, setNewBoxes, setEditModal, isInStorekeeperWarehouse, storekeeperWarehouseSubmit } = props

  const { classes: styles } = useStyles()

  const [editingBox, setEditingBox] = useState<IBox>(box)

  useEffect(() => {
    if (box) {
      setEditingBox(box)
    }
  }, [box])

  const [sizeSetting, setSizeSetting] = useState(Dimensions.EU)
  const { onChangeDimensions } = useChangeDimensions({
    data: editingBox,
    setData: setEditingBox,
    sizeSetting,
  })

  const setImagesOfBox = (images: UploadFileType[]) => {
    setEditingBox((prev: IBox) => ({ ...prev, images }))
  }

  const onSubmit = () => {
    const updateEditingBox = { ...editingBox }

    if (sizeSetting === Dimensions.US) {
      updateEditingBox.lengthCmWarehouse = Number(toFixed(updateEditingBox.lengthCmWarehouse * INCHES_COEFFICIENT))
      updateEditingBox.widthCmWarehouse = Number(toFixed(updateEditingBox.widthCmWarehouse * INCHES_COEFFICIENT))
      updateEditingBox.heightCmWarehouse = Number(toFixed(updateEditingBox.heightCmWarehouse * INCHES_COEFFICIENT))
      updateEditingBox.weighGrossKgWarehouse = Number(
        toFixed(updateEditingBox.weighGrossKgWarehouse * POUNDS_COEFFICIENT),
      )
    } else {
      updateEditingBox.lengthCmWarehouse = Number(updateEditingBox.lengthCmWarehouse)
      updateEditingBox.widthCmWarehouse = Number(updateEditingBox.widthCmWarehouse)
      updateEditingBox.heightCmWarehouse = Number(updateEditingBox.heightCmWarehouse)
      updateEditingBox.weighGrossKgWarehouse = Number(updateEditingBox.weighGrossKgWarehouse)
    }

    if (isInStorekeeperWarehouse) {
      storekeeperWarehouseSubmit?.(box._id, updateEditingBox)
    } else {
      const updatedNewBoxes = newBoxes.map((oldBox: IBox) =>
        oldBox._id === updateEditingBox._id ? updateEditingBox : oldBox,
      )

      setNewBoxes(updatedNewBoxes)
      setEditModal()
    }
  }

  const disabledSubmit =
    maxBoxSizeFromOption(sizeSetting, Number(editingBox.lengthCmWarehouse)) ||
    maxBoxSizeFromOption(sizeSetting, Number(editingBox.widthCmWarehouse)) ||
    maxBoxSizeFromOption(sizeSetting, Number(editingBox.heightCmWarehouse)) ||
    Number(editingBox.lengthCmWarehouse) <= 0 ||
    Number(editingBox.widthCmWarehouse) <= 0 ||
    Number(editingBox.heightCmWarehouse) <= 0 ||
    Number(editingBox.weighGrossKgWarehouse) <= 0

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t(TranslationKey['Editing the box'])}</p>

      <SizeSwitcher condition={sizeSetting} onChangeCondition={setSizeSetting} />

      <WarehouseDimensions dimensions={editingBox} sizeSetting={sizeSetting} onChangeDimensions={onChangeDimensions} />

      <UploadFilesInput
        withoutLinks
        dragAndDropButtonHeight={60}
        images={editingBox?.images}
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
