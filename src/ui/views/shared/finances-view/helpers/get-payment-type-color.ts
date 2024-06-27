import { PaymentType } from '@constants/finances/payment-type'

import { useStyles } from '../finances-view.style'

export const getPaymentTypeColor = (paymentType: string) => {
  const { theme } = useStyles()

  switch (paymentType) {
    case PaymentType.FINE:
      return theme.palette.other.rejected
    case PaymentType.REPLENISH:
      return theme.palette.other.succes
    default:
      return null
  }
}
