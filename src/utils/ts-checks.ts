import {
  ChatMessageDataCreatedNewProposalProposalDescriptionContract,
  ChatMessageDataCreatedNewProposalRequestDescriptionContract,
  ChatMessageDataProposalResultEditedContract,
  ChatMessageDataProposalStatusChangedContract,
} from '@models/chat-model/contracts/chat-message-data.contract'
import {ChatMessageContract, ChatMessageType} from '@models/chat-model/contracts/chat-message.contract'

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
