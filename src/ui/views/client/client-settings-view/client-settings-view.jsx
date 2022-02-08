import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {UserSettingsForm} from '@components/forms/user-settings-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/clientAvatar.jpg'
import {ClientSettingsViewModel} from './client-settings-view.model'
import {styles} from './client-settings-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientSettingsView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_SETTINGS

@observer
class ClientSettingsViewRaw extends Component {
  viewModel = new ClientSettingsViewModel({history: this.props.history})

  render() {
    const {drawerOpen, onTriggerDrawerOpen} = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.CLIENT}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.CLIENT}
          >
            <MainContent>
              <UserSettingsForm />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const ClientSettingsView = withStyles(styles)(ClientSettingsViewRaw)
