import { chatsType } from '@constants/keys/chats'

import { ChatContract } from '@models/chat-model/contracts'

import { IFullUser } from '@typings/shared/full-user'

export const getChatTitle = (chat: ChatContract, user: IFullUser) => {
  if (chat.type === chatsType.GROUP && chat?.info) {
    return chat?.info?.title
  } else {
    const oponentUser = chat.users.find(chatUser => chatUser._id !== user._id)
    return oponentUser?.name || 'User'
  }
}
