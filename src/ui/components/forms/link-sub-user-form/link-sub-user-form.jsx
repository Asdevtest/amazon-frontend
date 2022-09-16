import React, {useState} from 'react'

import {Typography} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'

import {t} from '@utils/translations'

import {useClassNames} from './link-sub-user-form.style'

export const LinkSubUserForm = ({closeModal, onSubmit}) => {
  const classNames = useClassNames()

  const [email, setEmail] = useState('')

  return (
    <div className={classNames.mainWrapper}>
      <Typography variant="h4">{t(TranslationKey['Add a sub-user'])}</Typography>

      <Field
        label={t(TranslationKey['Enter the email of the user you want to add'])}
        type="email"
        onChange={e => setEmail(e.target.value)}
      />

      <div className={classNames.buttonWrapper}>
        <Button
          disableElevation
          disabled={email === ''}
          variant="contained"
          className={classNames.button}
          onClick={() => onSubmit({email: email.toLowerCase()})}
        >
          {t(TranslationKey.Add)}
        </Button>

        <Button disableElevation variant="contained" className={classNames.button} onClick={() => closeModal()}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
