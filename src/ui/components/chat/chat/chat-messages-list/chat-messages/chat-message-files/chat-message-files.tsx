import React, { FC } from 'react'

import { ChatMessageFile } from '@components/chat/chat/chat-messages-list/chat-messages/chat-message-files/chat-message-file'
import { useChatMessageFileStyles } from '@components/chat/chat/chat-messages-list/chat-messages/chat-message-files/chat-message-files.styles'

interface ChatMessageFilesProps {
  files: string[]
}

export const ChatMessageFiles: FC<ChatMessageFilesProps> = props => {
  const { files } = props
  const { classes: styles } = useChatMessageFileStyles()

  return (
    <div className={styles.wrapper}>
      {files.map((el, index) => (
        <ChatMessageFile key={index} src={el} />
      ))}
    </div>
  )
}
