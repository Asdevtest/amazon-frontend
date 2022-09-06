import React, {forwardRef, ReactElement} from 'react'

import {compareDesc, parseISO} from 'date-fns'
import {observer} from 'mobx-react'

import {ChatContract, ChatUserContract} from '@models/chat-model/contracts'

import {isNotUndefined} from '@utils/checks'

import {Chat, RenderAdditionalButtonsParams} from '../chat'
import {ChatMessageUniversalHandlers} from '../chat/chat-messages-list'
import {ChatsList} from '../chats-list'
import {useClassNames} from './multiple-chats.style'

interface Props {
  searchFilter: string
  chats: ChatContract[]
  userId: string
  chatSelectedId?: string
  chatMessageHandlers?: ChatMessageUniversalHandlers
  renderAdditionalButtons?: (params: RenderAdditionalButtonsParams, resetAllInputs: () => void) => ReactElement
  updateData: () => void
  onSubmitMessage: (message: string, links: string[], files: any, chat: string) => void
  onClickChat: (chat: ChatContract) => void
}

export const MultipleChats = observer(
  forwardRef<HTMLDivElement, Props>(
    (
      {
        searchFilter,
        chats,
        userId,
        chatSelectedId,
        chatMessageHandlers,
        updateData,
        onSubmitMessage,
        onClickChat,
        renderAdditionalButtons,
      },
      ref,
    ) => {
      const classNames = useClassNames()

      const filteredChats = chats
        .filter(el => {
          const oponentUser = el.users.filter((user: ChatUserContract) => user._id !== userId)?.[0]
          const title = typeof oponentUser?.name === 'string' ? oponentUser.name : 'User'
          if (!searchFilter || title.toLocaleLowerCase().includes(searchFilter.toLocaleLowerCase())) {
            return true
          } else {
            return false
          }
        })
        .sort((a, b) => {
          return compareDesc(
            parseISO(a.messages[a.messages.length - 1].createdAt),
            parseISO(b.messages[b.messages.length - 1].createdAt),
          )
        })

      const findChatByChatId = filteredChats.find((chat: ChatContract) => chat._id === chatSelectedId)

      return (
        <div ref={ref} className={classNames.root}>
          {
            <div className={classNames.chatsWrapper}>
              <ChatsList
                userId={userId}
                chats={filteredChats}
                chatSelectedId={chatSelectedId}
                onClickChat={onClickChat}
              />
            </div>
          }
          <div className={classNames.chatWrapper}>
            {isNotUndefined(chatSelectedId) && findChatByChatId ? (
              <Chat
                userId={userId}
                chat={findChatByChatId}
                messages={findChatByChatId.messages}
                chatMessageHandlers={chatMessageHandlers}
                renderAdditionalButtons={renderAdditionalButtons}
                updateData={updateData}
                onSubmitMessage={(message: string, links: string[], files: any) =>
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  onSubmitMessage(message, links, files, chatSelectedId!)
                }
              />
            ) : undefined}
          </div>
        </div>
      )
    },
  ),
)
