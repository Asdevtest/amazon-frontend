import { FC, memo, useMemo } from 'react'
import { IoMdClose } from 'react-icons/io'
import { RiShareForwardFill } from 'react-icons/ri'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessage } from '@models/chat-model-new/types/message.type'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './forward-messages.style'

interface ForwardMessagesProps {
  messages: ChatMessage[]
  onClickClearForwardMessages?: () => void
}

export const ForwardMessages: FC<ForwardMessagesProps> = memo(props => {
  const { messages, onClickClearForwardMessages } = props

  const { classes: styles } = useStyles()

  const uniqueUsers = useMemo(() => {
    const users: IFullUser[] = []

    for (const message of messages) {
      if (!users.some(el => el?._id === message?.user?._id)) {
        users.push(message?.user)
      }
    }

    return users?.map(el => el?.name)
  }, [messages])

  return (
    <div className={styles.forwardMessagesWrapper}>
      <RiShareForwardFill size={22} className={styles.icon} />

      <div className={styles.forwardMessages}>
        <p className={styles.forwardMessagesUsers}>{uniqueUsers?.join(', ')}</p>
        <p className={styles.forwardMessagesCount}>
          {t(TranslationKey['forwarded messages'], { count: messages?.length })}
        </p>
      </div>

      <CustomButton type="text" icon={<IoMdClose size={22} />} onClick={onClickClearForwardMessages} />
    </div>
  )
})
