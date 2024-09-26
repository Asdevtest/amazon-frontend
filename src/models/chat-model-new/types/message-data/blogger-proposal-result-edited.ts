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
