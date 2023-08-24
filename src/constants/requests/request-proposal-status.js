import { t } from '@utils/translations'

import { TranslationKey } from '../translations/translation-key'

export const RequestProposalStatus = {
  READY_TO_VERIFY: 'READY_TO_VERIFY',
  PROPOSAL_EDITED: 'PROPOSAL_EDITED',
  VERIFYING_BY_SUPERVISOR: 'VERIFYING_BY_SUPERVISOR',
  TO_CORRECT: 'TO_CORRECT',

  CREATED: 'CREATED',
  OFFER_CONDITIONS_ACCEPTED: 'OFFER_CONDITIONS_ACCEPTED',
  CORRECTED: 'CORRECTED',
  ACCEPTED_BY_CLIENT: 'ACCEPTED_BY_CLIENT',
  ACCEPTED_BY_CREATOR_OF_REQUEST: 'ACCEPTED_BY_CREATOR_OF_REQUEST',
  ACCEPTED_BY_SUPERVISOR: 'ACCEPTED_BY_SUPERVISOR',
  EXPIRED: 'EXPIRED',
  OFFER_CONDITIONS_CORRECTED: 'OFFER_CONDITIONS_CORRECTED',

  OFFER_CONDITIONS_REJECTED: 'OFFER_CONDITIONS_REJECTED',
  CANCELED_BY_CREATOR_OF_REQUEST: 'CANCELED_BY_CREATOR_OF_REQUEST',
  CANCELED_BY_SUPERVISOR: 'CANCELED_BY_SUPERVISOR',
  CANCELED_BY_EXECUTOR: 'CANCELED_BY_EXECUTOR',
}

export const RequestProposalStatusTranslate = s => {
  switch (s) {
    case RequestProposalStatus.ACCEPTED_BY_CLIENT:
      return t(TranslationKey['Accepted by Client'])
    case RequestProposalStatus.ACCEPTED_BY_CREATOR_OF_REQUEST:
      return t(TranslationKey['Accepted by creator of request'])
    case RequestProposalStatus.ACCEPTED_BY_SUPERVISOR:
      return t(TranslationKey['Accepted by Supervisor'])
    case RequestProposalStatus.CANCELED_BY_CREATOR_OF_REQUEST:
      return t(TranslationKey['Canceled by creator of request'])
    case RequestProposalStatus.CANCELED_BY_EXECUTOR:
      return t(TranslationKey['Canceled by Executor'])
    case RequestProposalStatus.CANCELED_BY_SUPERVISOR:
      return t(TranslationKey['Canceled by Supervisor'])
    case RequestProposalStatus.CORRECTED:
      return t(TranslationKey.Corrected)
    case RequestProposalStatus.CREATED:
      return t(TranslationKey.Created)
    case RequestProposalStatus.EXPIRED:
      return t(TranslationKey.Expired)
    case RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED:
      return t(TranslationKey['Proposal conditions accepted'])
    case RequestProposalStatus.OFFER_CONDITIONS_CORRECTED:
      return t(TranslationKey['Proposal conditions corrected'])
    case RequestProposalStatus.OFFER_CONDITIONS_REJECTED:
      return t(TranslationKey['Proposal conditions rejected'])
    case RequestProposalStatus.READY_TO_VERIFY:
      return t(TranslationKey['Ready to verify'])
    case RequestProposalStatus.TO_CORRECT:
      return t(TranslationKey['To correct'])
    case RequestProposalStatus.VERIFYING_BY_SUPERVISOR:
      return t(TranslationKey['Verifying by Supervisor'])
    case RequestProposalStatus.PROPOSAL_EDITED:
      return t(TranslationKey['Proposal edited'])
  }
}

export const RequestProposalStatusColor = status => {
  if (
    [
      RequestProposalStatus.READY_TO_VERIFY,
      RequestProposalStatus.TO_CORRECT,
      RequestProposalStatus.VERIFYING_BY_SUPERVISOR,
      RequestProposalStatus.PROPOSAL_EDITED,
    ].includes(status)
  ) {
    return '#F3AF00'
  } else if (
    [
      RequestProposalStatus.ACCEPTED_BY_CLIENT,
      RequestProposalStatus.ACCEPTED_BY_CREATOR_OF_REQUEST,
      RequestProposalStatus.ACCEPTED_BY_SUPERVISOR,
      RequestProposalStatus.CORRECTED,

      RequestProposalStatus.CREATED,
      RequestProposalStatus.EXPIRED,
      RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED,
      RequestProposalStatus.OFFER_CONDITIONS_CORRECTED,
    ].includes(status)
  ) {
    return '#00B746'
  } else if (
    [
      RequestProposalStatus.CANCELED_BY_CREATOR_OF_REQUEST,
      RequestProposalStatus.CANCELED_BY_EXECUTOR,
      RequestProposalStatus.CANCELED_BY_SUPERVISOR,
      RequestProposalStatus.OFFER_CONDITIONS_REJECTED,
    ].includes(status)
  ) {
    return '#FF1616'
  } else {
    return '#black'
  }
}

export const MyRequestStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  IN_PROCESS: 'IN_PROCESS',
  FORBID_NEW_PROPOSALS: 'FORBID_NEW_PROPOSALS',
  COMPLETE_PROPOSALS_AMOUNT_ACHIEVED: 'COMPLETE_PROPOSALS_AMOUNT_ACHIEVED',
  CANCELED_BY_CREATOR: 'CANCELED_BY_CREATOR',
  VERIFYING_BY_ADMIN: 'VERIFYING_BY_ADMIN',
  TO_CORRECT_BY_ADMIN: 'TO_CORRECT_BY_ADMIN',
  READY_TO_VERIFY_BY_ADMIN: 'READY_TO_VERIFY_BY_ADMIN',
  CANCELED_BY_ADMIN: 'CANCELED_BY_ADMIN',
  READY_TO_VERIFY_BY_SUPERVISOR: 'READY_TO_VERIFY_BY_SUPERVISOR',
  READY_TO_VERIFY: 'READY_TO_VERIFY',
  VERIFYING_BY_SUPERVISOR: 'VERIFYING_BY_SUPERVISOR',
  TO_CORRECT_BY_SUPERVISOR: 'TO_CORRECT_BY_SUPERVISOR',
  TO_CORRECT: 'TO_CORRECT',
  EXPIRED: 'EXPIRED',
  CANCELED_BY_SUPERVISOR: 'CANCELED_BY_SUPERVISOR',
  ACCEPTED_BY_SUPERVISOR: 'ACCEPTED_BY_SUPERVISOR',
  ACCEPTED_BY_CLIENT: 'ACCEPTED_BY_CLIENT',
  CORRECTED: 'CORRECTED',
  CANCELED_BY_EXECUTOR: 'CANCELED_BY_EXECUTOR',
  OFFER_CONDITIONS_REJECTED: 'OFFER_CONDITIONS_REJECTED',
  OFFER_CONDITIONS_CORRECTED: 'OFFER_CONDITIONS_CORRECTED',
}

export const MyRequestStatusTranslate = s => {
  switch (s) {
    case MyRequestStatus.DRAFT:
      return t(TranslationKey.Draft)
    case MyRequestStatus.PUBLISHED:
      return t(TranslationKey.Published)
    case MyRequestStatus.IN_PROCESS:
      return t(TranslationKey['In process'])
    case MyRequestStatus.FORBID_NEW_PROPOSALS:
      return t(TranslationKey['Forbid new proposals'])
    case MyRequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED:
      return t(TranslationKey.Finished)
    case MyRequestStatus.CANCELED_BY_CREATOR:
      return t(TranslationKey['Cancel by Creator'])
    case MyRequestStatus.VERIFYING_BY_ADMIN:
      return t(TranslationKey['Verifying by Admin'])
    case MyRequestStatus.TO_CORRECT_BY_ADMIN:
      return t(TranslationKey['To correct by Admin'])
    case MyRequestStatus.READY_TO_VERIFY_BY_ADMIN:
      return t(TranslationKey['Ready to verify by Admin'])
    case MyRequestStatus.CANCELED_BY_ADMIN:
      return t(TranslationKey['Canceled by Admin'])
    case MyRequestStatus.READY_TO_VERIFY_BY_SUPERVISOR:
      return t(TranslationKey['Ready to verify by Supervisor'])
    case MyRequestStatus.VERIFYING_BY_SUPERVISOR:
      return t(TranslationKey['Verifying by Supervisor'])
    case MyRequestStatus.TO_CORRECT_BY_SUPERVISOR:
      return t(TranslationKey['To correct by Supervisor'])
    case MyRequestStatus.EXPIRED:
      return t(TranslationKey.Expired)
    case MyRequestStatus.READY_TO_VERIFY:
      return t(TranslationKey['Ready to verify'])
    case MyRequestStatus.CANCELED_BY_SUPERVISOR:
      return t(TranslationKey['Canceled by Supervisor'])
    case MyRequestStatus.ACCEPTED_BY_SUPERVISOR:
      return t(TranslationKey['Accepted by Supervisor'])
    case MyRequestStatus.ACCEPTED_BY_CLIENT:
      return t(TranslationKey['Accepted by Client'])
    case MyRequestStatus.CORRECTED:
      return t(TranslationKey.Corrected)
    case MyRequestStatus.CANCELED_BY_EXECUTOR:
      return t(TranslationKey['Canceled by Executor'])
    case MyRequestStatus.TO_CORRECT:
      return t(TranslationKey['To correct'])
    case MyRequestStatus.OFFER_CONDITIONS_REJECTED:
      return t(TranslationKey['Proposal conditions rejected'])

    case MyRequestStatus.OFFER_CONDITIONS_CORRECTED:
      return t(TranslationKey['Proposal conditions corrected'])
  }
}

export const statusesValidToShowResoult = [
  RequestProposalStatus.READY_TO_VERIFY,
  RequestProposalStatus.VERIFYING_BY_SUPERVISOR,
  RequestProposalStatus.TO_CORRECT,
  RequestProposalStatus.CORRECTED,
  RequestProposalStatus.ACCEPTED_BY_CLIENT,
  RequestProposalStatus.ACCEPTED_BY_CREATOR_OF_REQUEST,
  RequestProposalStatus.ACCEPTED_BY_SUPERVISOR,
]
