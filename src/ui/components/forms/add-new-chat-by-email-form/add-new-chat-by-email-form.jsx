import { memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field'
import { CustomReactSelect } from '@components/shared/selects/custom-react-select'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './add-new-chat-by-email-form.style'

import { MultiValueContainer } from './multi-value-container/multi-value-container'
import { Option } from './option/option'

export const AddNewChatByEmailForm = memo(({ closeModal, onSubmit, usersData }) => {
  const { classes: styles, cx } = useStyles()

  const [userDataForRender, setUserDataForRender] = useState([])
  const [submitIsClicked, setSubmitIsClicked] = useState(false)

  const [formFields, setFormFields] = useState({ chosenUsers: [], title: '', images: [] })

  const disableSubmit =
    !formFields.chosenUsers.length ||
    submitIsClicked ||
    (formFields.chosenUsers.length > 1 && !formFields.title) ||
    !formFields.title.trim()

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
            inputProps={{ maxLength: 254 }}
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
                withoutTitles
                images={formFields.images}
                setImages={onChangeField('images')}
                maxNumber={1}
                dragAndDropButtonHeight={65}
              />
            }
          />
        </>
      ) : null}

      <div className={styles.buttonWrapper}>
        <Button
          styleType={ButtonStyle.SUCCESS}
          disabled={disableSubmit}
          onClick={() => {
            setSubmitIsClicked(true)
            onSubmit(formFields)
          }}
        >
          {t(TranslationKey.Create)}
        </Button>

        <Button styleType={ButtonStyle.CASUAL} onClick={closeModal}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
})
