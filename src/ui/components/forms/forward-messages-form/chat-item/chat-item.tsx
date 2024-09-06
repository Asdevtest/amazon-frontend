import { Avatar } from 'antd'
import { FC, memo, useMemo } from 'react'

import { chatsType } from '@constants/keys/chats'

import { ChatContract } from '@models/chat-model/contracts'

import { FavoritesIcon } from '@components/shared/svg-icons/favorites-icon/favorites-icon'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getUserAvatarSrc } from '@utils/get-user-avatar'

import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './chat-item.style'

import { getChatTitle } from '../helpers/get-chat-title'

interface ChatItemProps {
  chat: ChatContract
  user: IFullUser
}

export const ChatItem: FC<ChatItemProps> = memo(({ chat, user }) => {
  const { classes: styles, cx } = useStyles()

  const isFavoritesChat = useMemo(() => chat?.type === 'SAVED', [])
  const isGroupChat = useMemo(() => chat.type === chatsType.GROUP, [])
  const chatTitle = useMemo(() => getChatTitle(chat, user), [])
  const chatUsers = useMemo(() => chat.users, [])
  const oponentUser = useMemo(() => chatUsers.find(chatUser => chatUser._id !== user._id), [])

  return (
    <div>
      {isFavoritesChat ? (
        <FavoritesIcon className={cx(styles.favoritesIcon, styles.avatar)} />
      ) : (
        <Avatar
          src={isGroupChat ? getAmazonImageUrl(chat.info?.image) : getUserAvatarSrc(oponentUser?._id)}
          className={styles.avatar}
        />
      )}

      <div>
        <p>{chatTitle}</p>
        <p>{chatUsers?.length}</p>
      </div>
    </div>
  )
})
