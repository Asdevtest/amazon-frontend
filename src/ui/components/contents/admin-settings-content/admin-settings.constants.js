import { TranslationKey } from '@constants/translations/translation-key'

export const tabLabels = [
  TranslationKey.Main,
  TranslationKey.Freelance,
  TranslationKey['Supplier search'],
  TranslationKey.Orders,
  TranslationKey.Destinations,
  TranslationKey['Red flags'],
  TranslationKey['Payment methods'],
  TranslationKey.Tags,
  TranslationKey['Launches reports'],
]

export const tabIndexes = {
  main: 0,
  freelance: 1,
  supplierSearch: 2,
  orders: 3,
  destinations: 4,
  redFlags: 5,
  paymentMethods: 6,
  tags: 7,
  launchesReports: 8,
}

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
  'timeBeforeLaunchDeadline',
]

export const fieldNameObject = fieldNames.reduce((obj, fieldName) => {
  obj[fieldName] = fieldName

  return obj
}, {})

export const startValueFields = fieldNames.reduce((obj, fieldName) => {
  obj[fieldName] = 0

  return obj
}, {})
