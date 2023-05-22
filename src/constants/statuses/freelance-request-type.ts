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
