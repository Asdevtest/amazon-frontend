import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { TextareaAutosize, Typography } from '@mui/material'

import { renderSettingsRuLabelByKey } from '@constants/keys/user-settings-labels-to-render'
import { TranslationKey } from '@constants/translations/translation-key'

import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './user-settings-form.style'

import { UserSettingsModel } from './user-settings-form.model'

export const UserSettingsForm = observer(() => {
  const { classes: styles } = useStyles()
  const history = useHistory()
  const asModel = useRef(new UserSettingsModel({ history }))

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
    <div className={styles.mainWrapper}>
      {!sourceUserSettings && (
        <Typography className={styles.noSettingsWarning}>{t(TranslationKey['No user settings'])}</Typography>
      )}

      {userSettingsAvailable.map((item, i) => (
        <Field
          key={i}
          label={renderSettingsRuLabelByKey(item.key)}
          inputComponent={
            <TextareaAutosize
              className={styles.textField}
              value={userSettings?.[item.key] || ''}
              onChange={onChangeField([item.key])}
            />
          }
        />
      ))}

      <div className={styles.placeAddBtnWrapper}>
        <Button
          styleType={ButtonStyle.SUCCESS}
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
