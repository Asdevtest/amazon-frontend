/* eslint-disable no-unused-vars */
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

export class ServiceDetailsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  uploadedFiles = []
  drawerOpen = false
  requestId = undefined
  request = undefined
  requestProposals = []

  showAcceptMessage = undefined
  acceptMessage = undefined

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

  constructor({history, location}) {
    runInAction(() => {
      this.history = history

      if (location.state) {
        console.log('location.state', location.state)
      }
    })
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      ;() => {}
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }

  onTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }
}
