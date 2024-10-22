import { FC, memo } from 'react'
import { IoMdClose } from 'react-icons/io'
import { MdOutlineReply } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessage } from '@models/chat-model-new/types/message.type'

import { CustomButton } from '@components/shared/custom-button'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useStyles } from './reply-message.style'

interface ReplyMessageProps {
  message: ChatMessage
  onClickClearReplyMessage: () => void
}

export const ReplyMessage: FC<ReplyMessageProps> = memo(props => {
  const { message, onClickClearReplyMessage } = props

  const { classes: styles } = useStyles()

  const firstImage = message?.images?.[0]
  const firstVideo = message?.video?.[0]
  const firstFile = message?.files?.[0]

  return (
    <div className={styles.replyMessageWrapper}>
      <MdOutlineReply size={22} className={styles.icon} />

      <div className={styles.replyMessageContent}>
        {firstImage ? <img src={getAmazonImageUrl(firstImage)} className={styles.img} alt="image" /> : null}

        <div>
          <p className={styles.replyText}>{t(TranslationKey.Reply)}</p>
          <p className={styles.replyMessageText}>{message?.text}</p>
        </div>
      </div>

      <CustomButton type="text" icon={<IoMdClose size={22} />} onClick={onClickClearReplyMessage} />
    </div>
  )
})
