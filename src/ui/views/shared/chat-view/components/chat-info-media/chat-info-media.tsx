import { FC, memo, useMemo } from 'react'
import { GoPencil } from 'react-icons/go'

import { ChatsType } from '@constants/keys/chats'

import { Chat } from '@models/chat-model-new/types/chat.type'
import { UserModel } from '@models/user-model'

import { CustomButton } from '@components/shared/custom-button'

import { getChatAvatarSrc } from '@utils/chat/get-chat-avatar-src'

import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './chat-info-media.style'

import { ChatAvatar } from '../chat-avatar'
import { ChatInfoUser } from '../chat-info-user'

interface ChatInfoMediaProps {
  chat: Chat
  onOpenEditChat: () => void
}

export const ChatInfoMedia: FC<ChatInfoMediaProps> = memo(({ chat, onOpenEditChat }) => {
  const { classes: styles } = useStyles()

  const isGroupChat = useMemo(() => chat.type === ChatsType.GROUP, [chat])
  const isFavoritesChat = useMemo(() => chat.type === ChatsType.SAVED, [chat])

  const avatarSrc = useMemo(() => getChatAvatarSrc(chat, isGroupChat), [chat])
  const currentUserId = (UserModel.userInfo as unknown as IFullUser)?._id
  const isEditableChat = isGroupChat && currentUserId === chat.info?.createdBy

  return (
    <div className={styles.chatInfoUser}>
      <ChatAvatar size={90} isFavoritesChat={isFavoritesChat} avatarSrc={avatarSrc} />
      <div className={styles.chatEditWrapper}>
        <ChatInfoUser currentChat={chat} />

        {isEditableChat ? <CustomButton type="primary" icon={<GoPencil size={20} />} onClick={onOpenEditChat} /> : null}
      </div>
    </div>
  )
})
