import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {CLIENT_USER_MANAGERS_LIST, CLIENT_USER_INITIAL_LIST} from '@constants/mocks'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {AvatarEditorForm} from '@components/forms/avatar-editor-form'
import {UserInfoEditForm} from '@components/forms/user-info-edit-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {ActiveOrders} from '@components/screens/users-views/user-profile-view/active-orders'
import {ContentModal} from '@components/screens/users-views/user-profile-view/content-modal'
import {UserProfile} from '@components/screens/users-views/user-profile-view/user-profile'

import {t} from '@utils/translations'

import {ProfileViewModel} from './user-profile-view.model'

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
      checkValidationNameOrEmail,
      headerInfoData,
      showAvatarEditModal,
      showInfoModal,
      showUserInfoModal,
      onTriggerDrawerOpen,
      onClickButtonPrivateLabel,
      onChangeTabExchange,
      onChangeTabHistory,
      onChangeTabReview,
      onTriggerShowTabModal,

      onTriggerOpenModal,
      onSubmitAvatarEdit,
      onClickChangeAvatar,
      onClickChangeUserInfo,
      onSubmitUserInfoEdit,
    } = this.viewModel

    return (
      <>
        <Navbar drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey.Profile)} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <UserProfile
                user={user}
                timer={'14 минут'}
                headerInfoData={headerInfoData}
                tabReview={tabReview}
                tabHistory={tabHistory}
                setTabHistory={onChangeTabHistory}
                setTabReview={onChangeTabReview}
                onClickChangeAvatar={onClickChangeAvatar}
                onClickChangeUserInfo={onClickChangeUserInfo}
              />

              <ActiveOrders
                tabExchange={tabExchange}
                setTabExchange={onChangeTabExchange}
                productList={CLIENT_USER_INITIAL_LIST}
                handlerClickButtonPrivateLabel={onClickButtonPrivateLabel}
              />
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

        <Modal openModal={showUserInfoModal} setOpenModal={() => onTriggerOpenModal('showUserInfoModal')}>
          <UserInfoEditForm
            user={user}
            checkValidationNameOrEmail={checkValidationNameOrEmail}
            onSubmit={onSubmitUserInfoEdit}
            onCloseModal={() => onTriggerOpenModal('showUserInfoModal')}
          />
        </Modal>

        <WarningInfoModal
          openModal={showInfoModal}
          setOpenModal={() => onTriggerOpenModal('showInfoModal')}
          title={t(TranslationKey['The avatar has been uploaded. The update will take place within a few minutes.'])}
          btnText={t(TranslationKey.Close)}
          onClickBtn={() => {
            onTriggerOpenModal('showInfoModal')
          }}
        />
      </>
    )
  }
}
