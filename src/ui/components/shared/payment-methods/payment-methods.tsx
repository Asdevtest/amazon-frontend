import { FC, memo } from 'react'

import { IPaymentMethod } from '@typings/shared/payment-method'

import { useStyles } from './payment-methods.style'

import { PaymentMethod } from './payment-card'

interface PaymentMethodsProps {
  paymentMethods: IPaymentMethod[]
  onClick?: () => void
  isCell?: boolean
  isTitle?: boolean
}

export const PaymentMethods: FC<PaymentMethodsProps> = memo(props => {
  const { paymentMethods, onClick, isCell } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.root, { [styles.cell]: isCell })} onClick={onClick}>
      {paymentMethods?.map(paymentMethod => (
        <PaymentMethod key={paymentMethod._id} paymentMethod={paymentMethod} />
      ))}
    </div>
  )
})
