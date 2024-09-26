import { memo } from 'react'

import { useStyles } from './chat-view.style'

import { ChatsList } from './components/chats-list'

export const ChatView = memo(() => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className="viewWrapper">
      <div className={styles.chatViewWrapper}>
        <ChatsList />
      </div>
    </div>
  )
})
