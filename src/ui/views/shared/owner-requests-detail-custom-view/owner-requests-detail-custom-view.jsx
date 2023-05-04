import InboxIcon from '@mui/icons-material/Inbox'
import {Typography, Paper, Accordion, AccordionDetails, AccordionSummary, Alert} from '@mui/material'

import React, {Component, createRef} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {OwnerRequestProposalsCard} from '@components/cards/owner-request-proposals-card'
import {MultipleChats} from '@components/chat/multiple-chats'
import {RequestDesignerResultClientForm} from '@components/forms/request-designer-result-client-form'
import {RequestProposalAcceptOrRejectResultForm} from '@components/forms/request-proposal-accept-or-reject-result-form/request-proposal-accept-or-reject-result-form'
import {RequestProposalResultToCorrectForm} from '@components/forms/request-proposal-result-to-correct-form'
import {ReviewsForm} from '@components/forms/reviews-form'
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

import {t} from '@utils/translations'

import {ChatRequestAndRequestProposalContext} from '../../../../contexts/chat-request-and-request-proposal-context'
import {OwnerRequestDetailCustomViewModel} from './owner-requests-detail-custom-view.model'
import {styles} from './owner-requests-detail-custom-view.style'

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
      curResultMedia,
      findRequestProposalForCurChat,
      acceptMessage,
      showAcceptMessage,
      typingUsers,
      requestProposals,
      drawerOpen,
      request,
      confirmModalSettings,
      acceptProposalResultSetting,
      showRequestForm,
      showConfirmModal,
      showConfirmWithCommentModal,
      showReviewModal,
      chatSelectedId,
      chats,
      userInfo,
      chatIsConnected,
      showResultToCorrectFormModal,
      showConfirmWorkResultFormModal,
      showRequestDesignerResultClientModal,
      onRecoverRequest,
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
      onClickRejectProposal,
      onClickProposalResultAccept,
      onClickProposalResultToCorrect,
      onClickReview,
      onPressSubmitRequestProposalResultToCorrectForm,
      triggerShowResultToCorrectFormModal,
      showChat,
      onClickHideChat,
      onClickOrderProposal,
      onTypingMessage,
      onClickOpenRequest,
      onPressSubmitDesignerResultToCorrect,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          drawerOpen={drawerOpen}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey['My request'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              {request ? (
                <OwnerGeneralRequestInfo
                  requestProposals={requestProposals}
                  request={request}
                  onClickPublishBtn={onClickPublishBtn}
                  onClickEditBtn={onClickEditBtn}
                  onClickCancelBtn={onClickCancelBtn}
                  onClickAbortBtn={onClickAbortBtn}
                  onRecoverRequest={onRecoverRequest}
                />
              ) : null}

              <div className={classNames.detailsWrapper}>
                <CustomSearchRequestDetails request={request} />
              </div>

              {requestProposals?.length ? (
                <div className={classNames.detailsWrapper}>
                  <DealsOfRequest requestProposals={requestProposals} onClickReview={onClickReview} />
                </div>
              ) : null}

              {requestProposals?.length ? (
                <div className={classNames.proposalsWrapper}>
                  <Typography className={classNames.proposalsTitle}>
                    {t(TranslationKey['Proposals for the request'])}
                  </Typography>
                  {requestProposals.map(item => (
                    <div key={item?.proposal?._id} className={classNames.proposalAndChatWrapper}>
                      <Paper>
                        <OwnerRequestProposalsCard
                          item={item}
                          request={request}
                          onClickContactWithExecutor={onClickContactWithExecutor}
                          onClickOrderProposal={onClickOrderProposal}
                          onClickRejectProposal={onClickRejectProposal}
                          onClickReview={onClickReview}
                        />
                      </Paper>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={classNames.emptyProposalsIconWrapper}>
                  <div className={classNames.emptyProposalsIcon}>
                    <InboxIcon style={{color: '#C4C4C4', fontSize: '76px'}} />
                  </div>
                  <Typography className={classNames.emptyProposalsDescription}>
                    {t(TranslationKey['No new proposals at the moment'])}
                  </Typography>
                </div>
              )}

              <Accordion expanded={showChat}>
                <AccordionSummary style={{display: 'none'}} />
                <AccordionDetails style={{padding: '0'}}>
                  {chatIsConnected && (
                    <div className={classNames.chatWrapper}>
                      <ChatRequestAndRequestProposalContext.Provider
                        value={{
                          request,
                          requestProposal: findRequestProposalForCurChat,
                        }}
                      >
                        <MultipleChats
                          ref={this.chatRef}
                          isFreelanceOwner
                          typingUsers={typingUsers}
                          chats={chats}
                          userId={userInfo._id}
                          chatSelectedId={chatSelectedId}
                          chatMessageHandlers={{
                            onClickProposalAccept: onClickOrderProposal,
                            onClickProposalRegect: onClickRejectProposal,
                            onClickProposalResultToCorrect,
                            onClickProposalResultAccept,
                            onClickOrderProposal,
                            onClickOpenRequest,
                          }}
                          // renderAdditionalButtons={() => (
                          //   <Button onClick={() => onTriggerOpenModal('showRequestDesignerResultClientModal')}>
                          //     ПОКАЗАТЬ РЕЗУЛЬТАТ (тест дизайнера)
                          //   </Button>
                          // )}
                          updateData={this.viewModel.loadData}
                          onSubmitMessage={onSubmitMessage}
                          onClickChat={onClickChat}
                          onTypingMessage={onTypingMessage}
                        />
                      </ChatRequestAndRequestProposalContext.Provider>
                    </div>
                  )}
                </AccordionDetails>
              </Accordion>
              {showChat && (
                <div className={classNames.hideChatButtonWrapper}>
                  <Button className={classNames.hideChatButton} onClick={onClickHideChat}>
                    {t(TranslationKey['Hide chat'])}
                  </Button>
                </div>
              )}
            </MainContent>
          </Appbar>

          <Modal openModal={showRequestForm} setOpenModal={() => onTriggerOpenModal('showRequestForm')}>
            <Typography variant="h5">{t(TranslationKey['New request'])}</Typography>
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

          <Modal openModal={showReviewModal} setOpenModal={() => onTriggerOpenModal('showReviewModal')}>
            <ReviewsForm onClickCloseButton={() => onTriggerOpenModal('showReviewModal')} />
          </Modal>

          <Modal
            missClickModalOn
            openModal={showRequestDesignerResultClientModal}
            setOpenModal={() => onTriggerOpenModal('showRequestDesignerResultClientModal')}
          >
            <RequestDesignerResultClientForm
              userInfo={userInfo}
              request={request}
              proposal={findRequestProposalForCurChat}
              curResultMedia={curResultMedia}
              setOpenModal={() => onTriggerOpenModal('showRequestDesignerResultClientModal')}
              onClickProposalResultAccept={onClickProposalResultAccept}
              onPressSubmitDesignerResultToCorrect={onPressSubmitDesignerResultToCorrect}
            />
          </Modal>

          <Modal
            openModal={showConfirmWorkResultFormModal}
            setOpenModal={() => onTriggerOpenModal('showConfirmWorkResultFormModal')}
          >
            <RequestProposalAcceptOrRejectResultForm
              title={t(TranslationKey['Confirm acceptance of the work result'])}
              rateLabel={t(TranslationKey['Rate the performer'])}
              reviewLabel={t(TranslationKey["Review of the performer's work"])}
              confirmButtonText={t(TranslationKey.Confirm)}
              cancelBtnText={t(TranslationKey.Reject)}
              onSubmit={acceptProposalResultSetting.onSubmit}
              onClose={() => onTriggerOpenModal('showConfirmWorkResultFormModal')}
            />
          </Modal>

          <ConfirmationModal
            isWarning={confirmModalSettings.isWarning}
            openModal={showConfirmModal}
            setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
            title={t(TranslationKey.Attention)}
            message={confirmModalSettings.message}
            smallMessage={confirmModalSettings.smallMessage}
            successBtnText={t(TranslationKey.Yes)}
            cancelBtnText={t(TranslationKey.Cancel)}
            onClickSuccessBtn={confirmModalSettings.onSubmit}
            onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
          />

          <ConfirmWithCommentModal
            openModal={showConfirmWithCommentModal}
            setOpenModal={() => onTriggerOpenModal('showConfirmWithCommentModal')}
            titleText={t(TranslationKey['Suspend the acceptance of proposals?'])}
            commentLabelText={`${t(TranslationKey['State the reason for stopping'])}: `}
            okBtnText={t(TranslationKey.Ok)}
            cancelBtnText={t(TranslationKey.Cancel)}
            onSubmit={onSubmitAbortRequest}
          />
        </Main>
        {acceptMessage && showAcceptMessage ? (
          <div className={classNames.acceptMessageWrapper}>
            <Alert elevation={5} severity="success">
              {acceptMessage}
            </Alert>
          </div>
        ) : null}
      </React.Fragment>
    )
  }
}

export const OwnerRequestDetailCustomView = withStyles(OwnerRequestDetailCustomViewRaw, styles)
