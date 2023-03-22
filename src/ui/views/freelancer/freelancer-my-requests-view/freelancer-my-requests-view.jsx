import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {MyRequests} from '@components/my-requests/my-requests'
import {Navbar} from '@components/navbar'

import {t} from '@utils/translations'

import {FreelancerMyRequestsViewModel} from './freelancer-my-requests-view.model'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_MY_REQUESTS

@observer
export class FreelancerMyRequestsView extends Component {
  viewModel = new FreelancerMyRequestsViewModel({
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
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey['My requests'])} history={history} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <MyRequests history={history} />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}
