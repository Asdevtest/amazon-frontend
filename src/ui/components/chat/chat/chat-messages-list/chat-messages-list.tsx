import React, {FC} from 'react'

import {Avatar, Link, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'
import ScrollView from 'react-inverted-scrollview'

import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {formatNormDateTime} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {checkAndMakeAbsoluteUrl} from '@utils/text'

import {useClassNames} from './chat-messages-list.style'
import {ChatMessageBasicText} from './chat-messages/chat-message-basic-text'
import {ChatMessageProposal} from './chat-messages/chat-message-proposal'
import {ChatMessageRequest} from './chat-messages/chat-message-request'

interface Props {
  userId: string
  messages?: ChatMessageContract[]
}

export const ChatMessagesList: FC<Props> = observer(({messages, userId}) => {
  const classNames = useClassNames()

  console.log('messages', messages)

  const renderMessageByType = (isIncomming: boolean, messageItem: ChatMessageContract) => {
    switch (messageItem.text) {
      case 'CREATED_NEW_PROPOSAL_REQUEST_DESCRIPTION':
        return <ChatMessageRequest message={messageItem} />

      case 'CREATED_NEW_PROPOSAL_PROPOSAL_DESCRIPTION':
        return <ChatMessageProposal message={messageItem} />

      default:
        return <ChatMessageBasicText isIncomming={isIncomming} message={messageItem} />
    }
  }

  return (
    <div className={classNames.root}>
      <ScrollView width="100%" height="100%" style={{padding: '20px 12px'}}>
        {messages
          ? messages.map((messageItem: ChatMessageContract, index: number) => {
              const isIncomming = userId !== messageItem.userId
              const isLastMessage = index === messages.length - 1
              const isNextMessageSameAuthor = !isLastMessage && messages[index + 1]?.userId === messageItem.userId
              return (
                <div
                  key={`chatMessage_${messageItem._id}`}
                  className={clsx(classNames.messageWrapper, {
                    [classNames.messageWrapperIsIncomming]: isIncomming,
                    [classNames.messageWrapperIsNextMessageSameAuthor]: isNextMessageSameAuthor,
                    [classNames.messageWrapperIsLastMessage]: isLastMessage,
                  })}
                >
                  {!isNextMessageSameAuthor ? (
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
                    {/* <ChatMessageBasicText isIncomming={isIncomming} message={messageItem} /> */}
                    {renderMessageByType(isIncomming, messageItem)}
                    {messageItem.files.length && (
                      <div>
                        <Typography className={classNames.timeText}>{'ФАЙЛЫ:'}</Typography>

                        {messageItem.files.map(file => (
                          <Link key={index} target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(file)}>
                            <Typography className={classNames.linkText}>{file}</Typography>
                          </Link>
                        ))}
                      </div>
                    )}
                    <Typography className={classNames.timeText}>{formatNormDateTime(messageItem.updatedAt)}</Typography>
                  </div>
                </div>
              )
            })
          : undefined}
      </ScrollView>
    </div>
  )
})
