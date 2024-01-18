import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { AdminSettings } from '@components/contents/admin-settings-content/admin-settings.jsx'
import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { styles } from './admin-settings-view.style'

import { AdminSettingsViewModel } from './admin-settings-view.model'

export const AdminSettingsViewRaw = props => {
  const [viewModel] = useState(
    () =>
      new AdminSettingsViewModel({
        history: props.history,
      }),
  )
  const { classes: styles } = props

  return (
    <div className={styles.mainWrapper}>
      <Button className={styles.technicalBtn} onClick={viewModel.onClickTechnicalBtn}>
        {t(TranslationKey['Technical work and notices'])}
      </Button>

      <AdminSettings />
    </div>
  )
}

export const AdminSettingsView = withStyles(observer(AdminSettingsViewRaw), styles)
