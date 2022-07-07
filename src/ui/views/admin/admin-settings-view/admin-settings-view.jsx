import {Component} from 'react'

import {withStyles} from '@material-ui/styles'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {AdminSettingsContent} from '@components/contents/admin-settings-content/admin-settings-content'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {t} from '@utils/translations'

import {styles} from './admin-settings-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_SETTINGS
export class AdminSettingsViewRaw extends Component {
  state = {
    drawerOpen: false,
  }

  render() {
    const {drawerOpen} = this.state

    return (
      <>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={this.onTriggerDrawer} />
        <Main>
          <Appbar setDrawerOpen={this.onTriggerDrawer} title={t(TranslationKey.Settings)}>
            <MainContent>
              <AdminSettingsContent />
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

export const AdminSettingsView = withStyles(styles)(AdminSettingsViewRaw)
