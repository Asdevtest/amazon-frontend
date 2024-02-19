import { useState } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonType, ButtonVariant } from '@typings/types/button.type'

import { useStyles } from './estimate-create-trading-shop-form.style'

const reqMultiplier = 20

export const EstimateCreateTradingShopForm = ({
  isEdit,
  formFields,
  onChangeField,
  onCreateSubmit,
  onEditSubmit,
  setOpenModal,
  makeEstimate,
  files,
}) => {
  const { classes: styles, cx } = useStyles()

  const [submitIsClicked, setSubmitIsClicked] = useState(false)

  const onClickSubmit = () => {
    const dataToCreate = {
      ...formFields,
      statistics: formFields.statistics
        .filter(el => el.grossIncome || el.pureIncome || el.uniqueCustomers || el.webpageVisits)
        .map(ind => ({
          ...ind,
          grossIncome: ind.grossIncome ? ind.grossIncome : 0,
          pureIncome: ind.pureIncome ? ind.pureIncome : 0,
          uniqueCustomers: ind.uniqueCustomers ? ind.uniqueCustomers : 0,
          webpageVisits: ind.webpageVisits ? ind.webpageVisits : 0,
        })),
    }

    if (isEdit) {
      onEditSubmit(dataToCreate, files)
    } else {
      onCreateSubmit(dataToCreate, files)
    }

    setSubmitIsClicked(true)
  }

  const applyReqMultiplier = () => {
    onChangeField('price')({ target: { value: averagePureIncome * reqMultiplier } })
  }

  const averageGrossIncome =
    formFields.statistics.reduce((acc, cur) => (acc += +cur.grossIncome), 0) /
      formFields.statistics.reduce((acc, cur) => (acc += cur.grossIncome ? 1 : 0), 0) || 0

  const averagePureIncome =
    formFields.statistics.reduce((acc, cur) => (acc += +cur.pureIncome), 0) /
      formFields.statistics.reduce((acc, cur) => (acc += cur.pureIncome ? 1 : 0), 0) || 0

  const profitability = averagePureIncome / (averageGrossIncome / 100) || 0

  const monthlyMultiplier = formFields.price || 0 / averagePureIncome || 0

  return (
    <div className={styles.modalMessageWrapper}>
      <Typography className={styles.modalMessageTitle}>
        {isEdit
          ? t(TranslationKey['Editing an ad to sell the store'])
          : t(TranslationKey['Adding an ad to sell the store'])}
      </Typography>

      <div className={cx(styles.fieldsWrapper, { [styles.oneFieldInRow]: !makeEstimate })}>
        <Field
          labelClasses={styles.fieldLabel}
          label={t(TranslationKey['Total price'])}
          inputClasses={styles.fieldInput}
          value={formFields.price}
          onChange={onChangeField('price')}
        />
        {makeEstimate ? (
          <Field
            labelClasses={styles.fieldLabel}
            label={t(TranslationKey['Estimated cost'])}
            inputComponent={
              <div className={styles.estimateCostWrapper}>
                <Typography>{toFixed(averagePureIncome * reqMultiplier, 2)}</Typography>

                <Button variant={ButtonVariant.OUTLINED} className={styles.applyBtn} onClick={applyReqMultiplier}>
                  {t(TranslationKey.Apply)}
                </Button>
              </div>
            }
          />
        ) : null}
      </div>

      <div className={styles.fieldsWrapper}>
        <Field
          disabled
          labelClasses={styles.fieldLabel}
          label={t(TranslationKey['Average. Monthly income'])}
          inputClasses={styles.fieldInput}
          value={toFixedWithDollarSign(averageGrossIncome, 2)}
        />
        <Field
          disabled
          labelClasses={styles.fieldLabel}
          label={t(TranslationKey['Average. Monthly net profit'])}
          inputClasses={styles.fieldInput}
          value={toFixedWithDollarSign(averagePureIncome, 2)}
        />
      </div>

      <div className={styles.fieldsWrapper}>
        <Field
          disabled
          labelClasses={styles.fieldLabel}
          label={t(TranslationKey.Profitability)}
          inputClasses={styles.fieldInput}
          value={`${toFixed(profitability, 2)} %`}
        />
        <Field
          disabled
          labelClasses={styles.fieldLabel}
          label={t(TranslationKey['Monthly multiplier'])}
          inputClasses={styles.fieldInput}
          inputComponent={
            <div className={styles.multiplierWrapper}>
              <Typography>{`${toFixed(monthlyMultiplier, 2)} X`}</Typography>

              <Typography className={styles.reqMultiplier}>{`${t(
                TranslationKey.req,
              )} (${reqMultiplier} X)`}</Typography>
            </div>
          }
        />
      </div>

      <Typography className={styles.confirmText}>
        {isEdit
          ? `${t(TranslationKey['Accept the changes'])}?`
          : `${t(TranslationKey['Post an ad for a store for'])} ${formFields.price || 0} $ ?`}
      </Typography>

      <div className={styles.buttonsWrapper}>
        <Button
          type={ButtonType.SUCCESS}
          disabled={submitIsClicked}
          className={styles.buttonOk}
          onClick={onClickSubmit}
        >
          {t(TranslationKey.Yes)}
        </Button>

        <Button disabled={submitIsClicked} className={styles.buttonCancel} onClick={setOpenModal}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
