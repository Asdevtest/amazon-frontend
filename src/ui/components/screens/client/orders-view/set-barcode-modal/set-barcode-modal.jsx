import React from 'react'

import {Box, Container, Divider, Typography, Button} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './set-barcode-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').ordersViewsModalSetBarcode

export const SetBarcodeModal = ({setModalBarcode}) => {
  const classNames = useClassNames()
  return (
    <Container disableGutters>
      <Typography className={classNames.modalTitle}>{textConsts.title}</Typography>
      <Divider className={classNames.divider} />
      <Box className={classNames.boxCode}>
        <Typography className={(classNames.modalText, classNames.typoCode)}>{textConsts.code}</Typography>
        <Input className={classNames.input} />
      </Box>
      <Divider className={classNames.divider} />
      <Box className={classNames.saveBox}>
        <Button className={classNames.saveBtn} onClick={() => setModalBarcode(false)}>
          {textConsts.saveBtn}
        </Button>
        <Button onClick={() => setModalBarcode(false)}>{textConsts.closeBtn}</Button>
      </Box>
    </Container>
  )
}
