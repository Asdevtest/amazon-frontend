import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

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
        <Button styleType={ButtonStyle.SUCCESS} disabled={disabledButton} onClick={handleSubmit}>
          {t(TranslationKey.Save)}
        </Button>

        <Button styleType={ButtonStyle.CASUAL} onClick={onClose}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
})
