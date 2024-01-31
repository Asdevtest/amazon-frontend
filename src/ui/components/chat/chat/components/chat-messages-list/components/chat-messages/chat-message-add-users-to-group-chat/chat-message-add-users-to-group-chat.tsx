import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataAddUsersToGroupChatContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { useStyles } from './chat-message-add-users-to-group-chat.style'

interface Props {
  message: ChatMessageContract<ChatMessageDataAddUsersToGroupChatContract>
}

export const ChatMessageAddUsersToGroupChat: FC<Props> = ({ message }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      <UserLink name={message.user?.name} userId={message.user?._id} />

      <p className={styles.groupText}>{t(TranslationKey['added to the group chat'])}</p>

      <div className={styles.usersWrapper}>
        {message.data.users.map((el: { _id: string; name: string }, index: number) => (
          <div key={index} className={styles.user}>
            <UserLink name={el.name} userId={el._id} />
            {index < message.data.users.length - 1 ? <span>, </span> : null}
          </div>
        ))}
      </div>
    </div>
  )
}
