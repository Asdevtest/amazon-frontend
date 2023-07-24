import { Typography } from '@mui/material'

import React, { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'

import { checkIsPositiveNum, checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { t } from '@utils/translations'

import { useClassNames } from './check-quantity-form.style'
import { cx } from '@emotion/css'

export const CheckQuantityForm = ({
  title,
  description,
  acceptText,
  onClose,
  onSubmit,
  comparisonQuantity,
  withRefund,
  maxRefundNumber,
}) => {
  const { classes: classNames } = useClassNames()

  const [quantityValue, setQuantityValue] = useState('')

  const onChangeQuantityValue = e => {
    if (checkIsPositiveNum(e.target.value)) {
      setQuantityValue(e.target.value ? parseInt(e.target.value) : '')

      setValueIsEntered(true)
    }
  }

  const [refundValue, setRefundValue] = useState('')

  const onChangeRefundValue = e => {
    if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value) && e.target.value <= maxRefundNumber) {
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
        inputProps={{ maxLength: 10 }}
        containerClasses={classNames.inputContainer}
        inputClasses={classNames.input}
        classes={{ input: classNames.input }}
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
            inputProps={{ maxLength: 8 }}
            containerClasses={classNames.inputContainer}
            inputClasses={classNames.input}
            classes={{ input: classNames.input }}
            placeholder={'0.00'}
            value={refundValue}
            onChange={onChangeRefundValue}
          />
        </>
      )}

      <Typography className={classNames.normalText}>{acceptText}</Typography>

      <div className={classNames.buttonsWrapper}>
        <Button
          disabled={isBadValue || !valueIsEntered || !quantityValue}
          className={classNames.button}
          onClick={() => onSubmit({ refundValue })}
        >
          {t(TranslationKey.Yes)}
        </Button>

        <Button variant="text" className={cx(classNames.closeButton, classNames.button)} onClick={onClose}>
          {t(TranslationKey.No)}
        </Button>
      </div>
    </div>
  )
}
