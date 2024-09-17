import isEqual from 'lodash.isequal'
import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TextareaAutosize } from '@mui/material'

import { renderSettingsRuLabelByKey } from '@constants/keys/user-settings-labels-to-render'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './user-settings-form.style'

import { UserSettingsModel } from './user-settings-form.model'

export const UserSettingsForm = observer(() => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new UserSettingsModel(), [])

  return (
    <div className={styles.mainWrapper}>
      {!viewModel.sourceUserSettings && (
        <p className={styles.noSettingsWarning}>{t(TranslationKey['No user settings'])}</p>
      )}

      {viewModel.userSettingsAvailable?.map((item, i) => (
        <Field
          key={i}
          label={renderSettingsRuLabelByKey(item.key)}
          inputComponent={
            <TextareaAutosize
              className={styles.textField}
              value={viewModel.userSettings?.[item.key] || ''}
              onChange={viewModel.onChangeField([item.key])}
            />
          }
        />
      ))}

      <div className={styles.placeAddBtnWrapper}>
        <Button
          styleType={ButtonStyle.SUCCESS}
          disabled={isEqual(viewModel.sourceUserSettings, viewModel.userSettings)}
          onClick={() => (viewModel.sourceUserSettings ? viewModel.editUserSettings() : viewModel.createUserSettings())}
        >
          {viewModel.sourceUserSettings ? t(TranslationKey.Edit) : t(TranslationKey.Create)}
        </Button>
      </div>
    </div>
  )
})
