import { observer } from 'mobx-react'

import { chatModel } from '@models/chat-model-new/chat-model'

import { useStyles } from './messages-block.style'

import { EmptyChatMessages } from '../empty-chat-messages/empty-chat-messages'
import { MessagesList } from '../messages-list'

export const MessagesBlock = observer(() => {
  const { classes: styles, cx } = useStyles()

  const currentChat = chatModel.currentChat
  const emptyChat = !currentChat?.messagesCount || !currentChat

  return (
    <div
      className={cx(styles.messagesListWrapper, {
        [styles.noSelectedChat]: emptyChat,
      })}
    >
      {emptyChat ? <EmptyChatMessages /> : <MessagesList />}
    </div>
  )
})
