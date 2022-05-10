import {createContext} from 'react'

export interface TRequest {}

export interface TRequestProposal {
  status: string
}

interface TChatRequestAndRequestProposalContext {
  request?: TRequest
  requestProposal?: TRequestProposal
}

export const ChatRequestAndRequestProposalContext = createContext<TChatRequestAndRequestProposalContext>({})
