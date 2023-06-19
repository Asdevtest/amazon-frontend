import { cx } from '@emotion/css'
import { Avatar, Link, Typography } from '@mui/material'

import React, { FC, useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import ScrollView from 'react-inverted-scrollview'
import { useScrollToElement } from 'react-use-scroll-to-element-hook'

import { ChatModel } from '@models/chat-model'
import { ChatMessageContract, ChatMessageType } from '@models/chat-model/contracts/chat-message.contract'
import { SettingsModel } from '@models/settings-model'

import { formatDateWithoutTime } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'

import { useClassNames } from './chat-messages-list.style'
import { ChatMessageRequestProposalDesignerResultEditedHandlers } from './chat-messages/chat-message-designer-proposal-edited-result'
import { ChatMessageProposalHandlers } from './chat-messages/chat-message-proposal'
import { ChatMessageRequestProposalStatusChangedHandlers } from './chat-messages/chat-message-proposal-status-changed'
import { ChatMessageRequestProposalResultEditedHandlers } from './chat-messages/chat-message-request-proposal-result-edited'
import { ChatMessageByType } from './chat-message-by-type'
import { ReplyIcon } from '@components/shared/svg-icons'

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
  messageToScroll: ChatMessageContract | null
  setMessageToReply: (mes: ChatMessageContract | null) => void
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
    setMessageToReply,
  }) => {
    const { classes: classNames } = useClassNames()

    const [choosenMessageState, setChoosenMessageState] = useState<{
      message: ChatMessageContract | null
      isIncomming: boolean
    }>({ message: null, isIncomming: false })

    const messagesFoundIds = messagesFound?.map(el => el._id) || []

    const messagesIds = messages ? messages.map(mes => mes._id) : []

    const firstUnReadMessageId = messages?.find(el => !el.isRead && el.user?._id !== userId)?._id // '44263074-838d-430f-831f-1f8ff97ed708' //

    // console.log('messages', messages)

    // console.log('firstUnReadMessageId', firstUnReadMessageId)

    const { getScrollToElementRef, scrollToElementClickHandler } = useScrollToElement(messagesIds, {
      behavior: 'smooth',
    })

    useEffect(() => {
      if (messages?.length) {
        setTimeout(() => scrollToElementClickHandler(firstUnReadMessageId || messages!.at(-1)!._id), 0)
      }
    }, [messages])

    useEffect(() => {
      if (!messageToScroll) {
        return
      }

      // setTimeout(() => scrollToElementClickHandler(messageToScroll._id), 0)

      scrollToElementClickHandler(messageToScroll._id)
    }, [messageToScroll])

    useEffect(() => {
      if (toScrollMesId) {
        scrollToElementClickHandler(toScrollMesId)
      }
      // else if (firstUnReadMessageId) {
      //   setTimeout(() => scrollToElementClickHandler(firstUnReadMessageId), 5000)
      //   // scrollToElementClickHandler(firstUnReadMessageId)
      // }
    }, [toScrollMesId, messages])

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
      <div className={classNames.root}>
        <ScrollView width="100%" height="100%" style={{ padding: '20px 12px' }}>
          {messages && SettingsModel.languageTag
            ? messages.map((messageItem: ChatMessageContract, index: number) => {
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

                const isDisabledReply = messageItem.type !== ChatMessageType.USER

                return (
                  <div
                    key={`chatMessage_${messageItem._id}`}
                    ref={getScrollToElementRef(messageItem._id) as React.RefObject<HTMLDivElement>}
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
                          [classNames.messageWrapperIsLastMessage]: isLastMessage,
                          [classNames.messageWrapperisNotPersonal]: isNotPersonal,
                        })}
                      >
                        {!isNextMessageSameAuthor && !isNotPersonal ? (
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
                          className={cx(classNames.messageInner, {
                            [classNames.messageInnerIsIncomming]: isIncomming,
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
                                  scrollToElementClickHandler(repleyMessage._id)
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
                      {!isDisabledReply && (
                        <div className={cx(classNames.controlsOverlay, 'controlsOverlay')}>
                          <div className={classNames.controls}>
                            <button
                              onClick={() => {
                                onClickReply(messageItem, isIncomming)
                              }}
                            >
                              <ReplyIcon />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
            : undefined}
        </ScrollView>
      </div>
    )
  },
)
