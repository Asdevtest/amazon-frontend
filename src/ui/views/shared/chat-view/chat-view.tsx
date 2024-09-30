import { memo } from 'react'

import { useStyles } from './chat-view.style'

import { ChatsList } from './components/chats-list'
import { MessagesList } from './components/messages-list'

export const ChatView = memo(() => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx('viewWrapper', styles.chatViewWrapper)}>
      <ChatsList />

      <MessagesList />
    </div>
  )
})
