import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {CLIENT_USER_MANAGERS_LIST, CLIENT_USER_INITIAL_LIST} from '@constants/mocks'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {AvatarEditorForm} from '@components/forms/avatar-editor-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {ActiveOrders} from '@components/screens/users-views/user-profile-view/active-orders'
import {ContentModal} from '@components/screens/users-views/user-profile-view/content-modal'
import {Header} from '@components/screens/users-views/user-profile-view/header'
import {PurchaseHistory} from '@components/screens/users-views/user-profile-view/purchase-history'
import {Reviews} from '@components/screens/users-views/user-profile-view/reviews'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {ProfileViewModel} from './user-profile-view.model'

const textConsts = getLocalizedTexts(texts, 'en').userProfileView

@observer
export class UserProfileView extends Component {
  viewModel = new ProfileViewModel({history: this.props.history})

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
      showAvatarEditModal,
      showInfoModal,
      onTriggerDrawerOpen,
      onClickButtonPrivateLabel,
      onChangeTabExchange,
      onChangeTabHistory,
      onChangeTabReview,
      onTriggerShowTabModal,

      onTriggerOpenModal,
      onSubmitAvatarEdit,
      onClickChangeAvatar,
    } = this.viewModel

    return (
      <>
        <Navbar drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={textConsts.appBarTitle} notificationCount={2} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <Header
                user={user}
                timer={textConsts.timer}
                headerInfoData={headerInfoData}
                onClickChangeAvatar={onClickChangeAvatar}
              />

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

        <Modal openModal={showAvatarEditModal} setOpenModal={() => onTriggerOpenModal('showAvatarEditModal')}>
          <AvatarEditorForm
            onSubmit={onSubmitAvatarEdit}
            onCloseModal={() => onTriggerOpenModal('showAvatarEditModal')}
          />
        </Modal>

        <WarningInfoModal
          openModal={showInfoModal}
          setOpenModal={() => onTriggerOpenModal('showInfoModal')}
          title={textConsts.avatarUploadSuccess}
          btnText={textConsts.closeBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showInfoModal')
          }}
        />
      </>
    )
  }
}
