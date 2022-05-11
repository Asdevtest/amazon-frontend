import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {RequestProposalStatus} from '@constants/request-proposal-status'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {MultipleChats} from '@components/chat/multiple-chats'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {CustomSearchRequestDetails} from '@components/requests-and-request-proposals/requests/requests-details/custom-request-details'
import {ServantGeneralRequestInfo} from '@components/requests-and-request-proposals/servant-general-request-info'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {RequestDetailCustomViewModel} from './servant-requests-detail-custom-view.model'
import {styles} from './servant-requests-detail-custom-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').CustomRequestView

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
      onClickReadyToVerify,
    } = this.viewModel

    const findRequestProposalByChatSelectedId = requestProposals.find(
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
          <Appbar title={textConsts.appBarTitle} notificationCount={2} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.backBtnWrapper}>
                <Button variant="contained" color="primary" onClick={onClickBackBtn}>
                  {'Назад'}
                </Button>
              </div>

              {request ? (
                <div className={classNames.requestInfoWrapper}>
                  <ServantGeneralRequestInfo request={request} onSubmit={onSubmitOfferDeal} />
                </div>
              ) : null}

              {request ? (
                <div className={classNames.detailsWrapper}>
                  <CustomSearchRequestDetails request={request} />
                </div>
              ) : null}
              {chatIsConnected ? (
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
                          <Button
                            className={classNames.cancelRequestProposalBtn}
                            onClick={onClickCancelRequestProposal}
                          >
                            Отменить сделку
                          </Button>
                        ) : (
                          <div />
                        )}
                        {findRequestProposalByChatSelectedId.proposal.status !==
                        RequestProposalStatus.ACCEPTED_BY_CLIENT ? (
                          <Button
                            onClick={() => {
                              if (!params.message) {
                                alert('Сообщение не может быть пустым')
                              }
                              onClickSendAsResult(params)
                              resetAllInputs()
                            }}
                          >
                            Отправить как результат
                          </Button>
                        ) : undefined}
                        {findRequestProposalByChatSelectedId?.status ===
                        RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED ? (
                          <Button onClick={onClickReadyToVerify}>Отправить на проверку</Button>
                        ) : undefined}
                      </div>
                    )}
                    onSubmitMessage={onSubmitMessage}
                    onClickChat={onClickChat}
                  />
                </div>
              ) : undefined}
            </MainContent>
          </Appbar>
        </Main>

        <WarningInfoModal
          isWarning={warningInfoModalSettings.isWarning}
          openModal={showWarningModal}
          setOpenModal={() => onTriggerOpenModal('showWarningModal')}
          title={warningInfoModalSettings.title}
          btnText={textConsts.okBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningModal')
          }}
        />
      </React.Fragment>
    )
  }
}

export const RequestDetailCustomView = withStyles(styles)(RequestDetailCustomViewRaw)
