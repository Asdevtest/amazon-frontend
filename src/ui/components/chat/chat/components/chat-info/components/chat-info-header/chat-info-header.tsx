import { FC, memo } from 'react'
import { IoClose } from 'react-icons/io5'

import { chatsType } from '@constants/keys/chats'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'

import { CurrentOpponent } from '@components/chat/multiple-chats'
import { CustomAvatar } from '@components/shared/custom-avatar'
import { CustomButton } from '@components/shared/custom-button'
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
  onClickCloseChatInfo: () => void
  isGroupChat?: boolean
  currentOpponent?: CurrentOpponent
}

export const ChatInfoHeader: FC<Props> = memo(props => {
  const { chat, currentOpponent, isGroupChat, userId, onClickEditGroupChatInfo, onClickCloseChatInfo } = props
  const { classes: styles, cx } = useStyles()

  const isSavedChat = chat.type === chatsType.SAVED

  const chatAvatar =
    !isGroupChat && currentOpponent
      ? getUserAvatarSrc(currentOpponent?._id)
      : getAmazonImageUrl(chat?.info?.image) || '/assets/img/no-photo.jpg'

  return (
    <div className={cx(styles.chatHeader, { [styles.headerSavedChat]: isSavedChat })}>
      <div className={styles.chatInfoHeader}>
        <p className={styles.chatInfoTitle}>{t(TranslationKey['Chat info'])}</p>

        <CustomButton icon={<IoClose />} onClick={onClickCloseChatInfo} />
      </div>

      <div className={styles.chatHeaderContent}>
        <div className={styles.chatAvatarWrapper}>
          <CustomAvatar initialUrl={chatAvatar} />
        </div>

        {isSavedChat ? null : (
          <div className={styles.chatInfo}>
            <div className={styles.chatTitleWrapper}>
              <div>
                <p className={styles.chatTitle}>{(isGroupChat && chat?.info?.title) || currentOpponent?.name}</p>
              </div>

              {isGroupChat ? (
                <p className={styles.chatSubTitle}>
                  {`${chat?.users?.length} ${t(TranslationKey.Participants).toLocaleLowerCase()}`}
                </p>
              ) : null}
            </div>

            {isGroupChat && userId === chat.info?.createdBy ? (
              <CustomButton type="primary" icon={<PencilIcon />} onClick={onClickEditGroupChatInfo} />
            ) : null}
          </div>
        )}
      </div>

      {/* {isSavedChat ? (
        <FavoritesIcon className={styles.favoritesIcon} />
      ) : (
        <img src={chatAvatar} alt="chat avatar" className={styles.chatAvatar} />
      )} */}
    </div>
  )
})
