import {Component} from 'react'

import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {AdminSettingsContent} from '@components/contents/admin-settings-content/admin-settings-content'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

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
