import {cx} from '@emotion/css'
import {Avatar, Typography, Link} from '@mui/material'

import React, {FC, useEffect} from 'react'

import {observer} from 'mobx-react'
import ScrollView from 'react-inverted-scrollview'
import {useScrollToElement} from 'react-use-scroll-to-element-hook'

import {ChatModel} from '@models/chat-model'
import {ChatMessageContract, ChatMessageType} from '@models/chat-model/contracts/chat-message.contract'
import {SettingsModel} from '@models/settings-model'

import {formatDateWithoutTime} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {
  checkIsChatMessageAddUsersToGroupChatContract,
  checkIsChatMessageDataCreatedNewProposalProposalDescriptionContract,
  checkIsChatMessageDataCreatedNewProposalRequestDescriptionContract,
  checkIsChatMessageDataProposalResultEditedContract,
  checkIsChatMessageDataProposalStatusChangedContract,
  checkIsChatMessagePatchInfoGroupChatContract,
  checkIsChatMessageRemoveUsersFromGroupChatContract,
} from '@utils/ts-checks'

import {useClassNames} from './chat-messages-list.style'
import {ChatMessageAddUsersToGroupChat} from './chat-messages/chat-message-add-users-to-group-chat'
import {ChatMessageBasicText} from './chat-messages/chat-message-basic-text'
import {ChatMessagePatchInfoGroupChat} from './chat-messages/chat-message-patch-info-group-chat'
import {ChatMessageProposal, ChatMessageProposalHandlers} from './chat-messages/chat-message-proposal'
import {ChatMessageProposalStatusChanged} from './chat-messages/chat-message-proposal-status-changed'
import {ChatMessageRemoveUsersFromGroupChat} from './chat-messages/chat-message-remove-users-from-group-chat'
import {ChatMessageRequest} from './chat-messages/chat-message-request'
import {
  ChatMessageRequestProposalResultEdited,
  ChatMessageRequestProposalResultEditedHandlers,
} from './chat-messages/chat-message-request-proposal-result-edited'

export type ChatMessageUniversalHandlers = ChatMessageProposalHandlers & ChatMessageRequestProposalResultEditedHandlers

interface Props {
  userId: string
  messages?: ChatMessageContract[]
  handlers?: ChatMessageUniversalHandlers
  toScrollMesId?: string | undefined
  messagesFound?: ChatMessageContract[]
  searchPhrase?: string
}

export const ChatMessagesList: FC<Props> = observer(
  ({messages, userId, handlers, toScrollMesId, messagesFound, searchPhrase}) => {
    const {classes: classNames} = useClassNames()

    const messagesFoundIds = messagesFound?.map(el => el._id) || []

    const messagesIds = messages ? messages.map(mes => mes._id) : []

    const firstUnReadMessageId = messages?.find(el => !el.isRead && el.user?._id !== userId)?._id // '44263074-838d-430f-831f-1f8ff97ed708' //

    // console.log('messages', messages)

    console.log('firstUnReadMessageId', firstUnReadMessageId)

    const {getScrollToElementRef, scrollToElementClickHandler} = useScrollToElement(messagesIds, {
      behavior: 'smooth',
    })

    useEffect(() => {
      if (firstUnReadMessageId) {
        setTimeout(() => scrollToElementClickHandler(firstUnReadMessageId), 0)
      }
    }, [])

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

    const renderMessageByType = (isIncomming: boolean, messageItem: ChatMessageContract, unReadMessage: boolean) => {
      if (checkIsChatMessageDataCreatedNewProposalRequestDescriptionContract(messageItem)) {
        return <ChatMessageRequest message={messageItem} />
      } else if (handlers && checkIsChatMessageDataCreatedNewProposalProposalDescriptionContract(messageItem)) {
        return (
          <ChatMessageProposal
            message={messageItem}
            handlers={{
              onClickProposalAccept: handlers.onClickProposalAccept,
              onClickProposalRegect: handlers.onClickProposalRegect,
            }}
          />
        )
      } else if (handlers && checkIsChatMessageDataProposalStatusChangedContract(messageItem)) {
        return (
          <ChatMessageProposalStatusChanged
            message={messageItem}
            handlers={{
              onClickProposalResultAccept: handlers.onClickProposalResultAccept,
              onClickProposalResultToCorrect: handlers.onClickProposalResultToCorrect,
            }}
          />
        )
      } else if (handlers && checkIsChatMessageDataProposalResultEditedContract(messageItem)) {
        return (
          <ChatMessageRequestProposalResultEdited
            message={messageItem}
            handlers={{
              onClickProposalResultAccept: handlers.onClickProposalResultAccept,
              onClickProposalResultToCorrect: handlers.onClickProposalResultToCorrect,
            }}
          />
        )
      } else if (checkIsChatMessageAddUsersToGroupChatContract(messageItem)) {
        return <ChatMessageAddUsersToGroupChat message={messageItem} />
      } else if (checkIsChatMessageRemoveUsersFromGroupChatContract(messageItem)) {
        return <ChatMessageRemoveUsersFromGroupChat message={messageItem} />
      } else if (checkIsChatMessagePatchInfoGroupChatContract(messageItem)) {
        return <ChatMessagePatchInfoGroupChat message={messageItem} />
      } else {
        return (
          <ChatMessageBasicText
            isIncomming={isIncomming}
            message={messageItem}
            unReadMessage={unReadMessage}
            isFound={messagesFoundIds.includes(messageItem?._id)}
            searchPhrase={searchPhrase}
          />
        )
      }
    }

    return (
      <div className={classNames.root}>
        <ScrollView width="100%" height="100%" style={{padding: '20px 12px'}}>
          {messages && SettingsModel.languageTag
            ? messages.map((messageItem: ChatMessageContract, index: number) => {
                const isIncomming = userId !== messageItem.user?._id

                const isNotPersonal = !messageItem.user?._id || messageItem.type === ChatMessageType.SYSTEM

                const isLastMessage = index === messages.length - 1

                const isNextMessageSameAuthor =
                  !isLastMessage && messages[index + 1]?.user?._id === messageItem.user?._id && !isNotPersonal

                const unReadMessage = !messageItem.isRead

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

                    <div
                      className={cx(classNames.messageWrapper, {
                        [classNames.messageWrapperIsIncomming]: isIncomming,
                        [classNames.messageWrapperIsNextMessageSameAuthor]: isNextMessageSameAuthor,
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
                          {renderMessageByType(isIncomming, messageItem, unReadMessage)}
                        </div>
                      </div>
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
