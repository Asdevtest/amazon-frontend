import { ChatsType } from '@constants/keys/chats'
import { TranslationKey } from '@constants/translations/translation-key'

import { Chat } from '@models/chat-model-new/types/chat.type'

import { t } from '@utils/translations'

import { getChatOponent } from './get-chat-oponent'

export const getChatTitle = (chat: Chat) => {
  if (chat.type === ChatsType.GROUP && chat?.info) {
    return chat?.info?.title
  } else if (chat.type === ChatsType.SAVED) {
    return t(TranslationKey.Favorites)
  } else {
    const oponentUser = getChatOponent(chat.users)
    return oponentUser?.name || 'User'
  }
}
