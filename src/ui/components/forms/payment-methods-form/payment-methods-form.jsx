/* eslint-disable no-unused-vars */
import {Typography} from '@mui/material'

import React, {useState} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'

import {t} from '@utils/translations'

import {PaymentMethodCard} from './payment-method-card'
import {useClassNames} from './payment-methods-form.style'

export const PaymentMethodsForm = props => {
  const {classes: classNames} = useClassNames()

  const {payments, onClickSaveButton, onClickCancelButton} = props

  const [childStates, setChildStates] = useState(
    payments?.sort((a, b) => {
      const titleA = a?.paymentMethod ? a?.paymentMethod?.title : a?.title
      const titleB = b?.paymentMethod ? b?.paymentMethod?.title : b?.title
      return titleA?.localeCompare(titleB)
    }) || [],
  )

  const handleChildStateChange = (index, newState) => {
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
              payment={payment}
              onStateChange={newState => handleChildStateChange(paymentMethodIndex, newState)}
            />
          ))
        ) : (
          <>{t(TranslationKey.Missing)}</>
        )}
      </div>
      <div className={classNames.buttonsWrapper}>
        <Button
          success
          className={classNames.actionButton}
          onClick={() => {
            onClickCancelButton()
            onClickSaveButton(childStates)
          }}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button className={classNames.actionButton} onClick={onClickCancelButton}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
