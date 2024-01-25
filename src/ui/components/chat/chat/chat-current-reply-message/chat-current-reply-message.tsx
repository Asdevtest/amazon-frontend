import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Typography } from '@mui/material'

import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { useStyles } from '@components/chat/chat/chat-current-reply-message/chat-current-reply-message.style'
import { ChatMessageFiles } from '@components/chat/chat/chat-messages-list/chat-messages/chat-message-files/chat-message-files'
import { ReplyIcon } from '@components/shared/svg-icons'

interface ChatCurrentReplyMessageProps {
  message: ChatMessageContract
  setMessageToReply: (msg: ChatMessageContract | null) => void
  setMessageToScroll: (msg: ChatMessageContract) => void
}

export const ChatCurrentReplyMessage = (props: ChatCurrentReplyMessageProps) => {
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
}
