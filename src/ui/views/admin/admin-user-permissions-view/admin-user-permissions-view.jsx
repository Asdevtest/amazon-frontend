import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navigation/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {UserPermissions} from '@components/user/user-permissions/user-permissions'

import {t} from '@utils/translations'

import {AdminUserPermissionsViewModel} from './admin-user-permissions-view.model'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_PERMISSIONS

@observer
export class AdminUserPermissionsView extends Component {
  viewModel = new AdminUserPermissionsViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {drawerOpen, onTriggerDrawerOpen, history} = this.viewModel

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey['User permissions'])} history={history} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <UserPermissions />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}
