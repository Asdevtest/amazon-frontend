import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { freelanceRequestType, freelanceRequestTypeByKey } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { AnnouncementsModel } from '@models/announcements-model'
import { ChatModel } from '@models/chat-model'
import { ClientModel } from '@models/client-model'
import { FeedbackModel } from '@models/feedback-model'
import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { getLocalToUTCDate } from '@utils/date-time'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'

export class OwnerRequestDetailCustomViewModel {
  history = undefined
  requestStatus = undefined
  uploadedFiles = []
  requestId = undefined
  request = undefined
  requestProposals = []
  requestAnnouncement = undefined
  curResultMedia = []
  currentReviewModalUser = undefined
  findRequestProposalForCurChat = undefined
  showConfirmModal = false
  showRequestForm = false
  showConfirmWithCommentModal = false
  showChat = false
  showConfirmWorkResultFormModal = false
  showRequestDesignerResultClientModal = false
  showReviewModal = false
  showResultToCorrectFormModal = false
  showGalleryModal = false
  readOnlyRequestDesignerResultClientForm = true
  productMedia = undefined
  confirmModalSettings = {
    isWarning: false,
    message: '',
    smallMessage: '',
    onSubmit: () => {
      this.showConfirmModal = false
      this.showConfirmWithCommentModal = false
    },
  }
  acceptProposalResultSetting = {
    onSubmit: () => {},
  }
  chatSelectedId = undefined
  chatIsConnected = false
  scrollToChat = undefined
  showMainRequestResultModal = false
  mesSearchValue = ''
  messagesFound = []
  curFoundedMessage = undefined

  get isMuteChats() {
    return SettingsModel.isMuteChats
  }
  get mutedChats() {
    return SettingsModel.mutedChats
  }
  get userInfo() {
    return UserModel.userInfo
  }
  get typingUsers() {
    return ChatModel.typingUsers
  }
  get chats() {
    return ChatModel.chats
  }
  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor({ history, scrollToChat }) {
    this.history = history

    const url = new URL(window.location.href)

    this.requestId = url.searchParams.get('request-id')
    this.scrollToChat = scrollToChat

    const chatId = url.searchParams.get('chatId')

    if (chatId) {
      this.chatSelectedId = chatId
      this.showChat = true
    }

    reaction(
      () => this.chatSelectedId,
      () => {
        this.mesSearchValue = ''
        ChatModel.onChangeChatSelectedId(this.chatSelectedId)
      },
    )

    reaction(
      () => this.mesSearchValue,
      () => {
        if (this.mesSearchValue && this.chatSelectedId) {
          const mesAr = this.chats
            .find(el => el._id === this.chatSelectedId)
            .messages.filter(mes => mes.text?.toLowerCase().includes(this.mesSearchValue.toLowerCase()))

          this.messagesFound = mesAr

          setTimeout(() => this.onChangeCurFoundedMessage(mesAr.length - 1), 0)
        } else {
          this.curFoundedMessage = undefined

          this.messagesFound = []
        }
      },
    )

    makeAutoObservable(this, undefined, { autoBind: true })

    try {
      if (ChatModel.isConnected) {
        ChatModel.getChats(this.requestId, 'REQUEST')

        this.chatIsConnected = ChatModel.isConnected
      } else {
        reaction(
          () => ChatModel.isConnected,
          isConnected => {
            if (isConnected) {
              ChatModel.getChats(this.requestId, 'REQUEST')

              this.chatIsConnected = isConnected
            }
          },
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  onTypingMessage(chatId) {
    ChatModel.typingMessage({ chatId })
  }

  loadData() {
    this.getCustomRequestCur()
    this.getCustomProposalsForRequestCur()
    this.getAnnouncementsByGuid(this.request?.request?.announcementId)
  }

  onChangeCurFoundedMessage(index) {
    this.curFoundedMessage = this.messagesFound[index]
  }

  onChangeMesSearchValue(e) {
    this.mesSearchValue = e.target.value
  }

  onCloseMesSearchValue() {
    this.mesSearchValue = ''
  }

  onToggleMuteCurrentChat() {
    SettingsModel.onToggleMuteCurrentChat(this.chatSelectedId, this.chats)
  }

  onToggleMuteAllChats() {
    SettingsModel.onToggleMuteAllChats(this.chats)
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
      console.error(error)
    }
  }

  async onSubmitMessage(message, files, chatIdId, replyMessageId) {
    try {
      await ChatModel.sendMessage({
        crmItemId: this.requestId,
        chatId: chatIdId,
        text: message,
        files,
        user: {
          name: UserModel.userInfo.name,
          _id: UserModel.userInfo._id,
        },
        ...(replyMessageId && { replyMessageId }),
      })
    } catch (error) {
      console.error('onSubmitMessage error ', error)
    }
  }

  onClickProposalResultAccept(proposalId) {
    this.findRequestProposalForCurChat = this.requestProposals.find(
      requestProposal => requestProposal.proposal._id === proposalId,
    )

    this.acceptProposalResultSetting = {
      onSubmit: data => this.onClickProposalResultAcceptForm(proposalId, data),
    }

    this.onTriggerOpenModal('showConfirmWorkResultFormModal')

    this.readOnlyRequestDesignerResultClientForm = true
  }

  onReadOnlyRequestDesignerResultClientForm() {
    this.readOnlyRequestDesignerResultClientForm = true
  }

  async onClickProposalResultAcceptForm(proposalId, data) {
    try {
      const id =
        this.findRequestProposalForCurChat?.proposal?.sub?._id ||
        this.findRequestProposalForCurChat?.proposal?.createdBy?._id
      await RequestProposalModel.requestProposalResultAccept(proposalId, data)
      await FeedbackModel.sendFeedback(id, {
        rating: data.rating,
        comment: data.review,
      })

      this.getCustomProposalsForRequestCur()

      this.onTriggerOpenModal('showConfirmWorkResultFormModal')
    } catch (error) {
      console.error(error)
    }
  }

  onClickProposalResultToCorrect() {
    if (this.request.request.spec?.type === freelanceRequestTypeByKey[freelanceRequestType.DESIGNER]) {
      this.onTriggerOpenModal('showRequestDesignerResultClientModal')
      this.readOnlyRequestDesignerResultClientForm = false
    } else if (this.request.request.spec?.type === freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]) {
      this.onTriggerOpenModal('showResultToCorrectFormModal')
    } else {
      this.onTriggerOpenModal('showMainRequestResultModal')
    }
  }

  async onPressSubmitDesignerResultToCorrect({ reason, timeLimitInMinutes, imagesData }) {
    try {
      const findProposalByChatId = this.requestProposals.find(
        requestProposal => requestProposal.proposal.chatId === this.chatSelectedId,
      )
      if (!findProposalByChatId) {
        return
      }
      await RequestProposalModel.requestProposalResultToCorrect(findProposalByChatId.proposal._id, {
        reason,
        timeLimitInMinutes: parseInt(timeLimitInMinutes),
        // linksToMediaFiles: this.uploadedFiles,
        media: imagesData.map(el => ({ _id: el._id, commentByClient: el.commentByClient })),
      })
      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  onSubmitSendInForReworkInProposalResultAccept({ reason, timeLimitInMinutes, imagesData }) {
    this.confirmModalSettings = {
      isWarning: false,
      message: t(TranslationKey['Are you sure you want to send the result for rework?']),
      onSubmit: () => {
        this.onTriggerOpenModal('showConfirmModal')
        this.onPressSubmitDesignerResultToCorrect({
          reason,
          timeLimitInMinutes,
          imagesData,
        })
        this.onTriggerOpenModal('showRequestDesignerResultClientModal')
        this.readOnlyRequestDesignerResultClientForm = true
      },
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async getCustomProposalsForRequestCur() {
    try {
      const response = await RequestProposalModel.getRequestProposalsCustomByRequestId(this.requestId)

      runInAction(() => {
        this.requestProposals = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getAnnouncementsByGuid(guid) {
    try {
      if (guid) {
        const result = await AnnouncementsModel.getAnnouncementsByGuid({ guid })

        runInAction(() => {
          this.requestAnnouncement = result
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  async toPublishRequest(totalCost) {
    try {
      await RequestModel.toPublishRequest(this.requestId, { totalCost })

      this.onTriggerOpenModal('showConfirmModal')

      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  onClickContactWithExecutor(proposal) {
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

      this.getCustomRequestCur()
      this.getCustomProposalsForRequestCur()

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  onClickReview(user) {
    this.currentReviewModalUser = user
    this.onTriggerOpenModal('showReviewModal')
  }

  onClickOpenRequest(media) {
    this.curResultMedia = media

    this.onTriggerOpenModal('showRequestDesignerResultClientModal')
    this.getCustomProposalsForRequestCur()
  }

  onClickOrderProposal(proposalId, price) {
    this.confirmModalSettings = {
      isWarning: false,
      message: `${t(TranslationKey['After confirmation from your account will be frozen'])} ${toFixed(
        price + price * (this.platformSettings?.requestPlatformMarginInPercent / 100),
        2,
      )} $. ${t(TranslationKey.Continue)} ?`,
      smallMessage: `${t(TranslationKey['This amount includes the service fee'])} ${
        this.platformSettings?.requestPlatformMarginInPercent
      }% (${toFixed(price * (this.platformSettings?.requestPlatformMarginInPercent / 100), 2)}$)`,
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

      this.getCustomRequestCur()
      this.getCustomProposalsForRequestCur()
    } catch (error) {
      console.error(error)
    }
  }

  async onClickPublishBtn() {
    try {
      const result = await RequestModel.calculateRequestCost(this.requestId)

      runInAction(() => {
        this.confirmModalSettings = {
          isWarning: false,
          message: `${t(TranslationKey['The exact cost of the request will be:'])} ${toFixed(
            result.totalCost,
            2,
          )} $. ${t(TranslationKey['Confirm the publication?'])}`,
          onSubmit: () => {
            this.toPublishRequest(result.totalCost)
            this.confirmModalSettings.message = ''
          },
        }
      })

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  onClickEditBtn() {
    this.history.push(
      `/${UserRoleCodeMapForRoutes[this.userInfo.role]}/freelance/my-requests/custom-request/edit-request`,
    )
  }

  onClickIdeaId(ideaId) {
    this.history.push(`/${UserRoleCodeMapForRoutes[this.userInfo.role]}/ideas/all?ideaId=${ideaId}`)
  }

  async onSubmitAbortRequest(comment) {
    try {
      await RequestModel.abortRequest(this.requestId, { reason: comment })

      this.onTriggerOpenModal('showConfirmWithCommentModal')

      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  onClickAbortBtn() {
    this.onTriggerOpenModal('showConfirmWithCommentModal')
  }

  async onDeleteRequest() {
    try {
      await RequestModel.deleteRequest(this.requestId)

      this.onTriggerOpenModal('showConfirmModal')

      this.history.push(`/${UserRoleCodeMapForRoutes[this.userInfo.role]}/freelance/my-requests`)
    } catch (error) {
      console.error(error)
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

  async onMarkAsCompletedRequest() {
    try {
      await RequestModel.manualCompletedRequest(this.requestId)

      this.onTriggerOpenModal('showConfirmModal')

      this.getCustomRequestCur()
      this.getCustomProposalsForRequestCur()
    } catch (error) {
      console.error(error)
    }
  }

  onClickMarkAsCompletedBtn() {
    this.confirmModalSettings = {
      isWarning: false,
      message: `${t(TranslationKey['Mark as completed'])}?`,
      onSubmit: () => this.onMarkAsCompletedRequest(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitEditCustomSearchRequest(data, requestId) {
    try {
      await this.editCustomSearchRequest(data, requestId)

      this.onTriggerOpenModal('showRequestForm')
      this.getCustomRequestById()
    } catch (error) {
      console.error(error)
    }
  }

  async onToggleUploadedToListing(id, uploadedToListingState) {
    try {
      await RequestModel.patchRequestsUploadedToListing({
        requestIds: [id],
        uploadedToListing: !uploadedToListingState,
      })

      await this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  resetChats() {
    ChatModel.resetChats()
  }

  async onRecoverRequest(timeoutAt, maxAmountOfProposals) {
    this.setRequestStatus(loadingStatus.IS_LOADING)
    await RequestModel.updateDeadline(this.requestId, getLocalToUTCDate(timeoutAt), maxAmountOfProposals)

    this.getCustomRequestCur()
    this.getCustomProposalsForRequestCur()

    this.setRequestStatus(loadingStatus.SUCCESS)
  }

  async onSendInForRework(id, fields) {
    try {
      await RequestProposalModel.requestProposalResultToCorrect(id, fields)

      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async onPressSubmitRequestProposalResultToCorrectForm(formFields, files) {
    this.onTriggerOpenModal('showResultToCorrectFormModal')

    try {
      if (files.length) {
        await onSubmitPostImages.call(this, { images: files, type: 'uploadedFiles' })
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
      console.error(error)
    }
  }

  onSubmitSendInForReworkInRequestProposalResultToCorrectForm(formFields, files) {
    this.confirmModalSettings = {
      isWarning: false,
      message: t(TranslationKey['Are you sure you want to send the result for rework?']),
      onSubmit: () => {
        this.onTriggerOpenModal('showConfirmModal')
        this.onPressSubmitRequestProposalResultToCorrectForm(formFields, files)
      },
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async getProductMediaById(id) {
    try {
      const response = await ClientModel.getProductMediaById(id)

      runInAction(() => {
        this.productMedia = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickAddMediaFromProduct(id) {
    if (id) {
      await this.getProductMediaById(id)
    } else {
      toast.warning(t(TranslationKey['Product not selected!']))
    }

    if (this.productMedia) {
      this.onTriggerOpenModal('showGalleryModal')
    }
  }

  async sendFilesToChat(filesToAdd) {
    const user = {
      _id: UserModel.userInfo._id,
      name: UserModel.userInfo.name,
    }

    const files = filesToAdd.map(file => file?.fileLink)

    const messageParams = {
      chatId: this.chatSelectedId,
      files,
      user,
      text: '',
    }

    ChatModel.sendMessage(messageParams)
  }
}
