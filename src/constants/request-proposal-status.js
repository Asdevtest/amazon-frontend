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
