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
  'orderAmountLimit',
]

export const fieldNameObject = fieldNames.reduce((obj, fieldName) => {
  obj[fieldName] = fieldName

  return obj
}, {})

export const startValueFields = fieldNames.reduce((obj, fieldName) => {
  obj[fieldName] = 0

  return obj
}, {})
