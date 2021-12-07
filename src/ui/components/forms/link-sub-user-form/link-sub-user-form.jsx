import React, {useState} from 'react'

import {Button, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './link-sub-user-form.style'

const textConsts = getLocalizedTexts(texts, 'en').linkSubUserForm

export const LinkSubUserForm = ({closeModal, onSubmit}) => {
  const classNames = useClassNames()

  const [email, setEmail] = useState('')

  return (
    <div disableGutters className={classNames.mainWrapper}>
      <Typography variant="h3">{textConsts.title}</Typography>

      <Field label={textConsts.email} type="email" onChange={e => setEmail(e.target.value)} />

      <div className={classNames.buttonWrapper}>
        <Button disableElevation variant="contained" className={classNames.button} onClick={() => onSubmit({email})}>
          {textConsts.addBtn}
        </Button>

        <Button disableElevation variant="contained" className={classNames.button} onClick={() => closeModal()}>
          {textConsts.cancelBtn}
        </Button>
      </div>
    </div>
  )
}
