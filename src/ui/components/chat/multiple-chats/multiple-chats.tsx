import {cx} from '@emotion/css'
import {Typography} from '@mui/material'

import React, {forwardRef, ReactElement} from 'react'

import {compareDesc, parseISO} from 'date-fns'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {ChatContract, ChatUserContract} from '@models/chat-model/contracts'
import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'
import {SettingsModel} from '@models/settings-model'

import {OnTypingMessageResponse} from '@services/websocket-chat-service/interfaces'

import {isNotUndefined} from '@utils/checks'
import {t} from '@utils/translations'

import {Chat, RenderAdditionalButtonsParams} from '../chat'
import {ChatMessageUniversalHandlers} from '../chat/chat-messages-list'
import {ChatsList} from '../chats-list'
import {useClassNames} from './multiple-chats.style'

export interface IFile {
  data_url: string
  file: File
}

export interface CurrentOpponent {
  active: boolean
  balance: number
  balanceFreeze: number
  canByMasterUser: boolean
  chat_users: Object
  email: string
  fba: boolean
  name: string
  overdraft: number
  rate: number
  _id: string
}
interface Props {
  searchFilter: string
  chats: ChatContract[]
  userId: string
  currentOpponent?: CurrentOpponent
  chatSelectedId?: string
  chatMessageHandlers?: ChatMessageUniversalHandlers
  typingUsers?: OnTypingMessageResponse[]
  toScrollMesId?: string | undefined
  messagesFound?: ChatMessageContract[]
  searchPhrase?: string

  renderAdditionalButtons?: (params: RenderAdditionalButtonsParams, resetAllInputs: () => void) => ReactElement
  updateData: () => void
  onSubmitMessage: (message: string, files: IFile[], chat: string) => void
  onClickChat: (chat: ChatContract) => void
  onTypingMessage: (chatId: string) => void
  onClickBackButton: () => void
  onClickAddUsersToGroupChat: () => void
  onRemoveUsersFromGroupChat: (usersIds: string[]) => void
  onClickEditGroupChatInfo: () => void
}

export const MultipleChats = observer(
  forwardRef<HTMLDivElement, Props>(
    (
      {
        searchPhrase,
        toScrollMesId,
        messagesFound,
        typingUsers,
        searchFilter,
        chats,
        userId,
        chatSelectedId,
        chatMessageHandlers,
        updateData,
        onSubmitMessage,
        onClickChat,
        renderAdditionalButtons,
        onTypingMessage,
        currentOpponent,
        onClickBackButton,
        onClickAddUsersToGroupChat,
        onRemoveUsersFromGroupChat,
        onClickEditGroupChatInfo,
      },
      ref,
    ) => {
      const {classes: classNames} = useClassNames()

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
            parseISO(a.messages[a.messages.length - 1]?.createdAt),
            parseISO(b.messages[b.messages.length - 1]?.createdAt),
          )
        })

      const findChatByChatId = filteredChats.find((chat: ChatContract) => chat._id === chatSelectedId)

      return (
        <div ref={ref} className={classNames.root}>
          {
            <div
              className={cx(classNames.chatsWrapper, {
                [classNames.hideChatsWrapper]: !!isNotUndefined(chatSelectedId) && !!findChatByChatId,
              })}
            >
              <ChatsList
                userId={userId}
                typingUsers={typingUsers}
                chats={filteredChats}
                chatSelectedId={chatSelectedId}
                onClickChat={onClickChat}
              />
            </div>
          }
          {SettingsModel.languageTag && window.innerWidth >= 768 && (
            <div className={classNames.chatWrapper}>
              {isNotUndefined(chatSelectedId) && findChatByChatId ? (
                <Chat
                  userId={userId}
                  chat={findChatByChatId}
                  messages={findChatByChatId.messages}
                  chatMessageHandlers={chatMessageHandlers}
                  toScrollMesId={toScrollMesId}
                  messagesFound={messagesFound}
                  searchPhrase={searchPhrase}
                  renderAdditionalButtons={renderAdditionalButtons}
                  updateData={updateData}
                  onSubmitMessage={(message: string, files: IFile[]) =>
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    onSubmitMessage(message, files, chatSelectedId!)
                  }
                  onTypingMessage={onTypingMessage}
                  onClickBackButton={onClickBackButton}
                  onClickAddUsersToGroupChat={onClickAddUsersToGroupChat}
                  onRemoveUsersFromGroupChat={onRemoveUsersFromGroupChat}
                  onClickEditGroupChatInfo={onClickEditGroupChatInfo}
                />
              ) : (
                <div className={classNames.noChatWrapper}>
                  <img src="/assets/icons/no-chats.svg" />
                  <Typography className={classNames.noChatTitle}>{t(TranslationKey['Choose chat'])}</Typography>
                  <Typography className={classNames.noChatSubTitle}>
                    {t(TranslationKey['Try selecting a dialogue or Find a concrete speaker'])}
                  </Typography>
                </div>
              )}
            </div>
          )}

          {isNotUndefined(chatSelectedId) && findChatByChatId && window.innerWidth < 768 && (
            <div className={classNames.chatWrapper}>
              {
                <Chat
                  userId={userId}
                  chat={findChatByChatId}
                  currentOpponent={currentOpponent}
                  messages={findChatByChatId.messages}
                  chatMessageHandlers={chatMessageHandlers}
                  renderAdditionalButtons={renderAdditionalButtons}
                  updateData={updateData}
                  onSubmitMessage={(message: string, files: IFile[]) =>
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    onSubmitMessage(message, files, chatSelectedId!)
                  }
                  onTypingMessage={onTypingMessage}
                  onClickBackButton={onClickBackButton}
                  onClickAddUsersToGroupChat={onClickAddUsersToGroupChat}
                  onRemoveUsersFromGroupChat={onRemoveUsersFromGroupChat}
                  onClickEditGroupChatInfo={onClickEditGroupChatInfo}
                />
              }
            </div>
          )}
        </div>
      )
    },
  ),
)
