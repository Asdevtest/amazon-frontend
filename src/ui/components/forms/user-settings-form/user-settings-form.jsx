import React, {useEffect, useRef} from 'react'

import {TextareaAutosize, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'
import {useHistory} from 'react-router-dom'

import {texts} from '@constants/texts'
import {renderSettingsRuLabelByKey} from '@constants/user-settings-labels-to-render'

import {SuccessButton} from '@components/buttons/success-button/success-button'
import {Field} from '@components/field/field'
import {SuccessInfoModal} from '@components/modals/success-info-modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {UserSettingsModel} from './user-settings-form.model'
import {useClassNames} from './user-settings-form.style'

const textConsts = getLocalizedTexts(texts, 'ru').userSettingsForm

export const UserSettingsForm = observer(() => {
  const classNames = useClassNames()
  const history = useHistory()
  const asModel = useRef(new UserSettingsModel({history}))

  useEffect(() => {
    asModel.current.loadData()
  }, [])

  const {
    userSettings,
    sourceUserSettings,
    userSettingsAvailable,
    showSuccessModal,
    createUserSettings,
    onChangeField,
    editUserSettings,
    onTriggerOpenModal,
  } = asModel.current

  const onCreateSubmit = () => {
    createUserSettings(userSettings)
  }

  const onEditSubmit = () => {
    editUserSettings(userSettings)
  }

  return (
    <div className={classNames.mainWrapper}>
      {!sourceUserSettings && (
        <Typography className={classNames.noSettingsWarning}>{textConsts.noSettingsWarning}</Typography>
      )}

      {userSettingsAvailable.map((item, i) => (
        <Field
          key={i}
          label={renderSettingsRuLabelByKey(item.key)}
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
        <SuccessButton
          disabled={JSON.stringify(sourceUserSettings) === JSON.stringify(userSettings)}
          onClick={() => (sourceUserSettings ? onEditSubmit() : onCreateSubmit())}
        >
          {sourceUserSettings ? textConsts.editBtn : textConsts.createBtn}
        </SuccessButton>
      </div>

      <SuccessInfoModal
        openModal={showSuccessModal}
        setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
        title={textConsts.success}
        successBtnText={textConsts.okBtn}
        onClickSuccessBtn={() => {
          onTriggerOpenModal('showSuccessModal')
        }}
      />
    </div>
  )
})
