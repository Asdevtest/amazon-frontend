import {Component} from 'react'

import {withStyles} from '@material-ui/styles'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {AdminSettingsForm} from '@components/forms/admin-settings-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {styles} from './admin-settings-view.style'

const textConsts = getLocalizedTexts(texts, 'en').adminSettingsView
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
          <Appbar setDrawerOpen={this.onTriggerDrawer} title={textConsts.appBarTitle}>
            <MainContent>
              <AdminSettingsForm />
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
