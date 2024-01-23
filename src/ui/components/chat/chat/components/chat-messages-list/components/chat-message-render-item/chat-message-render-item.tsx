import { LegacyRef, useCallback } from 'react'

import { Avatar, Link } from '@mui/material'

import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { ChatMessageType } from '@services/websocket-chat-service'

import { formatDateWithoutTime } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'

import { useStyles } from './chat-message-render-item.style'

import { ChatMessageByType } from '../chat-message-by-type'
import { ChatMessageControlsOverlay } from '../chat-message-controls-overlay'
import { ChatMessageRequestProposalDesignerResultEditedHandlers } from '../chat-messages/chat-message-designer-proposal-edited-result'

interface ChatMessageRenderItemProps {
  messageItem: ChatMessageContract
  index: number
  userId: string
  messages: ChatMessageContract[]
  isGroupChat: boolean
  isFreelanceOwner?: boolean
  messageToScroll: ChatMessageContract | null
  messageToScrollRef?: LegacyRef<HTMLDivElement> | undefined
  isShowChatInfo?: boolean
  handlers?: ChatMessageRequestProposalDesignerResultEditedHandlers
  messagesFoundIds: string[]
  searchPhrase?: string
  isMobileResolution: boolean
  setMessageToScroll: (mes: ChatMessageContract | null) => void
  onClickReply: (messageItem: ChatMessageContract, isIncomming: boolean) => void
}

export const chatMessageRenderItem = useCallback(
  () => (props: ChatMessageRenderItemProps) => {
    const { classes: styles, cx } = useStyles()

    const {
      messageItem,
      index,
      userId,
      messages,
      isGroupChat,
      isFreelanceOwner,
      messageToScroll,
      messageToScrollRef,
      setMessageToScroll,
      isShowChatInfo,
      handlers,
      messagesFoundIds,
      searchPhrase,
      onClickReply,
      isMobileResolution,
    } = props

    const isIncomming = userId !== messageItem.user?._id

    const isNotPersonal = !messageItem.user?._id || messageItem.type === ChatMessageType.SYSTEM

    const isLastMessage = index === messages.length - 1

    const isNextMessageSameAuthor =
      !isLastMessage && messages[index + 1]?.user?._id === messageItem.user?._id && !isNotPersonal

    const isBeforeMessageAnotherAuthor = messages[index - 1]?.user?._id !== messageItem.user?._id

    const unReadMessage = !messageItem.isRead

    const showName =
      (isGroupChat || !!isFreelanceOwner) && isBeforeMessageAnotherAuthor && !isNotPersonal && isIncomming

    const isReply = messageItem?.replyMessageId

    const repleyMessage = messages.find(
      el => typeof messageItem?.replyMessageId === 'string' && el._id === messageItem?.replyMessageId,
    )

    const isDisabledControls = messageItem.type !== ChatMessageType.USER

    const isRequestOrProposal = !!messageItem.data

    return (
      <div
        ref={messageToScroll?._id === messageItem._id ? messageToScrollRef : undefined}
        key={`chatMessage_${messageItem._id}`}
        className={cx({
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
                {isReply && repleyMessage && (
                  <div
                    className={styles.repleyWrapper}
                    onClick={e => {
                      e.stopPropagation()
                      setMessageToScroll(repleyMessage)
                    }}
                  >
                    <div className={styles.repleyDivider} />
                    <ChatMessageByType
                      showName
                      isIncomming={isIncomming}
                      messageItem={repleyMessage}
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

          {!isDisabledControls && (
            <ChatMessageControlsOverlay onClickReply={() => onClickReply(messageItem, isIncomming)} />
          )}
        </div>
      </div>
    )
  },
  [],
)
