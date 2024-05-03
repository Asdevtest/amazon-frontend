import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field'

import { checkIsPositiveNum, checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './check-quantity-form.style'

export const CheckQuantityForm = props => {
  const { title, description, acceptText, onClose, onSubmit, withRefund, maxRefundNumber, deliveredQuantity } = props
  const { classes: styles } = useStyles()

  const [quantityValue, setQuantityValue] = useState('')
  const [valueIsEntered, setValueIsEntered] = useState(false)
  const [refundValue, setRefundValue] = useState('')

  const onChangeQuantityValue = e => {
    if (checkIsPositiveNum(e.target.value) && /^[+]?\d*$/.test(e.target.value)) {
      setQuantityValue(e.target.value)

      setValueIsEntered(true)
    }
  }

  const onChangeRefundValue = e => {
    if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value) && e.target.value <= maxRefundNumber) {
      setRefundValue(e.target.value)
    }
  }

  const isBadValue = Number(quantityValue) !== Number(deliveredQuantity)

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>

      <div className={styles.flexContainer}>
        <p className={styles.text}>{description}</p>

        <Field
          inputProps={{ maxLength: 10 }}
          containerClasses={styles.inputContainer}
          inputClasses={styles.input}
          classes={{ input: styles.input }}
          placeholder="0"
          value={quantityValue}
          onChange={onChangeQuantityValue}
        />

        <p className={styles.textRed}>{isBadValue && valueIsEntered && t(TranslationKey['Incorrect value'])}</p>
      </div>

      {withRefund && (
        <div className={styles.flexContainer}>
          <p>{t(TranslationKey['Enter the amount of the refund to the Client']) + ', $:'}</p>

          <Field
            inputProps={{ maxLength: 8 }}
            containerClasses={styles.inputContainer}
            inputClasses={styles.input}
            classes={{ input: styles.input }}
            placeholder="0.00"
            value={refundValue}
            onChange={onChangeRefundValue}
          />
        </div>
      )}

      <div className={styles.flexContainer}>
        <p>{acceptText}</p>

        <div className={styles.buttons}>
          <Button
            styleType={ButtonStyle.SUCCESS}
            disabled={isBadValue || !valueIsEntered || !quantityValue}
            onClick={() => onSubmit({ refundValue })}
          >
            {t(TranslationKey.Yes)}
          </Button>

          <Button styleType={ButtonStyle.CASUAL} onClick={onClose}>
            {t(TranslationKey.No)}
          </Button>
        </div>
      </div>
    </div>
  )
}
