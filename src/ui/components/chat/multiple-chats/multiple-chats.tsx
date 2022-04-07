import React, {forwardRef} from 'react'

import {observer} from 'mobx-react'

import {ChatContract} from '@models/chat-model/contracts'

import {isNotUndefined} from '@utils/checks'

import {Chat} from '../chat'
import {ChatsList} from '../chats-list'
import {useClassNames} from './multiple-chats.style'

interface Props {
  chats: ChatContract[]
  userId: string
  chatSelectedId?: string
  onSubmitMessage: (message: string, chat: string) => void
  onClickChat: (chat: ChatContract) => void
}

export const MultipleChats = observer(
  forwardRef<HTMLDivElement, Props>(({chats, userId, chatSelectedId, onSubmitMessage, onClickChat}, ref) => {
    const classNames = useClassNames()
    const findChatByChatId = chats.find((chat: ChatContract) => chat._id === chatSelectedId)
    return (
      <div ref={ref} className={classNames.root}>
        <div className={classNames.chatsWrapper}>
          <ChatsList userId={userId} chats={chats} chatSelectedId={chatSelectedId} onClickChat={onClickChat} />
        </div>
        <div className={classNames.chatWrapper}>
          {isNotUndefined(chatSelectedId) && findChatByChatId ? (
            <Chat
              userId={userId}
              messages={findChatByChatId.messages}
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              onSubmitMessage={(message: string) => onSubmitMessage(message, chatSelectedId!)}
            />
          ) : undefined}
        </div>
      </div>
    )
  }),
)
