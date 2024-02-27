import { css, cx } from '@emotion/css'
import { useState } from 'react'
import { components } from 'react-select'

import { Avatar } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { CustomReactSelect } from '@components/shared/selects/custom-react-select'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './add-users-to-group-chat-form.style'

export const AddUsersToGroupChatForm = ({ closeModal, onSubmit, usersData }) => {
  const { classes: styles } = useStyles()

  const [submitIsClicked, setSubmitIsClicked] = useState(false)

  const [chosenUsers, setChosenUsers] = useState([])

  const disableSubmit = !chosenUsers.length || submitIsClicked

  const Option = ({ innerRef, isFocused, ...props }) => (
    <div
      ref={innerRef}
      className={cx(css(props.getStyles && props.getStyles('option', props)), styles.customBtnNameWrapper, {
        option: true,
        [styles.isFocusedOption]: isFocused,
      })}
    >
      <Avatar src={getUserAvatarSrc(props.value)} sx={{ width: 28, height: 28 }} />
      <components.Option {...props} />
    </div>
  )

  const MultiValueContainer = props => (
    <components.MultiValueContainer {...props}>
      {[
        <Avatar key={props.key} src={getUserAvatarSrc(props.data._id)} sx={{ width: 20, height: 20 }} />,
        ...props.children,
      ]}
    </components.MultiValueContainer>
  )

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.contentWrapper}>
        <p className={styles.modalTitle}>{t(TranslationKey['Add a member to group chat'])}</p>

        <Field
          label={t(TranslationKey['Choose your speaker'])}
          labelClasses={styles.labelField}
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
      </div>

      <div className={styles.buttonWrapper}>
        <Button
          styleType={ButtonStyle.SUCCESS}
          disabled={disableSubmit}
          className={styles.button}
          onClick={() => {
            setSubmitIsClicked
            onSubmit(chosenUsers)
          }}
        >
          {t(TranslationKey.Add)}
        </Button>

        <Button
          variant={ButtonVariant.OUTLINED}
          className={[styles.button, styles.cancelButton]}
          onClick={() => closeModal()}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
