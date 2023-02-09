import {Typography} from '@mui/material'

import React, {useState} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'

import {t} from '@utils/translations'

import {useClassNames} from './link-sub-user-form.style'

export const LinkSubUserForm = ({closeModal, onSubmit}) => {
  const {classes: classNames} = useClassNames()

  const [email, setEmail] = useState('')

  return (
    <div className={classNames.mainWrapper}>
      <Typography variant="h4" className={classNames.modalTitle}>
        {t(TranslationKey['Add a sub-user'])}
      </Typography>

      <Field
        data-testid={'input'}
        label={t(TranslationKey['Enter the email of the user you want to add'])}
        labelClasses={classNames.labelField}
        type="email"
        onChange={e => setEmail(e.target.value)}
      />

      <div className={classNames.buttonWrapper}>
        <Button
          disableElevation
          data-testid={'add'}
          disabled={email === ''}
          variant="contained"
          className={classNames.button}
          onClick={() => onSubmit({email: email.toLowerCase()})}
        >
          {t(TranslationKey.Add)}
        </Button>

        <Button
          data-testid={'cancel'}
          variant="text"
          className={[classNames.button, classNames.cancelButton]}
          onClick={() => closeModal()}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
