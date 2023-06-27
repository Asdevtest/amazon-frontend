import { objectFlip } from '@utils/object'
import { t } from '@utils/translations'

import { TranslationKey } from '../translations/translation-key'

export const ProductStrategyStatus = {
  NONE: 'NONE',
  DROPSHIPPING: 'DROPSHIPPING',
  PRIVATE_LABEL: 'PRIVATE_LABEL',
  ONLINE_ARBITRAGE_CHINA: 'ONLINE_ARBITRAGE_CHINA',
  WHOLE_SALE_USA: 'WHOLE_SALE_USA',
}

export const mapProductStrategyStatusEnum = {
  1: ProductStrategyStatus.NONE,
  10: ProductStrategyStatus.DROPSHIPPING,
  20: ProductStrategyStatus.PRIVATE_LABEL,
  30: ProductStrategyStatus.ONLINE_ARBITRAGE_CHINA,
  40: ProductStrategyStatus.WHOLE_SALE_USA,
}

export const humanFriendlyStategyStatus = value => {
  switch (value) {
    case ProductStrategyStatus.DROPSHIPPING:
      return 'DROPSHIPPING'
    case ProductStrategyStatus.ONLINE_ARBITRAGE_CHINA:
      return 'ONLINE ARBITRAGE CHINA'
    case ProductStrategyStatus.PRIVATE_LABEL:
      return 'PRIVATE LABEL'
    case ProductStrategyStatus.WHOLE_SALE_USA:
      return 'WHOLE SALE USA'
    case ProductStrategyStatus.NONE:
      return t(TranslationKey['Without strategy'])
  }
}

export const mapProductStrategyStatusEnumToKey = objectFlip(mapProductStrategyStatusEnum, parseInt)
