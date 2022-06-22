import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {RequestProposalStatus} from '@constants/request-proposal-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button/error-button'
import {MultipleChats} from '@components/chat/multiple-chats'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {CustomSearchRequestDetails} from '@components/requests-and-request-proposals/requests/requests-details/custom-request-details'
import {ServantGeneralRequestInfo} from '@components/requests-and-request-proposals/servant-general-request-info'

import {t} from '@utils/translations'

import {RequestDetailCustomViewModel} from './servant-requests-detail-custom-view.model'
import {styles} from './servant-requests-detail-custom-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_VACANT_REQUESTS

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
      drawerOpen,
      request,
      showWarningModal,
      warningInfoModalSettings,
      chats,
      userInfo,
      chatSelectedId,
      chatIsConnected,
      requestProposals,
      onClickChat,
      onSubmitMessage,
      onTriggerDrawerOpen,
      onTriggerOpenModal,
      onClickBackBtn,
      onSubmitOfferDeal,
      onClickSendAsResult,
      onClickCancelRequestProposal,
    } = this.viewModel

    const findRequestProposalByChatSelectedId = requestProposals?.find(
      requestProposal => requestProposal.proposal.chatId === chatSelectedId,
    )

    return (
      <React.Fragment>
        <Navbar
          drawerOpen={drawerOpen}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
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
                  <CustomSearchRequestDetails request={request} />
                </div>
              ) : null}
              {chatIsConnected && chats?.length ? (
                <div className={classNames.chatWrapper}>
                  <MultipleChats
                    chats={chats}
                    userId={userInfo._id}
                    chatSelectedId={chatSelectedId}
                    chatMessageHandlers={{}}
                    renderAdditionalButtons={(params, resetAllInputs) => (
                      <div className={classNames.additionalButtonsWrapper}>
                        {findRequestProposalByChatSelectedId &&
                        requestProposalCancelAllowedStatuses.includes(
                          findRequestProposalByChatSelectedId.proposal.status,
                        ) ? (
                          <ErrorButton onClick={onClickCancelRequestProposal}>Отменить сделку</ErrorButton>
                        ) : (
                          <div />
                        )}
                        {findRequestProposalByChatSelectedId.proposal.status ===
                          RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED ||
                        findRequestProposalByChatSelectedId.proposal.status === RequestProposalStatus.TO_CORRECT ? (
                          <Button
                            disabled={!params.links.length && !params.files.length && !params.message}
                            onClick={() => {
                              onClickSendAsResult(params)
                              resetAllInputs()
                            }}
                          >
                            Отправить как результат
                          </Button>
                        ) : undefined}
                        {/* {findRequestProposalByChatSelectedId?.proposal.status ===
                        RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED ? (
                          <Button onClick={onClickReadyToVerify}>Отправить на проверку</Button>
                        ) : undefined} */}
                      </div>
                    )}
                    updateData={this.viewModel.loadData}
                    onSubmitMessage={onSubmitMessage}
                    onClickChat={onClickChat}
                  />
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
      </React.Fragment>
    )
  }
}

export const RequestDetailCustomView = withStyles(styles)(RequestDetailCustomViewRaw)
