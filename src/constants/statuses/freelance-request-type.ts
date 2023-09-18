import { RequestStatus } from '@constants/requests/request-status'
import { UiTheme } from '@constants/theme/themes'

import { SettingsModel } from '@models/settings-model'

import { objectFlip } from '@utils/object'
import { t } from '@utils/translations'

import { TranslationKey } from '../translations/translation-key'

export const freelanceRequestType = {
  DEFAULT: 'DEFAULT',
  DESIGNER: 'DESIGNER',
  SEO: 'SEO',
  BLOGGER: 'BLOGER',
  PPC: 'PPC',
}

export const freelanceRequestTypeByCode: { [key: number]: string } = {
  0: freelanceRequestType.DEFAULT,
  10: freelanceRequestType.DESIGNER,
  20: freelanceRequestType.SEO,
  30: freelanceRequestType.BLOGGER,
  40: freelanceRequestType.PPC,
}

export const freelanceRequestTypeByKey = objectFlip(freelanceRequestTypeByCode, parseInt)

export const freelanceRequestTypeTranslate = (type: string) => {
  switch (type) {
    case freelanceRequestType.DEFAULT:
      return t(TranslationKey.All)
    case freelanceRequestType.DESIGNER:
      return t(TranslationKey.Designer)
    case freelanceRequestType.SEO:
      return t(TranslationKey.SEO)
    case freelanceRequestType.BLOGGER:
      return t(TranslationKey.Blogger)
    case freelanceRequestType.PPC:
      return t(TranslationKey.PPC)
  }
}

export const colorByStatusFreelanceRequest = (status: string) => {
  if ([RequestStatus.DRAFT].includes(status)) {
    return SettingsModel.uiTheme === UiTheme.light ? '#007bff' : '#4CA1DE'
  } else if (
    [RequestStatus.CANCELED_BY_CREATOR, RequestStatus.FORBID_NEW_PROPOSALS, RequestStatus.CANCELED_BY_ADMIN].includes(
      status,
    )
  ) {
    return '#FF1616'
  } else if ([RequestStatus.IN_PROCESS, RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED].includes(status)) {
    return '#00B746'
  } else if ([RequestStatus.PUBLISHED, RequestStatus.TO_CORRECT_BY_ADMIN].includes(status)) {
    return '#F3AF00'
  } else if ([RequestStatus.EXPIRED].includes(status)) {
    return '#C4C4C4'
  } else {
    return 'black'
  }
}
