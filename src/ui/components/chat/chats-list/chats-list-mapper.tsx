import { ChatContract } from '@models/chat-model/contracts'

import { OnTypingMessageResponse } from '@services/websocket-chat-service/interfaces'

import { useStyles } from './chats-list.style'

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
  const { classes: styles, cx } = useStyles()

  return (
    <>
      {chats.map((chat: ChatContract) => (
        <div
          key={`chat_${chat._id}`}
          className={cx(styles.chatWrapper, { [styles.activeChat]: chatSelectedId === chat._id })}
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
