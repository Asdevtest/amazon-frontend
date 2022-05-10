import React, {FC} from 'react'

import {Avatar, Link, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'
import ScrollView from 'react-inverted-scrollview'

import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {formatNormDateTime} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {checkAndMakeAbsoluteUrl} from '@utils/text'
import {
  checkIsChatMessageDataCreatedNewProposalProposalDescriptionContract,
  checkIsChatMessageDataCreatedNewProposalRequestDescriptionContract,
  checkIsChatMessageDataProposalResultEditedDetailsContract,
  checkIsChatMessageDataProposalStatusChangedContract,
} from '@utils/ts-checks'

import {useClassNames} from './chat-messages-list.style'
import {ChatMessageBasicText} from './chat-messages/chat-message-basic-text'
import {ChatMessageProposal, ChatMessageProposalHandlers} from './chat-messages/chat-message-proposal'
import {ChatMessageProposalStatusChanged} from './chat-messages/chat-message-proposal-status-changed'
import {ChatMessageRequest} from './chat-messages/chat-message-request'
import {ChatMessageRequestProposalResultEdited} from './chat-messages/chat-message-request-proposal-result-edited'

export type ChatMessageUniversalHandlers = ChatMessageProposalHandlers

interface Props {
  userId: string
  messages?: ChatMessageContract[]
  handlers?: ChatMessageUniversalHandlers
}

export const ChatMessagesList: FC<Props> = observer(({messages, userId, handlers}) => {
  const classNames = useClassNames()

  console.log('messages', messages)

  const renderMessageByType = (isIncomming: boolean, messageItem: ChatMessageContract) => {
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
    } else if (checkIsChatMessageDataProposalStatusChangedContract(messageItem)) {
      return <ChatMessageProposalStatusChanged message={messageItem} />
    } else if (checkIsChatMessageDataProposalResultEditedDetailsContract(messageItem)) {
      console.log('messageItem ', messageItem)
      return <ChatMessageRequestProposalResultEdited message={messageItem} />
    } else {
      return <ChatMessageBasicText isIncomming={isIncomming} message={messageItem} />
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
              return (
                <div
                  key={`chatMessage_${messageItem._id}`}
                  className={clsx(classNames.messageWrapper, {
                    [classNames.messageWrapperIsIncomming]: isIncomming,
                    [classNames.messageWrapperIsNextMessageSameAuthor]: isNextMessageSameAuthor,
                    [classNames.messageWrapperIsLastMessage]: isLastMessage,
                    [classNames.messageWrapperisNotPersonal]: isNotPersonal,
                  })}
                >
                  {!isNextMessageSameAuthor && !isNotPersonal ? (
                    <Avatar
                      src={getUserAvatarSrc(messageItem.userId)}
                      className={clsx(classNames.messageAvatarWrapper, {
                        [classNames.messageAvatarWrapperIsIncomming]: isIncomming,
                      })}
                    />
                  ) : undefined}
                  <div
                    className={clsx(classNames.messageInner, {
                      [classNames.messageInnerIsIncomming]: isIncomming,
                      [classNames.messageInnerIsNextMessageSameAuthor]: isNextMessageSameAuthor && !isIncomming,
                      [classNames.messageInnerIsNextMessageSameAuthorIsInclomming]:
                        isNextMessageSameAuthor && isIncomming,
                    })}
                  >
                    <div className={classNames.messageInnerContentWrapper}>
                      {renderMessageByType(isIncomming, messageItem)}
                      {messageItem.files.length ? (
                        <div>
                          <Typography className={classNames.timeText}>{'ФАЙЛЫ:'}</Typography>

                          {messageItem.files.map(file => (
                            <Link key={index} target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(file)}>
                              <Typography className={classNames.linkText}>{file}</Typography>
                            </Link>
                          ))}
                        </div>
                      ) : undefined}
                    </div>
                    <div className={classNames.timeTextWrapper}>
                      <Typography className={classNames.timeText}>
                        {formatNormDateTime(messageItem.updatedAt)}
                      </Typography>
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
