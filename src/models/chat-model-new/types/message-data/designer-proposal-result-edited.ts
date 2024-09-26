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
