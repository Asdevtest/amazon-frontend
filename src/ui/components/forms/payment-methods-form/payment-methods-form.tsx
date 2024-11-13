import { FC, memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import '@typings/enums/button-style'
import { IPayment } from '@typings/shared/payment'

import { useStyles } from './payment-methods-form.style'

import { PaymentMethod } from './payment-method-card'

interface PaymentMethodsFormProps {
  orderPayments: IPayment[]
  allPayments: IPayment[]
  onClickCancelButton: () => void
  onClickSaveButton?: (payments: IPayment[]) => void
  readOnly?: boolean
}

export const PaymentMethodsForm: FC<PaymentMethodsFormProps> = memo(props => {
  const { orderPayments, allPayments, readOnly, onClickSaveButton, onClickCancelButton } = props

  const { classes: styles } = useStyles()

  const [selectedPayments, setSelectedPayments] = useState<IPayment[]>(allPayments || [])

  useEffect(() => {
    if (orderPayments?.length) {
      const updatedPayments = allPayments
        .map(payment => {
          const foundPayment = orderPayments.find(
            orderPayment => orderPayment?.paymentMethod?._id === payment?.paymentMethod?._id,
          )

          return foundPayment ? { ...foundPayment, isChecked: true } : payment
        })
        .sort((a, b) => (a.isChecked === b.isChecked ? 0 : a.isChecked ? -1 : 1))

      setSelectedPayments(updatedPayments)
    } else {
      setSelectedPayments(allPayments)
    }
  }, [orderPayments])

  const handleSaveButton = () => {
    const filteringSelectedPayments = selectedPayments.filter(selectedPayment => selectedPayment.isChecked)

    onClickSaveButton?.(filteringSelectedPayments)
    onClickCancelButton()
  }

  return (
    <div className={styles.root}>
      <p className={styles.title}>{t(TranslationKey['Select payment methods'])}</p>

      <div className={styles.payments}>
        {selectedPayments?.length ? (
          selectedPayments.map((payment, paymentMethodIndex) => (
            <PaymentMethod
              key={paymentMethodIndex}
              readOnly={readOnly}
              payment={payment}
              setSelectedPayments={setSelectedPayments}
            />
          ))
        ) : (
          <p className={styles.title}>{t(TranslationKey.Missing)}</p>
        )}
      </div>

      <div className={styles.buttonsWrapper}>
        {!readOnly && (
          <CustomButton type="primary" onClick={handleSaveButton}>
            {t(TranslationKey.Save)}
          </CustomButton>
        )}
        <CustomButton onClick={onClickCancelButton}>{t(TranslationKey.Close)}</CustomButton>
      </div>
    </div>
  )
})
