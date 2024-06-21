import { FC, memo } from 'react'

import { useStyles } from './chat-message-files.style'

import { ChatMessageFile } from './chat-message-file'

interface ChatMessageFilesProps {
  files: string[]
}

export const ChatMessageFiles: FC<ChatMessageFilesProps> = memo(({ files }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      {files.map((el, index) => (
        <ChatMessageFile key={index} src={el} />
      ))}
    </div>
  )
})
