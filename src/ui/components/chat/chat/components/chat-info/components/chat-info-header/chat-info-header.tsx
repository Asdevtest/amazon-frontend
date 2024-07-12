import { FC, memo } from 'react'

import { chatsType } from '@constants/keys/chats'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'

import { CurrentOpponent } from '@components/chat/multiple-chats'
import { PencilIcon } from '@components/shared/svg-icons'
import { FavoritesIcon } from '@components/shared/svg-icons/favorites-icon/favorites-icon'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { useStyles } from './chat-info-header.style'

interface Props {
  chat: ChatContract
  userId: string
  onClickEditGroupChatInfo: () => void
  isGroupChat?: boolean
  currentOpponent?: CurrentOpponent
}

export const ChatInfoHeader: FC<Props> = memo(props => {
  const { chat, currentOpponent, isGroupChat, userId, onClickEditGroupChatInfo } = props
  const { classes: styles, cx } = useStyles()

  const isSavedChat = chat.type === chatsType.SAVED

  const chatAvatar =
    !isGroupChat && currentOpponent
      ? getUserAvatarSrc(currentOpponent?._id)
      : getAmazonImageUrl(chat?.info?.image) || '/assets/img/no-photo.jpg'

  return (
    <div className={cx(styles.chatHeader, { [styles.headerSavedChat]: isSavedChat })}>
      {isSavedChat ? (
        <FavoritesIcon className={styles.favoritesIcon} />
      ) : (
        <img src={chatAvatar} alt="chat avatar" className={styles.chatAvatar} />
      )}
      {isSavedChat ? null : (
        <div className={styles.chatHeaderOverlay}>
          <p className={styles.chatTitle}>{(isGroupChat && chat?.info?.title) || currentOpponent?.name}</p>
          <p className={styles.chatSubTitle}>
            {isGroupChat && `${chat?.users?.length} ${t(TranslationKey.Participants).toLocaleLowerCase()}`}
          </p>
          {isGroupChat && userId === chat.info?.createdBy && (
            <PencilIcon className={styles.pencilEditIcon} onClick={onClickEditGroupChatInfo} />
          )}
        </div>
      )}
    </div>
  )
})
