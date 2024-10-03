import { Avatar } from 'antd'
import { FC, memo, useMemo } from 'react'

import { ChatsType } from '@constants/keys/chats'

import { Chat } from '@models/chat-model-new/types/chat.type'

import { CustomButton } from '@components/shared/custom-button'
import { FavoritesIcon } from '@components/shared/svg-icons/favorites-icon/favorites-icon'

import { getChatAvatarSrc } from '@utils/chat/get-chat-avatar-src'
import { getChatOponent } from '@utils/chat/get-chat-oponent'
import { getChatTitle } from '@utils/chat/get-chat-title'
import { formatDateWithoutTimeLocal } from '@utils/date-time'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getUserAvatarSrc } from '@utils/get-user-avatar'

import { useStyles } from './chat-item.style'

import { ChatAvatar } from '../chat-avatar'

interface ChatItemProps {
  chat: Chat
  onClickChat: (chat: Chat) => void
}

export const ChatItem: FC<ChatItemProps> = memo(({ chat, onClickChat }) => {
  const { classes: styles, cx } = useStyles()

  const isFavoritesChat = useMemo(() => chat.type === ChatsType.SAVED, [])
  const isGroupChat = useMemo(() => chat.type === ChatsType.GROUP, [])

  const avatarSrc = useMemo(() => getChatAvatarSrc(chat, isGroupChat), [])

  const chatTitle = useMemo(() => getChatTitle(chat), [])
  const lastMessageDate = useMemo(() => formatDateWithoutTimeLocal(chat.lastMessage?.updatedAt), [chat.lastMessage])

  return (
    <CustomButton type="text" className={styles.chatItem} onClick={() => onClickChat(chat)}>
      <ChatAvatar avatarSrc={avatarSrc} isFavoritesChat={isFavoritesChat} />

      <div className={styles.chatItemInfo}>
        <div className={styles.titleWrapper}>
          <p className={cx(styles.text, styles.title)}>{chatTitle}</p>
          <p className={styles.lastMessageDate}>{lastMessageDate}</p>
        </div>

        <p className={styles.text}>{chat.lastMessage?.text}</p>
      </div>
    </CustomButton>
  )
})
