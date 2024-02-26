import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const getSupplierTitleByObjectkey = (key: string): string => {
  if (key === 'productImages') {
    return t(TranslationKey.Product)
  }

  if (key === 'currentSupplierImage') {
    return t(TranslationKey['Current supplier'])
  }

  if (key === 'currentSupplierImage') {
    return t(TranslationKey.SEO)
  }

  if (key.includes('supplierImage')) {
    return t(TranslationKey.Supplier) + ` ${key.replace('supplierImage', '')}`
  }

  return t(TranslationKey.Supplier)
}
