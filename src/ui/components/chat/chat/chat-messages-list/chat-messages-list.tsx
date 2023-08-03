import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react'

import { Avatar, Link, Typography } from '@mui/material'

import { ChatModel } from '@models/chat-model'
import { ChatMessageContract, ChatMessageType } from '@models/chat-model/contracts/chat-message.contract'
import { SettingsModel } from '@models/settings-model'

import { ChatMessageControlsOverlay } from '@components/chat/chat/chat-messages-list/chat-message-controls-overlay'

import { formatDateWithoutTime } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { toFixed } from '@utils/text'

import { useClassNames } from './chat-messages-list.style'

import { ChatCurrentReplyMessage } from '../chat-current-reply-message'

import { ChatMessageByType } from './chat-message-by-type'
import { ChatMessageRequestProposalDesignerResultEditedHandlers } from './chat-messages/chat-message-designer-proposal-edited-result'
import { ChatMessageProposalHandlers } from './chat-messages/chat-message-proposal'
import { ChatMessageRequestProposalStatusChangedHandlers } from './chat-messages/chat-message-proposal-status-changed'
import { ChatMessageRequestProposalResultEditedHandlers } from './chat-messages/chat-message-request-proposal-result-edited'

export type ChatMessageUniversalHandlers = ChatMessageProposalHandlers &
  ChatMessageRequestProposalResultEditedHandlers &
  ChatMessageRequestProposalStatusChangedHandlers &
  ChatMessageRequestProposalDesignerResultEditedHandlers

interface Props {
  isGroupChat: boolean
  userId: string
  messages?: ChatMessageContract[]
  handlers?: ChatMessageUniversalHandlers
  toScrollMesId?: string | undefined
  messagesFound?: ChatMessageContract[]
  searchPhrase?: string
  chatId?: string
  isShowChatInfo?: boolean
  messageToReply?: null | ChatMessageContract
  messageToScroll: ChatMessageContract | null
  setMessageToScroll: (mes: ChatMessageContract | null) => void
  setMessageToReply: (mes: ChatMessageContract | null) => void
  messagesWrapperRef: MutableRefObject<HTMLDivElement | null>
}

export const ChatMessagesList: FC<Props> = observer(
  ({
    messages,
    userId,
    handlers,
    toScrollMesId,
    messagesFound,
    searchPhrase,
    isGroupChat,
    messageToScroll,
    messageToReply,
    isShowChatInfo,
    setMessageToScroll,
    setMessageToReply,
    messagesWrapperRef,
    chatId,
  }) => {
    const { classes: classNames } = useClassNames()
    const messageToScrollRef = useRef<HTMLDivElement | null>(null)
    const chatBottomRef = useRef<HTMLDivElement | null>(null)

    const [_, setChoosenMessageState] = useState<{
      message: ChatMessageContract | null
      isIncomming: boolean
    }>({ message: null, isIncomming: false })

    const messagesFoundIds = messagesFound?.map(el => el._id) || []

    const scrollToMessage = () => {
      if (messageToScrollRef.current) {
        messageToScrollRef.current.scrollIntoView({
          behavior: 'smooth',
        })
      }
    }

    useEffect(() => {
      if (messagesWrapperRef.current) {
        const currentScrollPosition = toFixed(
          messagesWrapperRef.current.scrollTop + messagesWrapperRef.current.clientHeight,
        )
        const scrolledFromBottom = messagesWrapperRef.current.scrollHeight - currentScrollPosition

        if (
          scrolledFromBottom < messagesWrapperRef.current.clientHeight ||
          messagesWrapperRef.current?.scrollTop < 20
        ) {
          chatBottomRef.current?.scrollIntoView({})
        }
      }
    }, [messages?.length])

    useEffect(() => {
      chatBottomRef.current?.scrollIntoView({})
    }, [chatId])

    useEffect(() => {
      scrollToMessage()
    }, [toScrollMesId, messageToScroll])

    useEffect(() => {
      const unReadMessages = messages?.filter(el => el.user?._id !== userId && !el.isRead)

      if (unReadMessages?.length) {
        ChatModel.readMessages(unReadMessages.map(el => el._id))
      }
    }, [messages])

    const onClickReply = (messageItem: ChatMessageContract, isIncomming: boolean) => {
      setChoosenMessageState({ message: messageItem, isIncomming })
      setMessageToReply(messageItem)
    }

    return (
      <div
        ref={messagesWrapperRef}
        className={cx(classNames.messagesWrapper, { [classNames.messagesWrapperNone]: isShowChatInfo })}
      >
        {SettingsModel.languageTag &&
          messages?.map((messageItem: ChatMessageContract, index: number) => {
            const isIncomming = userId !== messageItem.user?._id

            const isNotPersonal = !messageItem.user?._id || messageItem.type === ChatMessageType.SYSTEM

            const isLastMessage = index === messages.length - 1

            const isNextMessageSameAuthor =
              !isLastMessage && messages[index + 1]?.user?._id === messageItem.user?._id && !isNotPersonal

            const isBeforeMessageAnotherAuthor = messages[index - 1]?.user?._id !== messageItem.user?._id

            const unReadMessage = !messageItem.isRead

            const showName = isGroupChat && isBeforeMessageAnotherAuthor && !isNotPersonal && isIncomming

            const isReply = messageItem?.replyMessageId

            const repleyMessage = messages.find(
              el => typeof messageItem?.replyMessageId === 'string' && el._id === messageItem?.replyMessageId,
            )

            const isDisabledControls = messageItem.type !== ChatMessageType.USER

            const isMobileResolution = window.innerWidth < 768

            return (
              <div
                ref={
                  messageToScroll?._id === messageItem._id || toScrollMesId === messageItem._id
                    ? messageToScrollRef
                    : undefined
                }
                key={`chatMessage_${messageItem._id}`}
                // ref={getScrollToElementRef(messageItem._id) as React.RefObject<HTMLDivElement>}
                className={cx(classNames.message, {
                  [classNames.unReadMessage]: unReadMessage && userId !== messageItem.user?._id,
                })}
              >
                {index === 0 ||
                formatDateWithoutTime(messages[index - 1].createdAt) !==
                  formatDateWithoutTime(messageItem.createdAt) ? (
                  <div className={classNames.timeTextWrapper}>
                    <Typography className={classNames.timeText}>
                      {formatDateWithoutTime(messageItem.createdAt)}
                    </Typography>
                  </div>
                ) : null}

                <div className={classNames.messageContent}>
                  <div
                    className={cx(classNames.messageWrapper, {
                      [classNames.messageWrapperIsIncomming]: isIncomming,
                      [classNames.messageWrapperisNotPersonal]: isNotPersonal,
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
                          className={cx(classNames.messageAvatarWrapper, {
                            [classNames.messageAvatarWrapperIsIncomming]: isIncomming,
                          })}
                        />
                      </Link>
                    ) : null}

                    <div
                      className={cx({
                        [classNames.messageInnerIsNextMessageSameAuthor]: isNextMessageSameAuthor && !isIncomming,
                        [classNames.messageInnerIsNextMessageSameAuthorIsInclomming]:
                          isNextMessageSameAuthor && isIncomming,
                      })}
                    >
                      <div className={classNames.messageInnerContentWrapper}>
                        {isReply && repleyMessage && (
                          <div
                            className={classNames.repleyWrapper}
                            onClick={e => {
                              e.stopPropagation()
                              setMessageToScroll(repleyMessage)
                            }}
                          >
                            <div className={classNames.repleyDivider} />
                            <ChatMessageByType
                              showName
                              isIncomming={isIncomming}
                              messageItem={repleyMessage}
                              unReadMessage={false}
                              isLastMessage={false}
                            />
                          </div>
                        )}
                        <ChatMessageByType
                          isIncomming={isIncomming}
                          messageItem={messageItem}
                          unReadMessage={unReadMessage}
                          showName={showName}
                          isLastMessage={isLastMessage}
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
          })}

        {messageToReply && (
          <ChatCurrentReplyMessage
            message={messageToReply}
            setMessageToReply={setMessageToReply}
            setMessageToScroll={setMessageToScroll}
          />
        )}
        <div ref={chatBottomRef} />
      </div>
    )
  },
)
