import {cx} from '@emotion/css'

import React, {FC} from 'react'

import {observer} from 'mobx-react'

import {ChatContract} from '@models/chat-model/contracts'

import {OnTypingMessageResponse} from '@services/websocket-chat-service/interfaces'

import {ChatListItem} from './chat-list-item'
import {useClassNames} from './chats-list.style'

interface Props {
  chats: ChatContract[]
  chatSelectedId?: string
  typingUsers?: OnTypingMessageResponse[]
  userId: string
  onClickChat: (chat: ChatContract) => void
}

export const ChatsList: FC<Props> = observer(({chats, userId, chatSelectedId, onClickChat, typingUsers}) => {
  const {classes: classNames} = useClassNames()
  return (
    <div className={classNames.root}>
      {chats.map((chat: ChatContract) => {
        const isSelected = chatSelectedId === chat._id

        return (
          <div
            key={`chat_${chat._id}`}
            className={cx(classNames.chatWrapper, {[classNames.chatWrapperIsSelected]: isSelected})}
          >
            <ChatListItem
              typingUsers={typingUsers}
              userId={userId}
              chat={chat}
              isSelected={isSelected}
              onClick={() => onClickChat(chat)}
            />
          </div>
        )
      })}
    </div>
  )
})
