import { makeAutoObservable, reaction, runInAction } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { freelanceRequestType, freelanceRequestTypeByKey } from '@constants/statuses/freelance-request-type'

import { ChatModel } from '@models/chat-model'
import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'
import { isString } from '@typings/guards'

export class RequestDetailCustomViewModel {
  history = undefined
  requestStatus = undefined

  requestId = undefined
  request = undefined
  requestProposals = undefined
  showProgress = false

  showConfirmModal = false
  showMainRequestResultModal = false
  showRequestDesignerResultModal = false
  showRequestDesignerResultClientModal = false
  showRequestResultModal = false

  curResultMedia = []

  loadedFiles = []

  chatSelectedId = undefined
  chatIsConnected = false

  mesSearchValue = ''
  messagesFound = []
  curFoundedMessage = undefined

  get isMuteChats() {
    return SettingsModel.isMuteChats
  }

  get mutedChats() {
    return SettingsModel.mutedChats
  }

  get chats() {
    return ChatModel.chats
  }

  get userInfo() {
    return UserModel.userInfo
  }

  get typingUsers() {
    return ChatModel.typingUsers
  }

  constructor({ history }) {
    const url = new URL(window.location.href)

    this.requestId = url.searchParams.get('request-id')

    reaction(
      () => this.chatSelectedId,
      () => {
        this.mesSearchValue = ''
        ChatModel.onChangeChatSelectedId(this.chatSelectedId)
      },
    )

    this.history = history

    if (history.location?.state?.chatId) {
      this.chatSelectedId = history?.location?.state?.chatId
    }

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

  onToggleMuteCurrentChat() {
    SettingsModel.onToggleMuteCurrentChat(this.chatSelectedId, this.chats)
  }

  onToggleMuteAllChats() {
    SettingsModel.onToggleMuteAllChats(this.chats)
  }

  onTypingMessage(chatId) {
    ChatModel.typingMessage({ chatId })
  }

  onClickResultBtn() {
    if (!this.request) {
      return
    }

    if (this.request.request.spec?.type === freelanceRequestTypeByKey[freelanceRequestType.DESIGNER]) {
      this.onTriggerOpenModal('showRequestDesignerResultModal')
    } else if (this.request.request.spec?.type === freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]) {
      this.onTriggerOpenModal('showRequestResultModal')
    } else {
      this.onTriggerOpenModal('showMainRequestResultModal')
    }
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

  async loadData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      this.getCustomRequestById()
      this.getRequestProposals()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  onClickChat(chat) {
    if (this.chatSelectedId === chat._id) {
      this.chatSelectedId = undefined
    } else {
      this.chatSelectedId = chat._id
    }
  }

  onClickOpenRequest(media) {
    this.curResultMedia = media
    this.onTriggerOpenModal('showRequestDesignerResultClientModal')
  }

  onClickCloseDesignerResultClientModal() {
    this.curResultMedia = []
    this.showRequestDesignerResultClientModal = false
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

  async getCustomRequestById() {
    try {
      const result = await RequestModel.getCustomRequestById(this.requestId)

      runInAction(() => {
        this.request = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getRequestProposals() {
    try {
      const result = await RequestProposalModel.getRequestProposalsCustomByRequestId(this.requestId) // inside the method is noCache: true

      runInAction(() => {
        this.requestProposals = result

        this.chatSelectedId = this.chatSelectedId ? this.chatSelectedId : result[0]?.proposal?.chatId
      })
    } catch (error) {
      runInAction(() => {
        this.requestProposals = []
      })

      console.error(error)
    }
  }

  onClickReworkProposal() {
    if (this.request.request.spec?.type === freelanceRequestTypeByKey[freelanceRequestType.DESIGNER]) {
      this.onTriggerOpenModal('showRequestDesignerResultModal')
    } else if (this.request.request.spec?.type === freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]) {
      this.onTriggerOpenModal('showRequestResultModal')
    } else {
      this.onTriggerOpenModal('showMainRequestResultModal')
    }
  }

  async onClickSendAsResult({ message, files, amazonOrderId, publicationLinks, sourceLink }) {
    try {
      const findRequestProposalByChatSelectedId = this.requestProposals.find(
        requestProposal => requestProposal.proposal.chatId === this.chatSelectedId,
      )

      if (!findRequestProposalByChatSelectedId) {
        return
      }

      if (files.length) {
        await onSubmitPostImages.call(this, {
          images: typeof files[0] === 'object' && 'fileLink' in files[0] ? files.map(el => el.fileLink) : files,
          type: 'loadedFiles',
        })
      }

      if (findRequestProposalByChatSelectedId.proposal.status === RequestProposalStatus.TO_CORRECT) {
        await RequestProposalModel.requestProposalResultCorrected(findRequestProposalByChatSelectedId.proposal._id, {
          reason: message,
          linksToMediaFiles: this.loadedFiles,
        })
      } else if (
        findRequestProposalByChatSelectedId.proposal.status === RequestProposalStatus.CREATED ||
        findRequestProposalByChatSelectedId.proposal.status === RequestProposalStatus.OFFER_CONDITIONS_REJECTED ||
        findRequestProposalByChatSelectedId.proposal.status === RequestProposalStatus.OFFER_CONDITIONS_CORRECTED
      ) {
        await RequestProposalModel.requestProposalCorrected(findRequestProposalByChatSelectedId.proposal._id, {
          reason: message,
          linksToMediaFiles: this.loadedFiles,
        })
      } else {
        if (findRequestProposalByChatSelectedId.proposal.status === RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED) {
          await RequestProposalModel.requestProposalReadyToVerify(findRequestProposalByChatSelectedId.proposal._id)
        }
      }

      const filesIds = files.map(el => el._id)

      const curentMediaIds = findRequestProposalByChatSelectedId.proposal.media.map(el => el._id)

      const mediaToRemoveIds = curentMediaIds.filter(el => !filesIds.includes(el))

      if (mediaToRemoveIds.length) {
        await RequestModel.editRequestsMediaMany(mediaToRemoveIds.map(el => ({ _id: el, proposalId: null })))
      }

      await RequestProposalModel.requestProposalResultEdit(findRequestProposalByChatSelectedId.proposal._id, {
        result: message,
        media: this.loadedFiles.map((el, i) => ({
          fileLink: el,
          commentByPerformer: typeof files[0] === 'object' ? files[i]?.commentByPerformer : '',
          _id: findRequestProposalByChatSelectedId.proposal.media.some(item => item._id === files[i]?._id)
            ? files[i]?._id
            : null,
          index: i,
        })),
        ...(amazonOrderId && { amazonOrderId }),
        ...(publicationLinks && { publicationLinks }),
        ...(sourceLink && {
          sourceFiles: [
            {
              sourceFile: sourceLink,
              comments: '',
            },
          ],
        }),
      })

      this.getRequestProposals()
    } catch (error) {
      console.error(error)
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
      console.error(error)
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
      console.error(error)
    }
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
    this.history.push(
      `/${
        UserRoleCodeMapForRoutes[this.userInfo.role]
      }/freelance/vacant-requests/custom-search-request/create-proposal?requestId=${this.request.request._id}`,
    )
  }

  resetChats() {
    ChatModel.resetChats()
  }

  async onSendResultAfterRework(id, fields) {
    try {
      const findRequestProposalByChatSelectedId = this.requestProposals.find(
        requestProposal => requestProposal.proposal.chatId === this.chatSelectedId,
      )

      if (!findRequestProposalByChatSelectedId) {
        return
      }

      if (fields?.media?.length) {
        await onSubmitPostImages.call(this, {
          images: isString(fields?.media[0]) ? fields?.media : fields?.media?.map(el => el.fileLink),
          type: 'loadedFiles',
        })
      }

      if (findRequestProposalByChatSelectedId.proposal.status === RequestProposalStatus.TO_CORRECT) {
        await RequestProposalModel.requestProposalResultCorrected(id, {
          reason: fields?.result,
          linksToMediaFiles: this.loadedFiles,
        })
      } else if (
        findRequestProposalByChatSelectedId.proposal.status === RequestProposalStatus.CREATED ||
        findRequestProposalByChatSelectedId.proposal.status === RequestProposalStatus.OFFER_CONDITIONS_REJECTED ||
        findRequestProposalByChatSelectedId.proposal.status === RequestProposalStatus.OFFER_CONDITIONS_CORRECTED
      ) {
        await RequestProposalModel.requestProposalCorrected(id, {
          reason: fields?.result,
          linksToMediaFiles: this.loadedFiles,
        })
      } else {
        if (findRequestProposalByChatSelectedId.proposal.status === RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED) {
          await RequestProposalModel.requestProposalReadyToVerify(id)
        }
      }

      const filesIds = fields?.media?.map(el => el._id)

      const curentMediaIds = findRequestProposalByChatSelectedId.proposal.media.map(el => el._id)

      const mediaToRemoveIds = curentMediaIds.filter(el => !filesIds.includes(el))

      if (mediaToRemoveIds.length) {
        await RequestModel.editRequestsMediaMany(mediaToRemoveIds.map(el => ({ _id: el, proposalId: null })))
      }

      const sentFields = {
        ...fields,
        media: fields?.media?.map((file, index) => ({
          ...file,
          fileLink: this.loadedFiles[index],
        })),
      }

      await RequestProposalModel.requestProposalResultEdit(id, sentFields)

      this.getRequestProposals()
    } catch (error) {
      console.error(error)
    }
  }
}
