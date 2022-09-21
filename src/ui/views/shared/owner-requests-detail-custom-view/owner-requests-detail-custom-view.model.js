import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'
import {UserRoleCodeMapForRoutes} from '@constants/user-roles'

import {ChatModel} from '@models/chat-model'
import {RequestModel} from '@models/request-model'
import {RequestProposalModel} from '@models/request-proposal'
import {UserModel} from '@models/user-model'

import {toFixed} from '@utils/text'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

export class OwnerRequestDetailCustomViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  uploadedFiles = []
  drawerOpen = false
  requestId = undefined
  request = undefined
  requestProposals = []

  showConfirmModal = false
  showRequestForm = false
  showConfirmWithCommentModal = false
  showChat = false
  showConfirmWorkResultFormModal = false
  showReviewModal = false

  confirmModalSettings = {
    isWarning: false,
    message: '',
    onSubmit: () => {},
  }

  acceptProposalResultSetting = {
    onSubmit: () => {},
  }

  chatSelectedId = undefined
  chatIsConnected = false
  scrollToChat = undefined
  showResultToCorrectFormModal = false

  get user() {
    return UserModel.userInfo
  }

  get typingUsers() {
    return ChatModel.typingUsers || []
  }

  get chats() {
    return ChatModel.chats || []
  }

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
    } catch (error) {
      console.warn(error)
    }
  }

  onTypingMessage(chatId) {
    ChatModel.typingMessage({chatId})
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
    this.acceptProposalResultSetting = {
      onSubmit: () => this.onClickProposalResultAcceptForm(proposalId),
    }
    this.onTriggerOpenModal('showConfirmWorkResultFormModal')
  }

  async onClickProposalResultAcceptForm(proposalId) {
    try {
      await RequestProposalModel.requestProposalResultAccept(proposalId)
      this.onTriggerOpenModal('showConfirmWorkResultFormModal')
      this.loadData()
    } catch (error) {
      console.warn('onClickProposalResultAccept error ', error)
    }
  }

  async onClickProposalResultToCorrect() {
    this.triggerShowResultToCorrectFormModal()
  }

  async onPressSubmitRequestProposalResultToCorrectForm(formFields, files) {
    this.triggerShowResultToCorrectFormModal()
    try {
      this.uploadedFiles = []
      if (files.length) {
        await onSubmitPostImages.call(this, {images: files, type: 'uploadedFiles'})
      }
      const findProposalByChatId = this.requestProposals.find(
        requestProposal => requestProposal.proposal.chatId === this.chatSelectedId,
      )
      if (!findProposalByChatId) {
        return
      }
      await RequestProposalModel.requestProposalResultToCorrect(findProposalByChatId.proposal._id, {
        ...formFields,
        timeLimitInMinutes: parseInt(formFields.timeLimitInMinutes),
        linksToMediaFiles: this.uploadedFiles,
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

  async onClickContactWithExecutor(proposal) {
    this.chatSelectedId = proposal.chatId
    if (this.scrollToChat) {
      this.scrollToChat()
    }
    this.showChat = true
  }

  onClickHideChat() {
    this.showChat = false
  }

  async onClickAcceptProposal(proposalId) {
    try {
      await RequestProposalModel.requestProposalAccept(proposalId)
      await this.getCustomRequestCur()
      await this.getCustomProposalsForRequestCur()

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickReview() {
    this.onTriggerOpenModal('showReviewModal')
  }

  onClickOrderProposal(proposalId, price) {
    this.confirmModalSettings = {
      isWarning: false,
      message: `${t(TranslationKey['After confirmation from your account will be frozen'])} ${toFixed(price, 2)} $. ${t(
        TranslationKey.Continue,
      )} ?`,
      onSubmit: () => this.onClickAcceptProposal(proposalId),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickRejectProposal(proposalId) {
    this.curProposalId = proposalId

    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Reject the proposal']),
      onSubmit: () => this.onSubmitRejectProposal(),
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitRejectProposal() {
    try {
      await RequestProposalModel.requestProposalReject(this.curProposalId)

      this.onTriggerOpenModal('showConfirmModal')
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
        message: `${t(TranslationKey['The exact cost of the request will be:'])} ${toFixed(result.totalCost, 2)} $. ${t(
          TranslationKey['Confirm the publication?'],
        )}`,
        onSubmit: () => this.toPublishRequest(result.totalCost),
      }

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickEditBtn() {
    this.history.push(
      `/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/my-requests/custom-request/edit-request`,
      {request: toJS(this.request)},
    )
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
      message: t(TranslationKey['Delete request?']),
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
