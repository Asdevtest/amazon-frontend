import React, {useState} from 'react'

import {Box, Container, Divider, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './set-barcode-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').ordersViewsModalSetBarcode

export const SetBarcodeModal = ({onClickSaveBarcode, onCloseModal, product, order, task, barCode: barCodeExternal}) => {
  const [barCode, setBarCode] = useState(
    (order && order.barCode) || (product && product.barCode) || (task && task.barCode) || barCodeExternal || '',
  )
  const classNames = useClassNames()

  return (
    <Container disableGutters>
      <Typography className={classNames.modalTitle}>{textConsts.title}</Typography>
      <Divider className={classNames.divider} />
      <Box className={classNames.boxCode}>
        <Typography className={(classNames.modalText, classNames.typoCode)}>{textConsts.code}</Typography>
        <Input
          className={classNames.input}
          inputProps={{maxLength: 2000}}
          value={barCode}
          onChange={e => setBarCode(e.target.value)}
        />
      </Box>
      <Divider className={classNames.divider} />
      <Box className={classNames.saveBox}>
        <Button className={classNames.saveBtn} onClick={() => onClickSaveBarcode(barCode)}>
          {textConsts.saveBtn}
        </Button>
        <Button onClick={onCloseModal}>{textConsts.closeBtn}</Button>
      </Box>
    </Container>
  )
}
