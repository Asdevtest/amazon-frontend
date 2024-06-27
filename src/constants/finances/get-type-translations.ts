import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { EntityType } from './entity-type'
import { PaymentType } from './payment-type'

export const getEntityTypeTranslations = (paymentType: string) => {
  switch (paymentType) {
    case EntityType.ORDER:
      return t(TranslationKey.Order)
    case EntityType.PRODUCT:
      return t(TranslationKey.Product)
    case EntityType.BOX:
      return t(TranslationKey.Box)
    default:
      return t(TranslationKey.Proposal)
  }
}

export const getPaymentTypeTranslations = (paymentType: string) => {
  switch (paymentType) {
    case PaymentType.FINE:
      return t(TranslationKey.Fine)
    case PaymentType.REPLENISH:
      return t(TranslationKey.Replenish)
    default:
      return t(TranslationKey.Zero)
  }
}
