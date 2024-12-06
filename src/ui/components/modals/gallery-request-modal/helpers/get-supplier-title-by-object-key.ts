import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const getSupplierTitleByObjectkey = (key: string): string => {
  if (key === 'productImages') {
    return t(TranslationKey.Product)
  }

  if (key === 'currentSupplierCardImage') {
    return t(TranslationKey['Current supplier'])
  }

  if (key === 'latestSeoFiles') {
    return t(TranslationKey.SEO)
  }

  if (key.includes('supplierCardsImages')) {
    return t(TranslationKey.Supplier) + ` ${key.replace('supplierCardsImages', '')}`
  }

  return t(TranslationKey.Supplier)
}
