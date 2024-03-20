import { FC, Ref, RefObject, memo, useEffect } from 'react'
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'

import { Avatar, Link } from '@mui/material'

import { PaginationDirection } from '@constants/pagination/pagination-direction'

import { ChatModel } from '@models/chat-model'
import { ChatContract } from '@models/chat-model/contracts'
import { ChatMessageContract, ChatMessageType } from '@models/chat-model/contracts/chat-message.contract'

import { formatDateWithoutTime } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

import { useStyles } from './chat-messages-list.style'

import { ChatMessageByType, ChatMessageControlsOverlay } from './components'
import { ChatMessageRequestProposalDesignerResultEditedHandlers } from './components/chat-messages/chat-message-designer-proposal-edited-result'

interface ChatMessagesListProps {
  chat: ChatContract
  isGroupChat: boolean
  userId: string
  firstItemIndex: number
  messages?: ChatMessageContract[]
  handlers?: ChatMessageRequestProposalDesignerResultEditedHandlers
  messagesFound?: ChatMessageContract[]
  searchPhrase?: string

  isShowChatInfo?: boolean
  isFreelanceOwner?: boolean
  messageToScroll: number | undefined
  setMessageToReply: (mes: ChatMessageContract | null) => void
  messagesWrapperRef: RefObject<VirtuosoHandle | undefined>
  handleScrollToBottomButtonVisibility: (bottomState: boolean) => void
  handleLoadMoreMessages: (direction?: PaginationDirection | undefined, messageId?: string) => void
}

export const ChatMessagesList: FC<ChatMessagesListProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const {
    chat,
    messages = [],
    userId,
    handlers,
    messagesFound,
    searchPhrase,
    isGroupChat,
    messageToScroll,
    isShowChatInfo,
    messagesWrapperRef,
    isFreelanceOwner,
    firstItemIndex,
    handleLoadMoreMessages,
    setMessageToReply,
    handleScrollToBottomButtonVisibility,
  } = props

  const { isMobileResolution } = useCreateBreakpointResolutions()

  const chatId = chat?._id
  const messagesFoundIds = messagesFound?.map(el => el._id) || []

  const onClickReply = (messageItem: ChatMessageContract) => {
    setMessageToReply(messageItem)
  }

  useEffect(() => {
    const unReadMessages = messages?.filter(el => el.user?._id !== userId && !el.isRead)

    if (unReadMessages?.length && chatId) {
      ChatModel.readMessages(
        chatId,
        unReadMessages.map(el => el._id),
      )
    }
  }, [messages?.length])

  const renderItem = (messageItem: ChatMessageContract, indexFromTable: number) => {
    const index = indexFromTable - firstItemIndex

    const isHighlighted = messageToScroll === index

    const isIncomming = userId !== messageItem.user?._id

    const isNotPersonal = !messageItem.user?._id || messageItem.type === ChatMessageType.SYSTEM

    const isLastMessage = index === messages.length - 1

    const isNextMessageSameAuthor =
      !isLastMessage && messages[index + 1]?.user?._id === messageItem.user?._id && !isNotPersonal

    const isBeforeMessageAnotherAuthor = messages[index - 1]?.user?._id !== messageItem.user?._id

    const unReadMessage = !messageItem.isRead

    const showName =
      (isGroupChat || !!isFreelanceOwner) && isBeforeMessageAnotherAuthor && !isNotPersonal && isIncomming

    const isDisabledControls = messageItem.type !== ChatMessageType.USER

    const isRequestOrProposal = !!messageItem.data

    return (
      <div
        className={cx(styles.message, {
          [styles.highlightMessage]: isHighlighted,
          [styles.unReadMessage]: unReadMessage && userId !== messageItem.user?._id,
        })}
      >
        {index === 0 ||
        formatDateWithoutTime(messages[index - 1]?.createdAt) !== formatDateWithoutTime(messageItem?.createdAt) ? (
          <div className={styles.timeTextWrapper}>
            <p className={styles.timeText}>{formatDateWithoutTime(messageItem?.createdAt)}</p>
          </div>
        ) : null}

        <div className={styles.messageContent}>
          <div
            className={cx(styles.messageWrapper, {
              [styles.messageWrapperIsIncomming]: isIncomming,
              [styles.messageWrapperisNotPersonal]: isNotPersonal,
            })}
          >
            {!isMobileResolution && !isNextMessageSameAuthor && !isNotPersonal ? (
              <Link
                target="_blank"
                href={
                  userId === messageItem.user?._id
                    ? `${window.location.origin}/profile`
                    : `${window.location.origin}/another-user?${messageItem.user?._id}`
                }
              >
                <Avatar
                  src={getUserAvatarSrc(messageItem.user?._id)}
                  className={cx(styles.messageAvatarWrapper, {
                    [styles.messageAvatarWrapperIsIncomming]: isIncomming,
                  })}
                />
              </Link>
            ) : null}

            <div
              className={cx({
                [styles.messageInnerWrapper]: isFreelanceOwner && isRequestOrProposal,
                [styles.messageInnerIsNextMessageSameAuthor]: isNextMessageSameAuthor && !isIncomming,
                [styles.messageInnerIsNextMessageSameAuthorIsInclomming]: isNextMessageSameAuthor && isIncomming,
              })}
            >
              <div className={styles.messageInnerContentWrapper}>
                {!!messageItem?.replyMessage && (
                  <div
                    className={styles.repleyWrapper}
                    onClick={e => {
                      e.stopPropagation()
                      handleLoadMoreMessages(undefined, messageItem?.replyMessage?._id)
                    }}
                  >
                    <div className={styles.repleyDivider} />
                    <ChatMessageByType
                      showName={false}
                      isIncomming={isIncomming}
                      messageItem={messageItem?.replyMessage}
                      isShowChatInfo={isShowChatInfo}
                      unReadMessage={false}
                    />
                  </div>
                )}
                <ChatMessageByType
                  isIncomming={isIncomming}
                  messageItem={messageItem}
                  isShowChatInfo={isShowChatInfo}
                  unReadMessage={unReadMessage}
                  showName={showName}
                  handlers={handlers}
                  messagesFoundIds={messagesFoundIds}
                  searchPhrase={searchPhrase}
                />
              </div>
            </div>
          </div>

          {!isDisabledControls && <ChatMessageControlsOverlay onClickReply={() => onClickReply(messageItem)} />}
        </div>
      </div>
    )
  }

  return (
    <Virtuoso
      ref={messagesWrapperRef as Ref<VirtuosoHandle> | undefined}
      className={styles.list}
      firstItemIndex={firstItemIndex}
      initialTopMostItemIndex={messages?.length - 1}
      startReached={() => handleLoadMoreMessages(PaginationDirection.NEXT)}
      endReached={() => handleLoadMoreMessages(PaginationDirection.PREV)}
      atBottomStateChange={handleScrollToBottomButtonVisibility}
      atBottomThreshold={50}
      data={messages}
      itemContent={(index, message) => renderItem(message, index)}
      followOutput={isAtBottom => {
        if (isAtBottom && chat?.isAllPreviousMessagesLoaded) {
          return 'smooth'
        } else {
          return false
        }
      }}
    />
  )
})
