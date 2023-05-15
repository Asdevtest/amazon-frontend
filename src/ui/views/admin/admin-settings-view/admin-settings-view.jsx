import {Component} from 'react'

import {withStyles} from 'tss-react/mui'

import {TranslationKey} from '@constants/translations/translation-key'

import {AdminSettingsContent} from '@components/contents/admin-settings-content/admin-settings-content'
import {MainContent} from '@components/layout/main-content'
import {Button} from '@components/shared/buttons/button'

import {t} from '@utils/translations'

import {AdminSettingsViewModel} from './admin-settings-view.model'
import {styles} from './admin-settings-view.style'

export class AdminSettingsViewRaw extends Component {
  viewModel = new AdminSettingsViewModel({
    history: this.props.history,
  })

  render() {
    const {onClickTechnicalBtn} = this.viewModel

    const {classes: classNames} = this.props

    return (
      <>
        <MainContent>
          <div className={classNames.mainWrapper}>
            <Button className={classNames.technicalBtn} onClick={onClickTechnicalBtn}>
              {t(TranslationKey['Technical work and notices'])}
            </Button>

            <AdminSettingsContent />
          </div>
        </MainContent>
      </>
    )
  }
}

export const AdminSettingsView = withStyles(AdminSettingsViewRaw, styles)
