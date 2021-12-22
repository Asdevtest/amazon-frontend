import React, {useEffect, useRef} from 'react'

import {TextareaAutosize, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'
import {useHistory} from 'react-router-dom'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {Field} from '@components/field/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {UserSettingsModel} from './user-settings-form.model'
import {useClassNames} from './user-settings-form.style'

const textConsts = getLocalizedTexts(texts, 'ru').userSettingsForm

export const UserSettingsForm = observer(({onCloseModal}) => {
  const classNames = useClassNames()
  const history = useHistory()
  const asModel = useRef(new UserSettingsModel({history}))

  useEffect(() => {
    asModel.current.loadData()
  }, [])

  const {userSettings, userSettingsAvailable, createUserSettings, onChangeField, editUserSettings} = asModel.current

  const onCreateSubmit = () => {
    createUserSettings(userSettings)
    onCloseModal()
  }

  const onEditSubmit = () => {
    editUserSettings(userSettings)
    onCloseModal()
  }

  return (
    <div className={classNames.mainWrapper}>
      <Typography variant="h5">{textConsts.mainTitle}</Typography>

      {!userSettings && (
        <Typography className={classNames.noSettingsWarning}>{textConsts.noSettingsWarning}</Typography>
      )}

      {userSettingsAvailable.map((item, i) => (
        <Field
          key={i}
          label={item.key}
          inputComponent={
            <TextareaAutosize
              className={classNames.textField}
              value={userSettings?.[item.key] || ''}
              onChange={onChangeField([item.key])}
            />
          }
        />
      ))}

      <div className={classNames.placeAddBtnWrapper}>
        <SuccessButton onClick={() => (userSettings ? onEditSubmit() : onCreateSubmit())}>
          {userSettings ? textConsts.editBtn : textConsts.createBtn}
        </SuccessButton>

        <Button color="primary" className={classNames.cancelButton} variant="contained" onClick={onCloseModal}>
          {textConsts.cancelBtn}
        </Button>
      </div>
    </div>
  )
})
