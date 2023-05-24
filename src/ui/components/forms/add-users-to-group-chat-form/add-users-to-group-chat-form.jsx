/* eslint-disable no-unused-vars */
import { css, cx } from '@emotion/css'
import { Avatar, Typography } from '@mui/material'

import React, { useState } from 'react'

import { components } from 'react-select'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { CustomReactSelect } from '@components/shared/selects/custom-react-select'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { useClassNames } from './add-users-to-group-chat-form.style'

export const AddUsersToGroupChatForm = ({ closeModal, onSubmit, usersData }) => {
  const { classes: classNames } = useClassNames()

  const [submitIsClicked, setSubmitIsClicked] = useState(false)

  const [chosenUsers, setChosenUsers] = useState([])

  const disableSubmit = !chosenUsers.length || submitIsClicked

  const Option = ({ innerRef, isFocused, ...props }) => (
    <div
      ref={innerRef}
      className={cx(css(props.getStyles && props.getStyles('option', props)), classNames.customBtnNameWrapper, {
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
      <Typography className={classNames.modalTitle}>{t(TranslationKey['Add a member to group chat'])}</Typography>

      <Field
        label={t(TranslationKey['Choose your speaker'])}
        labelClasses={classNames.labelField}
        inputComponent={
          <CustomReactSelect
            hideDropdownIndicator
            menuIsOpen
            isMulti
            closeMenuOnSelect={false}
            value={chosenUsers}
            options={usersData}
            components={{ Option, MultiValueContainer }}
            getOptionValue={option => `${option._id}`}
            getOptionLabel={option => `${option.name}`}
            onChange={newValue => {
              setChosenUsers(newValue)
            }}
          />
        }
      />

      <div className={classNames.buttonWrapper}>
        <Button
          success
          disabled={disableSubmit}
          className={classNames.button}
          onClick={() => {
            setSubmitIsClicked
            onSubmit(chosenUsers)
          }}
        >
          {t(TranslationKey.Add)}
        </Button>

        <Button variant="text" className={[classNames.button, classNames.cancelButton]} onClick={() => closeModal()}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
