import React, {FC} from 'react'

import {Avatar} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {ChatContract, ChatUserContract} from '@models/chat-model/contracts'

import {ChatMessageType} from '@services/websocket-chat-service'
import {OnTypingMessageResponse} from '@services/websocket-chat-service/interfaces'

import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {shortenLongString} from '@utils/text'
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
  const classNames = useClassNames()

  const {messages, users} = chat
  const {text} = messages[messages.length - 1] || {}
  const oponentUser = users.filter((user: ChatUserContract) => user._id !== userId)?.[0]
  const title = typeof oponentUser?.name === 'string' ? oponentUser.name : 'User'

  const unReadMessages = messages.filter(el => !el.isRead && el.userId !== userId)

  const message = text
    ? (() => {
        switch (text) {
          case ChatMessageType.CREATED_NEW_PROPOSAL_PROPOSAL_DESCRIPTION:
            return t(TranslationKey['Created new proposal, proposal description'])
          case ChatMessageType.CREATED_NEW_PROPOSAL_REQUEST_DESCRIPTION:
            return t(TranslationKey['Created new proposal, request description'])
          case ChatMessageType.PROPOSAL_RESULT_EDITED:
            return t(TranslationKey['Proposal result edited'])
          case ChatMessageType.PROPOSAL_STATUS_CHANGED:
            return t(TranslationKey['Proposal status changed'])
          default:
            return text
        }
      })()
    : ''

  return (
    <div className={clsx(classNames.root, {[classNames.rootIsSelected]: isSelected})} onClick={onClick}>
      <div className={classNames.leftSide}>
        <Avatar src={getUserAvatarSrc(oponentUser._id)} className={classNames.avatarWrapper} />
      </div>
      <div className={classNames.rightSide}>
        <div className={classNames.titleWrapper}>
          <p className={classNames.titleText}>{title}</p>
        </div>
        {text ? (
          <div className={classNames.lastMessageWrapper}>
            <p className={classNames.lastMessageText}>
              {typingUsers?.find(el => el.chatId === chat._id && el.userId === oponentUser._id)
                ? t(TranslationKey.Writes) + '...'
                : shortenLongString(message, 18)}
            </p>
          </div>
        ) : undefined}
      </div>
      {unReadMessages.length ? <div className={classNames.badge}>{unReadMessages.length}</div> : undefined}
    </div>
  )
})
