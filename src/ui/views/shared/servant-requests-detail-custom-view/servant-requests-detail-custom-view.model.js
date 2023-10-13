import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { freelanceRequestType, freelanceRequestTypeByKey } from '@constants/statuses/freelance-request-type'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { ChatModel } from '@models/chat-model'
import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { onSubmitPostImages } from '@utils/upload-files'

export class RequestDetailCustomViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  requestId = undefined
  request = undefined
  requestProposals = undefined
  showProgress = false

  showWarningModal = false
  showConfirmModal = false
  showRequestResultModal = false
  showRequestDesignerResultModal = false
  showRequestDesignerResultClientModal = false

  curResultMedia = []

  loadedFiles = []

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

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
    return UserModel.userInfo || {}
  }

  get typingUsers() {
    return ChatModel.typingUsers || []
  }

  constructor({ history, location }) {
    const url = new URL(window.location.href)

    runInAction(() => {
      this.requestId = url.searchParams.get('request-id')
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

    runInAction(() => {
      this.history = history

      // if (location.state) {
      //   this.requestId = location.state.requestId
      // }

      if (location?.state?.chatId) {
        this.chatSelectedId = location.state.chatId
      }
    })

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
  }

  onToggleMuteCurrentChat() {
    SettingsModel.onToggleMuteCurrentChat(this.chatSelectedId)
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

    if (+this.request.request.typeTask === +freelanceRequestTypeByKey[freelanceRequestType.DESIGNER]) {
      this.onTriggerOpenModal('showRequestDesignerResultModal')
    } else {
      this.onTriggerOpenModal('showRequestResultModal')
    }
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

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await Promise.all([this.getCustomRequestById(), this.getRequestProposals()])

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
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

  onClickOpenRequest(media) {
    runInAction(() => {
      this.curResultMedia = media
    })

    this.onTriggerOpenModal('showRequestDesignerResultClientModal')
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

        this.chatSelectedId = this.chatSelectedId ? this.chatSelectedId : result[0]?.proposal?.chatId
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

  onClickReworkProposal() {
    if (this.request.request.typeTask === freelanceRequestTypeByKey[freelanceRequestType.DESIGNER]) {
      this.onTriggerOpenModal('showRequestDesignerResultModal')
    } else {
      this.onTriggerOpenModal('showRequestResultModal')
    }
  }

  async onClickSendAsResult({ message, files, amazonOrderId, publicationLinks, sourceLink }) {
    try {
      runInAction(() => {
        this.showProgress = true
      })
      const findRequestProposalByChatSelectedId = this.requestProposals.find(
        requestProposal => requestProposal.proposal.chatId === this.chatSelectedId,
      )

      if (!findRequestProposalByChatSelectedId) {
        return
      }

      runInAction(() => {
        this.loadedFiles = []
      })

      if (files.length) {
        await onSubmitPostImages.call(this, {
          images: typeof files[0] === 'object' && 'image' in files[0] ? files.map(el => el.image) : files,
          type: 'loadedFiles',
        })
      }

      // await RequestProposalModel.requestProposalResultEdit(findRequestProposalByChatSelectedId.proposal._id, {
      //   result: message,
      //   media: this.loadedFiles.map((el, i) => ({
      //     fileLink: el,
      //     commentByPerformer: typeof files[0] === 'object' ? files[i]?.comment : '',
      //     _id: findRequestProposalByChatSelectedId.proposal.media.some(item => item._id === files[i]?._id)
      //       ? files[i]?._id
      //       : null,
      //   })),
      //   ...(amazonOrderId && {amazonOrderId}),
      //   ...(publicationLinks && {publicationLinks}),
      //   ...(sourceLink && {
      //     sourceFiles: [
      //       {
      //         sourceFile: sourceLink,
      //         comments: '',
      //       },
      //     ],
      //   }),
      // })

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
          commentByPerformer: typeof files[0] === 'object' ? files[i]?.comment : '',
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
      this.showProgress = false

      runInAction(() => {
        this.showProgress = false
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.showProgress = false

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
      { request: toJS(this.request) },
    )
  }

  resetChats() {
    ChatModel.resetChats()
  }

  // async onSubmitRequestProposalForm(formFields) {
  //   try {
  //     const result = this.requestProposal
  //       ? await RequestProposalModel.updateRequestProposalCustom(this.requestProposal.proposal._id, formFields)
  //       : await RequestProposalModel.createRequestProposalCustom(this.request.request._id, formFields)

  //     this.getCustomRequestProposalsByRequestId(result?.guid || this.requestProposal.proposal._id)

  //     this.warningInfoModalSettings = {
  //       isWarning: false,
  //       title: '',
  //     }

  //     this.onTriggerOpenModal('showWarningModal')
  //     // this.history.goBack()
  //   } catch (error) {
  //     console.log(error)
  //     this.error = error

  //     this.warningInfoModalSettings = {
  //       isWarning: true,
  //       title: '',
  //     }

  //     this.onTriggerOpenModal('showWarningModal')
  //   }
  // }
}
