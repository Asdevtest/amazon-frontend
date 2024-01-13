import { useState } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'

import { checkIsPositiveNum, checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { t } from '@utils/translations'

import { useStyles } from './check-quantity-form.style'

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
  const { classes: styles, cx } = useStyles()

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
    <div className={styles.root}>
      <Typography className={styles.modalText}>{title}</Typography>

      <Typography className={styles.normalText}>{description}</Typography>

      <Field
        inputProps={{ maxLength: 10 }}
        containerClasses={styles.inputContainer}
        inputClasses={styles.input}
        classes={{ input: styles.input }}
        error={isBadValue && valueIsEntered && t(TranslationKey['Incorrect value'])}
        value={quantityValue}
        onChange={onChangeQuantityValue}
      />

      {withRefund && (
        <>
          <Typography className={styles.normalText}>
            {t(TranslationKey['Enter the amount of the refund to the Client']) + ', $'}
          </Typography>

          <Field
            inputProps={{ maxLength: 8 }}
            containerClasses={styles.inputContainer}
            inputClasses={styles.input}
            classes={{ input: styles.input }}
            placeholder={'0.00'}
            value={refundValue}
            onChange={onChangeRefundValue}
          />
        </>
      )}

      <Typography className={styles.normalText}>{acceptText}</Typography>

      <div className={styles.buttonsWrapper}>
        <Button
          disabled={isBadValue || !valueIsEntered || !quantityValue}
          className={styles.button}
          onClick={() => onSubmit({ refundValue })}
        >
          {t(TranslationKey.Yes)}
        </Button>

        <Button variant="text" className={cx(styles.closeButton, styles.button)} onClick={onClose}>
          {t(TranslationKey.No)}
        </Button>
      </div>
    </div>
  )
}
