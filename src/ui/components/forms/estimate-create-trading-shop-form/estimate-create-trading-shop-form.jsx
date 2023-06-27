/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { Typography } from '@mui/material'

import React, { useState, useEffect } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './estimate-create-trading-shop-form.style'

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
  const { classes: classNames } = useClassNames()

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
    <div className={classNames.modalMessageWrapper}>
      <Typography className={classNames.modalMessageTitle}>
        {isEdit
          ? t(TranslationKey['Editing an ad to sell the store'])
          : t(TranslationKey['Adding an ad to sell the store'])}
      </Typography>

      <div className={cx(classNames.fieldsWrapper, { [classNames.oneFieldInRow]: !makeEstimate })}>
        <Field
          labelClasses={classNames.fieldLabel}
          label={t(TranslationKey['Total price'])}
          inputClasses={classNames.fieldInput}
          value={formFields.price}
          onChange={onChangeField('price')}
        />
        {makeEstimate ? (
          <Field
            labelClasses={classNames.fieldLabel}
            label={t(TranslationKey['Estimated cost'])}
            inputComponent={
              <div className={classNames.estimateCostWrapper}>
                <Typography>{toFixed(averagePureIncome * reqMultiplier, 2)}</Typography>

                <Button variant="text" className={classNames.applyBtn} onClick={applyReqMultiplier}>
                  {t(TranslationKey.Apply)}
                </Button>
              </div>
            }
          />
        ) : null}
      </div>

      <div className={classNames.fieldsWrapper}>
        <Field
          disabled
          labelClasses={classNames.fieldLabel}
          label={t(TranslationKey['Average. Monthly income'])}
          inputClasses={classNames.fieldInput}
          value={toFixedWithDollarSign(averageGrossIncome, 2)}
        />
        <Field
          disabled
          labelClasses={classNames.fieldLabel}
          label={t(TranslationKey['Average. Monthly net profit'])}
          inputClasses={classNames.fieldInput}
          value={toFixedWithDollarSign(averagePureIncome, 2)}
        />
      </div>

      <div className={classNames.fieldsWrapper}>
        <Field
          disabled
          labelClasses={classNames.fieldLabel}
          label={t(TranslationKey.Profitability)}
          inputClasses={classNames.fieldInput}
          value={`${toFixed(profitability, 2)} %`}
        />
        <Field
          disabled
          labelClasses={classNames.fieldLabel}
          label={t(TranslationKey['Monthly multiplier'])}
          inputClasses={classNames.fieldInput}
          inputComponent={
            <div className={classNames.multiplierWrapper}>
              <Typography>{`${toFixed(monthlyMultiplier, 2)} X`}</Typography>

              <Typography className={classNames.reqMultiplier}>{`${t(
                TranslationKey.req,
              )} (${reqMultiplier} X)`}</Typography>
            </div>
          }
        />
      </div>

      <Typography className={classNames.confirmText}>
        {isEdit
          ? `${t(TranslationKey['Accept the changes'])}?`
          : `${t(TranslationKey['Post an ad for a store for'])} ${formFields.price || 0} $ ?`}
      </Typography>

      <div className={classNames.buttonsWrapper}>
        <Button
          success
          disabled={submitIsClicked}
          variant="contained"
          className={classNames.buttonOk}
          onClick={onClickSubmit}
        >
          {t(TranslationKey.Yes)}
        </Button>

        <Button
          disabled={submitIsClicked}
          color="primary"
          variant="contained"
          className={classNames.buttonCancel}
          onClick={setOpenModal}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
