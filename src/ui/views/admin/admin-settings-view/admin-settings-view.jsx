import {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {styles} from './admin-settings-view.style'

const textConsts = getLocalizedTexts(texts, 'en').adminSettingsView
const navbarActiveCategory = 7
export class AdminSettingsViewRaw extends Component {
  state = {
    drawerOpen: false,
  }

  render() {
    const {drawerOpen} = this.state
    const {classes: classNames} = this.props

    return (
      <>
        <Navbar
          activeCategory={navbarActiveCategory}
          curUserRole={UserRole.ADMIN}
          drawerOpen={drawerOpen}
          setDrawerOpen={this.onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc=""
            curUserRole={UserRole.ADMIN}
            setDrawerOpen={this.onTriggerDrawer}
            title={textConsts.appbarTitle}
          >
            <MainContent>
              <Typography paragraph variant="h5" className={classNames.example}>
                {textConsts.mainTitle}
              </Typography>
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
