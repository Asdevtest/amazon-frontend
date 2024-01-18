/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChangeEvent, FC, useState } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'

import { t } from '@utils/translations'

import { useStyles } from './link-sub-user-form.style'

interface LinkSubUserFormProps {
  closeModal?: () => void
  onSubmit?: (email: { email: string }) => void
}

export const LinkSubUserForm: FC<LinkSubUserFormProps> = props => {
  const { classes: styles, cx } = useStyles()

  const { closeModal, onSubmit } = props

  const [email, setEmail] = useState('')

  return (
    <div data-testid={'mainWrapper'} className={styles.mainWrapper}>
      <Typography variant="h4" className={styles.modalTitle}>
        {t(TranslationKey['Add a sub-user'])}
      </Typography>

      <Field
        // @ts-ignore
        type="email"
        label={t(TranslationKey['Enter the email of the user you want to add'])}
        labelClasses={styles.labelField}
        value={email}
        inputProps={{ 'data-testid': 'input' }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />

      <div className={styles.buttonWrapper}>
        <Button
          disableElevation
          data-testid={'add'}
          disabled={email === ''}
          variant="contained"
          className={styles.button}
          onClick={() => !!onSubmit && onSubmit({ email: email.toLowerCase() })}
        >
          {t(TranslationKey.Add)}
        </Button>

        <Button
          data-testid={'cancel'}
          variant="text"
          className={cx(styles.button, styles.cancelButton)}
          onClick={() => !!closeModal && closeModal()}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
