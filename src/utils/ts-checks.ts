import {
  ChatMessageDataCreatedNewProposalProposalDescriptionContract,
  ChatMessageDataCreatedNewProposalRequestDescriptionContract,
  ChatMessageDataProposalResultEditedDetailsContract,
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

export const checkIsChatMessageDataProposalResultEditedDetailsContract = (
  value: ChatMessageContract,
): value is ChatMessageContract<ChatMessageDataProposalResultEditedDetailsContract> => {
  return value.text === ChatMessageType.PROPOSAL_RESULT_EDITED
}
