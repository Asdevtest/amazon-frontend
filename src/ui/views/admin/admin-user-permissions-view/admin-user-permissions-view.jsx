import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {UserPermissions} from '@components/user-permissions/user-permissions'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/adminAvatar.jpg'
import {AdminUserPermissionsViewModel} from './admin-user-permissions-view.model'

const textConsts = getLocalizedTexts(texts, 'ru').adminUserPermissionsView

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
        <Navbar
          activeCategory={navbarActiveCategory}
          curUserRole={UserRole.ADMIN}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            history={history}
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.ADMIN}
          >
            <MainContent>
              <Typography variant="h3">{textConsts.mainTitle}</Typography>
              <UserPermissions />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}
