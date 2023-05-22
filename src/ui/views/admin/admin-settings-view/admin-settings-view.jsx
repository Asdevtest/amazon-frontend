import { useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { AdminSettingsContent } from '@components/contents/admin-settings-content/admin-settings-content'
import { MainContent } from '@components/layout/main-content'
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
    <>
      <MainContent>
        <div className={classNames.mainWrapper}>
          <Button className={classNames.technicalBtn} onClick={viewModel.onClickTechnicalBtn}>
            {t(TranslationKey['Technical work and notices'])}
          </Button>

          <AdminSettingsContent />
        </div>
      </MainContent>
    </>
  )
}

export const AdminSettingsView = withStyles(observer(AdminSettingsViewRaw), styles)
