import { cx } from '@emotion/css'

import { ChatContract } from '@models/chat-model/contracts'

import { OnTypingMessageResponse } from '@services/websocket-chat-service/interfaces'

import { useClassNames } from './chats-list.styles'

import { ChatListItem } from './chat-list-item'

export const chatListMapper = (
  chats: ChatContract[],
  userId: string,
  typingUsers: OnTypingMessageResponse[] | undefined,
  chatSelectedId: string | undefined,
  onClickChat: (chat: ChatContract) => void,
  mutedChats?: string[],
  typeOfChat?: string,
) => {
  const { classes: classNames } = useClassNames()

  return (
    <>
      {chats.map((chat: ChatContract) => (
        <div
          key={`chat_${chat._id}`}
          className={cx(classNames.chatWrapper, { [classNames.activeChat]: chatSelectedId === chat._id })}
        >
          <ChatListItem
            typingUsers={typingUsers}
            userId={userId}
            chat={chat}
            isMutedChat={mutedChats?.includes(chat._id)}
            typeOfChat={typeOfChat}
            onClick={onClickChat}
          />
        </div>
      ))}
    </>
  )
}
