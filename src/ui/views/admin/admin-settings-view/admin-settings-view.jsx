import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { AdminSettings } from '@components/contents/admin-settings-content/admin-settings.jsx'
import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { AdminSettingsViewModel } from './admin-settings-view.model'
import { styles } from './admin-settings-view.style'

export const AdminSettingsViewRaw = props => {
  const [viewModel] = useState(
    () =>
      new AdminSettingsViewModel({
        history: props.history,
      }),
  )
  const { classes: classNames } = props

  return (
    <div className={classNames.mainWrapper}>
      <Button className={classNames.technicalBtn} onClick={viewModel.onClickTechnicalBtn}>
        {t(TranslationKey['Technical work and notices'])}
      </Button>

      <AdminSettings />
    </div>
  )
}

export const AdminSettingsView = withStyles(observer(AdminSettingsViewRaw), styles)
