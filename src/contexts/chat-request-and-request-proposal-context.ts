import { createContext } from 'react'

export interface TRequest {
  request: {
    createdBy: { _id: string }
    sub: { _id: string }
  }
}

export interface TRequestProposal {
  details: {
    linksToMediaFiles: string[]
    result: string
  }
  proposal: {
    _id: string
    status: string
    chatId: string
    createdBy: { _id: string }
    sub: { _id: string }
    media: { _id: string; fileLink: string }[]
  }
}

interface TChatRequestAndRequestProposalContext {
  request?: TRequest
  requestProposal?: TRequestProposal
  requestProposals?: TRequestProposal[]
}

export const ChatRequestAndRequestProposalContext = createContext<TChatRequestAndRequestProposalContext>({})
