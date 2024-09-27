import { ChatsType } from '@constants/keys/chats'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'

import { t } from '@utils/translations'

import { IFullUser } from '@typings/shared/full-user'

export const getChatTitle = (chat: ChatContract, user: IFullUser) => {
  if (chat.type === ChatsType.GROUP && chat?.info) {
    return chat?.info?.title
  } else if (chat.type === ChatsType.SAVED) {
    return t(TranslationKey.Favorites)
  } else {
    const oponentUser = chat.users.find(chatUser => chatUser._id !== user._id)
    return oponentUser?.name || 'User'
  }
}
