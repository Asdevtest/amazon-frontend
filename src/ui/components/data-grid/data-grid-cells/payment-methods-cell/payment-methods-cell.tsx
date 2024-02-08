import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { IPaymentMethod } from '@typings/models/shared/payment-method'

import { useStyles } from './payment-methods-cell.style'

interface PaymentMethodsCellProps {
  paymentMethods: IPaymentMethod[]
  onClickCell?: () => void
}

export const PaymentMethodsCell: FC<PaymentMethodsCellProps> = memo(({ paymentMethods, onClickCell }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.paymentMethods} onClick={onClickCell ? onClickCell : undefined}>
      {paymentMethods?.length > 0
        ? paymentMethods.map(paymentMethod => (
            <div key={paymentMethod?._id} className={styles.paymentMethod}>
              <img
                src={getAmazonImageUrl(paymentMethod?.iconImage, false)}
                alt={paymentMethod?.title}
                className={styles.paymentMethodIcon}
              />
              <p className={styles.paymentMethodTitle}>{paymentMethod?.title}</p>
            </div>
          ))
        : t(TranslationKey['No data'])}
    </div>
  )
})
