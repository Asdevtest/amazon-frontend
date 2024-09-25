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

export interface CreateNewBloggerProposal {
  request: ProposalResultEditedRequest
  proposal: ProposalCreateNewBloggerProposal
}

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

export interface CreatedNewProposalProposalDescription {
  _id: string
  execution_time: number
  price: number
  comment: string
  status: string
}

export interface CreatedNewProposalRequestDescription {
  _id: string
  title: string
  timeoutAt: string
  status: string
  price: string
  details: {
    conditions: string
  }
}

export interface ProposalStatusChanged {
  status: string
  reason: string
  linksToMediaFiles: string[]
  timeLimitInMinutes?: number
}

export interface ProposalResultEdited {
  needApproveBy: Array<string>
  edited: {
    linksToMediaFiles?: { fileLink: string; commentByPerformer: string }[] | string[]
    result: string
    media?: { commentByPerformer: string; fileLink: string; index: number; _id: string }[]
  }
  request: ProposalResultEditedRequest
  proposal: ProposalResultEditedRequest
}

export interface AddUsersToGroupChat {
  createdBy: string
  title: string
  users: ChatMessageUsers[]
}

export interface RemoveUsersFromGroupChat {
  createdBy: string
  title: string
  users: ChatMessageUsers[]
}

export interface PatchInfoGroupChat {
  createdBy: string
  title: string
  updatedData: { image: string; title: string }
  prevData: { image: string; title: string }
}

export interface BloggerProposalResultEdited {
  proposal: {
    _id: string
    details: {
      amazonOrderId: string | null
      linksToMediaFiles: string[]
      publicationLinks: string[]
      result: string
    }
  }
}

export interface DesignerProposalResultEdited {
  proposal: {
    _id: string
    comment: string
    execution_time: number
    title: string
    details: { result: string }
    media: {
      commentByClient: string | null
      commentByPerformer: string | null
      fileLink: string
      _id: string
    }[]
  }

  request: {
    asin: string
  }
}
