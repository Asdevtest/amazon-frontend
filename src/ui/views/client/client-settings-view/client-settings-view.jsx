import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {UserSettingsForm} from '@components/forms/user-settings-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {t} from '@utils/translations'

import {ClientSettingsViewModel} from './client-settings-view.model'
import {styles} from './client-settings-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_SETTINGS

@observer
class ClientSettingsViewRaw extends Component {
  viewModel = new ClientSettingsViewModel({history: this.props.history})

  render() {
    const {drawerOpen, onTriggerDrawerOpen} = this.viewModel

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey.Profile)} notificationCount={2} setDrawerOpen={onTriggerDrawerOpen}>
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
