import React from 'react'

import {Box, Container, Divider, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './edit-box-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseViewsEditBoxModal

const AttributesEditBlock = ({box, operationType, setNewBoxes, setAmountFieldNewBox}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.numberInputFieldsBlocksWrapper}>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          type="number"
          min="0"
          containerClasses={classNames.numberInputField}
          label={textConsts.lengthCmWarehouse}
          value={box.lengthCmWarehouse}
          onChange={setNewBoxes('lengthCmWarehouse', box._id)}
        />
        <Field
          type="number"
          min="0"
          containerClasses={classNames.numberInputField}
          label={textConsts.widthCmWarehouse}
          value={box.widthCmWarehouse}
          onChange={setNewBoxes('widthCmWarehouse', box._id)}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          type="number"
          min="0"
          containerClasses={classNames.numberInputField}
          label={textConsts.heightCmWarehouse}
          value={box.heightCmWarehouse}
          onChange={setNewBoxes('heightCmWarehouse', box._id)}
        />
        <Field
          type="number"
          min="0"
          containerClasses={classNames.numberInputField}
          label={textConsts.weighGrossKgWarehouse}
          value={box.weighGrossKgWarehouse}
          onChange={setNewBoxes('weighGrossKgWarehouse', box._id)}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled
          type="number"
          min="0"
          containerClasses={classNames.numberInputField}
          label={textConsts.volumeWeightKgWarehouse}
          value={box.volumeWeightKgWarehouse}
          onChange={setNewBoxes('volumeWeightKgWarehouse', box._id)}
        />
        <Field
          disabled
          type="number"
          min="0"
          containerClasses={classNames.numberInputField}
          label={textConsts.weightFinalAccountingKgWarehouse}
          value={box.weightFinalAccountingKgWarehouse}
          onChange={setNewBoxes('weightFinalAccountingKgWarehouse', box._id)}
        />
      </div>
      {operationType === 'receive' ? (
        <div className={classNames.numberInputFieldsWrapper}>
          <Field
            type="number"
            min="0"
            containerClasses={classNames.numberInputField}
            label={textConsts.amountOfSubBoxes}
            value={box.amount}
            onChange={setNewBoxes('amount', box._id)}
          />
          <Field
            type="number"
            min="0"
            containerClasses={classNames.numberInputField}
            label={textConsts.amountIfItemsInBox}
            value={box.items[0].amount}
            onChange={setAmountFieldNewBox(box._id)}
          />
        </div>
      ) : undefined}
    </div>
  )
}

export const EditBoxModal = ({setEditModal, box, operationType, setNewBoxes, setAmountFieldNewBox}) => {
  const classNames = useClassNames()

  return (
    <Container disableGutters>
      <Typography className={classNames.modalTitle}>{textConsts.title}</Typography>
      <Divider className={classNames.divider} />

      <AttributesEditBlock
        box={box}
        operationType={operationType}
        setNewBoxes={setNewBoxes}
        setAmountFieldNewBox={setAmountFieldNewBox}
      />

      <Box className={classNames.boxCode}>
        <Typography className={(classNames.modalText, classNames.typoCode)}>{textConsts.addPhotos}</Typography>
        <Input disabled className={classNames.input} type="file" />
      </Box>

      <Divider className={classNames.divider} />

      <Box className={classNames.saveBox}>
        <Button onClick={() => setEditModal()}>{textConsts.closeBtn}</Button>
      </Box>
    </Container>
  )
}
