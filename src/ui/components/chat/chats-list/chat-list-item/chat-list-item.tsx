import {cx} from '@emotion/css'
import {Avatar} from '@mui/material'

import React, {FC} from 'react'

import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {ChatContract, ChatUserContract} from '@models/chat-model/contracts'

import {ChatMessageType} from '@services/websocket-chat-service'
import {OnTypingMessageResponse} from '@services/websocket-chat-service/interfaces'

import {formatDateWithoutTime} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {t} from '@utils/translations'

import {useClassNames} from './chat-list-item.style'

interface Props {
  chat: ChatContract
  userId: string
  isSelected: boolean
  typingUsers?: OnTypingMessageResponse[]

  onClick: () => void
}

export const ChatListItem: FC<Props> = observer(({chat, isSelected, userId, onClick, typingUsers}) => {
  const {classes: classNames} = useClassNames()

  const {messages, users} = chat

  const lastMessage = messages[messages.length - 1] || {}

  const oponentUser = users.filter((user: ChatUserContract) => user._id !== userId)?.[0]
  const title = typeof oponentUser?.name === 'string' ? oponentUser.name : 'User'

  const unReadMessages = messages.filter(el => !el.isRead && el.userId !== userId)

  const message = lastMessage.text
    ? (() => {
        switch (lastMessage.text) {
          case ChatMessageType.CREATED_NEW_PROPOSAL_PROPOSAL_DESCRIPTION:
            return t(TranslationKey['Created new proposal, proposal description'])
          case ChatMessageType.CREATED_NEW_PROPOSAL_REQUEST_DESCRIPTION:
            return t(TranslationKey['Created new proposal, request description'])
          case ChatMessageType.PROPOSAL_RESULT_EDITED:
            return t(TranslationKey['Proposal result edited'])
          case ChatMessageType.PROPOSAL_STATUS_CHANGED:
            return t(TranslationKey['Proposal status changed'])
          default:
            return lastMessage.text
        }
      })()
    : ''

  return (
    <div className={cx(classNames.root, {[classNames.rootIsSelected]: isSelected})} onClick={onClick}>
      <div className={classNames.leftSide}>
        <Avatar src={getUserAvatarSrc(oponentUser?._id)} className={classNames.avatarWrapper} />
      </div>
      <div className={classNames.rightSide}>
        <div className={classNames.titleWrapper}>
          <p className={classNames.titleText}>{title}</p>

          {lastMessage?.updatedAt ? (
            <p className={classNames.messageDate}>{formatDateWithoutTime(lastMessage.updatedAt)}</p>
          ) : null}
        </div>
        {lastMessage ? (
          <div className={classNames.lastMessageWrapper}>
            {typingUsers?.find(el => el.chatId === chat._id && el.userId === oponentUser?._id) ? (
              <div className={classNames.lastMessageSubWrapper}>
                <Avatar src={getUserAvatarSrc(oponentUser?._id)} className={classNames.miniAvatar} />

                <p className={classNames.lastMessageText}>{t(TranslationKey.Writes) + '...'}</p>
              </div>
            ) : (
              <div className={classNames.lastMessageSubWrapper}>
                <Avatar src={getUserAvatarSrc(lastMessage.userId)} className={classNames.miniAvatar} />

                <p className={classNames.lastMessageText}>
                  {message + (lastMessage?.files?.length ? `*${t(TranslationKey.Files)}*` : '')}
                </p>
              </div>
            )}

            {userId === lastMessage.userId ? (
              <div className={classNames.readIconsWrapper}>
                <img src={lastMessage.isRead ? '/assets/icons/is-read.svg' : '/assets/icons/no-read.svg'} />
              </div>
            ) : null}

            {unReadMessages.length ? <div className={classNames.badge}>{unReadMessages.length}</div> : undefined}
          </div>
        ) : undefined}
      </div>
    </div>
  )
})
