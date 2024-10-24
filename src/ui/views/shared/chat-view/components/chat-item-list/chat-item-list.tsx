import { Empty } from 'antd'
import { FC, memo } from 'react'

import { chatModel } from '@models/chat-model-new/chat-model'
import { Chat } from '@models/chat-model-new/types/chat.type'

import { useStyles } from './chat-item-list.style'

import { ChatItem } from '../chat-item/chat-item'

interface ChatItemListProps {
  chats: Chat[]
  isChatsExist: boolean
  onClickChat: (chat: Chat) => void
}

export const ChatItemList: FC<ChatItemListProps> = memo(({ chats, isChatsExist, onClickChat }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.chatsList, { [styles.emptyChatList]: !isChatsExist })}>
      {isChatsExist ? (
        chats?.map(chat => (
          <ChatItem
            key={chat._id}
            isActiveChat={chat._id === chatModel.selectedChatId}
            chat={chat}
            onClickChat={onClickChat}
          />
        ))
      ) : (
        <Empty />
      )}
    </div>
  )
})
