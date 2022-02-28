import React, {FC} from 'react'

import clsx from 'clsx'
import {observer} from 'mobx-react'

import {ChatContract, ChatUserContract} from '@models/chat-model/contracts'

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
  return (
    <div className={clsx(classNames.root, {[classNames.rootIsSelected]: isSelected})} onClick={onClick}>
      <div className={classNames.leftSide}>
        <div className={classNames.avatarWrapper} />
      </div>
      <div className={classNames.rightSide}>
        <div className={classNames.titleWrapper}>
          <p className={classNames.titleText}>{title}</p>
        </div>
        {text ? (
          <div className={classNames.lastMessageWrapper}>
            <p className={classNames.lastMessageText}>{shortenLongString(text, 14)}</p>
          </div>
        ) : undefined}
      </div>
    </div>
  )
})
