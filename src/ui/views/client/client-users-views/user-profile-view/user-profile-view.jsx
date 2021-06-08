import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {
  CLIENT_USER_HEADER_LIST,
  CLIENT_USER_MANAGERS_LIST,
  CLIENT_USER_INITIAL_LIST,
  CLIENT_USER_INITIAL_USER,
} from '@constants/mocks'
import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {ActiveOrders} from '@components/screens/users-views/user-profile-view/active-orders'
import {ContentModal} from '@components/screens/users-views/user-profile-view/content-modal'
import {Header} from '@components/screens/users-views/user-profile-view/header'
import {PurchaseHistory} from '@components/screens/users-views/user-profile-view/purchase-history'
import {Reviews} from '@components/screens/users-views/user-profile-view/reviews'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/clientAvatar.jpg'
import {ClientProfileViewModel} from './user-profile-view.model'

const textConsts = getLocalizedTexts(texts, 'en').clientUserView

const navbarActiveCategory = 6

@observer
export class ClientUserProfileView extends Component {
  viewModel = new ClientProfileViewModel({history: this.props.history})
  state = {
    activeSubCategory: 0,
    drawerOpen: false,

    rowsPerPage: 5,
    paginationPage: 1,
    productList: CLIENT_USER_INITIAL_LIST,
    user: CLIENT_USER_INITIAL_USER,
    tabExchange: 0,
    tabHistory: 0,
    tabReview: 0,
    selected: null,
    modal0: false,
  }

  render() {
    const {activeSubCategory, drawerOpen} = this.state

    return (
      <>
        <Navbar
          curUserRole={userRole.CLIENT}
          activeCategory={navbarActiveCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={this.onChangeDrawerOpen}
          user={textConsts.appUser}
        />

        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            user={textConsts.appUser}
            username={textConsts.appBarUsername}
            setDrawerOpen={this.onChangeDrawerOpen}
          >
            <MainContent>
              <Header user={CLIENT_USER_INITIAL_USER} timer={textConsts.timer} headerInfo={CLIENT_USER_HEADER_LIST} />

              <ActiveOrders
                tabExchange={this.state.tabExchange}
                setTabExchange={this.onChangeTabExchange}
                productList={CLIENT_USER_INITIAL_LIST}
                handlerClickButtonPrivateLabel={this.onClickButtonPrivateLabel}
              />

              <PurchaseHistory
                user={CLIENT_USER_INITIAL_USER}
                tabHistory={this.state.tabHistory}
                setTabHistory={this.onChangeTabHistory}
              />

              <Reviews tabReview={this.state.tabReview} setTabReview={this.onChangeTabReview} />
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={this.state.modal0} setOpenModal={this.onChangeTabModal0}>
          <ContentModal
            setOpenModal={this.onChangeTabModal0}
            selected={this.state.selected}
            managersList={CLIENT_USER_MANAGERS_LIST}
          />
        </Modal>
      </>
    )
  }

  onChangeTabModal0 = (e, value) => {
    this.setState({modal0: value})
  }

  onChangeTabReview = (e, value) => {
    this.setState({tabReview: value})
  }

  onChangeTabHistory = (e, value) => {
    this.setState({tabHistory: value})
  }

  onChangeTabExchange = (e, value) => {
    this.setState({tabExchange: value})
  }

  onClickButtonPrivateLabel = index => {
    this.setState({selected: CLIENT_USER_INITIAL_LIST[index], modal0: true})
  }

  onChangeDrawerOpen = (e, value) => {
    this.setState({drawerOpen: value})
  }
}
