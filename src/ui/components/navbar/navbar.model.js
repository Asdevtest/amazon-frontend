import {makeAutoObservable} from 'mobx'

import {ChatModel} from '@models/chat-model'
import {OtherModel} from '@models/other-model'
import {UserModel} from '@models/user-model'

import {onSubmitPostImages} from '@utils/upload-files'

export class NavbarModel {
  showFeedbackModal = false
  showWarningModal = false

  get userInfo() {
    return UserModel.userInfo
  }

  get simpleChats() {
    return ChatModel.simpleChats
  }

  get unreadMessages() {
    return ChatModel.unreadMessages
  }

  constructor() {
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async sendFeedbackAboutPlatform(comment, photos) {
    try {
      this.readyImages = []

      if (photos.length) {
        await onSubmitPostImages.call(this, {images: photos, type: 'readyImages'})
      }
      await OtherModel.sendFeedback({text: comment, media: this.readyImages})
      this.onTriggerOpenModal('showFeedbackModal')

      this.onTriggerOpenModal('showWarningModal')
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }
}
