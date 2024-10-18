import { FC, memo } from 'react'
import { IoMdClose } from 'react-icons/io'
import { MdOutlineReply } from 'react-icons/md'

import { ChatMessage } from '@models/chat-model-new/types/message.type'

import { CustomButton } from '@components/shared/custom-button'

import { useStyles } from './reply-message.style'

interface ReplyMessageProps {
  message: ChatMessage
  onClickClearReplyMessage: () => void
}

export const ReplyMessage: FC<ReplyMessageProps> = memo(props => {
  const { message, onClickClearReplyMessage } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.replyMessageWrapper}>
      <MdOutlineReply size={22} className={styles.icon} />

      <div className={styles.forwardMessages}>
        <p className={styles.forwardMessagesCount}>
          {t(TranslationKey['forwarded messages'], { count: messages?.length })}
        </p>
      </div>

      <CustomButton type="text" icon={<IoMdClose size={22} />} onClick={onClickClearReplyMessage} />
    </div>
  )
})
