import { memo } from 'react'

import { useStyles } from './chat-view.style'

import { ChatInfoHeader } from './components/chat-info-header'
import { ChatsList } from './components/chats-list'
import { MessagesList } from './components/messages-list'

export const ChatView = memo(() => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx('viewWrapper', styles.chatViewWrapper)}>
      <ChatsList />

      <div className={cx('viewWrapper', styles.messagesWrapper)}>
        <ChatInfoHeader />

        <MessagesList />
      </div>
    </div>
  )
})
