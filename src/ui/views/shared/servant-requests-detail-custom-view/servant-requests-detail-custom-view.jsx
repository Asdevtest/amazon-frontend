/* eslint-disable no-unused-vars */
import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {RequestProposalStatus} from '@constants/request-proposal-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {MultipleChats} from '@components/chat/multiple-chats'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {RequestDesignerResultClientForm} from '@components/forms/request-designer-result-client-form'
import {RequestDesignerResultForm} from '@components/forms/request-designer-result-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {RequestResultModal} from '@components/modals/request-result-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {CustomSearchRequestDetails} from '@components/requests-and-request-proposals/requests/requests-details/custom-request-details'
import {ServantGeneralRequestInfo} from '@components/requests-and-request-proposals/servant-general-request-info'

import {t} from '@utils/translations'

import {ChatRequestAndRequestProposalContext} from '@contexts/chat-request-and-request-proposal-context'

import {RequestDetailCustomViewModel} from './servant-requests-detail-custom-view.model'
import {styles} from './servant-requests-detail-custom-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS

const requestProposalCancelAllowedStatuses = [
  RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED,
  RequestProposalStatus.READY_TO_VERIFY,
  RequestProposalStatus.TO_CORRECT,
  RequestProposalStatus.CORRECTED,
]

@observer
export class RequestDetailCustomViewRaw extends Component {
  viewModel = new RequestDetailCustomViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  componentWillUnmount() {
    this.viewModel.resetChats()
  }

  render() {
    const {classes: classNames} = this.props
    const {
      curResultMedia,
      showProgress,
      typingUsers,
      drawerOpen,
      request,
      showWarningModal,
      showConfirmModal,
      warningInfoModalSettings,
      chats,
      userInfo,
      chatSelectedId,
      chatIsConnected,
      requestProposals,
      showRequestResultModal,
      showRequestDesignerResultModal,
      showRequestDesignerResultClientModal,
      onClickChat,
      onSubmitMessage,
      onTriggerDrawerOpen,
      onTriggerOpenModal,
      onClickBackBtn,
      onSubmitOfferDeal,
      onClickSendAsResult,
      onClickCancelRequestProposal,
      onTypingMessage,
      onClickResultBtn,
      onClickReworkProposal,
      onClickOpenRequest,
    } = this.viewModel

    const findRequestProposalForCurChat =
      chatSelectedId && requestProposals?.find(requestProposal => requestProposal.proposal.chatId === chatSelectedId)

    return (
      <React.Fragment>
        <Navbar
          drawerOpen={drawerOpen}
          activeCategory={navbarActiveCategory}
          activeSubCategory={
            this.props.location.pathname.includes('my-proposals')
              ? navBarActiveSubCategory.SUB_NAVBAR_MY_PROPOSALS
              : navBarActiveSubCategory.SUB_NAVBAR_VACANT_REQUESTS
          }
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey.Request)} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.backBtnWrapper}>
                <Button variant="contained" color="primary" className={classNames.backBtn} onClick={onClickBackBtn}>
                  {t(TranslationKey.Back)}
                </Button>
              </div>

              {request && requestProposals ? (
                <div className={classNames.requestInfoWrapper}>
                  <ServantGeneralRequestInfo
                    requestProposals={requestProposals}
                    request={request}
                    onSubmit={onSubmitOfferDeal}
                  />
                </div>
              ) : null}

              {request ? (
                <div className={classNames.detailsWrapper}>
                  <CustomSearchRequestDetails request={request} isOpen={!chatSelectedId} />
                </div>
              ) : null}
              {chatIsConnected && chats?.length ? (
                <div className={classNames.chatWrapper}>
                  <ChatRequestAndRequestProposalContext.Provider
                    value={{
                      request,
                      requestProposal: findRequestProposalForCurChat,
                      requestProposals,
                    }}
                  >
                    <MultipleChats
                      chats={chats}
                      typingUsers={typingUsers}
                      userId={userInfo._id}
                      chatSelectedId={chatSelectedId}
                      chatMessageHandlers={{
                        onClickReworkProposal,
                        onClickOpenRequest,
                      }}
                      renderAdditionalButtons={(params, resetAllInputs) => (
                        <div className={classNames.additionalButtonsWrapper}>
                          {findRequestProposalForCurChat &&
                          requestProposalCancelAllowedStatuses.includes(
                            findRequestProposalForCurChat?.proposal?.status,
                          ) ? (
                            <Button danger onClick={() => onTriggerOpenModal('showConfirmModal')}>
                              {t(TranslationKey['Reject the deal'])}
                            </Button>
                          ) : (
                            <div />
                          )}

                          {((findRequestProposalForCurChat.proposal.sub &&
                            findRequestProposalForCurChat.proposal.sub._id === userInfo._id) ||
                            (!findRequestProposalForCurChat.proposal.sub &&
                              findRequestProposalForCurChat.proposal.createdBy._id === userInfo._id)) &&
                          (findRequestProposalForCurChat?.proposal?.status ===
                            RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED ||
                            findRequestProposalForCurChat?.proposal?.status === RequestProposalStatus.TO_CORRECT ||
                            findRequestProposalForCurChat?.proposal?.status ===
                              RequestProposalStatus.READY_TO_VERIFY) ? (
                            // ||
                            // findRequestProposalForCurChat.proposal.status ===
                            //   RequestProposalStatus.OFFER_CONDITIONS_REJECTED
                            // eslint-disable-next-line react/jsx-indent
                            <Button
                              // disabled={
                              //   !params.files.length &&
                              //   !params.message &&
                              //   `${request?.request?.typeTask}` !==
                              //     `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}`
                              // }
                              onClick={() => {
                                // onClickSendAsResult(params)
                                // resetAllInputs()

                                onClickResultBtn()
                              }}
                            >
                              {/* t(TranslationKey['Send as a result']) */ t(TranslationKey.Result)}
                            </Button>
                          ) : undefined}
                          {/* {findRequestProposalForCurChat?.proposal.status ===
                        RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED ? (
                          <Button onClick={onClickReadyToVerify}>Отправить на проверку</Button>
                        ) : undefined} */}
                        </div>
                      )}
                      updateData={this.viewModel.loadData}
                      onSubmitMessage={onSubmitMessage}
                      onClickChat={onClickChat}
                      onTypingMessage={onTypingMessage}
                    />
                  </ChatRequestAndRequestProposalContext.Provider>
                </div>
              ) : null}
            </MainContent>
          </Appbar>
        </Main>

        <WarningInfoModal
          isWarning={warningInfoModalSettings.isWarning}
          openModal={showWarningModal}
          setOpenModal={() => onTriggerOpenModal('showWarningModal')}
          title={warningInfoModalSettings.title}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningModal')
          }}
        />

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
            // onClickSendAsResult={onClickSendAsResult}
          />
        </Modal>

        <RequestResultModal
          request={request}
          openModal={showRequestResultModal}
          setOpenModal={() => onTriggerOpenModal('showRequestResultModal')}
          onClickSendAsResult={onClickSendAsResult}
        />

        <Modal
          missClickModalOn
          openModal={showRequestDesignerResultModal}
          setOpenModal={() => onTriggerOpenModal('showRequestDesignerResultModal')}
        >
          <RequestDesignerResultForm
            request={request}
            proposal={findRequestProposalForCurChat}
            setOpenModal={() => onTriggerOpenModal('showRequestDesignerResultModal')}
            onClickSendAsResult={onClickSendAsResult}
          />
        </Modal>

        <ConfirmationModal
          isWarning
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={t(TranslationKey['Reject the deal'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={onClickCancelRequestProposal}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />

        {showProgress && <CircularProgressWithLabel />}
      </React.Fragment>
    )
  }
}

export const RequestDetailCustomView = withStyles(RequestDetailCustomViewRaw, styles)
