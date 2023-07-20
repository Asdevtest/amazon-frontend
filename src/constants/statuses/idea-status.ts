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

export const ideaStatusByKey = objectFlip(ideaStatusByCode, parseInt)

export const ideaStatusTranslate = (status: ideaStatus) => {
  switch (status) {
    case ideaStatus.ON_CHECK:
      return t(TranslationKey['On check'])
    case ideaStatus.VERIFIED:
      return t(TranslationKey.Verified)
    case ideaStatus.CLOSED:
      return t(TranslationKey.Closed)
  }
}

export const colorByIdeaStatus = (status: ideaStatus) => {
  if ([ideaStatus.ON_CHECK].includes(status)) {
    return '#F3AF00'
  } else if ([ideaStatus.VERIFIED].includes(status)) {
    return '#00B746'
  } else if ([ideaStatus.CLOSED].includes(status)) {
    return '#FF1616'
  } else {
    return '#black'
  }
}
