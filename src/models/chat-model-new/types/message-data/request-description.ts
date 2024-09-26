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
