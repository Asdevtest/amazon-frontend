import React, {useState} from 'react'

import {Box, Container, Divider, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './edit-box-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseViewsEditBoxModal

const DEMENSIONS_LIST = [
  {text: textConsts.lengthConfigText, fieldName: 'lengthCmWarehouse'},
  {text: textConsts.widthConfigText, fieldName: 'widthCmWarehouse'},
  {text: textConsts.heightConfigText, fieldName: 'heightCmWarehouse'},
  {text: textConsts.volumeWeightConfigText, fieldName: 'volumeWeightKgWarehouse'},
  {text: textConsts.weightFinalConfigText, fieldName: 'weightFinalAccountingKgWarehouse'},
]

export const EditBoxModal = ({setEditModal, updateBoxSubmit, box}) => {
  const classNames = useClassNames()

  const [boxState, setBoxState] = useState(box)

  const onClickSaveBtn = (id, data) => {
    updateBoxSubmit(id, data)
    setEditModal()
  }

  return (
    <Container disableGutters>
      <Typography className={classNames.modalTitle}>{textConsts.title}</Typography>
      <Divider className={classNames.divider} />

      {DEMENSIONS_LIST.map((el, index) => (
        <Box key={index} className={classNames.boxCode}>
          <Typography className={(classNames.modalText, classNames.typoCode)}>{el.text}</Typography>
          <Input
            className={classNames.input}
            onChange={event => setBoxState({...boxState, [el.fieldName]: event.target.value})}
          />
        </Box>
      ))}

      <Box className={classNames.boxCode}>
        <Typography className={(classNames.modalText, classNames.typoCode)}>{textConsts.addPhotos}</Typography>
        <Input className={classNames.input} type="file" />
      </Box>

      <Divider className={classNames.divider} />

      <Box className={classNames.saveBox}>
        <Button className={classNames.saveBtn} onClick={() => onClickSaveBtn(boxState.boxId, boxState)}>
          {textConsts.saveBtn}
        </Button>
        <Button onClick={() => setEditModal()}>{textConsts.closeBtn}</Button>
      </Box>
    </Container>
  )
}
