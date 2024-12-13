import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export enum BasicInfoConfig {
  PRODUCT_INFO = 'PRODUCT_INFO',
  PARAMETERS = 'PARAMETERS',
  SUPPLIERS = 'SUPPLIERS',
  DESCRIPTION = 'DESCRIPTION',
}

export const basicInfoTabsOptions = [
  { label: t(TranslationKey['Product information']), value: BasicInfoConfig.PRODUCT_INFO },
  { label: t(TranslationKey.Parameters), value: BasicInfoConfig.PARAMETERS },
  { label: t(TranslationKey.Suppliers), value: BasicInfoConfig.SUPPLIERS },
  { label: t(TranslationKey.Description), value: BasicInfoConfig.DESCRIPTION },
]

export enum ProductStrategyStatus {
  NONE = 'NONE',
  DROPSHIPPING = 'DROPSHIPPING',
  PRIVATE_LABEL = 'PRIVATE_LABEL',
  ONLINE_ARBITRAGE_CHINA = 'ONLINE_ARBITRAGE_CHINA',
  WHOLE_SALE_USA = 'WHOLE_SALE_USA',
}

export const productStrategyStatus: Record<string, number> = {
  NONE: 1,
  DROPSHIPPING: 10,
  PRIVATE_LABEL: 20,
  ONLINE_ARBITRAGE_CHINA: 30,
  WHOLE_SALE_USA: 40,
}
