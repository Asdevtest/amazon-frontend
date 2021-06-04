import React, {Component} from 'react'

import {
  BUYER_USER_HEADER_LIST,
  BUYER_MANAGERS_LIST,
  BUYER_USER_INITIAL_LIST,
  BUYER_USER_INITIAL_USER, // BUYER_USER_HEAD_CELL
} from '@constants/mocks'
import {categoriesList} from '@constants/navbar'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {ActiveOrders} from '@components/screens/buyer/users-views/user-profile-view/active-orders'
import {ContentModal} from '@components/screens/buyer/users-views/user-profile-view/content-modal'
import {Header} from '@components/screens/buyer/users-views/user-profile-view/header'
import {PurchaseHistory} from '@components/screens/buyer/users-views/user-profile-view/purchase-history'
import {Reviews} from '@components/screens/buyer/users-views/user-profile-view/reviews'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/buyerAvatar.jpg'

const textConsts = getLocalizedTexts(texts, 'en').buyerUserView

export class UserProfileView extends Component {
  state = {
    activeCategory: 5,
    activeSubCategory: 0,
    drawerOpen: false,

    rowsPerPage: 5,
    paginationPage: 1,
    productList: BUYER_USER_INITIAL_LIST,
    user: BUYER_USER_INITIAL_USER,
    tabExchange: 0,
    tabHistory: 0,
    tabReview: 0,
    selected: null,
    modal0: false,
  }

  render() {
    const {activeCategory, activeSubCategory, drawerOpen} = this.state

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          setItem={this.onChangeCategory}
          activeSubCategory={activeSubCategory}
          categoriesList={categoriesList.buyer}
          setSubItem={this.onChangeSubCategory}
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
              <Header user={BUYER_USER_INITIAL_USER} timer={textConsts.timer} headerInfo={BUYER_USER_HEADER_LIST} />

              <ActiveOrders
                tabExchange={this.state.tabExchange}
                setTabExchange={this.onChangeTabExchange}
                productList={BUYER_USER_INITIAL_LIST}
                handlerClickButtonPrivateLabel={this.onClickButtonPrivateLabel}
              />

              <PurchaseHistory
                user={BUYER_USER_INITIAL_USER}
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
            managersList={BUYER_MANAGERS_LIST}
          />
        </Modal>
      </React.Fragment>
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
    this.setState({selected: BUYER_USER_INITIAL_LIST[index], modal0: true})
  }

  onChangeDrawerOpen = (e, value) => {
    this.setState({drawerOpen: value})
  }

  onChangeCategory = (e, value) => {
    this.setState({activeCategory: value})
  }

  onChangeSubCategory = (e, value) => {
    this.setState({activeSubCategory: value})
  }
}
