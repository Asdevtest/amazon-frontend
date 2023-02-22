import {t} from '@utils/translations'

import {TranslationKey} from './translations/translation-key'

export const freelanceRequestType = {
  DESIGNER: 'DESIGNER',
  SEO: 'SEO',
  BLOGGER: 'BLOGER',
  PPC: 'PPC',
}

export const freelanceRequestTypeByCode = {
  1: freelanceRequestType.DESIGNER,
  2: freelanceRequestType.SEO,
  3: freelanceRequestType.BLOGGER,
  4: freelanceRequestType.PPC,
}

export const freelanceRequestTypeTranslate = type => {
  switch (type) {
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
