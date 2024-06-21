import { ChangeEvent, FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './link-sub-user-form.style'

interface LinkSubUserFormProps {
  onToggleModal: () => void
  onSubmit: (email: string) => void
}

export const LinkSubUserForm: FC<LinkSubUserFormProps> = memo(({ onToggleModal, onSubmit }) => {
  const { classes: styles } = useStyles()
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    onSubmit(email.toLowerCase())
    setEmail('')
  }

  return (
    <div data-testid="mainWrapper" className={styles.wrapper}>
      <p className={styles.title}>{t(TranslationKey['Add a sub-user'])}</p>

      <Field
        type="email"
        label={t(TranslationKey['Enter the email of the user you want to add'])}
        labelClasses={styles.labelField}
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />

      <div className={styles.buttons}>
        <Button disabled={email.length === 0} onClick={handleSubmit}>
          {t(TranslationKey.Add)}
        </Button>

        <Button variant={ButtonVariant.OUTLINED} onClick={onToggleModal}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
})
