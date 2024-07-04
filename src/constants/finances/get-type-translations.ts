import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { EntityType } from './entity-type'
import { PaymentType } from './payment-type'

export const getEntityTypeTranslations = (paymentType: EntityType) => {
  switch (paymentType) {
    case EntityType.ORDER:
      return t(TranslationKey.Order)

    case EntityType.PRODUCT:
      return t(TranslationKey.Product)
    case EntityType.BOX:
      return t(TranslationKey.Box)

    case EntityType.DEPOSIT:
      return t(TranslationKey['Account replenishment'])

    case EntityType.WITHDRAWAL:
      return t(TranslationKey['Write-off'])

    default:
      return t(TranslationKey.Proposal)
  }
}

export const getPaymentTypeTranslations = (paymentType: PaymentType) => {
  switch (paymentType) {
    case PaymentType.FINE:
      return t(TranslationKey.Fine)
    case PaymentType.REPLENISH:
      return t(TranslationKey.Replenish)
    default:
      return t(TranslationKey.Zero)
  }
}
