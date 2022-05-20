import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ChatModel} from '@models/chat-model'
import {RequestModel} from '@models/request-model'
import {RequestProposalModel} from '@models/request-proposal'
import {UserModel} from '@models/user-model'

import {toFixed} from '@utils/text'

export class OwnerRequestDetailCustomViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  requestId = undefined
  request = undefined
  requestProposals = []

  showConfirmModal = false
  showRequestForm = false
  showConfirmWithCommentModal = false

  confirmModalSettings = {
    isWarning: false,
    message: '',
    onSubmit: () => {},
  }

  chatSelectedId = undefined
  chatIsConnected = false
  scrollToChat = undefined
  showResultToCorrectFormModal = false

  constructor({history, location, scrollToChat}) {
    this.history = history
    this.scrollToChat = scrollToChat
    if (location.state) {
      this.requestId = location.state.request._id
    }
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

      this.getCustomRequestCur()
      this.getCustomProposalsForRequestCur()

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

  async getCustomRequestCur() {
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

  async onSubmitMessage(message, links, files, chatIdId) {
    try {
      console.log('files ', files)

      await ChatModel.sendMessage({
        chatId: chatIdId,
        text: message,
        files: files?.map(item => item?.file),
      })
    } catch (error) {
      console.warn('onSubmitMessage error ', error)
    }
  }

  async onClickProposalResultAccept(proposalId) {
    try {
      await RequestProposalModel.requestProposalResultAccept(proposalId)
      this.loadData()
    } catch (error) {
      console.warn('onClickProposalResultAccept error ', error)
    }
  }

  async onClickProposalResultToCorrect() {
    this.triggerShowResultToCorrectFormModal()
  }

  async onPressSubmitRequestProposalResultToCorrectForm(formFields) {
    this.triggerShowResultToCorrectFormModal()
    try {
      const findProposalByChatId = this.requestProposals.find(
        requestProposal => requestProposal.proposal.chatId === this.chatSelectedId,
      )
      if (!findProposalByChatId) {
        return
      }
      await RequestProposalModel.requestProposalResultToCorrect(findProposalByChatId.proposal._id, {
        ...formFields,
        timeLimitInMinutes: parseInt(formFields.timeLimitInMinutes),
      })
      this.loadData()
    } catch (error) {
      console.warn('onClickProposalResultToCorrect error ', error)
    }
  }

  async getCustomProposalsForRequestCur() {
    try {
      const result = await RequestProposalModel.getRequestProposalsCustomByRequestId(this.requestId)

      runInAction(() => {
        this.requestProposals = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async toPublishRequest(totalCost) {
    try {
      await RequestModel.toPublishRequest(this.requestId, {totalCost})

      this.onTriggerOpenModal('showConfirmModal')

      this.loadData()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickContactWithExecutor(proposal) {
    this.chatSelectedId = proposal.chatId
    if (this.scrollToChat) {
      this.scrollToChat()
    }
  }

  async onClickAcceptProposal(proposalId) {
    try {
      await RequestProposalModel.requestProposalAccept(proposalId)
      await this.getCustomRequestCur()
      await this.getCustomProposalsForRequestCur()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onClickRejectProposal(proposalId) {
    try {
      await RequestProposalModel.requestProposalReject(proposalId)
      await this.getCustomRequestCur()
      await this.getCustomProposalsForRequestCur()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onClickPublishBtn() {
    try {
      const result = await RequestModel.calculateRequestCost(this.requestId)

      this.confirmModalSettings = {
        isWarning: false,
        message: `Точная стоимость заявки составит: ${toFixed(result.totalCost, 2)} $. Подтвердить публикацию?`,
        onSubmit: () => this.toPublishRequest(result.totalCost),
      }

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickEditBtn() {
    this.history.push('/create-or-edit-request', {request: toJS(this.request)})
  }

  async onSubmitAbortRequest(comment) {
    try {
      await RequestModel.abortRequest(this.requestId, {reason: comment})

      this.onTriggerOpenModal('showConfirmWithCommentModal')

      this.loadData()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickAbortBtn() {
    this.onTriggerOpenModal('showConfirmWithCommentModal')
  }

  async onDeleteRequest() {
    try {
      await RequestModel.deleteRequest(this.requestId)

      this.onTriggerOpenModal('showConfirmModal')

      this.history.goBack()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickCancelBtn() {
    this.confirmModalSettings = {
      isWarning: true,
      message: `Удалить заявку?`,
      onSubmit: () => this.onDeleteRequest(),
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitEditCustomSearchRequest(data, requestId) {
    try {
      await this.editCustomSearchRequest(data, requestId)

      this.onTriggerOpenModal('showRequestForm')
      this.getCustomRequestById()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  triggerShowResultToCorrectFormModal() {
    this.showResultToCorrectFormModal = !this.showResultToCorrectFormModal
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  resetChats() {
    ChatModel.resetChats()
  }
}
