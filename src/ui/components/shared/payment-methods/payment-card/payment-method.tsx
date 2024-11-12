import { FC, memo } from 'react'

import { CustomImage } from '@components/shared/custom-image'
import { Text } from '@components/shared/text'

import { IPaymentMethod } from '@typings/shared/payment-method'

import { useStyles } from './payment-method.style'

interface PaymentCardProps {
  paymentMethod: IPaymentMethod
}

export const PaymentMethod: FC<PaymentCardProps> = memo(({ paymentMethod }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      <CustomImage preview={false} src={paymentMethod?.iconImage} width={22} height={22} />
      <Text copyable={false} rows={1} text={paymentMethod?.title} />
    </div>
  )
})
