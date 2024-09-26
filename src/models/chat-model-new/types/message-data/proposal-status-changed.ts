export interface ProposalStatusChanged {
  status: string
  reason: string
  linksToMediaFiles: string[]
  timeLimitInMinutes?: number
}
