import { memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { CustomReactSelect } from '@components/shared/selects/custom-react-select'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { useStyles } from './add-new-chat-by-email-form.style'

import { MultiValueContainer } from './multi-value-container/multi-value-container'
import { Option } from './option/option'

export const AddNewChatByEmailForm = memo(({ closeModal, onSubmit, usersData }) => {
  const { classes: styles } = useStyles()

  const [userDataForRender, setUserDataForRender] = useState([])
  const [submitIsClicked, setSubmitIsClicked] = useState(false)
  const [formFields, setFormFields] = useState({ chosenUsers: [], title: '', images: [] })

  const disableSubmit =
    !formFields.chosenUsers.length || submitIsClicked || (formFields.chosenUsers.length > 1 && !formFields.title)

  const onChangeField = fieldName => event => {
    const newFormFields = { ...formFields }
    if (['chosenUsers', 'images'].includes(fieldName)) {
      newFormFields[fieldName] = event
    } else {
      newFormFields[fieldName] = event.target.value
    }

    setFormFields(newFormFields)
  }

  const getUserDataForRender = () => {
    return usersData.map(user => ({ ...user, img: getUserAvatarSrc(user._id) }))
  }

  useEffect(() => {
    if (!usersData?.length) {
      return
    }
    setUserDataForRender(getUserDataForRender())
  }, [usersData])

  return (
    <div className={styles.mainWrapper}>
      <p className={styles.title}>{t(TranslationKey['Create a new dialog'])}</p>

      <div className={styles.userSelectWrapper}>
        <p className={styles.label}>{t(TranslationKey['Choose your speaker']) + '*'}</p>
        <CustomReactSelect
          hideDropdownIndicator
          menuIsOpen
          isMulti
          closeMenuOnSelect={false}
          classes={{ option: styles.option, menuList: styles.menuList }}
          value={formFields.chosenUsers}
          options={userDataForRender}
          components={{ Option, MultiValueContainer }}
          getOptionValue={option => `${option._id}`}
          getOptionLabel={option => `${option.name}`}
          onChange={onChangeField('chosenUsers')}
        />
      </div>

      {formFields.chosenUsers.length > 1 ? (
        <>
          <Field
            maxLength={254}
            label={t(TranslationKey['Name of group chat']) + '*'}
            labelClasses={styles.label}
            containerClasses={styles.selectContainer}
            value={formFields.title}
            onChange={onChangeField('title')}
          />

          <Field
            label={t(TranslationKey['Add a chat cover'])}
            labelClasses={styles.label}
            containerClasses={styles.selectContainer}
            inputComponent={
              <UploadFilesInput
                withoutTitle
                fullWidth
                images={formFields.images}
                setImages={onChangeField('images')}
                maxNumber={1}
                dragAndDropBtnHeight={65}
              />
            }
          />
        </>
      ) : null}

      <div className={styles.buttonWrapper}>
        <Button
          success
          disabled={disableSubmit}
          className={styles.button}
          onClick={() => {
            setSubmitIsClicked(true)
            onSubmit(formFields)
          }}
        >
          {t(TranslationKey.Create)}
        </Button>

        <Button variant="text" className={[styles.button, styles.cancelButton]} onClick={() => closeModal()}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
})
