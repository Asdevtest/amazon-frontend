import { ChatsType } from '@constants/keys/chats'
import { TranslationKey } from '@constants/translations/translation-key'

import { Chat } from '@models/chat-model-new/types/chat.type'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

import { IFullUser } from '@typings/shared/full-user'

export const getChatTitle = (chat: Chat) => {
  if (chat.type === ChatsType.GROUP && chat?.info) {
    return chat?.info?.title
  } else if (chat.type === ChatsType.SAVED) {
    return t(TranslationKey.Favorites)
  } else {
    const oponentUser = chat.users.find(chatUser => chatUser._id !== (UserModel.userInfo as unknown as IFullUser)?._id)
    return oponentUser?.name || 'User'
  }
}
