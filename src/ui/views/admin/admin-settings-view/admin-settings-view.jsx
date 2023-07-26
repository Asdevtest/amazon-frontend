import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { AdminSettingsContent } from '@components/contents/admin-settings-content/admin-settings-content'
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
  const { classes: classNames } = props

  return (
    <>
      <div>
        <div className={classNames.mainWrapper}>
          <Button className={classNames.technicalBtn} onClick={viewModel.onClickTechnicalBtn}>
            {t(TranslationKey['Technical work and notices'])}
          </Button>

          <AdminSettingsContent />
        </div>
      </div>
    </>
  )
}

export const AdminSettingsView = withStyles(observer(AdminSettingsViewRaw), styles)
