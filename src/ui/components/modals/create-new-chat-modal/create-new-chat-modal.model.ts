import { makeObservable } from 'mobx'

import { ChatsModel } from '@models/chats-model'
import { DefaultModel } from '@models/default-model'

import { onSubmitPostImages } from '@utils/upload-files'

import { UploadFileType } from '@typings/shared/upload-file'

import { observerConfig } from './observer.config'

export class CreateNewChatModalModel extends DefaultModel {
  chatName: string = ''
  chatImage: UploadFileType = ''
  selectedUsersId: string[] = []

  get disableCreateButton() {
    if (this.selectedUsersId?.length < 1) {
      return true
    } else if (this.selectedUsersId?.length > 1 && !this.chatName) {
      return true
    }
  }

  constructor() {
    super({
      getMainDataMethod: ChatsModel.getUsersNames,
    })
    makeObservable(this, observerConfig)

    this.getCurrentData()
  }

  onSelectUser(userId: string) {
    this.selectedUsersId = [...this.selectedUsersId, userId]
  }

  onDeselectUser(userId: string) {
    this.selectedUsersId = this.selectedUsersId.filter(el => el !== userId)
  }

  onChangeChatName = (value: string) => {
    this.chatName = value
  }

  onChangeChatImage(chatImage: UploadFileType) {
    this.chatImage = chatImage
  }

  async createSimpleChat() {
    try {
      await ChatsModel.createSimpleChatByUserId(this.selectedUsersId?.[0])
    } catch (error) {
      console.error(error)
    }
  }

  async createGroupChat() {
    try {
      let chatImage = ''

      if (this.chatImage) {
        // @ts-ignore
        chatImage = await onSubmitPostImages.call(this, { images: this.chatImage, type: 'readyImages' })
      }

      await ChatsModel.createSimpleGroupChat({
        userIds: this.selectedUsersId,
        title: this.chatName,
        image: chatImage,
      })
    } catch (error) {
      console.error(error)
    }
  }

  onClickCreateChat() {
    if (this.selectedUsersId?.length > 1) {
      this.createGroupChat()
    } else {
      this.createSimpleChat()
    }
  }
}
