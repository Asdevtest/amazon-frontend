import {TextareaAutosize, Typography} from '@mui/material'

import React, {useEffect, useRef} from 'react'

import {observer} from 'mobx-react'
import {useHistory} from 'react-router-dom'

import {TranslationKey} from '@constants/translations/translation-key'
import {renderSettingsRuLabelByKey} from '@constants/user-settings-labels-to-render'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {SuccessInfoModal} from '@components/modals/success-info-modal'

import {t} from '@utils/translations'

import {UserSettingsModel} from './user-settings-form.model'
import {useClassNames} from './user-settings-form.style'

export const UserSettingsForm = observer(() => {
  const {classes: classNames} = useClassNames()
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
        <Typography className={classNames.noSettingsWarning}>{t(TranslationKey['No user settings'])}</Typography>
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
        <Button
          success
          disabled={JSON.stringify(sourceUserSettings) === JSON.stringify(userSettings)}
          onClick={() => (sourceUserSettings ? onEditSubmit() : onCreateSubmit())}
        >
          {sourceUserSettings ? t(TranslationKey.Edit) : t(TranslationKey.Create)}
        </Button>
      </div>

      <SuccessInfoModal
        openModal={showSuccessModal}
        setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
        title={t(TranslationKey['Data accepted'])}
        successBtnText={t(TranslationKey.Ok)}
        onClickSuccessBtn={() => {
          onTriggerOpenModal('showSuccessModal')
        }}
      />
    </div>
  )
})
