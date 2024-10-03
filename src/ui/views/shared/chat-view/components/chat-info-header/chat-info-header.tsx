import { FC, memo, useMemo } from 'react'
import { GoPencil } from 'react-icons/go'
import { HiOutlinePencil } from 'react-icons/hi2'
import { IoClose } from 'react-icons/io5'

import { ChatsType } from '@constants/keys/chats'
import { TranslationKey } from '@constants/translations/translation-key'

import { Chat } from '@models/chat-model-new/types/chat.type'
import { UserModel } from '@models/user-model'

import { CustomButton } from '@components/shared/custom-button'

import { getChatAvatarSrc } from '@utils/chat/get-chat-avatar-src'
import { getChatTitle } from '@utils/chat/get-chat-title'
import { t } from '@utils/translations'

import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './chat-info-header.style'

import { ChatAvatar } from '../chat-avatar'
import { ChatInfoUser } from '../chat-info-user'

interface ChatInfoHeaderProps {
  chat: Chat
}

export const ChatInfoHeader: FC<ChatInfoHeaderProps> = memo(({ chat }) => {
  const { classes: styles, cx } = useStyles()

  const isGroupChat = useMemo(() => chat.type === ChatsType.GROUP, [])
  const isFavoritesChat = useMemo(() => chat.type === ChatsType.SAVED, [])

  const avatarSrc = useMemo(() => getChatAvatarSrc(chat, isGroupChat), [])
  const currentUserId = (UserModel.userInfo as unknown as IFullUser)?._id
  const isEditableChat = isGroupChat && currentUserId === chat.info?.createdBy

  return (
    <div className={styles.chatInfoHeader}>
      <div className={styles.chatInfoTitle}>
        <p>{t(TranslationKey['Chat info'])}</p>

        <CustomButton type="text" icon={<IoClose size={20} />} /* onClick={onClickCloseChatInfo} */ />
      </div>

      <div className={styles.chatInfoUser}>
        <ChatAvatar size={90} isFavoritesChat={isFavoritesChat} avatarSrc={avatarSrc} />
        <div className={styles.chatEditWrapper}>
          <ChatInfoUser currentChat={chat} />

          {isEditableChat ? (
            <CustomButton type="primary" icon={<GoPencil size={20} />} /* onClick={onClickEditGroupChatInfo} */ />
          ) : null}
        </div>
      </div>
    </div>
  )
})
