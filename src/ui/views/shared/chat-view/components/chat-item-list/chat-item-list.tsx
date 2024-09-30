import { Empty } from 'antd'
import { observer } from 'mobx-react'
import { useCallback } from 'react'

import { chatModel } from '@models/chat-model-new/chat-model'
import { Chat } from '@models/chat-model-new/types/chat.type'

import { useStyles } from './chat-item-list.style'

import { ChatItem } from '../chat-item/chat-item'

export const ChatItemList = observer(() => {
  const { classes: styles, cx } = useStyles()

  const isChatsExist = !!chatModel.chats?.length

  const onClickChat = useCallback((chat: Chat) => {
    chatModel.onClickChat(chat)
  }, [])

  return (
    <div className={cx(styles.chatsList, { [styles.emptyChatList]: !isChatsExist })}>
      {isChatsExist ? (
        chatModel.chats?.map(chat => <ChatItem key={chat._id} chat={chat} onClickChat={onClickChat} />)
      ) : (
        <Empty />
      )}
    </div>
  )
})
