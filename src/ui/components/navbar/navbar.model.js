import {makeAutoObservable} from 'mobx'

import {ChatModel} from '@models/chat-model'
import {UserModel} from '@models/user-model'

export class NavbarModel {
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
}
