import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Chat } from '@models/chat-model-new/types/chat.type'

import { t } from '@utils/translations'

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
