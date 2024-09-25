import { AxiosError } from 'axios'
import isEqual from 'lodash.isequal'
import { makeObservable } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatModel } from '@models/chat-model'
import { ChatContract, ChatUserContract } from '@models/chat-model/contracts'
import { ChatsModel } from '@models/chats-model'
import { DefaultModel } from '@models/default-model'
import { OtherModel } from '@models/other-model'
import { UserModel } from '@models/user-model'

import { AxiosErrorData } from '@services/axios/axios.types'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'
import { dataURLtoFile } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'
import { IFullUser } from '@typings/shared/full-user'
import { UploadFileType } from '@typings/shared/upload-file'

import { CreateNewChatModalProps } from './create-new-chat-modal'
import { observerConfig } from './observer.config'

export class CreateNewChatModalModel extends DefaultModel {
  chatName: string = ''
  chatImage: UploadFileType = ''
  selectedUsersId: string[] = []
  chatToEdit: ChatContract | undefined
  closeModalMethod: () => void = () => {}

  get user() {
    return UserModel.userInfo as unknown as IFullUser
  }

  get disableCreateButton() {
    if (this.chatToEdit && this.chatName) {
      return false
    } else if (this.selectedUsersId?.length < 1) {
      return true
    } else if (this.selectedUsersId?.length > 1 && !this.chatName) {
      return true
    }
  }

  get isChatNameNotChanged() {
    if (this.chatToEdit) {
      return this.chatName === this.chatToEdit?.info?.title
    }
  }

  get isChatImageNotChanged() {
    if (this.chatToEdit) {
      return this.chatImage === getAmazonImageUrl(this.chatToEdit?.info?.image, true)
    }
  }

  get isChatUsersNotChanged() {
    if (this.chatToEdit) {
      return isEqual(this.selectedUsersId, this.getChatUsers(this.chatToEdit?.users))
    }
  }

  constructor({ chatToEdit, closeModal }: CreateNewChatModalProps) {
    super({
      getMainDataMethod: ChatsModel.getUsersNames,
    })

    makeObservable(this, observerConfig)

    if (chatToEdit) {
      const chatUsers = this.getChatUsers(chatToEdit.users)

      this.chatToEdit = chatToEdit
      this.chatName = chatToEdit?.info?.title as string
      this.chatImage = getAmazonImageUrl(chatToEdit?.info?.image, true)
      this.selectedUsersId = chatUsers
    }

    this.closeModalMethod = closeModal
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
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await ChatsModel.createSimpleChatByUserId(this.selectedUsersId?.[0])
      this.closeModalMethod()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.SUCCESS)
      console.error(error)

      const axiosError = error as AxiosError<AxiosErrorData>

      if (axiosError.response?.data?.message === 'Chat already exists') {
        toast.error(t(TranslationKey['Chat already exists']))
      }
    }
  }

  async createGroupChat() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const image = await this.uploadChatImage(this.chatImage)

      await ChatsModel.createSimpleGroupChat({
        userIds: this.selectedUsersId,
        title: this.chatName,
        image: image as string,
      })

      this.closeModalMethod()
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.SUCCESS)
      console.error(error)
    }
  }

  async onSubmitPatchInfoGroupChat() {
    this.getUsersToAddAndRemove()

    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      const { usersToAdd, usersToRemove } = this.getUsersToAddAndRemove()

      if (usersToAdd?.length) {
        await this.addUsersToGroupChat(usersToAdd)
      }

      if (usersToRemove?.length) {
        await this.removeUsersFromGroupChat(usersToRemove)
      }

      if (!this.isChatNameNotChanged || !this.isChatImageNotChanged) {
        await this.patchGroupChatInfo()
      }

      this.closeModalMethod()
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.SUCCESS)
      console.error(error)
    }
  }

  async addUsersToGroupChat(users: string[]) {
    try {
      await ChatModel.addUsersToGroupChat({ chatId: this.chatToEdit?._id as string, users })
    } catch (error) {
      console.error(error)
    }
  }

  async removeUsersFromGroupChat(users: string[]) {
    try {
      await ChatModel.removeUsersFromGroupChat({ chatId: this.chatToEdit?._id as string, users })
    } catch (error) {
      console.error(error)
    }
  }

  async patchGroupChatInfo() {
    let image = this.chatToEdit?.info?.image

    if (!this.isChatImageNotChanged) {
      image = await this.uploadChatImage(this.chatImage)
    }

    await ChatModel.patchInfoGroupChat({
      chatId: this.chatToEdit?._id as string,
      title: this.chatName,
      image: image as string,
    })
  }

  getUsersToAddAndRemove() {
    const originalUsers = this.getChatUsers(this.chatToEdit?.users as ChatUserContract[])

    const usersToAdd = this.selectedUsersId?.filter(userId => !originalUsers.includes(userId))
    const usersToRemove = originalUsers.filter(userId => !this.selectedUsersId?.includes(userId))

    return { usersToAdd, usersToRemove }
  }

  async uploadChatImage(image: UploadFileType) {
    try {
      if (image) {
        const file = dataURLtoFile(image, this.chatName)

        const formData = new FormData()
        formData.append('filename', file)

        const uploadFile = await OtherModel.postImage(formData)
        return `/uploads/${uploadFile}`
      } else {
        return ''
      }
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

  getChatUsers(users: ChatUserContract[]) {
    const usersId = []

    for (const user of users) {
      if (user._id !== this.user._id) {
        usersId.push(user._id)
      }
    }

    return usersId
  }
}
