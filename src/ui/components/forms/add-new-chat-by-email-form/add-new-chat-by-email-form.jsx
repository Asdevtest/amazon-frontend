/* eslint-disable no-unused-vars */
import {Avatar, Typography} from '@mui/material'

import React, {useState} from 'react'

import {toJS} from 'mobx'
import Select from 'react-select'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {WithSearchSelect} from '@components/selects/with-search-select'
import {UploadFilesInput} from '@components/upload-files-input'
import {UserLink} from '@components/user-link'

import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {t} from '@utils/translations'

import {useClassNames} from './add-new-chat-by-email-form.style'

export const AddNewChatByEmailForm = ({closeModal, onSubmit, usersData}) => {
  const {classes: classNames} = useClassNames()

  const [chosenUser, setChoseUser] = useState(null)

  const [submitIsClicked, setSubmitIsClicked] = useState(false)

  const [formFields, setFormFields] = useState({chosenUsers: [], title: '', images: []})

  const onChangeField = fieldName => event => {
    const newFormFields = {...formFields}
    if (['chosenUsers', 'images'].includes(fieldName)) {
      newFormFields[fieldName] = event
    } else {
      newFormFields[fieldName] = event.target.value
    }

    setFormFields(newFormFields)
  }

  // const CustomBtn = ({key, item, onClick}) => (
  //   <div key={key} className={classNames.customBtnWrapper} onClick={onClick}>
  //     <div className={classNames.customBtnNameWrapper}>
  //       <Avatar src={getUserAvatarSrc(item?._id)} className={classNames.avatarWrapper} sx={{width: 28, height: 28}} />

  //       <Typography className={classNames.customBtnName}>{item.name}</Typography>
  //     </div>

  //     {/* <Typography className={classNames.customBtnEmail}>{item.email}</Typography> */}
  //   </div>
  // )

  // console.log('chosenUsers', chosenUsers)

  const disableSubmit = !formFields.chosenUsers.length || submitIsClicked

  return (
    <div className={classNames.mainWrapper}>
      <Typography className={classNames.modalTitle}>{t(TranslationKey['Create a new dialog'])}</Typography>

      {/* <Field
        label={t(TranslationKey['Choose your speaker'])}
        labelClasses={classNames.labelField}
        inputComponent={
          <WithSearchSelect
            width={586}
            selectedItemName={usersData.find(el => el._id === chosenUser?._id)?.name || t(TranslationKey['Not chosen'])}
            placeholder={t(TranslationKey.search) + '...'}
            data={usersData.sort((a, b) => a.name.localeCompare(b.name))}
            searchFields={['name']}
            CustomBtn={CustomBtn}
            onClickNotChosen={() => setChoseUser(null)}
            onClickSelect={el => setChoseUser(el)}
          />
        }
      /> */}

      <Field
        label={t(TranslationKey['Choose your speaker'])}
        labelClasses={classNames.labelField}
        inputComponent={
          <Select
            isMulti
            closeMenuOnSelect={false}
            styles={{menu: base => ({...base, position: 'relative'})}}
            value={formFields.chosenUsers}
            options={usersData}
            getOptionValue={option => `${option._id}`}
            getOptionLabel={option => `${option.name}`}
            onChange={newValue => {
              onChangeField('chosenUsers')(newValue)
            }}
          />
        }
      />

      {formFields.chosenUsers.length > 1 ? (
        <>
          <Field
            label={t(TranslationKey['Name of group chat'])}
            labelClasses={classNames.labelField}
            value={formFields.title}
            onChange={onChangeField('title')}
          />

          <UploadFilesInput images={formFields.images} setImages={onChangeField('images')} maxNumber={1} />
        </>
      ) : null}

      <div className={classNames.buttonWrapper}>
        <Button
          disabled={disableSubmit}
          className={classNames.button}
          onClick={() => {
            setSubmitIsClicked
            onSubmit(formFields)
          }}
        >
          {t(TranslationKey.Create)}
        </Button>

        <Button variant="text" className={[classNames.button, classNames.cancelButton]} onClick={() => closeModal()}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
