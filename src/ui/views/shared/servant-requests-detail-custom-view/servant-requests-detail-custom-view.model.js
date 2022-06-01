import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {RequestProposalStatus} from '@constants/request-proposal-status'

import {ChatModel} from '@models/chat-model'
import {RequestModel} from '@models/request-model'
import {RequestProposalModel} from '@models/request-proposal'
import {UserModel} from '@models/user-model'

import {onSubmitPostImages} from '@utils/upload-files'

export class RequestDetailCustomViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  requestId = undefined
  request = undefined
  requestProposals = []
  showWarningModal = false

  loadedFiles = []

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  chatSelectedId = undefined
  chatIsConnected = false

  get chats() {
    return ChatModel.chats
  }

  get userInfo() {
    return UserModel.userInfo || {}
  }

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      this.requestId = location.state.requestId
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

  onClickChat(chat) {
    if (this.chatSelectedId === chat._id) {
      this.chatSelectedId = undefined
    } else {
      this.chatSelectedId = chat._id
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

  async getRequestProposals() {
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

  async onClickSendAsResult({message, links, files}) {
    try {
      console.log('links ', links)
      const findRequestProposalByChatSelectedId = this.requestProposals.find(
        requestProposal => requestProposal.proposal.chatId === this.chatSelectedId,
      )

      if (!findRequestProposalByChatSelectedId) {
        return
      }

      this.loadedFiles = []
      if (files.length) {
        await onSubmitPostImages.call(this, {images: files, type: 'loadedFiles'})
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

        await RequestProposalModel.requestProposalResultEdit(findRequestProposalByChatSelectedId.proposal._id, {
          result: message,
          linksToMediaFiles: this.loadedFiles,
        })
      }

      // this.loadData()
    } catch (error) {
      console.log(error)
      this.error = error
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
      this.error = error
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
