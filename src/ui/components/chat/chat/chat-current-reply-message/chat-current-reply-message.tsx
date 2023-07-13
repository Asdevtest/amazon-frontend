import { useChatCurrentReplyMessageStyles } from '@components/chat/chat/chat-current-reply-message/chat-current-reply-message.styles'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'
import { Typography } from '@mui/material'
import { ChatMessageFiles } from '@components/chat/chat/chat-messages-list/chat-messages/chat-message-files/chat-message-files'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { ReplyIcon } from '@components/shared/svg-icons'
import { cx } from '@emotion/css'

interface ChatCurrentReplyMessageProps {
  message: ChatMessageContract
  setMessageToReply: (msg: ChatMessageContract | null) => void
  setMessageToScroll: (msg: ChatMessageContract) => void
}

export const ChatCurrentReplyMessage = (props: ChatCurrentReplyMessageProps) => {
  const { classes: styles } = useChatCurrentReplyMessageStyles()

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
