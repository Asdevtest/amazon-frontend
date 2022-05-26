import React, {useState} from 'react'

import {Box, Container, Divider, Typography} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'

import {t} from '@utils/translations'

import {useClassNames} from './set-chip-value-modal.style'

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
          {t(TranslationKey.Save)}
        </Button>
        <Button onClick={onCloseModal}>{t(TranslationKey.Close)}</Button>
      </Box>
    </Container>
  )
}
