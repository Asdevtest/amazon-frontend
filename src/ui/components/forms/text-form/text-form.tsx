import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import '@typings/enums/button-style'

import { useStyles } from './text-form.style'

interface TextFormProps {
  title: string
  onClose: () => void
  onSubmit: (text: string) => void
  maxLength?: number
}

export const TextForm: FC<TextFormProps> = memo(props => {
  const { title, onClose, onSubmit, maxLength } = props

  const { classes: styles } = useStyles()

  const [text, setText] = useState('')

  const handleSubmit = () => {
    setText('')
    onSubmit(text)
    onClose()
  }

  const disabledButton = text.length === 0

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>

      <input
        type="text"
        maxLength={maxLength}
        value={text}
        placeholder={t(TranslationKey.Title) + '...'}
        className={styles.input}
        onChange={e => setText(e.target.value)}
      />

      <div className={styles.buttons}>
        <CustomButton type="primary" disabled={disabledButton} onClick={handleSubmit}>
          {t(TranslationKey.Save)}
        </CustomButton>

        <CustomButton onClick={onClose}>{t(TranslationKey.Close)}</CustomButton>
      </div>
    </div>
  )
})
