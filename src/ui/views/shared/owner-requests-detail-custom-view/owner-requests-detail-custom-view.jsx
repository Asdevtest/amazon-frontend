import React, {Component} from 'react'

import {Typography, Paper} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {OwnerRequestProposalsCard} from '@components/cards/owner-request-proposals-card'
import {MultipleChats} from '@components/chat/multiple-chats'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {ConfirmWithCommentModal} from '@components/modals/confirmation-with-comment-modal'
import {Navbar} from '@components/navbar'
import {OwnerGeneralRequestInfo} from '@components/requests-and-request-proposals/owner-general-request-info'
import {CustomSearchRequestForm} from '@components/requests-and-request-proposals/requests/create-or-edit-forms/custom-search-request-form'
import {CustomSearchRequestDetails} from '@components/requests-and-request-proposals/requests/requests-details/custom-request-details'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {OwnerRequestDetailCustomViewModel} from './owner-requests-detail-custom-view.model'
import {styles} from './owner-requests-detail-custom-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').CustomRequestView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = 1
@observer
export class OwnerRequestDetailCustomViewRaw extends Component {
  viewModel = new OwnerRequestDetailCustomViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      requestProposals,
      drawerOpen,
      request,
      confirmModalSettings,
      showRequestForm,
      showConfirmModal,
      showConfirmWithCommentModal,
      chatSelectedId,
      chats,
      userInfo,
      chatIsConnected,
      onSubmitMessage,
      onTriggerDrawerOpen,
      onTriggerOpenModal,
      onSubmitEditCustomSearchRequest,
      onClickPublishBtn,
      onClickEditBtn,
      onClickCancelBtn,
      onClickAbortBtn,
      onSubmitAbortRequest,
      onClickChat,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          drawerOpen={drawerOpen}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          setDrawerOpen={onTriggerDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={''}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              <OwnerGeneralRequestInfo
                request={request}
                onClickPublishBtn={onClickPublishBtn}
                onClickEditBtn={onClickEditBtn}
                onClickCancelBtn={onClickCancelBtn}
                onClickAbortBtn={onClickAbortBtn}
              />

              <div className={classNames.detailsWrapper}>
                <CustomSearchRequestDetails request={request} />
              </div>

              <Paper className={classNames.proposalsWrapper}>
                {requestProposals.map(item => (
                  <OwnerRequestProposalsCard key={item.proposal._id} item={item} />
                ))}
              </Paper>

              {chatIsConnected ? (
                <div className={classNames.chatWrapper}>
                  <MultipleChats
                    chats={chats}
                    userId={userInfo._id}
                    chatSelectedId={chatSelectedId}
                    onSubmitMessage={onSubmitMessage}
                    onClickChat={onClickChat}
                  />
                </div>
              ) : undefined}
            </MainContent>
          </Appbar>

          <Modal openModal={showRequestForm} setOpenModal={() => onTriggerOpenModal('showRequestForm')}>
            <Typography variant="h5">{textConsts.modalNewRequestTitle}</Typography>
            <CustomSearchRequestForm
              isEdit
              setOpenModal={() => onTriggerOpenModal('showRequestForm')}
              requestToEdit={request}
              onSubmit={onSubmitEditCustomSearchRequest}
            />
          </Modal>

          <ConfirmationModal
            isWarning={confirmModalSettings.isWarning}
            openModal={showConfirmModal}
            setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
            title={textConsts.confirmTitle}
            message={confirmModalSettings.message}
            successBtnText={textConsts.yesBtn}
            cancelBtnText={textConsts.noBtn}
            onClickSuccessBtn={confirmModalSettings.onSubmit}
            onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
          />

          <ConfirmWithCommentModal
            openModal={showConfirmWithCommentModal}
            setOpenModal={() => onTriggerOpenModal('showConfirmWithCommentModal')}
            titleText={textConsts.commentModalTitle}
            commentLabelText={textConsts.commentModalLabel}
            okBtnText={textConsts.okBtn}
            cancelBtnText={textConsts.cancelBtn}
            onSubmit={onSubmitAbortRequest}
          />
        </Main>
      </React.Fragment>
    )
  }
}

export const OwnerRequestDetailCustomView = withStyles(styles)(OwnerRequestDetailCustomViewRaw)
