import {Link} from '@mui/material'

import React, {FC, useEffect} from 'react'

import {Avatar, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'
import ScrollView from 'react-inverted-scrollview'

import {ChatModel} from '@models/chat-model'
import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {formatDateWithoutTime} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {
  checkIsChatMessageDataCreatedNewProposalProposalDescriptionContract,
  checkIsChatMessageDataCreatedNewProposalRequestDescriptionContract,
  checkIsChatMessageDataProposalResultEditedContract,
  checkIsChatMessageDataProposalStatusChangedContract,
} from '@utils/ts-checks'

import {useClassNames} from './chat-messages-list.style'
import {ChatMessageBasicText} from './chat-messages/chat-message-basic-text'
import {ChatMessageProposal, ChatMessageProposalHandlers} from './chat-messages/chat-message-proposal'
import {ChatMessageProposalStatusChanged} from './chat-messages/chat-message-proposal-status-changed'
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
}

export const ChatMessagesList: FC<Props> = observer(({messages, userId, handlers}) => {
  const classNames = useClassNames()

  useEffect(() => {
    if (messages) {
      const unReadMessages = messages.filter(el => el.userId !== userId && !el.isRead)

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
    } else {
      return <ChatMessageBasicText isIncomming={isIncomming} message={messageItem} unReadMessage={unReadMessage} />
    }
  }

  return (
    <div className={classNames.root}>
      <ScrollView width="100%" height="100%" style={{padding: '20px 12px'}}>
        {messages
          ? messages.map((messageItem: ChatMessageContract, index: number) => {
              const isIncomming = userId !== messageItem.userId

              const isNotPersonal = !messageItem.userId

              const isLastMessage = index === messages.length - 1

              const isNextMessageSameAuthor =
                !isLastMessage && messages[index + 1]?.userId === messageItem.userId && !isNotPersonal

              const unReadMessage = !messageItem.isRead

              return (
                <div
                  key={`chatMessage_${messageItem._id}`}
                  className={clsx(classNames.message /* {[classNames.unReadMessage]: unReadMessage}*/)}
                >
                  {index === 0 ||
                  formatDateWithoutTime(messages[index - 1].updatedAt) !==
                    formatDateWithoutTime(messageItem.updatedAt) ? (
                    <div className={classNames.timeTextWrapper}>
                      <Typography className={classNames.timeText}>
                        {formatDateWithoutTime(messageItem.updatedAt)}
                      </Typography>
                    </div>
                  ) : null}

                  <div
                    className={clsx(classNames.messageWrapper, {
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
                          userId === messageItem.userId
                            ? `${window.location.origin}/profile`
                            : `${window.location.origin}/another-user?${messageItem.userId}`
                        }
                      >
                        <Avatar
                          src={getUserAvatarSrc(messageItem.userId)}
                          className={clsx(classNames.messageAvatarWrapper, {
                            [classNames.messageAvatarWrapperIsIncomming]: isIncomming,
                          })}
                        />
                      </Link>
                    ) : null}

                    <div
                      className={clsx(classNames.messageInner, {
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
})
