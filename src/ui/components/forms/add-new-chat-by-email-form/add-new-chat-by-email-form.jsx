/* eslint-disable no-unused-vars */
import {Typography} from '@mui/material'

import React, {useState} from 'react'

import {toJS} from 'mobx'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {WithSearchSelect} from '@components/selects/with-search-select'

import {t} from '@utils/translations'

import {useClassNames} from './add-new-chat-by-email-form.style'

export const AddNewChatByEmailForm = ({closeModal, onSubmit, usersData}) => {
  const {classes: classNames} = useClassNames()

  const [chosenUser, setChoseUser] = useState(null)

  return (
    <div className={classNames.mainWrapper}>
      <Typography className={classNames.modalTitle}>{t(TranslationKey['Create a new dialog'])}</Typography>

      <Field
        label={t(TranslationKey['Choose your speaker'])}
        labelClasses={classNames.labelField}
        inputComponent={
          <WithSearchSelect
            width={586}
            selectedItemName={
              usersData.find(el => el.email === chosenUser?.email)?.name || t(TranslationKey['Not chosen'])
            }
            data={usersData.sort((a, b) => a.name.localeCompare(b.name))}
            fieldName="name"
            onClickNotChosen={() => setChoseUser(null)}
            onClickSelect={el => setChoseUser(el)}
          />
        }
      />

      <div className={classNames.buttonWrapper}>
        <Button disabled={!chosenUser} className={classNames.button} onClick={() => onSubmit(chosenUser)}>
          {t(TranslationKey.Create)}
        </Button>

        <Button variant="text" className={[classNames.button, classNames.cancelButton]} onClick={() => closeModal()}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
