import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './edit-hs-code-modal.style'

export const EditHSCodeModal = ({ hsCodeData, onClickSaveHsCode, onCloseModal }) => {
  const { classes: styles } = useStyles()

  const [formFields, setFormFields] = useState(hsCodeData)

  const onChangeField = fieldName => event => {
    setFormFields(prev => ({ ...prev, [fieldName]: event.target.value }))
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>HS Code</p>

      <Field
        label="HS Code"
        className={styles.nameField}
        labelClasses={styles.label}
        containerClasses={styles.field}
        inputProps={{ maxLength: 255 }}
        value={formFields.hsCode}
        onChange={onChangeField('hsCode')}
      />

      <Field
        multiline
        minRows={2}
        maxRows={2}
        label="产品中文品名"
        labelClasses={styles.label}
        className={styles.nameField}
        containerClasses={styles.field}
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
        containerClasses={styles.field}
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
        containerClasses={styles.field}
        inputProps={{ maxLength: 255 }}
        value={formFields.productUsage}
        onChange={onChangeField('productUsage')}
      />

      <div className={styles.buttons}>
        <Button styleType={ButtonStyle.SUCCESS} onClick={() => onClickSaveHsCode(formFields)}>
          {t(TranslationKey.Save)}
        </Button>
        <Button styleType={ButtonStyle.CASUAL} onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
}
