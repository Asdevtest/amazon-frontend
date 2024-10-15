import { useMemo } from 'react'

import { ChatsType } from '@constants/keys/chats'
import { ONE_DAY_IN_SECONDS } from '@constants/time'
import { TranslationKey } from '@constants/translations/translation-key'

import { Chat } from '@models/chat-model-new/types/chat.type'

import { getChatOponent } from '@utils/chat/get-chat-oponent'
import { getChatTitle } from '@utils/chat/get-chat-title'
import { checkOnline } from '@utils/checks/check-online/check-online'
import { getDistanceBetweenDatesSeconds } from '@utils/checks/get-distance-between-dates-seconds/get-distance-between-dates-seconds'
import { formatDateTimeHourAndMinutesLocal, formatDateWithoutTimeLocal } from '@utils/date-time'
import { t } from '@utils/translations'

import { IFullUser } from '@typings/shared/full-user'

export const useOnlineUser = (currentChat: Chat) => {
  const currentUser = getChatOponent(currentChat?.users as unknown as IFullUser[])

  const isFavoritesChat = useMemo(() => currentChat.type === ChatsType.SAVED, [currentChat])
  const isGroupChat = useMemo(() => currentChat.type === ChatsType.GROUP, [currentChat])

  const isOnlineUser = checkOnline(currentChat?.type, currentUser as unknown as IFullUser)
  const lastSeen = currentUser?.lastSeen as string
  const dateGap = getDistanceBetweenDatesSeconds(new Date(), new Date(lastSeen))
  const chatTitle = useMemo(() => getChatTitle(currentChat), [])

  const lastSeenMessage =
    dateGap > ONE_DAY_IN_SECONDS
      ? `${t(TranslationKey['Last seen'], {
          date: formatDateWithoutTimeLocal(new Date(lastSeen)),
        })}`
      : `${t(TranslationKey.Today)} ${formatDateTimeHourAndMinutesLocal(new Date(lastSeen))}`

  const isTyping = currentUser?.typing

  return {
    chatTitle,

    isFavoritesChat,
    isGroupChat,

    isOnlineUser,
    currentUser,
    lastSeenMessage,
    isTyping,
  }
}
