import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultipleChats } from '@components/chat/multiple-chats'
import { RequestDesignerResultClientForm } from '@components/forms/request-designer-result-client-form'
import { RequestDesignerResultForm } from '@components/forms/request-designer-result-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { RequestResultModal } from '@components/modals/request-result-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { CustomSearchRequestDetails } from '@components/requests-and-request-proposals/requests/requests-details/custom-request-details'
import { ServantGeneralRequestInfo } from '@components/requests-and-request-proposals/servant-general-request-info'
import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { ChatRequestAndRequestProposalContext } from '@contexts/chat-request-and-request-proposal-context'

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
  const [viewModel] = useState(() => new RequestDetailCustomViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()

    viewModel.resetChats()
  }, [])

  const findRequestProposalForCurChat =
    viewModel.chatSelectedId &&
    viewModel.requestProposals?.find(requestProposal => requestProposal?.proposal?.chatId === viewModel.chatSelectedId)
  const isResultButton =
    ((findRequestProposalForCurChat?.proposal?.sub &&
      findRequestProposalForCurChat?.proposal?.sub?._id === viewModel.userInfo?._id) ||
      (!findRequestProposalForCurChat?.proposal?.sub &&
        findRequestProposalForCurChat?.proposal?.createdBy?._id === viewModel.userInfo?._id)) &&
    (findRequestProposalForCurChat?.proposal?.status === RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED ||
      findRequestProposalForCurChat?.proposal?.status === RequestProposalStatus.TO_CORRECT ||
      findRequestProposalForCurChat?.proposal?.status === RequestProposalStatus.READY_TO_VERIFY)
  const isRefine = viewModel.requestProposals?.[0]?.proposal?.status === RequestProposalStatus.TO_CORRECT

  return (
    <React.Fragment>
      <div>
        <div className={styles.backBtnWrapper}>
          <Button variant="contained" color="primary" className={styles.backBtn} onClick={viewModel.onClickBackBtn}>
            {t(TranslationKey.Back)}
          </Button>
        </div>

        {viewModel.request && viewModel.requestProposals ? (
          <div className={styles.requestInfoWrapper}>
            <ServantGeneralRequestInfo
              requestProposals={viewModel.requestProposals}
              request={viewModel.request}
              onSubmit={viewModel.onSubmitOfferDeal}
            />
          </div>
        ) : null}

        {viewModel.request ? (
          <div className={styles.detailsWrapper}>
            <CustomSearchRequestDetails request={viewModel.request} isOpen={!viewModel.chatSelectedId} />
          </div>
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
                chatMessageHandlers={{
                  onClickReworkProposal: viewModel.onClickReworkProposal,
                  onClickOpenRequest: viewModel.onClickOpenRequest,
                }}
                renderAdditionalButtons={() => (
                  <div className={styles.additionalButtonsWrapper}>
                    {findRequestProposalForCurChat &&
                    requestProposalCancelAllowedStatuses?.includes(findRequestProposalForCurChat?.proposal?.status) ? (
                      <Button danger onClick={() => viewModel.onTriggerOpenModal('showConfirmModal')}>
                        {t(TranslationKey['Reject the deal'])}
                      </Button>
                    ) : (
                      <div />
                    )}
                    {isResultButton ? (
                      <Button
                        onClick={() => (isRefine ? viewModel.onClickReworkProposal() : viewModel.onClickResultBtn())}
                      >
                        {isRefine ? t(TranslationKey.Refine) : t(TranslationKey.Result)}
                      </Button>
                    ) : null}
                  </div>
                )}
                updateData={viewModel.loadData}
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

      <WarningInfoModal
        isWarning={viewModel.warningInfoModalSettings.isWarning}
        openModal={viewModel.showWarningModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningModal')}
        title={viewModel.warningInfoModalSettings.title}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showWarningModal')
        }}
      />

      <Modal
        missClickModalOn
        openModal={viewModel.showRequestDesignerResultClientModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultClientModal')}
      >
        <RequestDesignerResultClientForm
          userInfo={viewModel.userInfo}
          request={viewModel.request}
          proposal={findRequestProposalForCurChat}
          curResultMedia={viewModel.curResultMedia}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultClientModal')}
          // onClickSendAsResult={viewModel.onClickSendAsResult}
        />
      </Modal>

      <RequestResultModal
        request={viewModel.request}
        openModal={viewModel.showRequestResultModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showRequestResultModal')}
        onClickSendAsResult={viewModel.onClickSendAsResult}
      />

      <Modal
        missClickModalOn
        openModal={viewModel.showRequestDesignerResultModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultModal')}
      >
        <RequestDesignerResultForm
          request={viewModel.request}
          proposal={findRequestProposalForCurChat}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultModal')}
          onClickSendAsResult={viewModel.onClickSendAsResult}
        />
      </Modal>

      <ConfirmationModal
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

      {viewModel.showProgress && <CircularProgressWithLabel />}
    </React.Fragment>
  )
})
