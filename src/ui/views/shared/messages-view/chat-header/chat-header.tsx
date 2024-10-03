import { Avatar } from 'antd'
import { FC, memo } from 'react'
import { RiShareForwardFill } from 'react-icons/ri'

import { Link } from '@mui/material'

import { ChatsType } from '@constants/keys/chats'
import { ONE_DAY_IN_SECONDS } from '@constants/time'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { ChatSoundNotification } from '@components/chat/chat-sound-notification'
import { CurrentOpponent } from '@components/chat/multiple-chats'
import { CustomButton } from '@components/shared/custom-button'
import { ArrowBackIcon } from '@components/shared/svg-icons'

import { checkOnline } from '@utils/checks/check-online/check-online'
import { getDistanceBetweenDatesSeconds } from '@utils/checks/get-distance-between-dates-seconds/get-distance-between-dates-seconds'
import { formatDateTimeHourAndMinutesLocal, formatDateWithoutTimeLocal } from '@utils/date-time'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { PaginationDirection } from '@typings/enums/pagination-direction'

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
  selectedMessages: string[]

  onClearSelectedMessages: () => void
  handleLoadMoreMessages: (direction?: PaginationDirection, selectedMessageId?: string) => void
  onToggleMuteCurrentChat: () => void
  onClickBackButton: () => void
  onChangeMesSearchValue: (value: string, chatId: string) => void
  onChangeCurFoundedMessage: (index: number) => void
  onClickForwardMessages: () => void
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
    selectedMessages,
    onClearSelectedMessages,
    handleLoadMoreMessages,
    onToggleMuteCurrentChat,
    onChangeMesSearchValue,
    onChangeCurFoundedMessage,
    onClickBackButton,
    onClickForwardMessages,
  } = props

  const onChangeCurrentMessage = async (index: number, messageId: string) => {
    await handleLoadMoreMessages(undefined, messageId)
    onChangeCurFoundedMessage(index)
  }

  const isOnlineUser = checkOnline(currentChat?.type, currentOpponent)
  const dateGap = getDistanceBetweenDatesSeconds(new Date(), new Date(currentOpponent?.lastSeen))

  const lastSeenMessage =
    dateGap > ONE_DAY_IN_SECONDS
      ? // @ts-ignore
        `${t(TranslationKey['Last seen'], { date: formatDateWithoutTimeLocal(new Date(currentOpponent?.lastSeen)) })}`
      : // @ts-ignore
        `${t(TranslationKey.Today)} ${formatDateTimeHourAndMinutesLocal(new Date(currentOpponent?.lastSeen))}`

  return (
    <div className={styles.header}>
      {selectedMessages?.length ? (
        <div className={styles.forwardWrapper}>
          <CustomButton size="large" icon={<RiShareForwardFill />} onClick={onClickForwardMessages}>{`${t(
            TranslationKey.Forward,
          )} ${selectedMessages.length}`}</CustomButton>

          <CustomButton size="large" onClick={onClearSelectedMessages}>
            {t(TranslationKey.Cancel)}
          </CustomButton>
        </div>
      ) : isChatSelectedAndFound ? (
        <div className={styles.leftSideHeader}>
          <div className={styles.infoContainer}>
            <div className={styles.arrowBackIconWrapper}>
              <ArrowBackIcon className={styles.arrowBackIcon} onClick={onClickBackButton} />
              {unreadMessages > 0 && <span className={styles.badge}>{unreadMessages}</span>}
            </div>

            {currentChat?.type === ChatsType.DEFAULT ? (
              <>
                <div className={styles.rersonalWrapper}>
                  <Link
                    target="_blank"
                    href={`${window.location.origin}/another-user?${currentOpponent?._id}`}
                    underline="none"
                  >
                    <div className={styles.opponentWrapper}>
                      <Avatar src={getUserAvatarSrc(currentOpponent?._id)} alt="avatar" size={40} />
                      <div>
                        <p className={styles.opponentName}>{currentOpponent?.name}</p>
                        {isOnlineUser ? (
                          <p className={styles.usersCount}>{t(TranslationKey.Online)}</p>
                        ) : (
                          <p className={styles.usersCount}>{lastSeenMessage}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>

                <ChatSoundNotification isMuteChat={isMuteCurrentChat} onToggleMuteChat={onToggleMuteCurrentChat} />
              </>
            ) : currentChat?.type === ChatsType.SAVED ? (
              <ChatSoundNotification isMuteChat={isMuteCurrentChat} onToggleMuteChat={onToggleMuteCurrentChat} />
            ) : (
              <>
                <div className={styles.opponentWrapper}>
                  <Avatar src={getAmazonImageUrl(currentChat?.info?.image)} alt="avatar" size={40} />
                  <div>
                    <p className={styles.opponentName}>{currentChat?.info?.title}</p>
                    <p className={styles.usersCount}>{`${currentChat?.users?.length} ${t(
                      TranslationKey.members,
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
      ) : null}
    </div>
  )
})
