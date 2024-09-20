/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar } from 'antd'
import { FC, memo } from 'react'
import { Link } from 'react-router-dom'

import { ChatMessageContract, ChatMessageType } from '@models/chat-model/contracts/chat-message.contract'

import { formatDateWithoutTimeLocal } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'

import { PaginationDirection } from '@typings/enums/pagination-direction'

import { useHover } from '@hooks/use-hover'

import { useStyles } from './chat-message-item.style'

import { ChatMessageByType } from '../chat-message-by-type'
import { ChatMessageControlsOverlay } from '../chat-message-controls-overlay'
import { ChatMessageRequestProposalDesignerResultEditedHandlers } from '../chat-messages/chat-message-designer-proposal-edited-result'

interface ChatMessageItemProps {
  messageItem: ChatMessageContract
  indexFromTable: number
  firstItemIndex: number
  userId: string
  messages: ChatMessageContract[]
  messagesFoundIds: string[]
  onClickReply: (messageItem: ChatMessageContract) => void
  messageToScroll?: number
  selectedMessages?: string[]
  handlers?: ChatMessageRequestProposalDesignerResultEditedHandlers
  searchPhrase?: string
  isGroupChat?: boolean
  isFreelanceOwner?: boolean
  isMobileResolution?: boolean
  isShowChatInfo?: boolean
  onSelectMessage?: (message: ChatMessageContract) => void
  onClickForwardMessages?: () => void
  handleLoadMoreMessages?: (direction?: PaginationDirection | undefined, messageId?: string) => void
}

export const ChatMessageItem: FC<ChatMessageItemProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const {
    messageItem,
    indexFromTable,
    firstItemIndex,
    messageToScroll,
    userId,
    messages,
    isGroupChat,
    isFreelanceOwner,
    isMobileResolution,
    handleLoadMoreMessages,
    isShowChatInfo,
    handlers,
    messagesFoundIds,
    searchPhrase,
    onClickReply,
    selectedMessages,
    onSelectMessage,
    onClickForwardMessages,
  } = props

  const messageItemHover = useHover()

  const index = indexFromTable - firstItemIndex

  const isHighlighted = messageToScroll === index

  const isIncomming = userId !== messageItem.user?._id

  const isNotPersonal = !messageItem.user?._id || messageItem.type === ChatMessageType.SYSTEM

  const isLastMessage = index === messages.length - 1

  const isNextMessageSameAuthor =
    !isLastMessage && messages[index + 1]?.user?._id === messageItem.user?._id && !isNotPersonal

  const isBeforeMessageAnotherAuthor = messages[index - 1]?.user?._id !== messageItem.user?._id

  const unReadMessage = !messageItem.isRead

  const showName = (isGroupChat || !!isFreelanceOwner) && isBeforeMessageAnotherAuthor && !isNotPersonal && isIncomming

  const isDisabledControls = messageItem.type !== ChatMessageType.USER

  const isRequestOrProposal = !!messageItem.data
  // @ts-ignore
  const isSelectedMessage = selectedMessages?.some((message: ChatMessageContract) => message?._id === messageItem?._id)

  const createdAtLocalDatePrevMessage = messages[index - 1]?.createdAt
  const createdAtLocalDate = messageItem.createdAt

  const onClickCopyMessageText = () => {
    navigator.clipboard.writeText(messageItem.text)
  }

  return (
    <div
      className={cx({
        [styles.unReadMessage]: unReadMessage && userId !== messageItem.user?._id,
      })}
      {...messageItemHover?.[1]}
      onClick={() => {
        if (selectedMessages?.length && messageItem?.type === ChatMessageType.USER) {
          onSelectMessage?.(messageItem)
        }
      }}
    >
      {index === 0 ||
      formatDateWithoutTimeLocal(createdAtLocalDatePrevMessage) !== formatDateWithoutTimeLocal(createdAtLocalDate) ? (
        <div className={styles.timeTextWrapper}>
          <p className={styles.timeText}>{formatDateWithoutTimeLocal(createdAtLocalDate)}</p>
        </div>
      ) : null}

      <ChatMessageControlsOverlay
        showDropdown={!isDisabledControls && messageItemHover?.[0]}
        isSelectedMessage={isSelectedMessage}
        onSelectMessage={() => onSelectMessage?.(messageItem)}
        onClickReply={() => onClickReply(messageItem)}
        onClickForwardMessages={onClickForwardMessages}
        onClickCopyMessageText={onClickCopyMessageText}
      >
        <div
          className={cx(styles.messageWrapper, {
            [styles.highlightMessage]: isSelectedMessage || isHighlighted,
            [styles.messageWrapperIsIncomming]: isIncomming,
            [styles.messageWrapperisNotPersonal]: isNotPersonal,
          })}
        >
          {!isMobileResolution && !isNextMessageSameAuthor && !isNotPersonal ? (
            <Link
              to={
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
                    handleLoadMoreMessages?.(undefined, messageItem?.replyMessage?._id)
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
      </ChatMessageControlsOverlay>
    </div>
  )
})
