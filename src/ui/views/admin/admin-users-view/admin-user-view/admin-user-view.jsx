import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {UserInfoAndEdit} from '@components/user-info-and-edit'

import {t} from '@utils/translations'

import {AdminUserViewModel} from './admin-user-view.model'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_USERS

@observer
export class AdminUserView extends Component {
  viewModel = new AdminUserViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {drawerOpen, onTriggerDrawerOpen, history, user} = this.viewModel

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar
            lastCrumbAdditionalText={user && `: ${user.email}`}
            title={t(TranslationKey.User)}
            history={history}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              <UserInfoAndEdit user={user} />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}
