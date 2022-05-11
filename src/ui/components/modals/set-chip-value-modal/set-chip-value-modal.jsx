import React, {useState} from 'react'

import {Box, Container, Divider, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './set-chip-value-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').ordersViewsModalSetHsCode

export const SetChipValueModal = ({title, onSubmit, onCloseModal, sourceValue}) => {
  const classNames = useClassNames()

  const [newValue, setNewValue] = useState(sourceValue)

  return (
    <Container disableGutters>
      <Typography className={classNames.modalTitle}>{title}</Typography>

      <Divider className={classNames.divider} />

      <Field
        containerClasses={classNames.field}
        inputProps={{maxLength: 255}}
        value={newValue}
        onChange={e => setNewValue(e.target.value)}
      />

      <Divider className={classNames.divider} />

      <Box className={classNames.saveBox}>
        <Button disabled={sourceValue === newValue} className={classNames.saveBtn} onClick={() => onSubmit(newValue)}>
          {textConsts.saveBtn}
        </Button>
        <Button onClick={onCloseModal}>{textConsts.closeBtn}</Button>
      </Box>
    </Container>
  )
}
