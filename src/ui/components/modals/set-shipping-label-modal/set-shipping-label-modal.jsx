import React, {useState} from 'react'

import {Box, Container, Divider, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'

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

      <Field
        multiline
        minRows={4}
        rowsMax={4}
        className={classNames.labelField}
        inputProps={{maxLength: 1000}}
        value={shippingLabel}
        error={shippingLabel.length < 5 && shippingLabel.length > 0 && textConsts.shippingLabelError}
        onChange={e => setShippingLabel(e.target.value.replace(' ', ''))}
      />

      <Divider className={classNames.divider} />
      <Box className={classNames.saveBox}>
        <Button
          disabled={shippingLabel.length < 5 && shippingLabel.length > 0}
          className={classNames.saveBtn}
          onClick={() => onClickSaveShippingLabel(shippingLabel)}
        >
          {textConsts.saveBtn}
        </Button>
        <Button onClick={onCloseModal}>{textConsts.closeBtn}</Button>
      </Box>
    </Container>
  )
}
