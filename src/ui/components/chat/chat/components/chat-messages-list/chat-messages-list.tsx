import { FC, Ref, RefObject, memo, useEffect } from 'react'
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'

import { ChatModel } from '@models/chat-model'
import { ChatContract } from '@models/chat-model/contracts'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { PaginationDirection } from '@typings/enums/pagination-direction'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

import { useStyles } from './chat-messages-list.style'

import { ChatMessageItem } from './components/chat-message-item'
import { ChatMessageRequestProposalDesignerResultEditedHandlers } from './components/chat-messages/chat-message-designer-proposal-edited-result'

interface ChatMessagesListProps {
  chat: ChatContract
  isGroupChat: boolean
  userId: string
  firstItemIndex: number
  messagesWrapperRef: RefObject<VirtuosoHandle | undefined>

  setMessageToReply: (mes: ChatMessageContract | null) => void
  handleScrollToBottomButtonVisibility: (bottomState: boolean) => void
  handleLoadMoreMessages: (direction?: PaginationDirection | undefined, messageId?: string) => void

  messages?: ChatMessageContract[]
  handlers?: ChatMessageRequestProposalDesignerResultEditedHandlers
  messagesFound?: ChatMessageContract[]
  searchPhrase?: string
  isShowChatInfo?: boolean
  isFreelanceOwner?: boolean
  messageToScroll: number | undefined
  selectedMessages?: string[]
  onSelectMessage?: (messageId: string) => void
  onClickForwardMessages?: () => void
}

export const ChatMessagesList: FC<ChatMessagesListProps> = memo(props => {
  const { classes: styles } = useStyles()

  const {
    chat,
    messages = [],
    userId,
    handlers,
    messagesFound,
    searchPhrase,
    isGroupChat,
    messageToScroll,
    isShowChatInfo,
    messagesWrapperRef,
    isFreelanceOwner,
    firstItemIndex,
    handleLoadMoreMessages,
    setMessageToReply,
    handleScrollToBottomButtonVisibility,
    selectedMessages,
    onSelectMessage,
    onClickForwardMessages,
  } = props

  const { isMobileResolution } = useCreateBreakpointResolutions()

  const chatId = chat?._id
  const messagesFoundIds = messagesFound?.map(el => el._id) || []

  const onClickReply = (messageItem: ChatMessageContract) => {
    setMessageToReply(messageItem)
  }

  useEffect(() => {
    const unReadMessages = messages?.filter(el => el.user?._id !== userId && !el.isRead)

    if (unReadMessages?.length && chatId) {
      ChatModel.readMessages(
        chatId,
        unReadMessages.map(el => el._id),
      )
    }
  }, [messages?.length])

  return (
    <Virtuoso
      ref={messagesWrapperRef as Ref<VirtuosoHandle> | undefined}
      className={styles.list}
      firstItemIndex={firstItemIndex}
      initialTopMostItemIndex={messages?.length - 1}
      startReached={() => handleLoadMoreMessages(PaginationDirection.NEXT)}
      endReached={() => handleLoadMoreMessages(PaginationDirection.PREV)}
      atBottomStateChange={handleScrollToBottomButtonVisibility}
      atBottomThreshold={50}
      data={messages}
      itemContent={(index, message) => (
        <ChatMessageItem
          messageItem={message}
          indexFromTable={index}
          firstItemIndex={firstItemIndex}
          messageToScroll={messageToScroll}
          userId={userId}
          messages={messages}
          isGroupChat={isGroupChat}
          isFreelanceOwner={isFreelanceOwner}
          isMobileResolution={isMobileResolution}
          isShowChatInfo={isShowChatInfo}
          handleLoadMoreMessages={handleLoadMoreMessages}
          handlers={handlers}
          messagesFoundIds={messagesFoundIds}
          searchPhrase={searchPhrase}
          selectedMessages={selectedMessages}
          onSelectMessage={onSelectMessage}
          onClickReply={onClickReply}
          onClickForwardMessages={onClickForwardMessages}
        />
      )}
      followOutput={isAtBottom => {
        if (isAtBottom && chat?.isAllPreviousMessagesLoaded) {
          return 'smooth'
        } else {
          return false
        }
      }}
    />
  )
})
