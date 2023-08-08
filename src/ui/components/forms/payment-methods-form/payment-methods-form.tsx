/* eslint-disable no-unused-vars */
import React, { FC, useState } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { PaymentMethodCard } from './payment-method-card'
import { useClassNames } from './payment-methods-form.style'

interface PaymentMethod {
  _id: string
  title: string
}

interface Payments {
  paymentDetails: string
  paymentImages: Array<string>
  paymentMethod: PaymentMethod
  photosForLoad: Array<string>
}

interface PaymentMethodsFormProps {
  payments: Array<Payments | PaymentMethod>
  readOnly?: boolean
  onClickSaveButton?: (childStates: Array<Payments | PaymentMethod>) => void
  onClickCancelButton?: () => void
}

export const PaymentMethodsForm: FC<PaymentMethodsFormProps> = props => {
  const { classes: classNames } = useClassNames()

  const { payments, readOnly, onClickSaveButton, onClickCancelButton } = props

  const [childStates, setChildStates] = useState(
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
      }) || [],
  )

  const handleChildStateChange = (index: number, newState: Payments) => {
    const newChildStates = [...childStates]
    newChildStates[index] = newState

    setChildStates(newChildStates)
  }

  return (
    <div className={classNames.root}>
      <Typography className={classNames.modalTitle}>{t(TranslationKey['Select payment methods'])}</Typography>
      <div className={classNames.modalCardsWrapper}>
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
          <>{t(TranslationKey.Missing)}</>
        )}
      </div>
      <div className={classNames.buttonsWrapper}>
        {!readOnly && (
          <Button
            success
            className={classNames.actionButton}
            onClick={() => {
              !!onClickCancelButton && onClickCancelButton()
              !!onClickSaveButton && onClickSaveButton(childStates)
            }}
          >
            {t(TranslationKey.Save)}
          </Button>
        )}
        <Button className={classNames.actionButton} onClick={onClickCancelButton}>
          {readOnly ? t(TranslationKey.Close) : t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
