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

      <p className={styles.groupTitle}>{`${message.data?.title} :`}</p>

      <div className={styles.usersWrapper}>
        {message.data.users.map((el: { _id: string; name: string }, index: number) => (
          <UserLink key={index} name={el.name} userId={el._id} />
        ))}
      </div>
    </div>
  )
}
