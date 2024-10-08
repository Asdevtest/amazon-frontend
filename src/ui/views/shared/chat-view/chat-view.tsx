import { observer } from 'mobx-react'

import { chatModel } from '@models/chat-model-new/chat-model'

import { useStyles } from './chat-view.style'

import { ChatHeader } from './components/chat-header'
import { ChatsList } from './components/chats-list'
import { MessagesBlock } from './components/messages-block'
import { MessagesList } from './components/messages-list'
import { SendMessageBlock } from './components/send-message-block'

export const ChatView = observer(() => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx('viewWrapper', styles.chatViewWrapper)}>
      <ChatsList />

      <div className={cx('viewWrapper', styles.messagesWrapper)}>
        {chatModel.currentChat ? <ChatHeader /> : null}

        <MessagesBlock />

        {chatModel.currentChat ? <SendMessageBlock /> : null}
      </div>

      {/* {chatModel.currentChat ? <ChatInfo /> : null} */}
    </div>
  )
})
