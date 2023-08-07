import { ChatContract } from '@models/chat-model/contracts'

import { OnTypingMessageResponse } from '@services/websocket-chat-service/interfaces'

import { ChatListItem } from './chat-list-item'
import { useClassNames } from './chats-list.styles'

export const chatListMapper = (
  chats: ChatContract[],
  userId: string,
  typingUsers: OnTypingMessageResponse[] | undefined,
  onClickChat: (chat: ChatContract) => void,
) => {
  const { classes: classNames } = useClassNames()

  return (
    <>
      {chats.map((chat: ChatContract) => (
        <div key={`chat_${chat._id}`} className={classNames.chatWrapper}>
          <ChatListItem typingUsers={typingUsers} userId={userId} chat={chat} onClick={onClickChat} />
        </div>
      ))}
    </>
  )
}
