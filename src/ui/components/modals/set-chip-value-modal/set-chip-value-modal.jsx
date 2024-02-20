import { useState } from 'react'

import { Box, Container, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'

import { t } from '@utils/translations'

import { ButtonType, ButtonVariant } from '@typings/types/button.type'

import { useStyles } from './set-chip-value-modal.style'

export const SetChipValueModal = ({ title, onSubmit, onCloseModal, sourceValue, isInts, maxLength }) => {
  const { classes: styles } = useStyles()

  const [newValue, setNewValue] = useState(sourceValue)

  return (
    <Container disableGutters className={styles.modalWrapper}>
      <Typography className={styles.modalTitle}>{title}</Typography>

      <Field
        containerClasses={styles.field}
        inputProps={{ maxLength: maxLength ? maxLength : 255 }}
        value={newValue}
        onChange={e => setNewValue(isInts ? (e.target.value ? parseInt(e.target.value) : 0) : e.target.value)}
      />

      <Box className={styles.saveBox}>
        <Button
          styleType={ButtonType.SUCCESS}
          disabled={sourceValue === newValue}
          className={styles.saveBtn}
          onClick={() => onSubmit(newValue)}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button variant={ButtonVariant.OUTLINED} className={styles.closeBtn} onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </Button>
      </Box>
    </Container>
  )
}
