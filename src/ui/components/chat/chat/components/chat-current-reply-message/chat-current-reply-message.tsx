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
  setMessageToScroll: (msg: ChatMessageContract) => void
}

export const ChatCurrentReplyMessage: FC<ChatCurrentReplyMessageProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.body}>
      <div className={styles.content}>
        {props.message.text && (
          <div>
            <Typography className={styles.message}>{props.message.text}</Typography>
          </div>
        )}

        {(!!props.message.files?.length || !!props.message.images?.length) && (
          <div className={styles.fileList}>
            <ChatMessageFiles files={[...props.message.files, ...props.message.images]} />
          </div>
        )}
      </div>
      <div className={styles.controls}>
        <ReplyIcon
          className={cx(styles.icon, styles.replyIcon)}
          onClick={() => props.setMessageToScroll({ ...props.message })}
        />
        <CloseOutlinedIcon className={styles.icon} onClick={() => props.setMessageToReply(null)} />
      </div>
    </div>
  )
})
