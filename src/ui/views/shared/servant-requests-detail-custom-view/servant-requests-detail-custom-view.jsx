import { observer } from 'mobx-react'
import { useEffect, useMemo } from 'react'

import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultipleChats } from '@components/chat/multiple-chats'
import { RequestDesignerResultClientForm } from '@components/forms/request-designer-result-client-form'
import { RequestDesignerResultForm } from '@components/forms/request-designer-result-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { MainRequestResultModal } from '@components/modals/main-request-result-modal'
import { RequestResultModal } from '@components/modals/request-result-modal'
import { CustomSearchRequestDetails } from '@components/requests-and-request-proposals/requests/requests-details/custom-request-details'
import { ServantGeneralRequestInfo } from '@components/requests-and-request-proposals/servant-general-request-info'
import { Button } from '@components/shared/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { ChatRequestAndRequestProposalContext } from '@contexts/chat-request-and-request-proposal-context'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './servant-requests-detail-custom-view.style'

import { RequestDetailCustomViewModel } from './servant-requests-detail-custom-view.model'

const requestProposalCancelAllowedStatuses = [
  RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED,
  RequestProposalStatus.READY_TO_VERIFY,
  RequestProposalStatus.TO_CORRECT,
  RequestProposalStatus.CORRECTED,
]

export const RequestDetailCustomView = observer(({ history }) => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new RequestDetailCustomViewModel({ history }), [])

  useEffect(() => {
    viewModel.loadData()
    viewModel.resetChats()
  }, [])

  const findRequestProposalForCurChat =
    viewModel.chatSelectedId &&
    viewModel.requestProposals?.find(requestProposal => requestProposal?.proposal?.chatId === viewModel.chatSelectedId)
  const showActionsButton =
    ((findRequestProposalForCurChat?.proposal?.sub &&
      findRequestProposalForCurChat?.proposal?.sub?._id === viewModel.userInfo?._id) ||
      findRequestProposalForCurChat?.proposal?.createdBy?._id === viewModel.userInfo?._id) &&
    [RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED, RequestProposalStatus.TO_CORRECT].includes(
      findRequestProposalForCurChat?.proposal?.status,
    )
  const isRefine = viewModel.requestProposals?.[0]?.proposal?.status === RequestProposalStatus.TO_CORRECT
  const showRejectTheDealButton =
    findRequestProposalForCurChat &&
    requestProposalCancelAllowedStatuses?.includes(findRequestProposalForCurChat?.proposal?.status)

  return (
    <>
      <div>
        {viewModel.request && viewModel.requestProposals ? (
          <ServantGeneralRequestInfo
            requestProposals={viewModel.requestProposals}
            request={viewModel.request}
            onSubmit={viewModel.onSubmitOfferDeal}
            onJoinChat={viewModel.onJoinChat}
          />
        ) : null}

        {viewModel.request ? (
          <CustomSearchRequestDetails request={viewModel.request} isOpen={!viewModel.chatSelectedId} />
        ) : null}

        {viewModel.chatIsConnected && viewModel.chats?.length ? (
          <div className={styles.chatWrapper}>
            <ChatRequestAndRequestProposalContext.Provider
              value={{
                request: viewModel.request,
                requestProposal: findRequestProposalForCurChat,
                requestProposals: viewModel.requestProposals,
              }}
            >
              <MultipleChats
                isFreelanceOwner
                chats={viewModel.chats}
                typingUsers={viewModel.typingUsers}
                userId={viewModel.userInfo?._id}
                mutedChats={viewModel.mutedChats}
                messagesFound={viewModel.messagesFound}
                mesSearchValue={viewModel.mesSearchValue}
                curFoundedMessage={viewModel.curFoundedMessage}
                chatSelectedId={viewModel.chatSelectedId}
                currentOpponent={viewModel.request?.request?.createdBy}
                chatMessageHandlers={{
                  onClickOpenRequest: viewModel.onClickOpenRequest,
                }}
                renderAdditionalButtons={() => (
                  <div className={styles.additionalButtonsWrapper}>
                    {showRejectTheDealButton ? (
                      <Button
                        styleType={ButtonStyle.DANGER}
                        onClick={() => viewModel.onTriggerOpenModal('showConfirmModal')}
                      >
                        {t(TranslationKey['Reject the deal'])}
                      </Button>
                    ) : (
                      <div />
                    )}
                    {showActionsButton ? (
                      <Button
                        onClick={() => (isRefine ? viewModel.onClickReworkProposal() : viewModel.onClickResultBtn())}
                      >
                        {isRefine ? t(TranslationKey.Refine) : t(TranslationKey.Result)}
                      </Button>
                    ) : null}
                  </div>
                )}
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
        ) : null}
      </div>

      <Modal
        missClickModalOn
        openModal={viewModel.showRequestDesignerResultClientModal}
        setOpenModal={viewModel.onClickCloseDesignerResultClientModal}
      >
        <RequestDesignerResultClientForm
          userInfo={viewModel.userInfo}
          request={viewModel.request}
          proposal={findRequestProposalForCurChat}
          curResultMedia={viewModel.curResultMedia}
          setOpenModal={viewModel.onClickCloseDesignerResultClientModal}
          // onClickSendAsResult={viewModel.onClickSendAsResult}
        />
      </Modal>

      {viewModel.showMainRequestResultModal ? (
        <MainRequestResultModal
          customProposal={findRequestProposalForCurChat}
          userInfo={viewModel.userInfo}
          openModal={viewModel.showMainRequestResultModal}
          onOpenModal={() => viewModel.onTriggerOpenModal('showMainRequestResultModal')}
          onEditCustomProposal={viewModel.onSendResultAfterRework}
        />
      ) : null}

      {viewModel.showRequestResultModal ? (
        <RequestResultModal
          // @ts-ignore
          openModal={viewModel.showRequestResultModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestResultModal')}
          onClickSendAsResult={viewModel.onClickSendAsResult}
        />
      ) : null}

      <Modal
        missClickModalOn
        openModal={viewModel.showRequestDesignerResultModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultModal')}
      >
        <RequestDesignerResultForm
          proposal={findRequestProposalForCurChat}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultModal')}
          onClickSendAsResult={viewModel.onClickSendAsResult}
        />
      </Modal>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={t(TranslationKey['Reject the deal'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={viewModel.onClickCancelRequestProposal}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}

      {viewModel.showProgress && <CircularProgressWithLabel />}
    </>
  )
})
