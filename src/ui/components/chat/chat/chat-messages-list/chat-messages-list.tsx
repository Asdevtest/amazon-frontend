import { observer } from 'mobx-react'
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react'

import { Avatar, Link } from '@mui/material'

import { ChatModel } from '@models/chat-model'
import { ChatMessageContract, ChatMessageType } from '@models/chat-model/contracts/chat-message.contract'
import { SettingsModel } from '@models/settings-model'

import { ChatMessageControlsOverlay } from '@components/chat/chat/chat-messages-list/chat-message-controls-overlay'

import { formatDateWithoutTime } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { toFixed } from '@utils/text'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

import { useStyles } from './chat-messages-list.style'

import { ChatMessageByType } from './chat-message-by-type'
import { ChatMessageRequestProposalDesignerResultEditedHandlers } from './chat-messages/chat-message-designer-proposal-edited-result'

interface Props {
  isGroupChat: boolean
  userId: string
  messages?: ChatMessageContract[]
  handlers?: ChatMessageRequestProposalDesignerResultEditedHandlers
  messagesFound?: ChatMessageContract[]
  searchPhrase?: string
  chatId?: string
  isShowChatInfo?: boolean
  isFreelanceOwner?: boolean
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
    messagesFound,
    searchPhrase,
    isGroupChat,
    messageToScroll,
    isShowChatInfo,
    setMessageToScroll,
    setMessageToReply,
    messagesWrapperRef,
    chatId,
    isFreelanceOwner,
  }) => {
    const { classes: styles, cx } = useStyles()
    const { isMobileResolution } = useCreateBreakpointResolutions()

    const messageToScrollRef = useRef<HTMLDivElement | null>(null)
    const chatBottomRef = useRef<HTMLDivElement | null>(null)

    const [_, setChoosenMessageState] = useState<{
      message: ChatMessageContract | null
      isIncomming: boolean
    }>({ message: null, isIncomming: false })

    const messagesFoundIds = messagesFound?.map(el => el._id) || []

    const highlightMessageHandler = (message: HTMLDivElement) => {
      if (message) {
        message.classList.add(styles.highlightMessage)

        setTimeout(() => {
          message?.classList.remove(styles.highlightMessage)
        }, 1000)
      }
    }

    const scrollToMessage = () => {
      if (messageToScrollRef.current && messagesWrapperRef.current) {
        const messageContainerHeight = messagesWrapperRef.current.clientHeight
        const messageTop = messageToScrollRef.current.offsetTop
        const messageHeight = messageToScrollRef.current.offsetHeight
        const messageCenter = messageTop + messageHeight / 2
        const scrollToPosition = messageCenter - messageContainerHeight / 2

        messagesWrapperRef.current.scrollTo({
          top: scrollToPosition,
          behavior: 'smooth',
        })

        highlightMessageHandler(messageToScrollRef.current)
        setMessageToScroll(null)
      }
    }

    const onClickReply = (messageItem: ChatMessageContract, isIncomming: boolean) => {
      setChoosenMessageState({ message: messageItem, isIncomming })
      setMessageToReply(messageItem)
    }

    const getReplyedMessages = async () => {
      if (messages?.length) {
        for (const message of messages) {
          if (chatId && message.replyMessageId) {
            await ChatModel.getChatMessage(chatId, String(message.replyMessageId))
          }
        }
      }
    }

    useEffect(() => {
      chatBottomRef.current?.scrollIntoView()
    }, [chatId])

    useEffect(() => {
      scrollToMessage()
    }, [messageToScroll])

    useEffect(() => {
      const unReadMessages = messages?.filter(el => el.user?._id !== userId && !el.isRead)

      if (unReadMessages?.length && chatId) {
        ChatModel.readMessages(
          chatId,
          unReadMessages.map(el => el._id),
        )
      }
    }, [messages])

    useEffect(() => {
      getReplyedMessages()
    }, [messages?.length])

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

    return (
      <div
        ref={messagesWrapperRef}
        className={cx(styles.messagesWrapper, { [styles.messagesWrapperNone]: isShowChatInfo })}
      >
        {SettingsModel.languageTag &&
          messages
            ?.filter((messageItem: ChatMessageContract) => messageItem?.text !== ChatMessageType.PROPOSAL_EDITED)
            ?.map((messageItem: ChatMessageContract, index: number) => {
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
                  className={cx(styles.message, {
                    [styles.unReadMessage]: unReadMessage && userId !== messageItem.user?._id,
                  })}
                >
                  {index === 0 ||
                  formatDateWithoutTime(messages[index - 1].createdAt) !==
                    formatDateWithoutTime(messageItem.createdAt) ? (
                    <div className={styles.timeTextWrapper}>
                      <p className={styles.timeText}>{formatDateWithoutTime(messageItem.createdAt)}</p>
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
                          [styles.messageInnerIsNextMessageSameAuthorIsInclomming]:
                            isNextMessageSameAuthor && isIncomming,
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
            })}

        <div ref={chatBottomRef} />
      </div>
    )
  },
)
