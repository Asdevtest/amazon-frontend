import React, {FC} from 'react'

import clsx from 'clsx'
import {observer} from 'mobx-react'

import {ChatContract} from '@models/chat-model/contracts'

import {ChatListItem} from './chat-list-item'
import {useClassNames} from './chats-list.style'

interface Props {
  chats: ChatContract[]
  chatSelectedId?: string
  userId: string
  onClickChat: (chat: ChatContract) => void
}

export const ChatsList: FC<Props> = observer(({chats, userId, chatSelectedId, onClickChat}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.root}>
      {chats.map((chat: ChatContract) => {
        const isSelected = chatSelectedId === chat._id
        return (
          <div
            key={`chat_${chat._id}`}
            className={clsx(classNames.chatWrapper, {[classNames.chatWrapperIsSelected]: isSelected})}
          >
            <ChatListItem userId={userId} chat={chat} isSelected={isSelected} onClick={() => onClickChat(chat)} />
          </div>
        )
      })}
    </div>
  )
})
