import { FC, memo, useMemo } from 'react'

import { ChatsType } from '@constants/keys/chats'
import { ONE_DAY_IN_SECONDS } from '@constants/time'
import { TranslationKey } from '@constants/translations/translation-key'

import { Chat } from '@models/chat-model-new/types/chat.type'

import { getChatOponent } from '@utils/chat/get-chat-oponent'
import { checkOnline } from '@utils/checks/check-online/check-online'
import { getDistanceBetweenDatesSeconds } from '@utils/checks/get-distance-between-dates-seconds/get-distance-between-dates-seconds'
import { formatDateTimeHourAndMinutesLocal, formatDateWithoutTimeLocal } from '@utils/date-time'
import { t } from '@utils/translations'

import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './chat-info-user.style'

interface ChatInfoHeaderUserProps {
  currentChat: Chat
}

export const ChatInfoUser: FC<ChatInfoHeaderUserProps> = memo(({ currentChat }) => {
  const { classes: styles, cx } = useStyles()

  const isFavoritesChat = useMemo(() => currentChat.type === ChatsType.SAVED, [currentChat])
  const isGroupChat = useMemo(() => currentChat.type === ChatsType.GROUP, [currentChat])

  const currentOpponent = getChatOponent(currentChat?.users as unknown as IFullUser[])

  const isOnlineUser = checkOnline(currentChat?.type, currentOpponent as unknown as IFullUser)
  const lastSeen = currentOpponent?.lastSeen as string
  const dateGap = getDistanceBetweenDatesSeconds(new Date(), new Date(lastSeen))

  const chatTitle = isGroupChat ? currentChat?.info?.title : currentOpponent?.name

  const lastSeenMessage =
    dateGap > ONE_DAY_IN_SECONDS
      ? `${t(TranslationKey['Last seen'], {
          date: formatDateWithoutTimeLocal(new Date(lastSeen)),
        })}`
      : `${t(TranslationKey.Today)} ${formatDateTimeHourAndMinutesLocal(new Date(lastSeen))}`

  const defaultChatSubTitle = isOnlineUser ? t(TranslationKey.Online) : lastSeenMessage

  const chatSubTitle = isGroupChat
    ? t(TranslationKey.members, { amount: currentChat?.users?.length })
    : defaultChatSubTitle

  return (
    <div className={styles.chatInfoHeaderWrapper}>
      <p className={cx(styles.text, styles.title)} title={chatTitle}>
        {chatTitle}
      </p>

      {isFavoritesChat ? null : (
        <p className={cx(styles.text, styles.subTitle)} title={chatSubTitle}>
          {chatSubTitle}
        </p>
      )}
    </div>
  )
})
