import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navigation/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {UserSettingsForm} from '@components/forms/user-settings-form'
import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'

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
          <Appbar title={t(TranslationKey.Profile)} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <UserSettingsForm />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const ClientSettingsView = withStyles(ClientSettingsViewRaw, styles)
