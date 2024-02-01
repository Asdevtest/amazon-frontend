import { compareDesc, parseISO } from 'date-fns'
import { ReactElement, forwardRef, memo } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract, ChatUserContract } from '@models/chat-model/contracts'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { OnTypingMessageResponse } from '@services/websocket-chat-service/interfaces'

import { ChatSoundNotification } from '@components/chat/chat-sound-notification'
import { SearchInput } from '@components/shared/search-input'
import { NoSelectedChat } from '@components/shared/svg-icons'

import { isNotUndefined } from '@utils/checks'
import { t } from '@utils/translations'

import { UploadFileType } from '@typings/upload-file'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

import { useStyles } from './multiple-chats.style'

import { Chat } from '../chat'
import { ChatMessageRequestProposalDesignerResultEditedHandlers } from '../chat/components/chat-messages-list/components/chat-messages/chat-message-designer-proposal-edited-result'
import { RenderAdditionalButtonsParams } from '../chat/helpers/chat.interface'
import { ChatsList } from '../chats-list'
import { SearchResult } from '../search-result'

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

interface MultipleChatsProps {
  isFreelanceOwner: boolean
  searchFilter: string
  chats: ChatContract[]
  curFoundedMessage: ChatContract
  mutedChats: string[]
  userId: string
  mesSearchValue: string
  currentOpponent?: CurrentOpponent
  chatSelectedId?: string
  chatMessageHandlers?: ChatMessageRequestProposalDesignerResultEditedHandlers
  typingUsers?: OnTypingMessageResponse[]
  messagesFound?: ChatMessageContract[]
  searchPhrase?: string
  requestStatus: loadingStatuses
  onChangeRequestStatus: (status: loadingStatuses) => void
  renderAdditionalButtons?: (params: RenderAdditionalButtonsParams, resetAllInputs: () => void) => ReactElement
  updateData: () => void
  onSubmitMessage: (message: string, files: UploadFileType[], chat: string, replyMessageId: string | null) => void
  onClickChat: (chat: ChatContract) => void
  onTypingMessage: (chatId: string) => void
  onClickBackButton: () => void
  onClickAddUsersToGroupChat: () => void
  onRemoveUsersFromGroupChat: (usersIds: string[]) => void
  onClickEditGroupChatInfo: () => void
  onToggleMuteCurrentChat: () => void
  onChangeMesSearchValue: () => void
  onChangeCurFoundedMessage: () => void
  onCloseMesSearchValue: () => void
}

export const MultipleChats = memo(
  forwardRef<HTMLDivElement, MultipleChatsProps>(
    (
      {
        isFreelanceOwner,
        searchPhrase,
        messagesFound,
        typingUsers,
        mesSearchValue,
        searchFilter,
        chats,
        userId,
        mutedChats,
        chatSelectedId,
        chatMessageHandlers,
        curFoundedMessage,
        updateData,
        onSubmitMessage,
        onClickChat,
        renderAdditionalButtons,
        onTypingMessage,
        currentOpponent,
        onClickAddUsersToGroupChat,
        onRemoveUsersFromGroupChat,
        onClickEditGroupChatInfo,
        onToggleMuteCurrentChat,
        onChangeMesSearchValue,
        onChangeCurFoundedMessage,
        onCloseMesSearchValue,
        requestStatus,
        onChangeRequestStatus,
      },
      ref,
    ) => {
      const { classes: styles, cx } = useStyles()
      const { isMobileResolution } = useCreateBreakpointResolutions()

      const filteredChats = chats
        ?.filter(el => {
          const oponentUser = el.users?.filter((user: ChatUserContract) => user._id !== userId)?.[0]
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
      const isMuteCurrentChat = mutedChats.includes(findChatByChatId ? findChatByChatId?._id : '')
      const curFoundedMessageIndex = messagesFound?.findIndex(el => curFoundedMessage?._id === el._id)

      return (
        <div ref={ref} className={styles.wrapper}>
          <div
            className={cx(styles.leftSide, {
              [styles.mobileResolution]: isChatSelectedAndFound && isMobileResolution,
            })}
          >
            <ChatsList
              userId={userId}
              typingUsers={typingUsers}
              isFreelanceOwner={isFreelanceOwner}
              chats={filteredChats}
              chatSelectedId={chatSelectedId}
              mutedChats={mutedChats}
              onClickChat={onClickChat}
            />
          </div>

          <div className={styles.rightSide}>
            {isChatSelectedAndFound && (
              <div className={styles.header}>
                <div className={styles.searchMessageContainer}>
                  <SearchInput
                    inputClasses={styles.searchInput}
                    placeholder={t(TranslationKey['Message Search'])}
                    value={mesSearchValue}
                    onChange={onChangeMesSearchValue}
                  />

                  {messagesFound?.length ? (
                    <SearchResult
                      curFoundedMessageIndex={curFoundedMessageIndex}
                      messagesFound={messagesFound}
                      onClose={onCloseMesSearchValue}
                      onChangeCurFoundedMessage={onChangeCurFoundedMessage}
                    />
                  ) : mesSearchValue ? (
                    <p className={styles.searchResult}>{t(TranslationKey['Not found'])}</p>
                  ) : null}
                </div>

                <ChatSoundNotification isMuteChat={isMuteCurrentChat} onToggleMuteChat={onToggleMuteCurrentChat} />
              </div>
            )}

            {isChatSelectedAndFound ? (
              <Chat
                isFreelanceOwner={isFreelanceOwner}
                userId={userId}
                chat={findChatByChatId}
                messages={findChatByChatId.messages}
                chatMessageHandlers={chatMessageHandlers}
                toScrollMesId={curFoundedMessage?._id}
                messagesFound={messagesFound}
                searchPhrase={searchPhrase}
                classNamesWrapper={styles.chatWrapper}
                renderAdditionalButtons={renderAdditionalButtons}
                updateData={updateData}
                currentOpponent={currentOpponent}
                requestStatus={requestStatus}
                onChangeRequestStatus={onChangeRequestStatus}
                onSubmitMessage={(message: string, files: UploadFileType[], replyMessageId: string | null) =>
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  onSubmitMessage(message, files, chatSelectedId!, replyMessageId)
                }
                onTypingMessage={onTypingMessage}
                onClickAddUsersToGroupChat={onClickAddUsersToGroupChat}
                onRemoveUsersFromGroupChat={onRemoveUsersFromGroupChat}
                onClickEditGroupChatInfo={onClickEditGroupChatInfo}
              />
            ) : !isMobileResolution ? (
              <div className={styles.noSelectedChatWrapper}>
                <NoSelectedChat className={styles.noSelectedChatIcon} />
                <p className={styles.noChatTitle}>{t(TranslationKey['Choose chat'])}</p>
                <p className={styles.noChatSubTitle}>
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
