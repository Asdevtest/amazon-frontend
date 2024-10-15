import { compareDesc, parseISO } from 'date-fns'

import { ChatsType } from '@constants/keys/chats'

import { Chat } from '../types/chat.type'

export const getSortChats = (chats: Chat[]) => {
  return chats?.sort((a, b) => {
    if (a.type === ChatsType.SAVED && b.type !== ChatsType.SAVED) {
      return -1
    } else if (a.type !== ChatsType.SAVED && b.type === ChatsType.SAVED) {
      return 1
    } else {
      return compareDesc(
        parseISO(a.lastMessage?.createdAt || a.createdAt),
        parseISO(b.lastMessage?.createdAt || b.createdAt),
      )
    }
  })
}
