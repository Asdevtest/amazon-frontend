import {useState} from 'react'

import {Box, Button, Container, Divider, Input, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './set-barcode-modal-content.style'

const textConsts = getLocalizedTexts(texts, 'en').setBarcodeModalContent

export const SetBarcodeModalContent = ({onClose, onSaveBarcode, barcodeValue}) => {
  const classNames = useClassNames()
  const [inputValue, setInputValue] = useState(barcodeValue)

  const onClickSaveBarcode = () => {
    onSaveBarcode(inputValue)
    onClose()
  }

  return (
    <Container disableGutters>
      <Typography className={classNames.modalTitle}>{textConsts.title}</Typography>
      <Divider className={classNames.divider} />
      <Box className={classNames.labelInputWrapper}>
        <Typography className={classNames.modalText}>{textConsts.inputLabel}</Typography>
        <Input value={inputValue} className={classNames.input} onChange={e => setInputValue(e.target.value)} />
      </Box>
      <Divider className={classNames.divider2} />
      <Box className={classNames.btnsWrapper}>
        <Button variant="contained" color="primary" onClick={onClickSaveBarcode}>
          {textConsts.saveBtn}
        </Button>
        <Button variant="contained" color="primary" className={classNames.btnClose} onClick={onClose}>
          {textConsts.close}
        </Button>
      </Box>
    </Container>
  )
}
