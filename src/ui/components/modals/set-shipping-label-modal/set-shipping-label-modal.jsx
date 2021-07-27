import React, {useState} from 'react'

import {Box, Container, Divider, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './set-shipping-label-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').ordersViewsModalSetShippingLabel

export const SetShippingLabelModal = ({onClickSaveShippingLabel, onCloseModal, order}) => {
  const [shippingLabel, setShippingLabel] = useState(order.shippingLabel)
  const classNames = useClassNames()

  return (
    <Container disableGutters>
      <Typography className={classNames.modalTitle}>{textConsts.title}</Typography>
      <Divider className={classNames.divider} />
      <Box className={classNames.boxCode}>
        <Typography className={(classNames.modalText, classNames.typoCode)}>{textConsts.code}</Typography>
        <Input className={classNames.input} value={shippingLabel} onChange={e => setShippingLabel(e.target.value)} />
      </Box>
      <Divider className={classNames.divider} />
      <Box className={classNames.saveBox}>
        <Button className={classNames.saveBtn} onClick={() => onClickSaveShippingLabel(shippingLabel)}>
          {textConsts.saveBtn}
        </Button>
        <Button onClick={onCloseModal}>{textConsts.closeBtn}</Button>
      </Box>
    </Container>
  )
}
