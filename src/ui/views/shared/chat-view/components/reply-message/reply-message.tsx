import { FC, memo } from 'react'
import { IoMdClose } from 'react-icons/io'
import { MdOutlineReply } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessage } from '@models/chat-model-new/types/message.type'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './reply-message.style'

import { getReplyMessageText } from '../../helpers/get-reply-message-text'
import { AttachedFile } from '../attached-file'

interface ReplyMessageProps {
  message: ChatMessage
  onClickClearReplyMessage: () => void
}

export const ReplyMessage: FC<ReplyMessageProps> = memo(props => {
  const { message, onClickClearReplyMessage } = props

  const { classes: styles } = useStyles()

  const relpyMessages = getReplyMessageText({
    images: message?.images,
    video: message?.video,
    files: message?.files,
    text: message?.text,
  })

  const renderRepleMessage = () => {
    if (relpyMessages?.messageText) {
      return <p className={styles.replyMessageText}>{message?.text}</p>
    } else if (relpyMessages?.includesFiles?.length) {
      const text = relpyMessages?.includesFiles?.join(', ')

      return <p className={styles.replyMessageText}>{text}</p>
    }
  }

  return (
    <div className={styles.replyMessageWrapper}>
      <MdOutlineReply size={22} className={styles.icon} />

      <div className={styles.replyMessageContent}>
        <AttachedFile images={message?.images} videos={message?.video} files={message?.files} />

        <div>
          <p className={styles.replyText}>{t(TranslationKey.Reply)}</p>
          {renderRepleMessage()}
        </div>
      </div>

      <CustomButton type="text" icon={<IoMdClose size={22} />} onClick={onClickClearReplyMessage} />
    </div>
  )
})
