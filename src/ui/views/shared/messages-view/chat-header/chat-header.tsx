import { FC, memo } from 'react'

import { Link } from '@mui/material'

import { chatsType } from '@constants/keys/chats'
import { PaginationDirection } from '@constants/pagination/pagination-direction'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { ChatSoundNotification } from '@components/chat/chat-sound-notification'
import { CurrentOpponent } from '@components/chat/multiple-chats'
import { ArrowBackIcon } from '@components/shared/svg-icons'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { useStyles } from './chat-header.style'

import { SearchInputComponent } from '../search-input-component'

interface ChatHeaderProps {
  isChatSelectedAndFound: boolean
  currentChat: ChatContract
  searchInputValue: string
  isTabletResolution: boolean
  isMuteCurrentChat: boolean
  foundMessages: ChatMessageContract[]
  curFoundedMessageIndex: number
  unreadMessages: number
  currentOpponent?: CurrentOpponent

  handleLoadMoreMessages: (direction?: PaginationDirection, selectedMessageId?: string) => void
  onToggleMuteCurrentChat: () => void
  onClickBackButton: () => void
  onChangeMesSearchValue: (value: string, chatId: string) => void
  onChangeCurFoundedMessage: (index: number) => void
}

export const ChatHeader: FC<ChatHeaderProps> = memo(props => {
  const { classes: styles } = useStyles()

  const {
    isChatSelectedAndFound,
    currentChat,
    unreadMessages,
    searchInputValue,
    isTabletResolution,
    foundMessages,
    currentOpponent,
    curFoundedMessageIndex,
    isMuteCurrentChat,
    handleLoadMoreMessages,
    onToggleMuteCurrentChat,
    onChangeMesSearchValue,
    onChangeCurFoundedMessage,
    onClickBackButton,
  } = props

  const onChangeCurrentMessage = async (index: number, messageId: string) => {
    await handleLoadMoreMessages(undefined, messageId)
    onChangeCurFoundedMessage(index)
  }

  return (
    <div className={styles.header}>
      {isChatSelectedAndFound && (
        <div className={styles.leftSideHeader}>
          <div className={styles.infoContainer}>
            <div className={styles.arrowBackIconWrapper}>
              <ArrowBackIcon className={styles.arrowBackIcon} onClick={onClickBackButton} />
              {unreadMessages > 0 && <span className={styles.badge}>{unreadMessages}</span>}
            </div>

            {currentChat?.type === chatsType.DEFAULT ? (
              <>
                <div className={styles.rersonalWrapper}>
                  <Link
                    target="_blank"
                    href={`${window.location.origin}/another-user?${currentOpponent?._id}`}
                    underline="none"
                  >
                    <div className={styles.opponentWrapper}>
                      <img src={getUserAvatarSrc(currentOpponent?._id)} className={styles.avatar} alt="avatar" />
                      <p className={styles.opponentName}>{currentOpponent?.name}</p>
                    </div>
                  </Link>
                </div>

                <ChatSoundNotification isMuteChat={isMuteCurrentChat} onToggleMuteChat={onToggleMuteCurrentChat} />
              </>
            ) : (
              <>
                <div className={styles.opponentWrapper}>
                  <img src={getAmazonImageUrl(currentChat?.info?.image)} className={styles.avatar} />
                  <div>
                    <p className={styles.opponentName}>{currentChat?.info?.title}</p>
                    <p className={styles.usersCount}>{`${currentChat?.users?.length} ${t(
                      TranslationKey.Members,
                    ).toLocaleLowerCase()}`}</p>
                  </div>
                </div>

                <ChatSoundNotification isMuteChat={isMuteCurrentChat} onToggleMuteChat={onToggleMuteCurrentChat} />
              </>
            )}
          </div>

          <SearchInputComponent
            currentChatId={currentChat?._id}
            searchInputValue={searchInputValue}
            isTabletResolution={isTabletResolution}
            foundMessages={foundMessages}
            curFoundedMessageIndex={curFoundedMessageIndex}
            onChangeMesSearchValue={onChangeMesSearchValue}
            onChangeCurFoundedMessage={onChangeCurrentMessage}
          />
        </div>
      )}
    </div>
  )
})
