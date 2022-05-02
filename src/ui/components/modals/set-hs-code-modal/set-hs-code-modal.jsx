import React, {useState} from 'react'

import {Box, Container, Divider, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './set-hs-code-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').ordersViewsModalSetHsCode

export const SetHsCodeModal = ({onClickSaveHsCode, onCloseModal, item}) => {
  const classNames = useClassNames()

  const [hsCode, setHsCode] = useState(item?.hsCode)

  return (
    <Container disableGutters>
      <Typography className={classNames.modalTitle}>{textConsts.title}</Typography>

      <Divider className={classNames.divider} />

      <Field
        containerClasses={classNames.field}
        inputProps={{maxLength: 255}}
        value={hsCode}
        onChange={e => setHsCode(e.target.value)}
      />

      <Divider className={classNames.divider} />

      <Box className={classNames.saveBox}>
        <Button
          disabled={item?.hsCode === hsCode}
          className={classNames.saveBtn}
          onClick={() => onClickSaveHsCode(hsCode)}
        >
          {textConsts.saveBtn}
        </Button>
        <Button onClick={onCloseModal}>{textConsts.closeBtn}</Button>
      </Box>
    </Container>
  )
}
