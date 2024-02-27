import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './text-form.style'

interface TextFormProps {
  title: string
  onClose: () => void
  onSubmit: (text: string) => void
}

export const TextForm: FC<TextFormProps> = memo(props => {
  const { title, onClose, onSubmit } = props

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
        value={text}
        placeholder={t(TranslationKey.Title) + '...'}
        className={styles.input}
        onChange={e => setText(e.target.value)}
      />

      <div className={styles.buttons}>
        <Button
          styleType={ButtonStyle.SUCCESS}
          disabled={disabledButton}
          className={styles.button}
          onClick={handleSubmit}
        >
          {t(TranslationKey.Save)}
        </Button>

        <Button className={styles.button} onClick={onClose}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
})
