import { Badge } from 'antd'
import { FC, memo, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Chat } from '@models/chat-model-new/types/chat.type'

import { CustomButton } from '@components/shared/custom-button'

import { getChatAvatarSrc } from '@utils/chat/get-chat-avatar-src'
import { formatDateWithoutTimeLocal } from '@utils/date-time'
import { t } from '@utils/translations'

import { useStyles } from './chat-item.style'

import { useOnlineUser } from '../../hooks/use-online-user'
import { ChatAvatar } from '../chat-avatar'

interface ChatItemProps {
  chat: Chat
  onClickChat: (chat: Chat) => void

  isActiveChat?: boolean
}

export const ChatItem: FC<ChatItemProps> = memo(({ chat, isActiveChat, onClickChat }) => {
  const { classes: styles, cx } = useStyles()

  const { chatTitle, isFavoritesChat, isGroupChat, isOnlineUser, isTyping } = useOnlineUser(chat)

  const avatarSrc = useMemo(() => getChatAvatarSrc(chat, isGroupChat), [])

  const lastMessageDate = useMemo(() => formatDateWithoutTimeLocal(chat.lastMessage?.updatedAt), [chat.lastMessage])
  const unreadMessages = useMemo(() => chat.unread, [chat.unread])

  return (
    <CustomButton
      type="text"
      className={cx(styles.chatItem, { [styles.activeChatItem]: isActiveChat })}
      onClick={() => onClickChat(chat)}
    >
      <Badge dot={isOnlineUser} offset={[-5, 40]}>
        <ChatAvatar avatarSrc={avatarSrc} isFavoritesChat={isFavoritesChat} />
      </Badge>

      <div className={styles.chatItemInfo}>
        <div className={styles.titleWrapper}>
          <p className={cx(styles.text, styles.title)}>{chatTitle}</p>
          <p className={styles.lastMessageDate}>{lastMessageDate}</p>
        </div>

        <div className={styles.lastMessageBlock}>
          <p className={cx(styles.text, { [styles.textTyping]: isTyping })}>
            {isTyping ? `${t(TranslationKey.typing)}...` : chat.lastMessage?.text}
          </p>
          {unreadMessages ? <Badge count={unreadMessages} className={styles.badge} /> : null}
        </div>
      </div>
    </CustomButton>
  )
})
