import { cx } from '@emotion/css'
import { compareDesc, parseISO } from 'date-fns'
import { observer } from 'mobx-react'
import { ReactElement, forwardRef } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract, ChatUserContract } from '@models/chat-model/contracts'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { OnTypingMessageResponse } from '@services/websocket-chat-service/interfaces'

import { NoSelectedChat } from '@components/shared/svg-icons'

import { isNotUndefined } from '@utils/checks'
import { t } from '@utils/translations'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

import { useClassNames } from './multiple-chats.styles'

import { Chat, RenderAdditionalButtonsParams } from '../chat'
import { ChatMessageUniversalHandlers } from '../chat/chat-messages-list'
import { ChatsList } from '../chats-list'

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
  isFreelanceOwner: boolean
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
  onSubmitMessage: (message: string, files: IFile[], chat: string, replyMessageId: string | null) => void
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
        isFreelanceOwner,
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
        onClickAddUsersToGroupChat,
        onRemoveUsersFromGroupChat,
        onClickEditGroupChatInfo,
      },
      ref,
    ) => {
      const { classes: classNames } = useClassNames()
      const { isMobileResolution } = useCreateBreakpointResolutions()

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
            parseISO(a.messages[a.messages.length - 1]?.createdAt || a?.createdAt),
            parseISO(b.messages[b.messages.length - 1]?.createdAt || b?.createdAt),
          )
        })

      const findChatByChatId = filteredChats.find((chat: ChatContract) => chat._id === chatSelectedId)
      const isChatSelectedAndFound = isNotUndefined(chatSelectedId) && findChatByChatId

      return (
        <div ref={ref} className={classNames.wrapper}>
          <div
            className={cx(classNames.leftSide, {
              [classNames.mobileResolution]: isChatSelectedAndFound && isMobileResolution,
            })}
          >
            <ChatsList
              userId={userId}
              typingUsers={typingUsers}
              isFreelanceOwner={isFreelanceOwner}
              chats={filteredChats}
              chatSelectedId={chatSelectedId}
              onClickChat={onClickChat}
            />
          </div>

          <div className={cx(classNames.rightSide, { [classNames.mobileResolution]: !isChatSelectedAndFound })}>
            {isChatSelectedAndFound ? (
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
                currentOpponent={currentOpponent}
                onSubmitMessage={(message: string, files: IFile[], replyMessageId: string | null) =>
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  onSubmitMessage(message, files, chatSelectedId!, replyMessageId)
                }
                onTypingMessage={onTypingMessage}
                onClickAddUsersToGroupChat={onClickAddUsersToGroupChat}
                onRemoveUsersFromGroupChat={onRemoveUsersFromGroupChat}
                onClickEditGroupChatInfo={onClickEditGroupChatInfo}
              />
            ) : !isMobileResolution ? (
              <div className={classNames.noSelectedChatWrapper}>
                <NoSelectedChat className={classNames.noSelectedChatIcon} />
                <p className={classNames.noChatTitle}>{t(TranslationKey['Choose chat'])}</p>
                <p className={classNames.noChatSubTitle}>
                  {t(TranslationKey['Try selecting a dialogue or Find a concrete speaker'])}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      )
    },
  ),
)
