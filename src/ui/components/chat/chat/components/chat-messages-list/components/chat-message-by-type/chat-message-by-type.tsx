import { observer } from 'mobx-react'
import { FC } from 'react'

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
  checkIsChatMessageProposalEditedContract,
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
import { ChatMessageProposal } from '../chat-messages/chat-message-proposal'
import { ChatMessageProposalStatusChanged } from '../chat-messages/chat-message-proposal-status-changed'
import { ChatMessageRemoveUsersFromGroupChat } from '../chat-messages/chat-message-remove-users-from-group-chat'
import { ChatMessageRequest } from '../chat-messages/chat-message-request'
import { ChatMessageRequestProposalResultEdited } from '../chat-messages/chat-message-request-proposal-result-edited'

interface Props {
  isIncomming: boolean
  messageItem: ChatMessageContract
  isShowChatInfo?: boolean
  unReadMessage: boolean
  showName: boolean
  handlers?: ChatMessageRequestProposalDesignerResultEditedHandlers
  messagesFoundIds?: string[]
  searchPhrase?: string
}

export const ChatMessageByType: FC<Props> = observer(
  ({
    isIncomming,
    messageItem,
    isShowChatInfo,
    unReadMessage,
    showName,
    handlers,
    messagesFoundIds = [],
    searchPhrase,
  }) => {
    const renderMessageByType = () => {
      if (checkIsChatMessageDataCreatedNewProposalRequestDescriptionContract(messageItem)) {
        return <ChatMessageRequest message={messageItem} isShowChatInfo={isShowChatInfo} />
      } else if (checkIsChatMessageDataCreatedNewProposalProposalDescriptionContract(messageItem)) {
        return <ChatMessageProposal message={messageItem} isShowChatInfo={isShowChatInfo} />
      } else if (checkIsChatMessageDataProposalStatusChangedContract(messageItem)) {
        return <ChatMessageProposalStatusChanged message={messageItem} isShowChatInfo={isShowChatInfo} />
      } else if (checkIsChatMessageDataProposalResultEditedContract(messageItem)) {
        return <ChatMessageRequestProposalResultEdited message={messageItem} isShowChatInfo={isShowChatInfo} />
      } else if (checkIsChatMessageCreateNewBloggerProposalContract(messageItem)) {
        return <ChatMessageCreateNewBloggerProposal message={messageItem} isShowChatInfo={isShowChatInfo} />
      } else if (checkIsChatMessageCreateNewDesignerProposalContract(messageItem)) {
        return <ChatMessageCreateNewDesignerProposal message={messageItem} isShowChatInfo={isShowChatInfo} />
      } else if (checkIsChatMessageBloggerProposalResultEditedContract(messageItem)) {
        return <ChatMessageBloggerProposalEditedResult message={messageItem} isShowChatInfo={isShowChatInfo} />
      } else if (handlers && checkIsChatMessageDesignerProposalResultEditedContract(messageItem)) {
        return (
          <ChatMessageDesignerProposalEditedResult
            message={messageItem}
            isShowChatInfo={isShowChatInfo}
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
      } else if (checkIsChatMessageProposalEditedContract(messageItem)) {
        return
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
