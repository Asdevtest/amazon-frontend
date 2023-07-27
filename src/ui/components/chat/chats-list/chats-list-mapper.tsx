import { cx } from '@emotion/css'

import { ChatContract } from '@models/chat-model/contracts'

import { OnTypingMessageResponse } from '@services/websocket-chat-service/interfaces'

import { useClassNames } from './chats-list.styles'

import { ChatListItem } from './chat-list-item'

export const chatListMapper = (
  chats: ChatContract[],
  userId: string,
  chatSelectedId: string | undefined,
  typingUsers: OnTypingMessageResponse[] | undefined,
  onClickChat: (chat: ChatContract) => void,
) => {
  const { classes: classNames } = useClassNames()

  return (
    <>
      {chats.map((chat: ChatContract) => {
        const isSelected = chatSelectedId === chat._id

        return (
          <div
            key={`chat_${chat._id}`}
            className={cx(classNames.chatWrapper, { [classNames.chatWrapperIsSelected]: isSelected })}
          >
            <ChatListItem typingUsers={typingUsers} userId={userId} chat={chat} onClick={onClickChat} />
          </div>
        )
      })}
    </>
  )
}
