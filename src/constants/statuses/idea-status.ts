import { UiTheme } from '@constants/theme/mui-theme.type'

import { SettingsModel } from '@models/settings-model'

import { objectFlip } from '@utils/object'
import { t } from '@utils/translations'

import { TranslationKey } from '../translations/translation-key'

export enum ideaStatus {
  NEW = 'NEW',
  ON_CHECK = 'ON_CHECK',
  SUPPLIER_SEARCH = 'SUPPLIER_SEARCH',
  SUPPLIER_FOUND = 'SUPPLIER_FOUND',
  SUPPLIER_NOT_FOUND = 'SUPPLIER_NOT_FOUND',
  CARD_CREATING = 'CARD_CREATING',
  ADDING_ASIN = 'ADDING_ASIN',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
  CLOSED = 'CLOSED',
  REALIZED = 'REALIZED',
}

export const ideaStatusByCode: Record<number, ideaStatus> = {
  5: ideaStatus.NEW,
  10: ideaStatus.ON_CHECK,
  13: ideaStatus.SUPPLIER_SEARCH,
  14: ideaStatus.SUPPLIER_FOUND,
  15: ideaStatus.SUPPLIER_NOT_FOUND,
  16: ideaStatus.CARD_CREATING,
  18: ideaStatus.ADDING_ASIN,
  20: ideaStatus.VERIFIED,
  25: ideaStatus.REJECTED,
  30: ideaStatus.CLOSED,
}
export const ideaStatusByKey: Record<string, number> = objectFlip(ideaStatusByCode, parseInt)

export enum ideaStatusGroupsNames {
  'NEW' = 'NEW',
  'ON_CHECKING' = 'ON_CHECKING',
  'SEARCH_SUPPLIERS' = 'SEARCH_SUPPLIERS',
  'CREATE_CARD' = 'CREATE_CARD',
  'ADD_ASIN' = 'ADD_ASIN',
  'REALIZED' = 'REALIZED',
  'CLOSED' = 'CLOSED',
  'ALL' = 'ALL',
}

export const ideaStatusGroups = {
  [ideaStatusGroupsNames.NEW]: [ideaStatusByKey[ideaStatus.NEW]],
  [ideaStatusGroupsNames.ON_CHECKING]: [ideaStatusByKey[ideaStatus.ON_CHECK]],
  [ideaStatusGroupsNames.SEARCH_SUPPLIERS]: [
    ideaStatusByKey[ideaStatus.SUPPLIER_SEARCH],
    ideaStatusByKey[ideaStatus.SUPPLIER_FOUND],
    ideaStatusByKey[ideaStatus.SUPPLIER_NOT_FOUND],
  ],
  [ideaStatusGroupsNames.CREATE_CARD]: [ideaStatusByKey[ideaStatus.CARD_CREATING]],
  [ideaStatusGroupsNames.ADD_ASIN]: [ideaStatusByKey[ideaStatus.ADDING_ASIN]],
  [ideaStatusGroupsNames.REALIZED]: [ideaStatusByKey[ideaStatus.VERIFIED]],
  [ideaStatusGroupsNames.CLOSED]: [ideaStatusByKey[ideaStatus.REJECTED], ideaStatusByKey[ideaStatus.CLOSED]],
  [ideaStatusGroupsNames.ALL]: [
    ideaStatusByKey[ideaStatus.NEW],
    ideaStatusByKey[ideaStatus.ON_CHECK],
    ideaStatusByKey[ideaStatus.SUPPLIER_SEARCH],
    ideaStatusByKey[ideaStatus.SUPPLIER_FOUND],
    ideaStatusByKey[ideaStatus.SUPPLIER_NOT_FOUND],
    ideaStatusByKey[ideaStatus.CARD_CREATING],
    ideaStatusByKey[ideaStatus.ADDING_ASIN],
    ideaStatusByKey[ideaStatus.VERIFIED],
    ideaStatusByKey[ideaStatus.REJECTED],
    ideaStatusByKey[ideaStatus.CLOSED],
  ],
}

export const ideaStatusTranslate = (status: ideaStatus) => {
  switch (status) {
    case ideaStatus.ON_CHECK:
      return t(TranslationKey['On check'])
    case ideaStatus.VERIFIED:
    case ideaStatus.REALIZED:
      return t(TranslationKey.Realized)
    case ideaStatus.CLOSED:
      return t(TranslationKey.Closed)
    case ideaStatus.SUPPLIER_FOUND:
      return t(TranslationKey['Supplier found'])
    case ideaStatus.SUPPLIER_SEARCH:
      return t(TranslationKey['Supplier search'])
    case ideaStatus.SUPPLIER_NOT_FOUND:
      return t(TranslationKey['Supplier not found'])
    case ideaStatus.REJECTED:
      return t(TranslationKey.Rejected)
    case ideaStatus.NEW:
      return t(TranslationKey.New)
    case ideaStatus.CARD_CREATING:
      return t(TranslationKey['Card creating'])
    case ideaStatus.ADDING_ASIN:
      return t(TranslationKey['Adding ASIN'])
  }
}

export const colorByIdeaStatus = (status: ideaStatus) => {
  if (
    [
      ideaStatus.ON_CHECK,
      ideaStatus.SUPPLIER_SEARCH,
      ideaStatus.NEW,
      ideaStatus.REALIZED,
      ideaStatus.ADDING_ASIN,
    ].includes(status)
  ) {
    return '#F3AF00'
  } else if ([ideaStatus.VERIFIED, ideaStatus.SUPPLIER_FOUND, ideaStatus.CARD_CREATING].includes(status)) {
    return '#00B746'
  } else if ([ideaStatus.CLOSED, ideaStatus.SUPPLIER_NOT_FOUND, ideaStatus.REJECTED].includes(status)) {
    return SettingsModel.uiTheme === UiTheme.dark ? '#DD2121' : '#FF1616'
  } else if ([ideaStatus.REJECTED].includes(status)) {
    return SettingsModel.uiTheme === UiTheme.dark ? '#4CA1DE' : '#0A6FE8'
  } else {
    return '#black'
  }
}
