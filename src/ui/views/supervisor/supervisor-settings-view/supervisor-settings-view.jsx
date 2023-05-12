import {Component} from 'react'

import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navigation/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {SupervisorSettingsContent} from '@components/contents/supervisor-settings-content'
import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'

import {t} from '@utils/translations'

import {styles} from './supervisor-settings-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_SETTINGS
export class SupervisorSettingsViewRaw extends Component {
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
              <SupervisorSettingsContent />
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

export const SupervisorSettingsView = withStyles(SupervisorSettingsViewRaw, styles)
