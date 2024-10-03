import { Chat } from '@models/chat-model-new/types/chat.type'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getUserAvatarSrc } from '@utils/get-user-avatar'

import { getChatOponent } from './get-chat-oponent'

export const getChatAvatarSrc = (chat: Chat, isGroupChat: boolean) => {
  if (isGroupChat) {
    return getAmazonImageUrl(chat.info?.image)
  } else {
    const user = getChatOponent(chat.users)
    return getUserAvatarSrc(user?._id)
  }
}
