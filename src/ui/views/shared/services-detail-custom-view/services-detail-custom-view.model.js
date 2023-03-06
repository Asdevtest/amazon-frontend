import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {UserRoleCodeMapForRoutes} from '@constants/user-roles'

import {ChatModel} from '@models/chat-model'
import {RequestModel} from '@models/request-model'
import {RequestProposalModel} from '@models/request-proposal'

export class ServicesDetailCustomViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  requestId = undefined
  request = undefined
  requestProposals = undefined
  showWarningModal = false
  showConfirmModal = false

  loadedFiles = []

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  constructor({history, location}) {
    runInAction(() => {
      this.history = history

      if (location.state) {
        this.requestId = location.state.requestId
      }
    })
    makeAutoObservable(this, undefined, {autoBind: true})
    try {
      if (ChatModel.isConnected) {
        ChatModel.getChats(this.requestId, 'REQUEST')
        runInAction(() => {
          this.chatIsConnected = ChatModel.isConnected
        })
      } else {
        reaction(
          () => ChatModel.isConnected,
          isConnected => {
            if (isConnected) {
              ChatModel.getChats(this.requestId, 'REQUEST')
              runInAction(() => {
                this.chatIsConnected = isConnected
              })
            }
          },
        )
      }
    } catch (error) {
      console.warn(error)
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getCustomRequestById()
      await this.getRequestProposals()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getCustomRequestById() {
    try {
      const result = await RequestModel.getCustomRequestById(this.requestId)

      runInAction(() => {
        this.request = result
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async getRequestProposals() {
    try {
      const result = await RequestProposalModel.getRequestProposalsCustomByRequestId(this.requestId)

      runInAction(() => {
        this.requestProposals = result
      })
    } catch (error) {
      runInAction(() => {
        this.requestProposals = []
      })

      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onClickReadyToVerify() {
    try {
      const findRequestProposalByChatSelectedId = this.requestProposals.find(
        requestProposal => requestProposal.proposal.chatId === this.chatSelectedId,
      )
      if (!findRequestProposalByChatSelectedId) {
        return
      }
      await RequestProposalModel.onClickReadyToVerify(findRequestProposalByChatSelectedId.proposal._id)
      await this.getRequestProposals()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onClickCancelRequestProposal() {
    try {
      const findRequestProposalByChatSelectedId = this.requestProposals.find(
        requestProposal => requestProposal.proposal.chatId === this.chatSelectedId,
      )
      if (!findRequestProposalByChatSelectedId) {
        return
      }
      await RequestProposalModel.requestProposalCancel(findRequestProposalByChatSelectedId.proposal._id)
      await this.getRequestProposals()

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }
  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onClickBackBtn() {
    this.history.goBack()
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }

  onSubmitOfferDeal() {
    this.history.push(
      `/${
        UserRoleCodeMapForRoutes[this.userInfo.role]
      }/freelance/vacant-requests/custom-search-request/create-proposal`,
      {request: toJS(this.request)},
    )
  }

  resetChats() {
    ChatModel.resetChats()
  }
}
