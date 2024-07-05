import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { ChatMessageTextType, EChatInfoType } from '@services/websocket-chat-service/interfaces'

import { UserLink } from '@components/user/user-link'

import { formatDateTimeHourAndMinutes } from '@utils/date-time'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import classes from './styles.module.scss'

interface ChatMessageProps {
  noticeItem: ChatMessageContract | null
  onClickMessage: (noticeItem: ChatMessageContract | null) => void
}

export const ChatMessage: FC<ChatMessageProps> = ({ noticeItem, onClickMessage }) => {
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

  const hasFiles = !!noticeItem?.files?.length
  const hasImages = !!noticeItem?.images?.length
  const isGroupChat = noticeItem?.info?.type === EChatInfoType.GROUP

  return (
    <div className={classes.mainWrapper} onClick={() => onClickMessage(noticeItem)}>
      <img
        src={isGroupChat ? getAmazonImageUrl(noticeItem?.info?.image) : getUserAvatarSrc(noticeItem?.user?._id)}
        className={classes.avatar}
      />
      <div className={classes.content}>
        {isGroupChat ? (
          <p className={classes.noticeTitle}>{noticeItem?.info?.title}</p>
        ) : (
          <UserLink
            name={noticeItem?.user?.name}
            userId={noticeItem?.user?._id}
            customClassNames={classes.noticeTitle}
          />
        )}

        {!!message && (
          <p className={classes.message}>
            {isGroupChat && <span className={classes.messageOwner}>{`${noticeItem?.user?.name}: `}</span>}
            {message}
          </p>
        )}

        {hasFiles || hasImages ? (
          <div className={classes.files}>
            {hasFiles ? (
              <p className={classes.date}>{`${noticeItem?.files?.length} ${t(TranslationKey.Files)}`}</p>
            ) : null}

            {hasFiles && hasImages ? <p className={classes.date}>/</p> : null}

            {hasImages ? (
              <p className={classes.date}>{`${noticeItem?.images?.length} ${t(TranslationKey.Images)}`}</p>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className={classes.dateContainer}>
        <p className={classes.date}>{formatDateTimeHourAndMinutes(noticeItem?.createdAt)}</p>
      </div>
    </div>
  )
}
