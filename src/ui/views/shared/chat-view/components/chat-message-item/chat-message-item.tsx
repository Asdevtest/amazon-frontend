import { FC, memo } from 'react'
import { IoCheckmarkDone, IoCheckmarkSharp } from 'react-icons/io5'

import { ChatMessage } from '@models/chat-model-new/types/message.type'

import { ChatMessageFiles } from '@components/chat/chat/components/chat-messages-list/components/chat-messages/chat-message-files/chat-message-files'

import { formatDateTimeHourAndMinutesLocal } from '@utils/date-time'

import { useStyles } from './chat-message-item.style'

import { MediaFiles } from '../media-files'

interface ChatMessageItemProps {
  message: ChatMessage
  isYourMessage: boolean
}

export const ChatMessageItem: FC<ChatMessageItemProps> = memo(({ message, isYourMessage }) => {
  const { classes: styles, cx } = useStyles()

  const isReadMessage = message?.isRead

  const mediaFiles = message?.images?.concat(message?.video)
  const files = message?.files

  const CheckMark = isReadMessage ? IoCheckmarkDone : IoCheckmarkSharp

  return (
    <div className={cx(styles.messageWrapper, { [styles.yourMessage]: isYourMessage })}>
      <MediaFiles mediaFiles={mediaFiles} />

      <ChatMessageFiles files={files} />

      <p>{message?.text}</p>

      <div className={styles.messageInfo}>
        <p className={styles.messageDate}>{formatDateTimeHourAndMinutesLocal(message.createdAt)}</p>

        {isYourMessage ? (
          <CheckMark className={cx(styles.checkMark, { [styles.checkMarkRead]: isReadMessage })} />
        ) : null}
      </div>
    </div>
  )
})
