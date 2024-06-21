import { FC, memo } from 'react'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Typography } from '@mui/material'

import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { ReplyIcon } from '@components/shared/svg-icons'

import { useStyles } from './chat-current-reply-message.style'

import { ChatMessageFiles } from '../chat-messages-list/components/chat-messages/chat-message-files/chat-message-files'

interface ChatCurrentReplyMessageProps {
  message: ChatMessageContract
  setMessageToReply: (msg: ChatMessageContract | null) => void
  scrollToMessage: () => void
}

export const ChatCurrentReplyMessage: FC<ChatCurrentReplyMessageProps> = memo(
  ({ message, setMessageToReply, scrollToMessage }) => {
    const { classes: styles, cx } = useStyles()

    return (
      <div className={styles.body}>
        <div className={styles.content}>
          {message.text && (
            <div>
              <Typography className={styles.message}>{message.text}</Typography>
            </div>
          )}

          {(!!message.files?.length || !!message.images?.length || !!message.video?.length) && (
            <div className={styles.fileList}>
              <ChatMessageFiles files={[...message.files, ...message.images, ...message.video]} />
            </div>
          )}
        </div>
        <div className={styles.controls}>
          <ReplyIcon className={cx(styles.icon, styles.replyIcon)} onClick={scrollToMessage} />
          <CloseOutlinedIcon className={styles.icon} onClick={() => setMessageToReply(null)} />
        </div>
      </div>
    )
  },
)
