import { objectFlip } from '@utils/object'
import { t } from '@utils/translations'

import { TranslationKey } from '../translations/translation-key'

export const freelanceRequestType = {
  DEFAULT: 'DEFAULT',
  DESIGNER: 'DESIGNER',
  SEO: 'SEO',
  BLOGGER: 'BLOGGER',
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

export const freelanceRequestTypeTranslate = (type: string, changeTranslateKey?: boolean) => {
  switch (type) {
    case freelanceRequestType.DEFAULT:
      if (changeTranslateKey) {
        return t(TranslationKey.All)
      } else {
        return t(TranslationKey.Universal)
      }
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
