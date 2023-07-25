import { FC } from 'react'

import { Avatar, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { ChatMessageTextType } from '@services/websocket-chat-service/interfaces'

import { UserLink } from '@components/user/user-link'

import { formatDateTimeHourAndMinutes } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { useClassNames } from './simple-messages-notification.style'

interface SimpleMessagesNotificationProps {
  noticeItem: ChatMessageContract | null
  onClickMessage: (noticeItem: ChatMessageContract | null) => void
}

export const SimpleMessagesNotification: FC<SimpleMessagesNotificationProps> = props => {
  const { classes: classNames } = useClassNames()

  const { noticeItem, onClickMessage } = props

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
    <div
      className={classNames.mainWrapper}
      onClick={() => {
        onClickMessage(noticeItem)
      }}
    >
      <Avatar src={getUserAvatarSrc(noticeItem?.user?._id)} className={classNames.avatarWrapper} />
      <div className={classNames.centerWrapper}>
        <UserLink
          name={noticeItem?.user?.name}
          userId={noticeItem?.user?._id}
          blackText={undefined}
          withAvatar={undefined}
          maxNameWidth={undefined}
          customStyles={undefined}
          customClassNames={undefined}
        />

        {message ? (
          <Typography className={classNames.messageText}>
            {message?.length > 40 ? message.slice(0, 37) + '...' : message}
          </Typography>
        ) : null}

        {noticeItem?.files?.length ? (
          <Typography className={classNames.filesText}>
            {`*${noticeItem?.files?.length} ${t(TranslationKey.Files)}*`}
          </Typography>
        ) : null}
      </div>

      <div className={classNames.footer}>
        <Typography className={classNames.messageDate}>
          {formatDateTimeHourAndMinutes(noticeItem?.createdAt)}
        </Typography>
      </div>
    </div>
  )
}
