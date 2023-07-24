import { observer } from 'mobx-react'
import React, { FC } from 'react'

import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import {
  checkIsChatMessageAddUsersToGroupChatContract,
  checkIsChatMessageBloggerProposalResultEditedContract,
  checkIsChatMessageCreateNewBloggerProposalContract,
  checkIsChatMessageCreateNewDesignerProposalContract,
  checkIsChatMessageDataCreatedNewProposalProposalDescriptionContract,
  checkIsChatMessageDataCreatedNewProposalRequestDescriptionContract,
  checkIsChatMessageDataProposalResultEditedContract,
  checkIsChatMessageDataProposalStatusChangedContract,
  checkIsChatMessageDesignerProposalResultEditedContract,
  checkIsChatMessagePatchInfoGroupChatContract,
  checkIsChatMessageRemoveUsersFromGroupChatContract,
} from '@utils/ts-checks'

import { ChatMessageAddUsersToGroupChat } from '../chat-messages/chat-message-add-users-to-group-chat'
import { ChatMessageBasicText } from '../chat-messages/chat-message-basic-text'
import { ChatMessageBloggerProposalEditedResult } from '../chat-messages/chat-message-blogger-proposal-edited-result'
import { ChatMessageCreateNewBloggerProposal } from '../chat-messages/chat-message-create-new-blogger-proposal'
import { ChatMessageCreateNewDesignerProposal } from '../chat-messages/chat-message-create-new-designer-proposal'
import {
  ChatMessageDesignerProposalEditedResult,
  ChatMessageRequestProposalDesignerResultEditedHandlers,
} from '../chat-messages/chat-message-designer-proposal-edited-result'
import { ChatMessagePatchInfoGroupChat } from '../chat-messages/chat-message-patch-info-group-chat'
import { ChatMessageProposal, ChatMessageProposalHandlers } from '../chat-messages/chat-message-proposal'
import {
  ChatMessageProposalStatusChanged,
  ChatMessageRequestProposalStatusChangedHandlers,
} from '../chat-messages/chat-message-proposal-status-changed'
import { ChatMessageRemoveUsersFromGroupChat } from '../chat-messages/chat-message-remove-users-from-group-chat'
import { ChatMessageRequest } from '../chat-messages/chat-message-request'
import {
  ChatMessageRequestProposalResultEdited,
  ChatMessageRequestProposalResultEditedHandlers,
} from '../chat-messages/chat-message-request-proposal-result-edited'

export type ChatMessageUniversalHandlers = ChatMessageProposalHandlers &
  ChatMessageRequestProposalResultEditedHandlers &
  ChatMessageRequestProposalStatusChangedHandlers &
  ChatMessageRequestProposalDesignerResultEditedHandlers

interface Props {
  isIncomming: boolean
  messageItem: ChatMessageContract
  unReadMessage: boolean
  showName: boolean
  isLastMessage: boolean
  handlers?: ChatMessageUniversalHandlers
  messagesFoundIds?: string[]
  searchPhrase?: string
}

export const ChatMessageByType: FC<Props> = observer(
  ({
    isIncomming,
    messageItem,
    unReadMessage,
    showName,
    isLastMessage,
    handlers,
    messagesFoundIds = [],
    searchPhrase,
  }) => {
    const renderMessageByType = () => {
      if (checkIsChatMessageDataCreatedNewProposalRequestDescriptionContract(messageItem)) {
        return <ChatMessageRequest message={messageItem} />
      } else if (handlers && checkIsChatMessageDataCreatedNewProposalProposalDescriptionContract(messageItem)) {
        return (
          <ChatMessageProposal
            message={messageItem}
            handlers={{
              onClickProposalAccept: handlers.onClickProposalAccept,
              onClickProposalRegect: handlers.onClickProposalRegect,
            }}
          />
        )
      } else if (handlers && checkIsChatMessageDataProposalStatusChangedContract(messageItem)) {
        return (
          <ChatMessageProposalStatusChanged
            isLastMessage={isLastMessage}
            message={messageItem}
            handlers={{
              onClickProposalResultAccept: handlers.onClickProposalResultAccept,
              onClickProposalResultToCorrect: handlers.onClickProposalResultToCorrect,
              onClickReworkProposal: handlers.onClickReworkProposal,
            }}
          />
        )
      } else if (handlers && checkIsChatMessageDataProposalResultEditedContract(messageItem)) {
        return (
          <ChatMessageRequestProposalResultEdited
            isLastMessage={isLastMessage}
            message={messageItem}
            handlers={{
              onClickProposalResultAccept: handlers.onClickProposalResultAccept,
              onClickProposalResultToCorrect: handlers.onClickProposalResultToCorrect,
            }}
          />
        )
      } else if (handlers && checkIsChatMessageCreateNewBloggerProposalContract(messageItem)) {
        return (
          <ChatMessageCreateNewBloggerProposal
            message={messageItem}
            handlers={{
              onClickProposalAccept: handlers.onClickProposalAccept,
              onClickProposalRegect: handlers.onClickProposalRegect,
            }}
          />
        )
      } else if (handlers && checkIsChatMessageCreateNewDesignerProposalContract(messageItem)) {
        return (
          <ChatMessageCreateNewDesignerProposal
            message={messageItem}
            handlers={{
              onClickProposalAccept: handlers.onClickProposalAccept,
              onClickProposalRegect: handlers.onClickProposalRegect,
            }}
          />
        )
      } else if (handlers && checkIsChatMessageBloggerProposalResultEditedContract(messageItem)) {
        return (
          <ChatMessageBloggerProposalEditedResult
            message={messageItem}
            handlers={{
              onClickProposalResultAccept: handlers.onClickProposalResultAccept,
              onClickProposalResultToCorrect: handlers.onClickProposalResultToCorrect,
            }}
          />
        )
      } else if (handlers && checkIsChatMessageDesignerProposalResultEditedContract(messageItem)) {
        return (
          <ChatMessageDesignerProposalEditedResult
            message={messageItem}
            handlers={{
              onClickOpenRequest: handlers.onClickOpenRequest,
            }}
          />
        )
      } else if (checkIsChatMessageAddUsersToGroupChatContract(messageItem)) {
        return <ChatMessageAddUsersToGroupChat message={messageItem} />
      } else if (checkIsChatMessageRemoveUsersFromGroupChatContract(messageItem)) {
        return <ChatMessageRemoveUsersFromGroupChat message={messageItem} />
      } else if (checkIsChatMessagePatchInfoGroupChatContract(messageItem)) {
        return <ChatMessagePatchInfoGroupChat message={messageItem} />
      } else {
        return (
          <ChatMessageBasicText
            showName={showName}
            isIncomming={isIncomming}
            message={messageItem}
            unReadMessage={unReadMessage}
            isFound={messagesFoundIds.includes(messageItem?._id)}
            searchPhrase={searchPhrase}
          />
        )
      }
    }

    return <>{renderMessageByType()}</>
  },
)
