import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {CLIENT_USER_MANAGERS_LIST, CLIENT_USER_INITIAL_LIST} from '@constants/mocks'
import {navBarActiveCategory} from '@constants/navbar-active-category'
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

import avatar from '../../assets/clientAvatar.jpg'
import {ClientProfileViewModel} from './user-profile-view.model'

const textConsts = getLocalizedTexts(texts, 'en').clientUserView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_USERS
const navBarActiveSubCategory = 0

@observer
export class ClientUserProfileView extends Component {
  viewModel = new ClientProfileViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      drawerOpen,
      tabExchange,
      tabHistory,
      tabReview,
      showTabModal,
      selectedUser,
      user,
      headerInfoData,
      onTriggerDrawerOpen,
      onClickButtonPrivateLabel,
      onChangeTabExchange,
      onChangeTabHistory,
      onChangeTabReview,
      onTriggerShowTabModal,
    } = this.viewModel

    return (
      <>
        <Navbar
          curUserRole={UserRole.CLIENT}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navBarActiveSubCategory}
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
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              <Header user={user} timer={textConsts.timer} headerInfoData={headerInfoData} avatar={avatar} />

              <ActiveOrders
                tabExchange={tabExchange}
                setTabExchange={onChangeTabExchange}
                productList={CLIENT_USER_INITIAL_LIST}
                handlerClickButtonPrivateLabel={onClickButtonPrivateLabel}
              />
              <PurchaseHistory user={user} tabHistory={tabHistory} setTabHistory={onChangeTabHistory} />
              <Reviews tabReview={tabReview} setTabReview={onChangeTabReview} />
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={showTabModal} setOpenModal={onTriggerShowTabModal}>
          <ContentModal
            setOpenModal={onTriggerShowTabModal}
            selected={selectedUser}
            managersList={CLIENT_USER_MANAGERS_LIST}
          />
        </Modal>
      </>
    )
  }
}
