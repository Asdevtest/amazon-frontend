import { PaymentType } from '@constants/finances/payment-type'

import { FineIcon, ReplenishIcon } from '@components/shared/svg-icons'

export const getPaymentTypeIcon = (paymentType: string) => {
  switch (paymentType) {
    case PaymentType.FINE:
      return FineIcon
    case PaymentType.REPLENISH:
      return ReplenishIcon
    default:
      return null
  }
}
