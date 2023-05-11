import {Component} from 'react'

import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navigation/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {AdminSettingsContent} from '@components/contents/admin-settings-content/admin-settings-content'
import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {Button} from '@components/shared/buttons/button'

import {t} from '@utils/translations'

import {AdminSettingsViewModel} from './admin-settings-view.model'
import {styles} from './admin-settings-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_SETTINGS
export class AdminSettingsViewRaw extends Component {
  viewModel = new AdminSettingsViewModel({
    history: this.props.history,
  })

  render() {
    const {drawerOpen, onClickTechnicalBtn} = this.viewModel

    const {classes: classNames} = this.props

    return (
      <>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={this.onTriggerDrawer} />
        <Main>
          <Appbar setDrawerOpen={this.onTriggerDrawer} title={t(TranslationKey.Settings)}>
            <MainContent>
              <div className={classNames.mainWrapper}>
                <Button className={classNames.technicalBtn} onClick={onClickTechnicalBtn}>
                  {t(TranslationKey['Technical work and notices'])}
                </Button>

                <AdminSettingsContent />
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </>
    )
  }

  onTriggerDrawer = () => {
    const {drawerOpen} = this.state
    this.setState({drawerOpen: !drawerOpen})
  }
}

export const AdminSettingsView = withStyles(AdminSettingsViewRaw, styles)
