import React, {useState} from 'react'

import {Box, Container, Divider, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './edit-box-tasks-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseViewsEditBoxModal

const AttributesEditBlock = ({box, setNewBoxField}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.numberInputFieldsBlocksWrapper}>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          type="number"
          containerClasses={classNames.numberInputField}
          label={textConsts.lengthCmWarehouse}
          value={box.lengthCmWarehouse}
          onChange={setNewBoxField('lengthCmWarehouse')}
        />
        <Field
          type="number"
          containerClasses={classNames.numberInputField}
          label={textConsts.widthCmWarehouse}
          value={box.widthCmWarehouse}
          onChange={setNewBoxField('widthCmWarehouse')}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          type="number"
          containerClasses={classNames.numberInputField}
          label={textConsts.heightCmWarehouse}
          value={box.heightCmWarehouse}
          onChange={setNewBoxField('heightCmWarehouse')}
        />
        <Field
          type="number"
          containerClasses={classNames.numberInputField}
          label={textConsts.weighGrossKgWarehouse}
          value={box.weighGrossKgWarehouse}
          onChange={setNewBoxField('weighGrossKgWarehouse')}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled
          type="number"
          containerClasses={classNames.numberInputField}
          label={textConsts.volumeWeightKgWarehouse}
          value={box.volumeWeightKgWarehouse}
          onChange={setNewBoxField('volumeWeightKgWarehouse')}
        />
        <Field
          disabled
          type="number"
          containerClasses={classNames.numberInputField}
          label={textConsts.weightFinalAccountingKgWarehouse}
          value={box.weightFinalAccountingKgWarehouse}
          onChange={setNewBoxField('weightFinalAccountingKgWarehouse')}
        />
      </div>
    </div>
  )
}

export const EditBoxTasksModal = ({setEditModal, box, operationType, setNewBoxes, newBoxes}) => {
  const classNames = useClassNames()

  const [editingBox, setEditingBox] = useState(box)

  const setNewBoxField = fieldName => e => {
    if (Number(e.target.value) < 0) {
      return
    }
    const newFormFields = {...editingBox}
    newFormFields[fieldName] = Number(e.target.value)
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

  const setImagesOfBox = e => {
    const newFormFields = {...editingBox}

    newFormFields.tmpImages = [...e.target.files]

    setEditingBox(newFormFields)
  }

  const onSubmith = () => {
    const updatedNewBoxes = newBoxes.map(oldBox => (oldBox._id === editingBox._id ? editingBox : oldBox))
    setNewBoxes([...updatedNewBoxes])
    setEditModal()
  }

  return (
    <Container disableGutters>
      <Typography className={classNames.modalTitle}>{textConsts.title}</Typography>
      <Divider className={classNames.divider} />

      <AttributesEditBlock box={editingBox} operationType={operationType} setNewBoxField={setNewBoxField} />

      <Box className={classNames.boxCode}>
        <Typography className={(classNames.modalText, classNames.typoCode)}>{textConsts.addPhotos}</Typography>
        <input multiple="multiple" className={classNames.input} type="file" onChange={e => setImagesOfBox(e)} />
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
    </Container>
  )
}
