import { FC, memo } from 'react'
import { IoCheckmarkDone, IoCheckmarkSharp } from 'react-icons/io5'

import { ChatMessage } from '@models/chat-model-new/types/message.type'

import { formatDateTimeHourAndMinutesLocal } from '@utils/date-time'

import { useStyles } from './chat-message-item.style'

interface ChatMessageItemProps {
  currentUserId: string
  message: ChatMessage
}

export const ChatMessageItem: FC<ChatMessageItemProps> = memo(({ message, currentUserId }) => {
  const { classes: styles, cx } = useStyles()

  const isYourMessage = message?.user?._id === currentUserId
  const isReadMessage = message?.isRead
  const mediaFiles = message?.images?.concat(message?.video)

  const CheckMark = isReadMessage ? IoCheckmarkDone : IoCheckmarkSharp

  return (
    <div className={cx(styles.messageWrapper, { [styles.yourMessage]: isYourMessage })}>
      <div>{message?.text}</div>

      <div className={styles.messageInfo}>
        <p className={styles.messageDate}>{formatDateTimeHourAndMinutesLocal(message.createdAt)}</p>

        {isYourMessage ? (
          <CheckMark className={cx(styles.checkMark, { [styles.checkMarkRead]: isReadMessage })} />
        ) : null}
      </div>
    </div>
  )
})
