import React, {FC} from 'react'

import clsx from 'clsx'
import {observer} from 'mobx-react'
import ScrollView from 'react-inverted-scrollview'

import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {useClassNames} from './chat-messages-list.style'
import {ChatMessageBasicText} from './chat-messages/chat-message-basic-text'

interface Props {
  userId: string
  messages?: ChatMessageContract[]
}

export const ChatMessagesList: FC<Props> = observer(({messages, userId}) => {
  const classNames = useClassNames()
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
                    <div
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
                    <ChatMessageBasicText isIncomming={isIncomming} message={messageItem} />
                  </div>
                </div>
              )
            })
          : undefined}
      </ScrollView>
    </div>
  )
})
