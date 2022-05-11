import React, {Component, createRef} from 'react'

import {Typography, Paper} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {OwnerRequestProposalsCard} from '@components/cards/owner-request-proposals-card'
import {MultipleChats} from '@components/chat/multiple-chats'
import {RequestProposalResultToCorrectForm} from '@components/forms/request-proposal-result-to-correct-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {ConfirmWithCommentModal} from '@components/modals/confirmation-with-comment-modal'
import {Navbar} from '@components/navbar'
import {OwnerGeneralRequestInfo} from '@components/requests-and-request-proposals/owner-general-request-info'
import {DealsOfRequest} from '@components/requests-and-request-proposals/request-proposals/deals-of-request'
import {CustomSearchRequestForm} from '@components/requests-and-request-proposals/requests/create-or-edit-forms/custom-search-request-form'
import {CustomSearchRequestDetails} from '@components/requests-and-request-proposals/requests/requests-details/custom-request-details'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {ChatRequestAndRequestProposalContext} from '../../../../contexts/chat-request-and-request-proposal-context'
import {OwnerRequestDetailCustomViewModel} from './owner-requests-detail-custom-view.model'
import {styles} from './owner-requests-detail-custom-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').CustomRequestView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_MY_REQUESTS
@observer
export class OwnerRequestDetailCustomViewRaw extends Component {
  chatRef = createRef()
  viewModel = new OwnerRequestDetailCustomViewModel({
    history: this.props.history,
    location: this.props.location,
    scrollToChat: () => {
      if (this.chatRef?.current) {
        this.chatRef.current.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'})
      }
    },
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  componentWillUnmount() {
    this.viewModel.resetChats()
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
      showResultToCorrectFormModal,
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
      onClickContactWithExecutor,
      onClickAcceptProposal,
      onClickRejectProposal,
      onClickProposalResultAccept,
      onClickProposalResultToCorrect,
      onPressSubmitRequestProposalResultToCorrectForm,
      triggerShowResultToCorrectFormModal,
    } = this.viewModel

    const {classes: classNames} = this.props

    const findRequestProposalForCurChat =
      chatSelectedId && requestProposals.find(requestProposal => requestProposal.proposal.chatId === chatSelectedId)
    return (
      <React.Fragment>
        <Navbar
          drawerOpen={drawerOpen}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={textConsts.appBarTitle} notificationCount={2} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              {request ? (
                <OwnerGeneralRequestInfo
                  request={request}
                  onClickPublishBtn={onClickPublishBtn}
                  onClickEditBtn={onClickEditBtn}
                  onClickCancelBtn={onClickCancelBtn}
                  onClickAbortBtn={onClickAbortBtn}
                />
              ) : null}

              <div className={classNames.detailsWrapper}>
                <CustomSearchRequestDetails request={request} />
              </div>

              {requestProposals ? (
                <div className={classNames.detailsWrapper}>
                  <DealsOfRequest requestProposals={requestProposals} />
                </div>
              ) : null}

              <Paper className={classNames.proposalsWrapper}>
                {requestProposals.map(item => (
                  <OwnerRequestProposalsCard
                    key={item.proposal._id}
                    item={item}
                    onClickContactWithExecutor={onClickContactWithExecutor}
                    onClickAcceptProposal={onClickAcceptProposal}
                    onClickRejectProposal={onClickRejectProposal}
                  />
                ))}
              </Paper>

              {chatIsConnected ? (
                <div className={classNames.chatWrapper}>
                  <ChatRequestAndRequestProposalContext.Provider
                    value={{
                      request,
                      requestProposal: findRequestProposalForCurChat,
                    }}
                  >
                    <MultipleChats
                      ref={this.chatRef}
                      chats={chats}
                      userId={userInfo._id}
                      chatSelectedId={chatSelectedId}
                      chatMessageHandlers={{
                        onClickProposalAccept: onClickAcceptProposal,
                        onClickProposalRegect: onClickRejectProposal,
                        onClickProposalResultToCorrect,
                        onClickProposalResultAccept,
                      }}
                      onSubmitMessage={onSubmitMessage}
                      onClickChat={onClickChat}
                    />
                  </ChatRequestAndRequestProposalContext.Provider>
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
          <Modal openModal={showResultToCorrectFormModal} setOpenModal={triggerShowResultToCorrectFormModal}>
            <RequestProposalResultToCorrectForm onPressSubmitForm={onPressSubmitRequestProposalResultToCorrectForm} />
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
