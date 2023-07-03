import { TranslationKey } from '@constants/translations/translation-key'

export const tabLabels = [
  TranslationKey.Main,
  TranslationKey.Freelance,
  TranslationKey['Supplier search'],
  TranslationKey.Orders,
  TranslationKey.Destinations,
  TranslationKey['Payment methods'],
  TranslationKey.Tags,
]

export const fieldsWithoutCharsAfterDote = [
  'requestPlatformMarginInPercent',
  'requestSupervisorFeeInPercent',
  'deadlineForFindingSupplier',
  'requestTimeLimitInHourForCancelingProposalsByClient',
  'requestTimeLimitInHourForCheckingProposalBySuper',
]

export const fieldNames = [
  'yuanToDollarRate',
  'costOfFindingSupplier',
  'costOfCheckingProduct',
  'deadlineForFindingSupplier',
  'requestMinAmountPriceOfProposal',
  'requestPlatformMarginInPercent',
  'requestSupervisorFeeInPercent',
  'requestTimeLimitInHourForCancelingProposalsByClient',
  'requestTimeLimitInHourForCheckingProposalBySuper',
  'volumeWeightCoefficient',
  'timeToDeadlinePendingOrder',
  'tech_pause',
]

export const startValueFields = fieldNames.reduce((obj, fieldName) => {
  obj[fieldName] = 0

  return obj
}, {})
