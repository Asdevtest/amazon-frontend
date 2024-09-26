import { ProposalResultEditedRequest } from '../data-chat-message.type'

export interface ProposalResultEdited {
  needApproveBy: string[]
  edited: {
    linksToMediaFiles?: { fileLink: string; commentByPerformer: string }[] | string[]
    result: string
    media?: { commentByPerformer: string; fileLink: string; index: number; _id: string }[]
  }
  request: ProposalResultEditedRequest
  proposal: ProposalResultEditedRequest
}
