import { Avatar } from 'antd'
import { FC, memo, useMemo } from 'react'

import { chatsType } from '@constants/keys/chats'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'

import { CustomButton } from '@components/shared/custom-button'
import { FavoritesIcon } from '@components/shared/svg-icons/favorites-icon/favorites-icon'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './chat-item.style'

import { getChatTitle } from '../helpers/get-chat-title'

interface ChatItemProps {
  chat: ChatContract
  user: IFullUser
  onClickChat: () => void
}

export const ChatItem: FC<ChatItemProps> = memo(props => {
  const { chat, user, onClickChat } = props
  const { classes: styles } = useStyles()

  const isFavoritesChat = useMemo(() => chat?.type === 'SAVED', [])
  const isGroupChat = useMemo(() => chat.type === chatsType.GROUP, [])
  const isDefaultChat = useMemo(() => chat.type === chatsType.DEFAULT, [])
  const chatTitle = useMemo(() => getChatTitle(chat, user), [])
  const chatUsers = useMemo(() => chat.users, [])
  const oponentUser = useMemo(() => chatUsers.find(chatUser => chatUser._id !== user._id), [])

  return (
    <CustomButton className={styles.chatItemWrapper} type="text" onClick={onClickChat}>
      {isFavoritesChat ? (
        <FavoritesIcon className={styles.favoritesIcon} />
      ) : (
        <Avatar
          className={styles.avatar}
          shape="circle"
          src={isGroupChat ? getAmazonImageUrl(chat.info?.image) : getUserAvatarSrc(oponentUser?._id)}
        />
      )}

      <div className={styles.chatItemInfo}>
        <p className={styles.chatItemTitle}>{chatTitle}</p>
        {chatUsers?.length && !isDefaultChat && !isFavoritesChat ? (
          <p>{`${chatUsers?.length} ${t(TranslationKey.Members)}`}</p>
        ) : null}
      </div>
    </CustomButton>
  )
})
