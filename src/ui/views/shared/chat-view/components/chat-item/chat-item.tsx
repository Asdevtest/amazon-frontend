import { Avatar } from 'antd'
import { FC, memo, useMemo } from 'react'

import { ChatsType } from '@constants/keys/chats'

import { Chat } from '@models/chat-model-new/types/chat.type'

import { CustomButton } from '@components/shared/custom-button'
import { FavoritesIcon } from '@components/shared/svg-icons/favorites-icon/favorites-icon'

import { getChatTitle } from '@utils/chat/get-chat-title'
import { formatDateWithoutTimeLocal } from '@utils/date-time'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getUserAvatarSrc } from '@utils/get-user-avatar'

import { useStyles } from './chat-item.style'

interface ChatItemProps {
  chat: Chat
  onClickChat: (chat: Chat) => void
}

export const ChatItem: FC<ChatItemProps> = memo(({ chat, onClickChat }) => {
  const { classes: styles, cx } = useStyles()

  const isFavoritesChat = useMemo(() => chat.type === ChatsType.SAVED, [])
  const isGroupChat = useMemo(() => chat.type === ChatsType.GROUP, [])

  const avatarSrc = useMemo(() => {
    if (isGroupChat) {
      return getAmazonImageUrl(chat.info?.image)
    } else {
      return getUserAvatarSrc(chat.users[0]._id)
    }
  }, [])

  const chatTitle = useMemo(() => getChatTitle(chat), [])
  const lastMessageDate = useMemo(() => formatDateWithoutTimeLocal(chat.lastMessage?.updatedAt), [chat.lastMessage])

  return (
    <CustomButton type="text" className={styles.chatItem} onClick={() => onClickChat(chat)}>
      {isFavoritesChat ? (
        <FavoritesIcon className={cx(styles.favoritesIcon, styles.avatar)} />
      ) : (
        <Avatar shape="circle" src={avatarSrc} className={styles.avatar} />
      )}

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
