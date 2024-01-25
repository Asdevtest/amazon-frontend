import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'

import { CurrentOpponent } from '@components/chat/multiple-chats'
import { PencilIcon } from '@components/shared/svg-icons'

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
  const { classes: styles } = useStyles()

  const chatAvatar =
    !isGroupChat && currentOpponent
      ? getUserAvatarSrc(currentOpponent?._id)
      : getAmazonImageUrl(chat?.info?.image) || '/assets/img/no-photo.jpg'

  return (
    <div className={styles.chatHeader}>
      <img src={chatAvatar} alt="chat avatar" className={styles.chatAvatar} />
      <div className={styles.chatHeaderOverlay}>
        <p className={styles.chatTitle}>{(isGroupChat && chat?.info?.title) || currentOpponent?.name}</p>
        <p className={styles.chatSubTitle}>
          {isGroupChat && `${chat?.users?.length} ${t(TranslationKey.Participants).toLocaleLowerCase()}`}
        </p>
        {isGroupChat && userId === chat.info?.createdBy && (
          <PencilIcon className={styles.pencilEditIcon} onClick={onClickEditGroupChatInfo} />
        )}
      </div>
    </div>
  )
})
