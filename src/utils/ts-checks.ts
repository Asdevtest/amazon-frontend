import {
  ChatMessageDataAddUsersToGroupChatContract,
  ChatMessageDataCreatedNewProposalProposalDescriptionContract,
  ChatMessageDataCreatedNewProposalRequestDescriptionContract,
  ChatMessageDataProposalResultEditedContract,
  ChatMessageDataProposalStatusChangedContract,
  ChatMessageRemovePatchInfoGroupChatContract,
  ChatMessageRemoveUsersFromGroupChatContract,
} from '@models/chat-model/contracts/chat-message-data.contract'
import {ChatMessageContract, ChatMessageType} from '@models/chat-model/contracts/chat-message.contract'

import {ChatMessageTextType} from '@services/websocket-chat-service/interfaces'

export const checkIsChatMessageDataCreatedNewProposalProposalDescriptionContract = (
  value: ChatMessageContract,
): value is ChatMessageContract<ChatMessageDataCreatedNewProposalProposalDescriptionContract> => {
  return value.text === ChatMessageType.CREATED_NEW_PROPOSAL_PROPOSAL_DESCRIPTION
}

export const checkIsChatMessageDataCreatedNewProposalRequestDescriptionContract = (
  value: ChatMessageContract,
): value is ChatMessageContract<ChatMessageDataCreatedNewProposalRequestDescriptionContract> => {
  return value.text === ChatMessageType.CREATED_NEW_PROPOSAL_REQUEST_DESCRIPTION
}

export const checkIsChatMessageDataProposalStatusChangedContract = (
  value: ChatMessageContract,
): value is ChatMessageContract<ChatMessageDataProposalStatusChangedContract> => {
  return value.text === ChatMessageType.PROPOSAL_STATUS_CHANGED
}

export const checkIsChatMessageDataProposalResultEditedContract = (
  value: ChatMessageContract,
): value is ChatMessageContract<ChatMessageDataProposalResultEditedContract> => {
  return value.text === ChatMessageType.PROPOSAL_RESULT_EDITED
}

export const checkIsChatMessageAddUsersToGroupChatContract = (
  value: ChatMessageContract,
): value is ChatMessageContract<ChatMessageDataAddUsersToGroupChatContract> => {
  return value.type === ChatMessageType.SYSTEM && value.text === ChatMessageTextType.ADD_USERS_TO_GROUP_CHAT_BY_ADMIN
}

export const checkIsChatMessageRemoveUsersFromGroupChatContract = (
  value: ChatMessageContract,
): value is ChatMessageContract<ChatMessageRemoveUsersFromGroupChatContract> => {
  return (
    value.type === ChatMessageType.SYSTEM && value.text === ChatMessageTextType.REMOVE_USERS_FROM_GROUP_CHAT_BY_ADMIN
  )
}

export const checkIsChatMessagePatchInfoGroupChatContract = (
  value: ChatMessageContract,
): value is ChatMessageContract<ChatMessageRemovePatchInfoGroupChatContract> => {
  return value.type === ChatMessageType.SYSTEM && value.text === ChatMessageTextType.PATCH_INFO
}
