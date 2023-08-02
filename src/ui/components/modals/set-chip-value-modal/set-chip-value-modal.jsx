import React, { useState } from 'react'

import { Box, Container, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'

import { t } from '@utils/translations'

import { useClassNames } from './set-chip-value-modal.style'

export const SetChipValueModal = ({ title, onSubmit, onCloseModal, sourceValue, isInts, maxLength }) => {
  const { classes: classNames } = useClassNames()

  const [newValue, setNewValue] = useState(sourceValue)

  return (
    <Container disableGutters className={classNames.modalWrapper}>
      <Typography className={classNames.modalTitle}>{title}</Typography>

      <Field
        containerClasses={classNames.field}
        inputProps={{ maxLength: maxLength ? maxLength : 255 }}
        value={newValue}
        onChange={e => setNewValue(isInts ? (e.target.value ? parseInt(e.target.value) : 0) : e.target.value)}
      />

      <Box className={classNames.saveBox}>
        <Button
          success
          disabled={sourceValue === newValue}
          className={classNames.saveBtn}
          onClick={() => onSubmit(newValue)}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button variant="text" className={classNames.closeBtn} onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </Button>
      </Box>
    </Container>
  )
}
