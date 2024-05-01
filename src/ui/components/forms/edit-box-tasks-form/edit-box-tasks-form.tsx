import isEqual from 'lodash.isequal'
import { FC, memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { SizeSwitcher } from '@components/shared/size-switcher'
import { UploadFilesInput } from '@components/shared/upload-files-input'
import { WarehouseDimensions } from '@components/shared/warehouse-dimensions'

import { maxBoxSizeFromOption } from '@utils/get-max-box-size-from-option/get-max-box-size-from-option'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { Dimensions } from '@typings/enums/dimensions'
import { IBox } from '@typings/models/boxes/box'
import { UploadFileType } from '@typings/shared/upload-file'

import { useChangeDimensions } from '@hooks/dimensions/use-change-dimensions'

import { useStyles } from './edit-box-tasks-form.style'

interface EditBoxTasksFormProps {
  box: IBox
  newBoxes: IBox[]
  setNewBoxes: (boxes: IBox[]) => void
  setEditModal: () => void
  setIsChangedBox?: (isChangedBox: boolean) => void
  isInStorekeeperWarehouse?: boolean
  storekeeperWarehouseSubmit?: (id: string, box: IBox) => void
}

export const EditBoxTasksForm: FC<EditBoxTasksFormProps> = memo(props => {
  const {
    box,
    newBoxes,
    setNewBoxes,
    setEditModal,
    isInStorekeeperWarehouse,
    setIsChangedBox,
    storekeeperWarehouseSubmit,
  } = props

  const { classes: styles } = useStyles()

  const [editingBox, setEditingBox] = useState<IBox>(box)
  const [sizeSetting, setSizeSetting] = useState(Dimensions.EU)
  const { dimensions, onChangeDimensions } = useChangeDimensions({
    data: editingBox,
    sizeSetting,
  })

  useEffect(() => {
    if (box) {
      setEditingBox(box)
    }
  }, [box])

  const setImagesOfBox = (tmpImages: UploadFileType[]) => {
    setEditingBox((prev: IBox) => ({ ...prev, tmpImages }))
  }

  const onSubmit = () => {
    setSizeSetting(Dimensions.EU)

    const lastStepEditBox: IBox = {
      ...editingBox,
      lengthCmWarehouse: Number(dimensions.length),
      widthCmWarehouse: Number(dimensions.width),
      heightCmWarehouse: Number(dimensions.height),
      weighGrossKgWarehouse: Number(dimensions.weight),
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

  useEffect(() => {
    if (setIsChangedBox) {
      setIsChangedBox(isEqual(box, editingBox))
    }
  }, [])

  const disabledSubmit =
    maxBoxSizeFromOption(sizeSetting, Number(dimensions.length)) ||
    maxBoxSizeFromOption(sizeSetting, Number(dimensions.width)) ||
    maxBoxSizeFromOption(sizeSetting, Number(dimensions.height))

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t(TranslationKey['Editing the box'])}</p>

      <SizeSwitcher condition={sizeSetting} onChangeCondition={setSizeSetting} />

      <WarehouseDimensions dimensions={dimensions} sizeSetting={sizeSetting} onChangeDimensions={onChangeDimensions} />

      <UploadFilesInput
        withoutLinks
        dragAndDropButtonHeight={60}
        images={editingBox?.tmpImages?.length > 0 ? editingBox?.tmpImages : box?.images}
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
