import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { useState } from 'react'
import { components } from 'react-select'

import { Avatar } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { CustomReactSelect } from '@components/shared/selects/custom-react-select'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { useClassNames } from './add-new-chat-by-email-form.style'

export const AddNewChatByEmailForm = observer(({ closeModal, onSubmit, usersData }) => {
  const { classes: classNames } = useClassNames()

  const [submitIsClicked, setSubmitIsClicked] = useState(false)

  const [formFields, setFormFields] = useState({ chosenUsers: [], title: '', images: [] })

  const onChangeField = fieldName => event => {
    const newFormFields = { ...formFields }
    if (['chosenUsers', 'images'].includes(fieldName)) {
      newFormFields[fieldName] = event
    } else {
      newFormFields[fieldName] = event.target.value
    }

    setFormFields(newFormFields)
  }

  const disableSubmit =
    !formFields.chosenUsers.length || submitIsClicked || (formFields.chosenUsers.length > 1 && !formFields.title)

  const Option = ({ innerRef, isFocused, ...props }) => (
    <div
      ref={innerRef}
      className={cx(classNames.customBtnNameWrapper, {
        option: true,
        [classNames.isFocusedOption]: isFocused,
      })}
    >
      <Avatar src={getUserAvatarSrc(props.value)} className={classNames.avatarWrapper} sx={{ width: 28, height: 28 }} />
      <components.Option {...props} />
    </div>
  )

  const MultiValueContainer = props => (
    <components.MultiValueContainer {...props}>
      {[
        <Avatar
          key={props.key}
          src={getUserAvatarSrc(props.data._id)}
          className={classNames.avatarWrapper}
          sx={{ width: 20, height: 20 }}
        />,

        ...props.children,
      ]}
    </components.MultiValueContainer>
  )

  return (
    <div className={classNames.mainWrapper}>
      <p className={classNames.title}>{t(TranslationKey['Create a new dialog'])}</p>

      <Field
        label={t(TranslationKey['Choose your speaker']) + '*'}
        labelClasses={classNames.label}
        containerClasses={classNames.selectContainer}
        inputComponent={
          <CustomReactSelect
            hideDropdownIndicator
            menuIsOpen
            isMulti
            closeMenuOnSelect={false}
            classes={{ option: classNames.option }}
            value={formFields.chosenUsers}
            options={usersData}
            components={{ Option, MultiValueContainer }}
            getOptionValue={option => `${option._id}`}
            getOptionLabel={option => `${option.name}`}
            onChange={onChangeField('chosenUsers')}
          />
        }
      />

      {formFields.chosenUsers.length > 1 ? (
        <>
          <Field
            label={t(TranslationKey['Name of group chat']) + '*'}
            labelClasses={classNames.label}
            containerClasses={classNames.selectContainer}
            value={formFields.title}
            onChange={onChangeField('title')}
          />

          <Field
            label={t(TranslationKey['Add a chat cover'])}
            labelClasses={classNames.label}
            containerClasses={classNames.selectContainer}
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

      <div className={classNames.buttonWrapper}>
        <Button
          success
          disabled={disableSubmit}
          className={classNames.button}
          onClick={() => {
            setSubmitIsClicked(true)
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
})
