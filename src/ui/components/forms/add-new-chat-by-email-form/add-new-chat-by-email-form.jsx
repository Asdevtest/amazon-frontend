/* eslint-disable no-unused-vars */
import {Avatar, Typography} from '@mui/material'

import React, {useState} from 'react'

import {toJS} from 'mobx'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {WithSearchSelect} from '@components/selects/with-search-select'
import {UserLink} from '@components/user-link'

import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {t} from '@utils/translations'

import {useClassNames} from './add-new-chat-by-email-form.style'

export const AddNewChatByEmailForm = ({closeModal, onSubmit, usersData}) => {
  const {classes: classNames} = useClassNames()

  const [chosenUser, setChoseUser] = useState(null)

  const CustomBtn = ({key, item, onClick}) => (
    <div key={key} className={classNames.customBtnWrapper} onClick={onClick}>
      <div className={classNames.customBtnNameWrapper}>
        <Avatar src={getUserAvatarSrc(item?._id)} className={classNames.avatarWrapper} sx={{width: 28, height: 28}} />

        <Typography className={classNames.customBtnName}>{item.name}</Typography>
      </div>

      <Typography className={classNames.customBtnEmail}>{item.email}</Typography>
    </div>
  )

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
            placeholder={t(TranslationKey['Search by Email, Nickname...'])}
            data={usersData.sort((a, b) => a.name.localeCompare(b.name))}
            searchFields={['name', 'email']}
            CustomBtn={CustomBtn}
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
