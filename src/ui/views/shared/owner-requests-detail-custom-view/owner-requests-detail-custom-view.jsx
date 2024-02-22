import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'

import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'

import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultipleChats } from '@components/chat/multiple-chats'
import { RequestDesignerResultClientForm } from '@components/forms/request-designer-result-client-form'
import { RequestProposalAcceptOrRejectResultForm } from '@components/forms/request-proposal-accept-or-reject-result-form'
import { ReviewsForm } from '@components/forms/reviews-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { MainRequestResultModal } from '@components/modals/main-request-result-modal'
import { OwnerGeneralRequestInfo } from '@components/requests-and-request-proposals/owner-general-request-info'
import { DealsOfRequest } from '@components/requests-and-request-proposals/request-proposals/deals-of-request'
import { CustomSearchRequestForm } from '@components/requests-and-request-proposals/requests/create-or-edit-forms/custom-search-request-form'
import { CustomSearchRequestDetails } from '@components/requests-and-request-proposals/requests/requests-details/custom-request-details'
import { AlertShield } from '@components/shared/alert-shield'
import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'
import { RequestProposalsCardList } from '@components/shared/request-proposals-card-list'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ChatRequestAndRequestProposalContext } from '@contexts/chat-request-and-request-proposal-context'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './owner-requests-detail-custom-view.style'

import { OwnerRequestDetailCustomViewModel } from './owner-requests-detail-custom-view.model'

const statusesReworkAndReceiveButtons = [RequestProposalStatus.READY_TO_VERIFY, RequestProposalStatus.CORRECTED]
const statusesOrderAndRejectButtons = [RequestProposalStatus.CREATED, RequestProposalStatus.OFFER_CONDITIONS_CORRECTED]

export const OwnerRequestDetailCustomView = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const chatRef = useRef()

  const [viewModel] = useState(
    () =>
      new OwnerRequestDetailCustomViewModel({
        history,
        scrollToChat: () => {
          if (chatRef?.current) {
            chatRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
          }
        },
      }),
  )

  useEffect(() => {
    viewModel.loadData()

    return () => {
      viewModel.resetChats()
    }
  }, [])

  const findRequestProposalForCurChat =
    viewModel.chatSelectedId &&
    viewModel.requestProposals?.find(requestProposal => requestProposal?.proposal?.chatId === viewModel.chatSelectedId)
  const statusForCurrentChat = findRequestProposalForCurChat?.proposal?.status
  const idForCurrentChat = findRequestProposalForCurChat?.proposal?._id
  const priceForCurrentChat = findRequestProposalForCurChat?.proposal?.price

  return (
    <>
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

        <div className={styles.detailsWrapper}>
          <CustomSearchRequestDetails request={viewModel.request} />
        </div>

        {viewModel.requestProposals?.length ? (
          <div className={styles.detailsWrapper}>
            <DealsOfRequest requestProposals={viewModel.requestProposals} onClickReview={viewModel.onClickReview} />
          </div>
        ) : null}

        <RequestProposalsCardList
          requestProposals={viewModel.requestProposals}
          request={viewModel.request}
          userInfo={viewModel.userInfo}
          onClickContactWithExecutor={viewModel.onClickContactWithExecutor} // нужное
          onClickOrderProposal={viewModel.onClickOrderProposal}
          onClickRejectProposal={viewModel.onClickRejectProposal}
          onClickReview={viewModel.onClickReview}
          onSendInForRework={viewModel.onSendInForRework}
        />

        <Accordion expanded={viewModel.showChat}>
          <AccordionSummary style={{ display: 'none' }} />
          {viewModel.chatIsConnected && (
            <AccordionDetails style={{ padding: '0' }}>
              <div className={styles.chatWrapper}>
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
                    mutedChats={viewModel.mutedChats}
                    messagesFound={viewModel.messagesFound}
                    mesSearchValue={viewModel.mesSearchValue}
                    curFoundedMessage={viewModel.curFoundedMessage}
                    chatSelectedId={viewModel.chatSelectedId}
                    chatMessageHandlers={{
                      onClickOpenRequest: viewModel.onClickOpenRequest,
                    }}
                    renderAdditionalButtons={() => (
                      <>
                        {statusesReworkAndReceiveButtons.includes(statusForCurrentChat) && (
                          <div className={styles.additionalButtonsWrapper}>
                            <Button onClick={() => viewModel.onClickProposalResultToCorrect()}>
                              {t(TranslationKey['Send in for rework'])}
                            </Button>
                            <Button
                              styleType={ButtonType.SUCCESS}
                              onClick={() => viewModel.onClickProposalResultAccept(idForCurrentChat)}
                            >
                              {t(TranslationKey.Receive)}
                            </Button>
                          </div>
                        )}

                        {statusesOrderAndRejectButtons.includes(statusForCurrentChat) && (
                          <div className={styles.additionalButtonsWrapper}>
                            <Button
                              styleType={ButtonType.DANGER}
                              onClick={() => viewModel.onClickRejectProposal(idForCurrentChat)}
                            >
                              {t(TranslationKey.Reject)}
                            </Button>

                            <Button
                              styleType={ButtonType.SUCCESS}
                              onClick={() => viewModel.onClickOrderProposal(idForCurrentChat, priceForCurrentChat)}
                            >
                              {`${t(TranslationKey['Order for'])} ${toFixedWithDollarSign(priceForCurrentChat, 2)}`}
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                    updateData={viewModel.loadData}
                    requestStatus={viewModel.requestStatus}
                    onChangeRequestStatus={viewModel.setRequestStatus}
                    onSubmitMessage={viewModel.onSubmitMessage}
                    onClickChat={viewModel.onClickChat}
                    onTypingMessage={viewModel.onTypingMessage}
                    onToggleMuteCurrentChat={viewModel.onToggleMuteCurrentChat}
                    onChangeMesSearchValue={viewModel.onChangeMesSearchValue}
                    onChangeCurFoundedMessage={viewModel.onChangeCurFoundedMessage}
                    onCloseMesSearchValue={viewModel.onCloseMesSearchValue}
                  />
                </ChatRequestAndRequestProposalContext.Provider>
              </div>
            </AccordionDetails>
          )}
        </Accordion>

        {viewModel.showChat && (
          <div className={styles.hideChatButtonWrapper}>
            <Button className={styles.hideChatButton} onClick={viewModel.onClickHideChat}>
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

      {viewModel.showMainRequestResultModal ? (
        <MainRequestResultModal
          customProposal={viewModel.findRequestProposalForCurChat}
          userInfo={viewModel.userInfo}
          openModal={viewModel.showMainRequestResultModal}
          onOpenModal={() => viewModel.onTriggerOpenModal('showMainRequestResultModal')}
          onEditCustomProposal={viewModel.onSendInForRework}
        />
      ) : null}

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
    </>
  )
})
