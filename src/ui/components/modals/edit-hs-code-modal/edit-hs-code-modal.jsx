import { Box, Container, Typography } from '@mui/material'

import React, { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'

import { t } from '@utils/translations'

import { useClassNames } from './edit-hs-code-modal.style'

export const EditHSCodeModal = ({ hsCodeData, onClickSaveHsCode, onCloseModal }) => {
  const { classes: classNames } = useClassNames()

  const [formFields, setFormFields] = useState({ ...hsCodeData })

  const onChangeField = fieldName => event => {
    const newFormFields = { ...formFields }
    newFormFields[fieldName] = event.target.value

    setFormFields(newFormFields)
  }

  return (
    <Container disableGutters className={classNames.modalWrapper}>
      <Typography className={classNames.modalTitle}>{'HS Code'}</Typography>

      <Field
        label={'HS Code'}
        className={classNames.nameField}
        labelClasses={classNames.label}
        inputProps={{ maxLength: 255 }}
        value={formFields.hsCode}
        onChange={onChangeField('hsCode')}
      />

      <Field
        multiline
        minRows={2}
        maxRows={2}
        label={'产品中文品名'}
        labelClasses={classNames.label}
        className={classNames.nameField}
        inputProps={{ maxLength: 255 }}
        value={formFields.chinaTitle}
        onChange={onChangeField('chinaTitle')}
      />

      <Field
        multiline
        minRows={2}
        maxRows={2}
        label={t(TranslationKey.Material)}
        className={classNames.nameField}
        labelClasses={classNames.label}
        inputProps={{ maxLength: 255 }}
        value={formFields.material}
        onChange={onChangeField('material')}
      />

      <Field
        multiline
        minRows={2}
        maxRows={2}
        label={t(TranslationKey['Product usage'])}
        className={classNames.nameField}
        labelClasses={classNames.label}
        inputProps={{ maxLength: 255 }}
        value={formFields.productUsage}
        onChange={onChangeField('productUsage')}
      />

      <Box className={classNames.saveBox}>
        <Button success className={classNames.saveBtn} onClick={() => onClickSaveHsCode(formFields)}>
          {t(TranslationKey.Save)}
        </Button>
        <Button variant="text" className={classNames.closeBtn} onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </Button>
      </Box>
    </Container>
  )
}
