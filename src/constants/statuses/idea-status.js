import { objectFlip } from '@utils/object'
import { t } from '@utils/translations'

import { TranslationKey } from '../translations/translation-key'

export const ideaStatus = {
  ON_CHECK: 'ON_CHECK',
  VERIFIED: 'VERIFIED',
  CLOSED: 'CLOSED',
}

export const ideaStatusByCode = {
  10: ideaStatus.ON_CHECK,
  20: ideaStatus.VERIFIED,
  30: ideaStatus.CLOSED,
}

export const ideaStatusByKey = objectFlip(ideaStatusByCode, parseInt)

export const ideaStatusTranslate = status => {
  switch (status) {
    case ideaStatus.ON_CHECK:
      return t(TranslationKey['On check'])
    case ideaStatus.VERIFIED:
      return t(TranslationKey.Verified)
    case ideaStatus.CLOSED:
      return t(TranslationKey.Closed)
  }
}

export const colorByIdeaStatus = status => {
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
