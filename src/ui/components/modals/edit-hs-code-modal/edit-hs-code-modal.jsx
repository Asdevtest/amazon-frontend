import { useState } from 'react'

import { Box, Container, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'

import { t } from '@utils/translations'

import { ButtonType, ButtonVariant } from '@typings/types/button.type'

import { useStyles } from './edit-hs-code-modal.style'

export const EditHSCodeModal = ({ hsCodeData, onClickSaveHsCode, onCloseModal }) => {
  const { classes: styles } = useStyles()

  const [formFields, setFormFields] = useState({ ...hsCodeData })

  const onChangeField = fieldName => event => {
    const newFormFields = { ...formFields }
    newFormFields[fieldName] = event.target.value

    setFormFields(newFormFields)
  }

  return (
    <Container disableGutters className={styles.modalWrapper}>
      <Typography className={styles.modalTitle}>{'HS Code'}</Typography>

      <Field
        label={'HS Code'}
        className={styles.nameField}
        labelClasses={styles.label}
        inputProps={{ maxLength: 255 }}
        value={formFields.hsCode}
        onChange={onChangeField('hsCode')}
      />

      <Field
        multiline
        minRows={2}
        maxRows={2}
        label={'产品中文品名'}
        labelClasses={styles.label}
        className={styles.nameField}
        inputProps={{ maxLength: 255 }}
        value={formFields.chinaTitle}
        onChange={onChangeField('chinaTitle')}
      />

      <Field
        multiline
        minRows={2}
        maxRows={2}
        label={t(TranslationKey.Material)}
        className={styles.nameField}
        labelClasses={styles.label}
        inputProps={{ maxLength: 255 }}
        value={formFields.material}
        onChange={onChangeField('material')}
      />

      <Field
        multiline
        minRows={2}
        maxRows={2}
        label={t(TranslationKey['Product usage'])}
        className={styles.nameField}
        labelClasses={styles.label}
        inputProps={{ maxLength: 255 }}
        value={formFields.productUsage}
        onChange={onChangeField('productUsage')}
      />

      <Box className={styles.saveBox}>
        <Button styleType={ButtonType.SUCCESS} className={styles.saveBtn} onClick={() => onClickSaveHsCode(formFields)}>
          {t(TranslationKey.Save)}
        </Button>
        <Button variant={ButtonVariant.OUTLINED} className={styles.closeBtn} onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </Button>
      </Box>
    </Container>
  )
}
