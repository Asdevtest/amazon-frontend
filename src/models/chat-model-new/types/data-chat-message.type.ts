import { AddUsersToGroupChat } from './message-data/add-users-to-group-chat'
import { BloggerProposalResultEdited } from './message-data/blogger-proposal-result-edited'
import { CreateNewBloggerProposal } from './message-data/create-new-blogger-proposal'
import { DesignerProposalResultEdited } from './message-data/designer-proposal-result-edited'
import { PatchInfoGroupChat } from './message-data/patch-info-group-chat'
import { CreatedNewProposalProposalDescription } from './message-data/proposal-description'
import { ProposalResultEdited } from './message-data/proposal-result-edited'
import { ProposalStatusChanged } from './message-data/proposal-status-changed'
import { RemoveUsersFromGroupChat } from './message-data/remove-users-from-group-chat'
import { CreatedNewProposalRequestDescription } from './message-data/request-description'

export type ChatMessageData =
  | CreatedNewProposalProposalDescription
  | CreatedNewProposalRequestDescription
  | ProposalStatusChanged
  | ProposalResultEdited
  | AddUsersToGroupChat
  | RemoveUsersFromGroupChat
  | PatchInfoGroupChat
  | CreateNewBloggerProposal
  | BloggerProposalResultEdited
  | DesignerProposalResultEdited
  | null

export interface ProposalCreateNewBloggerProposal {
  _id: string
  comment: string
  linksToMediaFiles: string[]
  execution_time: number
  price: number
  status: string
  title: string
}

export interface ChatMessageUsers {
  _id: string
  name: string
}

export interface ProposalResultEditedRequest {
  _id: string
  price: number
  status: string
  title: string
  media?: { fileLink: string; commentByClient: string }[] | string[]
}
