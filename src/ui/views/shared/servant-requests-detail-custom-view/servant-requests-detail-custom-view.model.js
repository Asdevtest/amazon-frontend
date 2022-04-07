import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ChatModel} from '@models/chat-model'
// import {texts} from '@constants/texts'
import {RequestModel} from '@models/request-model'
import {UserModel} from '@models/user-model'

// import {getLocalizedTexts} from '@utils/get-localized-texts'

// const textConsts = getLocalizedTexts(texts, 'ru').CustomRequestView

export class RequestDetailCustomViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  requestId = undefined
  request = undefined
  requestProposals = []
  showWarningModal = false

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  chatSelectedId = undefined
  chatIsConnected = false

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      this.requestId = location.state.requestId
    }
    makeAutoObservable(this, undefined, {autoBind: true})
    try {
      if (ChatModel.isConnected) {
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
      ChatModel.init()
    } catch (error) {
      console.warn(error)
    }
  }

  get chats() {
    return ChatModel.chats || []
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.getCustomRequestById()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  get userInfo() {
    return UserModel.userInfo || {}
  }

  onClickChat(chat) {
    if (this.chatSelectedId === chat._id) {
      this.chatSelectedId = undefined
    } else {
      this.chatSelectedId = chat._id
    }
  }

  async onSubmitMessage(message, chatIdId) {
    try {
      await ChatModel.sendMessage({
        chatId: chatIdId,
        text: message,
      })
    } catch (error) {
      console.warn('onSubmitMessage error ', error)
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
      this.error = error
    }
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onClickBackBtn() {
    this.history.goBack()
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onSubmitOfferDeal() {
    this.history.push('/create-or-edit-proposal', {request: toJS(this.request)})
  }

  // async onSubmitRequestProposalForm(formFields) {
  //   try {
  //     const result = this.requestProposal
  //       ? await RequestProposalModel.updateRequestProposalCustom(this.requestProposal.proposal._id, formFields)
  //       : await RequestProposalModel.createRequestProposalCustom(this.request.request._id, formFields)

  //     this.getCustomRequestProposalsByRequestId(result?.guid || this.requestProposal.proposal._id)

  //     this.warningInfoModalSettings = {
  //       isWarning: false,
  //       title: textConsts.successTitle,
  //     }

  //     this.onTriggerOpenModal('showWarningModal')
  //     // this.history.goBack()
  //   } catch (error) {
  //     console.log(error)
  //     this.error = error

  //     this.warningInfoModalSettings = {
  //       isWarning: true,
  //       title: textConsts.failTitle,
  //     }

  //     this.onTriggerOpenModal('showWarningModal')
  //   }
  // }
}
