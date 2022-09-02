import InboxIcon from '@mui/icons-material/Inbox'

import React, {Component, createRef} from 'react'

import {Typography, Paper, Accordion, AccordionDetails, AccordionSummary} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {OwnerRequestProposalsCard} from '@components/cards/owner-request-proposals-card'
import {MultipleChats} from '@components/chat/multiple-chats'
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
      requestProposals,
      drawerOpen,
      request,
      confirmModalSettings,
      confirmOrderSettings,
      acceptProposalResultSetting,
      showRequestForm,
      showOrderModal,
      showConfirmModal,
      showConfirmWithCommentModal,
      showReviewModal,
      chatSelectedId,
      chats,
      userInfo,
      chatIsConnected,
      showResultToCorrectFormModal,
      showConfirmWorkResultFormModal,
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
    } = this.viewModel

    const {classes: classNames} = this.props

    const findRequestProposalForCurChat =
      chatSelectedId && requestProposals.find(requestProposal => requestProposal.proposal.chatId === chatSelectedId)

    // console.log('chats', chats)

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

              {/* <Typography variant="h6" className={classNames.proposalsTitle}>
                {t(TranslationKey['Proposals for the request'])}
              </Typography> */}
              {requestProposals?.length ? (
                <div className={classNames.proposalsWrapper}>
                  <Typography className={classNames.proposalsTitle}>
                    {t(TranslationKey['Proposals for the request'])}
                  </Typography>
                  {requestProposals.map(item => (
                    <div key={item.proposal._id} className={classNames.proposalAndChatWrapper}>
                      <Paper>
                        <OwnerRequestProposalsCard
                          item={item}
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
                          chats={chats}
                          userId={userInfo._id}
                          chatSelectedId={chatSelectedId}
                          chatMessageHandlers={{
                            onClickProposalAccept: onClickOrderProposal,
                            onClickProposalRegect: onClickRejectProposal,
                            onClickProposalResultToCorrect,
                            onClickProposalResultAccept,
                            onClickOrderProposal,
                          }}
                          updateData={this.viewModel.loadData}
                          onSubmitMessage={onSubmitMessage}
                          onClickChat={onClickChat}
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
            successBtnText={t(TranslationKey.Yes)}
            cancelBtnText={t(TranslationKey.Cancel)}
            onClickSuccessBtn={confirmModalSettings.onSubmit}
            onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
          />

          <ConfirmationModal
            isWarning={confirmModalSettings.isWarning}
            openModal={showOrderModal}
            setOpenModal={() => onTriggerOpenModal('showOrderModal')}
            title={t(TranslationKey.Attention)}
            message={confirmOrderSettings.message}
            successBtnText={t(TranslationKey.Yes)}
            cancelBtnText={t(TranslationKey.No)}
            onClickSuccessBtn={confirmOrderSettings.onSubmit}
            onClickCancelBtn={() => onTriggerOpenModal('showOrderModal')}
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
      </React.Fragment>
    )
  }
}

export const OwnerRequestDetailCustomView = withStyles(styles)(OwnerRequestDetailCustomViewRaw)
