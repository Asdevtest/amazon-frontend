import { makeAutoObservable, reaction, runInAction } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { freelanceRequestType, freelanceRequestTypeByKey } from '@constants/statuses/freelance-request-type'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AnnouncementsModel } from '@models/announcements-model'
import { ChatModel } from '@models/chat-model'
import { FeedbackModel } from '@models/feedback-model'
import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

export class OwnerRequestDetailCustomViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  uploadedFiles = []
  requestId = undefined
  request = undefined
  requestProposals = []
  requestAnnouncement = undefined
  curResultMedia = []
  currentReviews = []
  currentReviewModalUser = undefined

  showAcceptMessage = undefined
  acceptMessage = undefined

  platformSettings = null

  showConfirmModal = false
  showRequestForm = false
  showConfirmWithCommentModal = false
  showChat = false
  showConfirmWorkResultFormModal = false
  showRequestDesignerResultClientModal = false
  showReviewModal = false

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
  showResultToCorrectFormModal = false

  alertShieldSettings = {
    showAlertShield: false,
    alertShieldMessage: '',
  }

  mesSearchValue = ''
  messagesFound = []
  curFoundedMessage = undefined

  get isMuteChats() {
    return SettingsModel.isMuteChats
  }

  get mutedChats() {
    return SettingsModel.mutedChats
  }

  get user() {
    return UserModel.userInfo
  }

  get typingUsers() {
    return ChatModel.typingUsers || []
  }

  get chats() {
    return ChatModel.chats || []
  }

  get findRequestProposalForCurChat() {
    return (
      this.chatSelectedId &&
      this.requestProposals.find(requestProposal => requestProposal.proposal.chatId === this.chatSelectedId)
    )
  }

  constructor({ history, location, scrollToChat }) {
    const url = new URL(window.location.href)

    runInAction(() => {
      this.requestId = url.searchParams.get('request-id')
    })

    runInAction(() => {
      this.history = history
      this.scrollToChat = scrollToChat
      if (location.state) {
        if (location.state.chatId) {
          this.chatSelectedId = location.state.chatId
          this.showChat = true
        }

        this.alertShieldSettings = {
          showAlertShield: location?.state?.showAcceptMessage,
          alertShieldMessage: location?.state?.acceptMessage,
        }

        const state = { ...history.location.state }
        delete state.chatId
        delete state.acceptMessage
        delete state.showAcceptMessage
        history.replace({ ...history.location, state })
      }
    })

    reaction(
      () => this.chatSelectedId,
      () => {
        runInAction(() => {
          this.mesSearchValue = ''
          ChatModel.onChangeChatSelectedId(this.chatSelectedId)
        })
      },
    )

    reaction(
      () => this.mesSearchValue,
      () => {
        runInAction(() => {
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
        })
      },
    )

    makeAutoObservable(this, undefined, { autoBind: true })
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

    runInAction(() => {
      if (this.alertShieldSettings.showAlertShield) {
        setTimeout(() => {
          this.alertShieldSettings = {
            ...this.alertShieldSettings,
            showAlertShield: false,
          }

          setTimeout(() => {
            this.alertShieldSettings = {
              showAlertShield: false,
              alertShieldMessage: '',
            }
          }, 1000)
        }, 3000)
      }
    })
  }

  onTypingMessage(chatId) {
    ChatModel.typingMessage({ chatId })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getCustomRequestCur()
      await this.getCustomProposalsForRequestCur()
      await this.getAnnouncementsByGuid(this.request?.request?.announcementId)

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  get userInfo() {
    return UserModel.userInfo || {}
  }

  onChangeCurFoundedMessage(index) {
    runInAction(() => {
      this.curFoundedMessage = this.messagesFound[index]
    })
  }

  onChangeMesSearchValue(e) {
    runInAction(() => {
      this.mesSearchValue = e.target.value
    })
  }

  onCloseMesSearchValue() {
    runInAction(() => {
      this.mesSearchValue = ''
    })
  }

  onToggleMuteCurrentChat() {
    SettingsModel.onToggleMuteCurrentChat(this.chatSelectedId, this.chats)
  }

  onToggleMuteAllChats() {
    SettingsModel.onToggleMuteAllChats(this.chats)
  }

  onClickChat(chat) {
    runInAction(() => {
      if (this.chatSelectedId === chat._id) {
        this.chatSelectedId = undefined
      } else {
        this.chatSelectedId = chat._id
      }
    })
  }

  async getCustomRequestCur() {
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

  async onSubmitMessage(message, files, chatIdId, replyMessageId) {
    try {
      await ChatModel.sendMessage({
        crmItemId: this.requestId,
        chatId: chatIdId,
        text: message,
        files: files?.map(item => item?.file),
        user: {
          name: UserModel.userInfo.name,
          _id: UserModel.userInfo._id,
        },
        ...(replyMessageId && { replyMessageId }),
      })
    } catch (error) {
      console.warn('onSubmitMessage error ', error)
    }
  }

  async onClickProposalResultAccept(proposalId) {
    console.log(this.findRequestProposalForCurChat)
    runInAction(() => {
      this.acceptProposalResultSetting = {
        onSubmit: data => this.onClickProposalResultAcceptForm(proposalId, data),
      }
    })
    this.onTriggerOpenModal('showConfirmWorkResultFormModal')
  }

  async onClickProposalResultAcceptForm(proposalId, data) {
    try {
      await RequestProposalModel.requestProposalResultAccept(proposalId, data)
      await FeedbackModel.sendFeedback(this.findRequestProposalForCurChat.proposal.createdBy._id, {
        rating: data.rating,
        comment: data.review,
      })

      this.onTriggerOpenModal('showConfirmWorkResultFormModal')
      this.loadData()
    } catch (error) {
      console.warn('onClickProposalResultAccept error ', error)
    }
  }

  async onClickProposalResultToCorrect() {
    if (this.request.request.typeTask === freelanceRequestTypeByKey[freelanceRequestType.DESIGNER]) {
      this.onTriggerOpenModal('showRequestDesignerResultClientModal')
    } else {
      this.triggerShowResultToCorrectFormModal()
    }
  }

  async onPressSubmitRequestProposalResultToCorrectForm(formFields, files) {
    this.triggerShowResultToCorrectFormModal()

    try {
      runInAction(() => {
        this.uploadedFiles = []
      })

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

  async onPressSubmitDesignerResultToCorrect({ reason, timeLimitInMinutes, imagesData /* .filter(el => el.image) */ }) {
    try {
      // runInAction(() => {
      //   this.uploadedFiles = []
      // })
      // if (files.length) {
      //   await onSubmitPostImages.call(this, {images: files, type: 'uploadedFiles'})
      // }
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
      console.warn('onClickProposalResultToCorrect error ', error)
    }
  }

  onSubmitSendInForReworkInProposalResultAccept({
    reason,
    timeLimitInMinutes,
    imagesData /* .filter(el => el.image) */,
  }) {
    this.confirmModalSettings = {
      isWarning: false,
      message: t(TranslationKey['Are you sure you want to send the result for rework?']),
      onSubmit: () => {
        this.onTriggerOpenModal('showConfirmModal')
        this.onPressSubmitDesignerResultToCorrect({
          reason,
          timeLimitInMinutes,
          imagesData /* .filter(el => el.image) */,
        })
        this.onTriggerOpenModal('showRequestDesignerResultClientModal')
      },
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async getCustomProposalsForRequestCur() {
    try {
      const [platformSettings, result] = await Promise.all([
        UserModel.getPlatformSettings(),
        RequestProposalModel.getRequestProposalsCustomByRequestId(this.requestId),
      ])

      this.platformSettings = platformSettings

      runInAction(() => {
        this.requestProposals = result
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async getAnnouncementsByGuid(guid) {
    try {
      if (guid) {
        const result = await AnnouncementsModel.getAnnouncementsByGuid(guid)

        runInAction(() => {
          this.requestAnnouncement = result
        })
      }
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async toPublishRequest(totalCost) {
    try {
      await RequestModel.toPublishRequest(this.requestId, { totalCost })

      this.onTriggerOpenModal('showConfirmModal')

      this.loadData()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onClickContactWithExecutor(proposal) {
    runInAction(() => {
      this.chatSelectedId = proposal.chatId
    })
    if (this.scrollToChat) {
      this.scrollToChat()
    }
    runInAction(() => {
      this.showChat = true
    })
  }

  onClickHideChat() {
    runInAction(() => {
      this.showChat = false
    })
  }

  async onClickAcceptProposal(proposalId) {
    try {
      await RequestProposalModel.requestProposalAccept(proposalId)

      await Promise.all([this.getCustomRequestCur(), this.getCustomProposalsForRequestCur()])

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async getReviews(guid) {
    try {
      const result = await FeedbackModel.getFeedback(guid)

      runInAction(() => {
        this.currentReviews = result.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onClickReview(user) {
    await this.getReviews(user._id)
    this.currentReviewModalUser = user
    this.onTriggerOpenModal('showReviewModal')
  }

  onClickOpenRequest(media) {
    runInAction(() => {
      this.curResultMedia = media
    })

    this.onTriggerOpenModal('showRequestDesignerResultClientModal')
    this.getCustomProposalsForRequestCur()
  }

  onClickOrderProposal(proposalId, price) {
    runInAction(() => {
      this.confirmModalSettings = {
        isWarning: false,
        message: `${t(TranslationKey['After confirmation from your account will be frozen'])} ${toFixed(
          price + price * (this.platformSettings.requestPlatformMarginInPercent / 100),
          2,
        )} $. ${t(TranslationKey.Continue)} ?`,
        smallMessage: `${t(TranslationKey['This amount includes the service fee'])} ${
          this.platformSettings.requestPlatformMarginInPercent
        }% (${toFixed(price * (this.platformSettings.requestPlatformMarginInPercent / 100), 2)}$)`,
        onSubmit: () => this.onClickAcceptProposal(proposalId),
      }
    })

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickRejectProposal(proposalId) {
    runInAction(() => {
      this.curProposalId = proposalId

      this.confirmModalSettings = {
        isWarning: true,
        message: t(TranslationKey['Reject the proposal']),
        onSubmit: () => this.onSubmitRejectProposal(),
      }
    })
    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitRejectProposal() {
    try {
      await RequestProposalModel.requestProposalReject(this.curProposalId)

      this.onTriggerOpenModal('showConfirmModal')

      await Promise.all([this.getCustomRequestCur(), this.getCustomProposalsForRequestCur()])
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
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
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onClickEditBtn() {
    this.history.push(
      `/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/my-requests/custom-request/edit-request`,
      { requestId: this.requestId },
    )
  }

  async onSubmitAbortRequest(comment) {
    try {
      await RequestModel.abortRequest(this.requestId, { reason: comment })

      this.onTriggerOpenModal('showConfirmWithCommentModal')

      this.loadData()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onClickAbortBtn() {
    this.onTriggerOpenModal('showConfirmWithCommentModal')
  }

  async onDeleteRequest() {
    try {
      await RequestModel.deleteRequest(this.requestId)

      this.onTriggerOpenModal('showConfirmModal')

      this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/my-requests`)
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onClickCancelBtn() {
    runInAction(() => {
      this.confirmModalSettings = {
        isWarning: true,
        message: t(TranslationKey['Delete request?']),
        onSubmit: () => this.onDeleteRequest(),
      }
    })
    this.onTriggerOpenModal('showConfirmModal')
  }

  async onMarkAsCompletedRequest() {
    try {
      await RequestModel.manualCompletedRequest(this.requestId)

      this.onTriggerOpenModal('showConfirmModal')

      await Promise.all([this.getCustomRequestCur(), this.getCustomProposalsForRequestCur()])
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.error = error
      })
    }
  }

  onClickMarkAsCompletedBtn() {
    runInAction(() => {
      this.confirmModalSettings = {
        isWarning: false,
        message: `${t(TranslationKey['Mark as completed'])}?`,
        onSubmit: () => this.onMarkAsCompletedRequest(),
      }
    })
    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitEditCustomSearchRequest(data, requestId) {
    try {
      await this.editCustomSearchRequest(data, requestId)

      this.onTriggerOpenModal('showRequestForm')
      this.getCustomRequestById()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  triggerShowResultToCorrectFormModal() {
    runInAction(() => {
      this.showResultToCorrectFormModal = !this.showResultToCorrectFormModal
    })
  }

  async onToggleUploadedToListing(id, uploadedToListingState) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await RequestModel.patchRequestsUploadedToListing({
        requestIds: [id],
        uploadedToListing: !uploadedToListingState,
      })

      await this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  resetChats() {
    ChatModel.resetChats()
  }

  async onRecoverRequest(timeoutAt, maxAmountOfProposals) {
    this.setRequestStatus(loadingStatuses.isLoading)
    await RequestModel.updateDeadline(this.requestId, timeoutAt, maxAmountOfProposals)

    await Promise.all([this.getCustomRequestCur(), this.getCustomProposalsForRequestCur()])

    this.setRequestStatus(loadingStatuses.success)
  }
}
