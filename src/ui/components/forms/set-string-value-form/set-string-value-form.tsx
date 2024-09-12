import { FC, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'

import { t } from '@utils/translations'

import { useStyles } from './set-string-value-form.style'

interface SetChipValueModalProps {
  onSubmit: (value: string) => void
  onClose: () => void
  title?: string
  sourceValue?: string
}

export const SetStringValueForm: FC<SetChipValueModalProps> = props => {
  const { onSubmit, onClose, title, sourceValue } = props

  const { classes: styles } = useStyles()
  const [value, setValue] = useState(sourceValue || '')

  return (
    <div className={styles.root}>
      <p className={styles.title}>{title || ''}</p>

      <CustomInput size="large" value={value} onChange={e => setValue(e.target.value)} />

      <div className={styles.buttons}>
        <CustomButton size="large" type="primary" disabled={sourceValue === value} onClick={() => onSubmit(value)}>
          {t(TranslationKey.Save)}
        </CustomButton>
        <CustomButton size="large" onClick={onClose}>
          {t(TranslationKey.Close)}
        </CustomButton>
      </div>
    </div>
  )
}
