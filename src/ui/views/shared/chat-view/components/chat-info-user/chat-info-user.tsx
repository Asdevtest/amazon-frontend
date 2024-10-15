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

import { useOnlineUser } from '../../hooks/use-online-user'

interface ChatInfoHeaderUserProps {
  currentChat: Chat
}

export const ChatInfoUser: FC<ChatInfoHeaderUserProps> = memo(({ currentChat }) => {
  const { classes: styles, cx } = useStyles()

  const { chatTitle, isFavoritesChat, isGroupChat, isOnlineUser, lastSeenMessage } = useOnlineUser(currentChat)

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
