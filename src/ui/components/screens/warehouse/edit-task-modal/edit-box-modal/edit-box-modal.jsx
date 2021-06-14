import React from 'react'

import {Box, Container, Divider, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './edit-box-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseViewsEditBoxModal

const demensionsList = ['Длина:', 'Ширина:', 'Высота:', 'Вес:', 'Финальный вес:']

export const EditBoxModal = ({setEditModal}) => {
  const classNames = useClassNames()
  return (
    <Container disableGutters>
      <Typography className={classNames.modalTitle}>{textConsts.title}</Typography>
      <Divider className={classNames.divider} />

      {demensionsList.map((el, index) => (
        <Box key={index} className={classNames.boxCode}>
          <Typography className={(classNames.modalText, classNames.typoCode)}>{el}</Typography>
          <Input className={classNames.input} />
        </Box>
      ))}

      <Box className={classNames.boxCode}>
        <Typography className={(classNames.modalText, classNames.typoCode)}>{textConsts.addPhotos}</Typography>
        <Input className={classNames.input} type="file" />
      </Box>

      <Divider className={classNames.divider} />

      <Box className={classNames.saveBox}>
        <Button className={classNames.saveBtn} onClick={() => setEditModal()}>
          {textConsts.saveBtn}
        </Button>
        <Button onClick={() => setEditModal()}>{textConsts.closeBtn}</Button>
      </Box>
    </Container>
  )
}
