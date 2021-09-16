import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {BUYER_USER_MANAGERS_LIST, BUYER_USER_INITIAL_LIST, BUYER_USER_INITIAL_USER} from '@constants/mocks'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

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

import avatar from '../../assets/buyerAvatar.jpg'
import {BuyerUserProfileViewModel} from './buyer-user-profile-view.model'

const textConsts = getLocalizedTexts(texts, 'en').buyerUserView

const navbarActiveCategory = 5
const navbarActiveSubCategory = 0

@observer
export class BuyerUserProfileView extends Component {
  viewModel = new BuyerUserProfileViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      drawerOpen,
      headerInfoData,
      tabExchange,
      tabHistory,
      tabReview,
      showPrivateLabelModal,
      onChangeTabReview,
      onTriggerPrivateLabelModal,
      onChangeTabHistory,
      onTriggerDrawerOpen,
      onChangeTabExchange,
      onClickButtonPrivateLabel,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.BUYER}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
          user={textConsts.appUser}
        />

        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            user={textConsts.appUser}
            username={textConsts.appBarUsername}
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.BUYER}
          >
            <MainContent>
              <Header
                user={this.viewModel.userDataMy}
                timer={textConsts.timer}
                headerInfoData={headerInfoData}
                avatar={avatar}
              />

              <ActiveOrders
                tabExchange={tabExchange}
                setTabExchange={onChangeTabExchange}
                productList={BUYER_USER_INITIAL_LIST}
                handlerClickButtonPrivateLabel={onClickButtonPrivateLabel}
              />

              <PurchaseHistory
                user={BUYER_USER_INITIAL_USER}
                tabHistory={tabHistory}
                setTabHistory={onChangeTabHistory}
              />

              <Reviews tabReview={tabReview} setTabReview={onChangeTabReview} />
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showPrivateLabelModal} setOpenModal={onTriggerPrivateLabelModal}>
          <ContentModal
            setOpenModal={this.onChangeTabModal0}
            selected={showPrivateLabelModal}
            managersList={BUYER_USER_MANAGERS_LIST}
          />
        </Modal>
      </React.Fragment>
    )
  }
}
