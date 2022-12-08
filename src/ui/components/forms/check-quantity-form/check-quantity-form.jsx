import {Typography} from '@mui/material'

import React, {useState} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'

import {checkIsPositiveNum, checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {t} from '@utils/translations'

import {useClassNames} from './check-quantity-form.style'

export const CheckQuantityForm = ({
  title,
  description,
  acceptText,
  onClose,
  onSubmit,
  comparisonQuantity,
  withRefund,
}) => {
  const {classes: classNames} = useClassNames()

  const [quantityValue, setQuantityValue] = useState('')

  const onChangeQuantityValue = e => {
    if (checkIsPositiveNum(e.target.value)) {
      setQuantityValue(e.target.value ? parseInt(e.target.value) : '')

      setValueIsEntered(true)
    }
  }

  const [refundValue, setRefundValue] = useState('')

  const onChangeRefundValue = e => {
    if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
      setRefundValue(e.target.value)
    }
  }

  const [valueIsEntered, setValueIsEntered] = useState(false)

  const isBadValue = Number(quantityValue) !== Number(comparisonQuantity)

  return (
    <div className={classNames.root}>
      <Typography className={classNames.modalText}>{title}</Typography>

      <Typography className={classNames.normalText}>{description}</Typography>

      <Field
        containerClasses={classNames.inputContainer}
        inputClasses={classNames.input}
        classes={{input: classNames.input}}
        error={isBadValue && valueIsEntered && t(TranslationKey['Incorrect value'])}
        value={quantityValue}
        onChange={onChangeQuantityValue}
      />

      {withRefund && (
        <>
          <Typography className={classNames.normalText}>
            {t(TranslationKey['Enter the amount of the refund to the Client']) + ', $'}
          </Typography>

          <Field
            containerClasses={classNames.inputContainer}
            inputClasses={classNames.input}
            classes={{input: classNames.input}}
            placeholder={'0.00'}
            value={refundValue}
            onChange={onChangeRefundValue}
          />
        </>
      )}

      <Typography className={classNames.normalText}>{acceptText}</Typography>

      <div className={classNames.buttonsWrapper}>
        <Button disabled={isBadValue || !valueIsEntered || !quantityValue} onClick={() => onSubmit({refundValue})}>
          {t(TranslationKey.Yes)}
        </Button>

        <Button variant="text" className={classNames.closeButton} onClick={onClose}>
          {t(TranslationKey.No)}
        </Button>
      </div>
    </div>
  )
}
