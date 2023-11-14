import { FC, memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { Payment, Payments } from '@typings/payments'

import { useStyles } from './payment-methods-form.style'

import { PaymentMethodCard } from './payment-method-card'

interface PaymentMethodsFormProps {
  payments: Array<Payments | Payment>
  readOnly?: boolean
  onClickSaveButton?: (childStates: Array<Payments | Payment>) => void
  onClickCancelButton?: VoidFunction
}

export const PaymentMethodsForm: FC<PaymentMethodsFormProps> = memo(props => {
  const { payments, readOnly, onClickSaveButton, onClickCancelButton } = props
  const { classes: styles } = useStyles()

  const [childStates, setChildStates] = useState<Array<Payments | Payment>>([])

  useEffect(() => {
    if (payments.length) {
      setChildStates(
        payments
          ?.sort((a, b) => {
            const titleA = typeof a !== 'undefined' && 'paymentMethod' in a ? a.paymentMethod?.title : a?.title
            const titleB = typeof b !== 'undefined' && 'paymentMethod' in b ? b.paymentMethod?.title : b?.title
            return titleA?.localeCompare(titleB)
          })
          .sort((a, b) => {
            if (
              typeof a !== 'undefined' &&
              'paymentMethod' in a &&
              typeof b !== 'undefined' &&
              'paymentMethod' in b &&
              a.paymentMethod?._id &&
              b.paymentMethod?._id
            ) {
              return 0
            }
            if (typeof a !== 'undefined' && 'paymentMethod' in a && a.paymentMethod?._id) {
              return -1
            }
            if (typeof b !== 'undefined' && 'paymentMethod' in b && b.paymentMethod?._id) {
              return 1
            }
            return 0
          }),
      )
    }
  }, [])

  const handleChildStateChange = (index: number, newState: Payments) => {
    const newChildStates = [...childStates]
    newChildStates[index] = newState

    setChildStates(newChildStates)
  }

  return (
    <div className={styles.root}>
      <p className={styles.title}>{t(TranslationKey['Select payment methods'])}</p>

      <div className={styles.modalCardsWrapper}>
        {payments?.length ? (
          payments.map((payment, paymentMethodIndex) => (
            <PaymentMethodCard
              key={paymentMethodIndex}
              readOnly={readOnly}
              payment={payment}
              onStateChange={(newState: Payments) => handleChildStateChange(paymentMethodIndex, newState)}
            />
          ))
        ) : (
          <p className={styles.title}>{t(TranslationKey.Missing)}</p>
        )}
      </div>

      <div className={styles.buttonsWrapper}>
        {!readOnly && (
          <Button
            success
            className={styles.actionButton}
            onClick={() => {
              !!onClickCancelButton && onClickCancelButton()
              !!onClickSaveButton && onClickSaveButton(childStates)
            }}
          >
            {t(TranslationKey.Save)}
          </Button>
        )}
        <Button className={styles.actionButton} onClick={onClickCancelButton}>
          {readOnly ? t(TranslationKey.Close) : t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
})
