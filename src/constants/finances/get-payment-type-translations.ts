import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { PaymentType } from './payment-type'

export const getPaymentTypeTranslations = (paymentType: PaymentType) => {
  switch (paymentType) {
    case PaymentType.ORDER:
      return t(TranslationKey.Order)
    case PaymentType.PRODUCT:
      return t(TranslationKey.Product)
    case PaymentType.BOX:
      return t(TranslationKey.Box)
  }
}
