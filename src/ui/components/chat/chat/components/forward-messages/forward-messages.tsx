import { FC, memo, useMemo } from 'react'
import { IoMdClose } from 'react-icons/io'
import { RiShareForwardFill } from 'react-icons/ri'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatUserContract } from '@models/chat-model/contracts'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './forward-messages.style'

import { ChatMessageFiles } from '../chat-messages-list/components/chat-messages/chat-message-files/chat-message-files'

interface ForwardMessagesProps {
  messages: ChatMessageContract[]
  onClickClearForwardMessages?: () => void
}

export const ForwardMessages: FC<ForwardMessagesProps> = memo(props => {
  const { messages, onClickClearForwardMessages } = props

  const { classes: styles } = useStyles()

  const uniqueUsers = useMemo(() => {
    const users: ChatUserContract[] = []

    for (const message of messages) {
      if (users?.some(user => user._id === message?.user?._id)) {
        continue
      } else {
        users.push(message?.user as ChatUserContract)
      }
    }

    return users?.map(el => el?.name)
  }, [])

  return (
    <div className={styles.forwardMessagesWrapper}>
      <RiShareForwardFill size={22} className={styles.icon} />

      {messages?.length === 1 ? (
        <div className={styles.content}>
          <p className={styles.forwardMessagesUsers}>{uniqueUsers?.join(', ')}</p>

          {messages[0].text ? <p className={styles.message}>{messages[0].text}</p> : null}

          {(!!messages[0].files?.length || !!messages[0].images?.length || !!messages[0].video?.length) && (
            <div className={styles.fileList}>
              <ChatMessageFiles files={[...messages[0].files, ...messages[0].images, ...messages[0].video]} />
            </div>
          )}
        </div>
      ) : (
        <div className={styles.forwardMessages}>
          <p className={styles.forwardMessagesUsers}>{uniqueUsers?.join(', ')}</p>
          <p>{t(TranslationKey['forwarded messages'], { count: messages?.length })}</p>
        </div>
      )}

      <CustomButton type="text" icon={<IoMdClose size={22} />} onClick={onClickClearForwardMessages} />
    </div>
  )
})
