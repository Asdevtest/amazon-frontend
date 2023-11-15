import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { ChatMessageTextType } from '@services/websocket-chat-service/interfaces'

import { UserLink } from '@components/user/user-link'

import { formatDateTimeHourAndMinutes } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { useStyles } from './simple-messages-notification.style'

interface SimpleMessagesNotificationProps {
  noticeItem: ChatMessageContract | null
  onClickMessage: (noticeItem: ChatMessageContract | null) => void
}

export const SimpleMessagesNotification: FC<SimpleMessagesNotificationProps> = ({ noticeItem, onClickMessage }) => {
  const { classes: styles } = useStyles()

  const message = noticeItem?.text
    ? (() => {
        switch (noticeItem.text) {
          case ChatMessageTextType.ADD_USERS_TO_GROUP_CHAT_BY_ADMIN:
            return t(TranslationKey['added to the group chat']) + '...'
          case ChatMessageTextType.REMOVE_USERS_FROM_GROUP_CHAT_BY_ADMIN:
            return t(TranslationKey['deleted from group chat']) + '...'
          case ChatMessageTextType.PATCH_INFO:
            return t(TranslationKey['changed the chat info'])
          default:
            return noticeItem.text
        }
      })()
    : ''

  return (
    <div className={styles.mainWrapper} onClick={() => onClickMessage(noticeItem)}>
      <img src={getUserAvatarSrc(noticeItem?.user?._id)} className={styles.avatar} />
      <div className={styles.content}>
        <UserLink name={noticeItem?.user?.name} userId={noticeItem?.user?._id} />

        {message ? <p className={styles.message}>{message}</p> : null}

        {noticeItem?.files?.length ? (
          <p className={styles.date}>{`*${noticeItem?.files?.length} ${t(TranslationKey.Files)}*`}</p>
        ) : null}
      </div>

      <div className={styles.dateContainer}>
        <p className={styles.date}>{formatDateTimeHourAndMinutes(noticeItem?.createdAt)}</p>
      </div>
    </div>
  )
}
