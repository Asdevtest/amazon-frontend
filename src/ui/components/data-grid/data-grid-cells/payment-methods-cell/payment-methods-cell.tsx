import React, { FC } from 'react'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useDataGridCellStyles } from './payment-methods-cell.style'

interface PaymentMethodsCellProps {
  paymentMethods: {
    paymentMethod: {
      title: string
      iconImage: string
    }
  }[]
  onClickCell?: () => void
}

export const PaymentMethodsCell: FC<PaymentMethodsCellProps> = React.memo(props => {
  const { classes: styles } = useDataGridCellStyles()
  const { paymentMethods, onClickCell } = props

  return (
    <div className={styles.paymentMethods} onClick={onClickCell && onClickCell}>
      {paymentMethods.map(({ paymentMethod }) => (
        <div key={paymentMethod.title} className={styles.paymentMethod}>
          <img
            src={getAmazonImageUrl(paymentMethod.iconImage, false)}
            alt={paymentMethod.title}
            className={styles.paymentMethodIcon}
          />
          <p className={styles.paymentMethodTitle}>{paymentMethod.title}</p>
        </div>
      ))}
    </div>
  )
})
