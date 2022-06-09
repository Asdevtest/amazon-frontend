import {t} from '@utils/translations'

import {TranslationKey} from './translations/translation-key'

export const RequestProposalStatus = {
  CREATED: 'CREATED',
  OFFER_CONDITIONS_ACCEPTED: 'OFFER_CONDITIONS_ACCEPTED',
  READY_TO_VERIFY: 'READY_TO_VERIFY',
  OFFER_CONDITIONS_REJECTED: 'OFFER_CONDITIONS_REJECTED',
  VERIFYING_BY_SUPERVISOR: 'VERIFYING_BY_SUPERVISOR',
  TO_CORRECT: 'TO_CORRECT',
  CORRECTED: 'CORRECTED',
  ACCEPTED_BY_CLIENT: 'ACCEPTED_BY_CLIENT',
  ACCEPTED_BY_CREATOR_OF_REQUEST: 'ACCEPTED_BY_CREATOR_OF_REQUEST',
  ACCEPTED_BY_SUPERVISOR: 'ACCEPTED_BY_SUPERVISOR',
  CANCELED_BY_CREATOR_OF_REQUEST: 'CANCELED_BY_CREATOR_OF_REQUEST',
  CANCELED_BY_SUPERVISOR: 'CANCELED_BY_SUPERVISOR',
  CANCELED_BY_EXECUTOR: 'CANCELED_BY_EXECUTOR',
  EXPIRED: 'EXPIRED',
  OFFER_CONDITIONS_CORRECTED: 'OFFER_CONDITIONS_CORRECTED',
}

export const RequestProposalStatusTranslate = s => {
  switch (s) {
    case RequestProposalStatus.ACCEPTED_BY_CLIENT:
      return t(TranslationKey['The terms of the proposal are accepted by the Client'])
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
  }
}

export const RequestProposalStatusColor = s => {
  switch (s) {
    case RequestProposalStatus.ACCEPTED_BY_CLIENT:
      return 'green'
    case RequestProposalStatus.ACCEPTED_BY_CREATOR_OF_REQUEST:
      return 'green'
    case RequestProposalStatus.ACCEPTED_BY_SUPERVISOR:
      return 'green'
    case RequestProposalStatus.CANCELED_BY_CREATOR_OF_REQUEST:
      return 'red'
    case RequestProposalStatus.CANCELED_BY_EXECUTOR:
      return 'red'
    case RequestProposalStatus.CANCELED_BY_SUPERVISOR:
      return 'red'
    case RequestProposalStatus.CORRECTED:
      return 'green'
    case RequestProposalStatus.CREATED:
      return 'green'
    case RequestProposalStatus.EXPIRED:
      return 'green'
    case RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED:
      return 'green'
    case RequestProposalStatus.OFFER_CONDITIONS_CORRECTED:
      return 'green'
    case RequestProposalStatus.OFFER_CONDITIONS_REJECTED:
      return 'red'
    case RequestProposalStatus.READY_TO_VERIFY:
      return 'orange'
    case RequestProposalStatus.TO_CORRECT:
      return 'orange'
    case RequestProposalStatus.VERIFYING_BY_SUPERVISOR:
      return 'orange'
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
  VERIFYING_BY_SUPERVISOR: 'VERIFYING_BY_SUPERVISOR',
  TO_CORRECT_BY_SUPERVISOR: 'TO_CORRECT_BY_SUPERVISOR',
  EXPIRED: 'EXPIRED',
}

export const MyRequestStatusTranslate = s => {
  switch (s) {
    case MyRequestStatus.DRAFT:
      return t(TranslationKey.DRAFT)
    case MyRequestStatus.PUBLISHED:
      return t(TranslationKey.PUBLISHED)
    case MyRequestStatus.IN_PROCESS:
      return t(TranslationKey['IN PROCESS'])
    case MyRequestStatus.FORBID_NEW_PROPOSALS:
      return t(TranslationKey['FORBID NEW PROPOSALS'])
    case MyRequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED:
      return t(TranslationKey['COMPLETE PROPOSALS AMOUNT ACHIEVED'])
    case MyRequestStatus.CANCELED_BY_CREATOR:
      return t(TranslationKey['CANCELED BY CREATOR'])
    case MyRequestStatus.VERIFYING_BY_ADMIN:
      return t(TranslationKey['VERIFYING BY ADMIN'])
    case MyRequestStatus.TO_CORRECT_BY_ADMIN:
      return t(TranslationKey['TO CORRECT BY ADMIN'])
    case MyRequestStatus.READY_TO_VERIFY_BY_ADMIN:
      return t(TranslationKey['READY TO VERIFY BY ADMIN'])
    case MyRequestStatus.CANCELED_BY_ADMIN:
      return t(TranslationKey['CANCELED BY ADMIN'])
    case MyRequestStatus.READY_TO_VERIFY_BY_SUPERVISOR:
      return t(TranslationKey['READY TO VERIFY BY SUPERVISOR'])
    case MyRequestStatus.VERIFYING_BY_SUPERVISOR:
      return t(TranslationKey['VERIFYING BY SUPERVISOR'])
    case MyRequestStatus.TO_CORRECT_BY_SUPERVISOR:
      return t(TranslationKey['TO CORRECT BY SUPERVISOR'])
    case MyRequestStatus.EXPIRED:
      return t(TranslationKey.EXPIRED)
  }
}
