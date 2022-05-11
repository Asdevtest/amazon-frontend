import React, {FC} from 'react'

import {Avatar} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {ChatContract, ChatUserContract} from '@models/chat-model/contracts'

import {ChatMessageType} from '@services/websocket-chat-service'

import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {shortenLongString} from '@utils/text'

import {useClassNames} from './chat-list-item.style'

interface Props {
  chat: ChatContract
  userId: string
  isSelected: boolean
  onClick: () => void
}

export const ChatListItem: FC<Props> = observer(({chat, isSelected, userId, onClick}) => {
  const {messages, users} = chat
  const {text} = messages[messages.length - 1] || {}
  const oponentUser = users.filter((user: ChatUserContract) => user._id !== userId)?.[0]
  const classNames = useClassNames()
  const title = typeof oponentUser?.name === 'string' ? oponentUser.name : 'User'

  const message = (() => {
    switch (text) {
      case ChatMessageType.CREATED_NEW_PROPOSAL_PROPOSAL_DESCRIPTION:
        return 'Created new proposal, proposal description'
      case ChatMessageType.CREATED_NEW_PROPOSAL_REQUEST_DESCRIPTION:
        return 'Created new proposal, request description'
      case ChatMessageType.PROPOSAL_RESULT_EDITED:
        return 'Proposal result edited'
      case ChatMessageType.PROPOSAL_STATUS_CHANGED:
        return 'Proposal status changed'
      default:
        text
    }
  })()

  return (
    <div className={clsx(classNames.root, {[classNames.rootIsSelected]: isSelected})} onClick={onClick}>
      <div className={classNames.leftSide}>
        <Avatar src={getUserAvatarSrc(oponentUser._id)} className={classNames.avatarWrapper} />
      </div>
      <div className={classNames.rightSide}>
        <div className={classNames.titleWrapper}>
          <p className={classNames.titleText}>{title}</p>
        </div>
        {message ? (
          <div className={classNames.lastMessageWrapper}>
            <p className={classNames.lastMessageText}>{shortenLongString(message, 20)}</p>
          </div>
        ) : undefined}
      </div>
    </div>
  )
})
