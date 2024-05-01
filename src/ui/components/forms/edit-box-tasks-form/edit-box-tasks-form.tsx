import isEqual from 'lodash.isequal'
import { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { SizeSwitcher } from '@components/shared/size-switcher'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { maxBoxSizeFromOption } from '@utils/get-max-box-size-from-option/get-max-box-size-from-option'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { Dimensions } from '@typings/enums/dimensions'
import { IBox } from '@typings/models/boxes/box'
import { UploadFileType } from '@typings/shared/upload-file'

import { Entities, useShowDimensions } from '@hooks/dimensions/use-show-dimensions'

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
  const { length, width, height, weight, volumeWeight, finalWeight } = useShowDimensions({
    data: editingBox,
    sizeSetting,
    calculationField: Entities.WAREHOUSE,
  })

  useEffect(() => {
    if (box) {
      setEditingBox(box)
    }
  }, [box])

  const setNewBoxField = (fieldName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const newFormFields: IBox = { ...editingBox }

    if (!checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
      return
    }

    // @ts-ignore
    newFormFields[fieldName] = e.target.value

    setEditingBox(newFormFields)
  }

  const setImagesOfBox = (tmpImages: UploadFileType[]) => {
    setEditingBox((prev: IBox) => ({ ...prev, tmpImages }))
  }

  const onSubmit = () => {
    setSizeSetting(Dimensions.EU)

    const lastStepEditBox: IBox = {
      ...editingBox,
      lengthCmWarehouse: length,
      widthCmWarehouse: width,
      heightCmWarehouse: height,
      weighGrossKgWarehouse: weight,
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
    !Number(editingBox.lengthCmWarehouse) ||
    !Number(editingBox.widthCmWarehouse) ||
    !Number(editingBox.heightCmWarehouse) ||
    !Number(editingBox.weighGrossKgWarehouse) ||
    maxBoxSizeFromOption(sizeSetting, editingBox.lengthCmWarehouse) ||
    maxBoxSizeFromOption(sizeSetting, editingBox.widthCmWarehouse) ||
    maxBoxSizeFromOption(sizeSetting, editingBox.heightCmWarehouse)

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t(TranslationKey['Editing the box'])}</p>

      <SizeSwitcher condition={sizeSetting} onChangeCondition={setSizeSetting} />

      {/* <WarehouseDimensions
        length={length}
        width={width}
        height={height}
        weight={weight}
        volumeWeight={volumeWeight}
        finalWeight={finalWeight}
        sizeSetting={sizeSetting}
        setFormField={setNewBoxField}
      /> */}

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
