import { observer } from 'mobx-react'
import React, { useEffect, useRef, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import InboxIcon from '@mui/icons-material/Inbox'
import { Accordion, AccordionDetails, AccordionSummary, Paper, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { OwnerRequestProposalsCard } from '@components/cards/owner-request-proposals-card'
import { MultipleChats } from '@components/chat/multiple-chats'
import { RequestDesignerResultClientForm } from '@components/forms/request-designer-result-client-form'
import { RequestProposalAcceptOrRejectResultForm } from '@components/forms/request-proposal-accept-or-reject-result-form/request-proposal-accept-or-reject-result-form'
import { RequestProposalResultToCorrectForm } from '@components/forms/request-proposal-result-to-correct-form'
import { ReviewsForm } from '@components/forms/reviews-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { OwnerGeneralRequestInfo } from '@components/requests-and-request-proposals/owner-general-request-info'
import { DealsOfRequest } from '@components/requests-and-request-proposals/request-proposals/deals-of-request'
import { CustomSearchRequestForm } from '@components/requests-and-request-proposals/requests/create-or-edit-forms/custom-search-request-form'
import { CustomSearchRequestDetails } from '@components/requests-and-request-proposals/requests/requests-details/custom-request-details'
import { AlertShield } from '@components/shared/alert-shield'
import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { styles } from './owner-requests-detail-custom-view.style'

import { ChatRequestAndRequestProposalContext } from '../../../../contexts/chat-request-and-request-proposal-context'

import { OwnerRequestDetailCustomViewModel } from './owner-requests-detail-custom-view.model'

export const OwnerRequestDetailCustomViewRaw = props => {
  const chatRef = useRef()
  const [viewModel] = useState(
    () =>
      new OwnerRequestDetailCustomViewModel({
        history: props.history,
        location: props.location,
        scrollToChat: () => {
          if (chatRef?.current) {
            chatRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
          }
        },
      }),
  )
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()

    return () => {
      viewModel.resetChats()
    }
  }, [])

  return (
    <React.Fragment>
      <div>
        {viewModel.request ? (
          <OwnerGeneralRequestInfo
            userInfo={viewModel.userInfo}
            request={viewModel.request}
            requestProposals={viewModel.requestProposals}
            requestAnnouncement={viewModel.requestAnnouncement}
            onClickPublishBtn={viewModel.onClickPublishBtn}
            onClickEditBtn={viewModel.onClickEditBtn}
            onClickCancelBtn={viewModel.onClickCancelBtn}
            onClickMarkAsCompletedBtn={viewModel.onClickMarkAsCompletedBtn}
            onClickAbortBtn={viewModel.onClickAbortBtn}
            onRecoverRequest={viewModel.onRecoverRequest}
            onToggleUploadedToListing={viewModel.onToggleUploadedToListing}
          />
        ) : null}

        <div className={classNames.detailsWrapper}>
          <CustomSearchRequestDetails request={viewModel.request} />
        </div>

        {viewModel.requestProposals?.length ? (
          <div className={classNames.detailsWrapper}>
            <DealsOfRequest requestProposals={viewModel.requestProposals} onClickReview={viewModel.onClickReview} />
          </div>
        ) : null}

        {viewModel.requestProposals?.length ? (
          <div className={classNames.proposalsWrapper}>
            <Typography className={classNames.proposalsTitle}>
              {t(TranslationKey['Proposals for the request'])}
            </Typography>
            {viewModel.requestProposals.map(item => (
              <div key={item?.proposal?._id} className={classNames.proposalAndChatWrapper}>
                <Paper>
                  <OwnerRequestProposalsCard
                    item={item}
                    request={viewModel.request}
                    userInfo={viewModel.userInfo}
                    onClickContactWithExecutor={viewModel.onClickContactWithExecutor}
                    onClickOrderProposal={viewModel.onClickOrderProposal}
                    onClickRejectProposal={viewModel.onClickRejectProposal}
                    onClickReview={viewModel.onClickReview}
                  />
                </Paper>
              </div>
            ))}
          </div>
        ) : (
          <div className={classNames.emptyProposalsIconWrapper}>
            <div className={classNames.emptyProposalsIcon}>
              <InboxIcon style={{ color: '#C4C4C4', fontSize: '76px' }} />
            </div>
            <Typography className={classNames.emptyProposalsDescription}>
              {t(TranslationKey['No new proposals at the moment'])}
            </Typography>
          </div>
        )}

        <Accordion expanded={viewModel.showChat}>
          <AccordionSummary style={{ display: 'none' }} />
          {viewModel.chatIsConnected && (
            <AccordionDetails style={{ padding: '0' }}>
              <div className={classNames.chatWrapper}>
                <ChatRequestAndRequestProposalContext.Provider
                  value={{
                    request: viewModel.request,
                    requestProposal: viewModel.findRequestProposalForCurChat,
                  }}
                >
                  <MultipleChats
                    ref={chatRef}
                    isFreelanceOwner
                    typingUsers={viewModel.typingUsers}
                    chats={viewModel.chats}
                    userId={viewModel.userInfo._id}
                    chatSelectedId={viewModel.chatSelectedId}
                    chatMessageHandlers={{
                      onClickProposalAccept: viewModel.onClickOrderProposal,
                      onClickProposalRegect: viewModel.onClickRejectProposal,
                      onClickProposalResultToCorrect: viewModel.onClickProposalResultToCorrect,
                      onClickProposalResultAccept: viewModel.onClickProposalResultAccept,
                      onClickOrderProposal: viewModel.onClickOrderProposal,
                      onClickOpenRequest: viewModel.onClickOpenRequest,
                    }}
                    // renderAdditionalButtons={() => (
                    //   <Button onClick={() => onTriggerOpenModal('showRequestDesignerResultClientModal')}>
                    //     ПОКАЗАТЬ РЕЗУЛЬТАТ (тест дизайнера)
                    //   </Button>
                    // )}
                    updateData={viewModel.loadData}
                    onSubmitMessage={viewModel.onSubmitMessage}
                    onClickChat={viewModel.onClickChat}
                    onTypingMessage={viewModel.onTypingMessage}
                  />
                </ChatRequestAndRequestProposalContext.Provider>
              </div>
            </AccordionDetails>
          )}
        </Accordion>
        {viewModel.showChat && (
          <div className={classNames.hideChatButtonWrapper}>
            <Button className={classNames.hideChatButton} onClick={viewModel.onClickHideChat}>
              {t(TranslationKey['Hide chat'])}
            </Button>
          </div>
        )}
      </div>

      <Modal openModal={viewModel.showRequestForm} setOpenModal={() => viewModel.onTriggerOpenModal('showRequestForm')}>
        <Typography variant="h5">{t(TranslationKey['New request'])}</Typography>
        <CustomSearchRequestForm
          isEdit
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestForm')}
          requestToEdit={viewModel.request}
          onSubmit={viewModel.onSubmitEditCustomSearchRequest}
        />
      </Modal>
      <Modal
        openModal={viewModel.showResultToCorrectFormModal}
        setOpenModal={viewModel.triggerShowResultToCorrectFormModal}
      >
        <RequestProposalResultToCorrectForm
          onPressSubmitForm={viewModel.onSubmitSendInForReworkInRequestProposalResultToCorrectForm}
        />
      </Modal>

      <Modal openModal={viewModel.showReviewModal} setOpenModal={() => viewModel.onTriggerOpenModal('showReviewModal')}>
        <ReviewsForm
          reviews={viewModel.currentReviews}
          user={viewModel.currentReviewModalUser}
          onClickCloseButton={() => viewModel.onTriggerOpenModal('showReviewModal')}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showRequestDesignerResultClientModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultClientModal')}
      >
        <RequestDesignerResultClientForm
          userInfo={viewModel.userInfo}
          request={viewModel.request}
          proposal={viewModel.findRequestProposalForCurChat}
          curResultMedia={viewModel.curResultMedia}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultClientModal')}
          onClickProposalResultAccept={viewModel.onClickProposalResultAccept}
          onPressSubmitDesignerResultToCorrect={viewModel.onSubmitSendInForReworkInProposalResultAccept}
        />
      </Modal>

      {viewModel.showConfirmWorkResultFormModal && (
        <RequestProposalAcceptOrRejectResultForm
          openModal={viewModel.showConfirmWorkResultFormModal}
          title={t(TranslationKey['Confirm acceptance of the work result'])}
          rateLabel={t(TranslationKey['Rate the performer'])}
          reviewLabel={t(TranslationKey["Review of the performer's work"])}
          confirmButtonText={t(TranslationKey.Confirm)}
          cancelBtnText={t(TranslationKey.Reject)}
          onSubmit={viewModel.acceptProposalResultSetting.onSubmit}
          onClose={() => viewModel.onTriggerOpenModal('showConfirmWorkResultFormModal')}
        />
      )}

      <ConfirmationModal
        isWarning={viewModel.confirmModalSettings?.isWarning}
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={viewModel.confirmModalSettings.message}
        smallMessage={viewModel.confirmModalSettings.smallMessage}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.Cancel)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onSubmit}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />

      <ConfirmationModal
        withComment
        asCommentModalDefault
        openModal={viewModel.showConfirmWithCommentModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmWithCommentModal')}
        title={t(TranslationKey['Suspend the acceptance of proposals?'])}
        commentLabelText={`${t(TranslationKey['State the reason for stopping'])}: `}
        successBtnText={t(TranslationKey.Ok)}
        cancelBtnText={t(TranslationKey.Cancel)}
        onClickSuccessBtn={viewModel.onSubmitAbortRequest}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />

      {viewModel.alertShieldSettings.alertShieldMessage && (
        <AlertShield
          showAcceptMessage={viewModel?.alertShieldSettings?.showAlertShield}
          acceptMessage={viewModel?.alertShieldSettings?.alertShieldMessage}
        />
      )}
    </React.Fragment>
  )
}

export const OwnerRequestDetailCustomView = withStyles(observer(OwnerRequestDetailCustomViewRaw), styles)
