import { RequestProposalStatus } from '@constants/requests/request-proposal-status'

export const noDisabledEditBtnStatuses = [
  RequestProposalStatus.CREATED,
  RequestProposalStatus.OFFER_CONDITIONS_REJECTED,
  RequestProposalStatus.OFFER_CONDITIONS_CORRECTED,
]

export const disabledCancelBtnStatuses = [
  RequestProposalStatus.ACCEPTED_BY_CLIENT,
  RequestProposalStatus.ACCEPTED_BY_CREATOR_OF_REQUEST,
  RequestProposalStatus.CANCELED_BY_SUPERVISOR,
  RequestProposalStatus.CANCELED_BY_EXECUTOR,
  RequestProposalStatus.CANCELED_BY_CREATOR_OF_REQUEST,
  RequestProposalStatus.ACCEPTED_BY_SUPERVISOR,
  RequestProposalStatus.EXPIRED,
]
