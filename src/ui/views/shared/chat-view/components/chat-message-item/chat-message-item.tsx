import { CSSProperties, FC, memo } from 'react'
import { IoCheckmarkDone, IoCheckmarkSharp } from 'react-icons/io5'
import { CellMeasurerChildProps } from 'react-virtualized/dist/es/CellMeasurer'

import { ChatMessage } from '@models/chat-model-new/types/message.type'

import { ChatMessageFiles } from '@components/chat/chat/components/chat-messages-list/components/chat-messages/chat-message-files/chat-message-files'

import { formatDateTimeHourAndMinutesLocal } from '@utils/date-time'

import { useStyles } from './chat-message-item.style'

import { MediaFiles } from '../media-files'

interface ChatMessageItemProps {
  currentUserId: string
  message: ChatMessage
  style: CSSProperties
  measure: CellMeasurerChildProps['measure']
  registerChild: CellMeasurerChildProps['registerChild']
}

export const ChatMessageItem: FC<ChatMessageItemProps> = memo(
  ({ message, currentUserId, style, measure, registerChild }) => {
    const { classes: styles, cx } = useStyles()

    const isYourMessage = message?.user?._id === currentUserId
    const isReadMessage = message?.isRead

    const mediaFiles = message?.images?.concat(message?.video)
    const files = message?.files

    const CheckMark = isReadMessage ? IoCheckmarkDone : IoCheckmarkSharp

    return (
      // @ts-ignore
      <div ref={registerChild} className={styles.contrainer} style={style}>
        <div className={cx(styles.messageWrapper, { [styles.yourMessage]: isYourMessage })}>
          <MediaFiles measure={measure} mediaFiles={mediaFiles} />

          <ChatMessageFiles files={files} />

          <p>{message?.text}</p>

          <div className={styles.messageInfo}>
            <p className={styles.messageDate}>{formatDateTimeHourAndMinutesLocal(message.createdAt)}</p>

            {isYourMessage ? (
              <CheckMark className={cx(styles.checkMark, { [styles.checkMarkRead]: isReadMessage })} />
            ) : null}
          </div>
        </div>
      </div>
    )
  },
)
