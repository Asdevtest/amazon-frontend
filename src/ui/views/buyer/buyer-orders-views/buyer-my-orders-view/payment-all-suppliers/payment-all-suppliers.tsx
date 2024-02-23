import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { toFixedWithDollarSign, toFixedWithYuanSign } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './payment-all-suppliers.style'

interface PaymentAllSuppliersProps {
  paymentAmount: {
    totalPriceInYuan: number
    totalPriceInUSD: number
    partialPaymentAmountRmb: number
  }
  isNoPaidedOrders: boolean
  yuanToDollarRate: number
}

export const PaymentAllSuppliers: FC<PaymentAllSuppliersProps> = memo(
  ({ paymentAmount, isNoPaidedOrders, yuanToDollarRate }) => {
    const { classes: styles, cx } = useStyles()

    return (
      <>
        {(paymentAmount?.totalPriceInYuan ||
          (isNoPaidedOrders && paymentAmount?.totalPriceInUSD) ||
          paymentAmount?.partialPaymentAmountRmb) > 0 ? (
          <div className={styles.totalPriceWrapper}>
            <p className={styles.totalPriceText}>
              {isNoPaidedOrders ? t(TranslationKey.Sum) + ':' : t(TranslationKey['Payment to all suppliers']) + ':'}
            </p>

            <p className={cx(styles.totalPriceText, styles.totalPrice)}>
              {`${toFixedWithYuanSign(
                isNoPaidedOrders
                  ? Number(paymentAmount?.totalPriceInUSD) * Number(yuanToDollarRate) +
                      paymentAmount?.partialPaymentAmountRmb
                  : paymentAmount?.totalPriceInYuan + paymentAmount?.partialPaymentAmountRmb,
                2,
              )} ${t(TranslationKey.Or).toLocaleLowerCase()} ${toFixedWithDollarSign(
                paymentAmount?.totalPriceInUSD + paymentAmount?.partialPaymentAmountRmb / Number(yuanToDollarRate),
                2,
              )}`}
            </p>
          </div>
        ) : (
          <div className={styles.totalPriceWrapper} />
        )}
      </>
    )
  },
)
