import {useState} from 'react'

import {Button, Checkbox, NativeSelect, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {texts} from '@constants/texts'

import {DatePicker} from '@components/date-picker'
import {Field} from '@components/field'
import {Input} from '@components/input'
import {RangeInput} from '@components/range-input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {styles} from './request-form.style'

const textConsts = getLocalizedTexts(texts, 'en').clientExchangeRequestsView

const selectOptions = [
  {value: 'Flipping', label: textConsts.selectOptionFlipping},
  {value: 'Dropshipping', label: textConsts.selectOptionDropshipping},
  {value: 'Online arbitrage', label: textConsts.selectOptionOnlineArbitrage},
  {value: 'Private Label', label: textConsts.selectOptionPrivateLabel},
]

export const RequestFormRaw = ({classes: classNames, formFields, onSubmit, btnLabel}) => {
  const [date, handlerDate] = useState(Date.now())
  return (
    <div className={classNames.root}>
      <div className={classNames.form}>
        <Field
          containerClasses={classNames.field}
          label={textConsts.formStrategyLabel}
          inputComponent={
            <NativeSelect variant="filled" value={formFields.strategy} input={<Input fullWidth />}>
              {selectOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelect>
          }
        />
        <Field
          containerClasses={classNames.field}
          label={textConsts.formMonthlySalesLabel}
          value={formFields.monthlySales}
        />
        <Field containerClasses={classNames.field} label={textConsts.formBudgetLabel} value={formFields.budget} />
        <Field
          containerClasses={classNames.rangeField}
          label={textConsts.formAmazonPriceLabel}
          inputComponent={<RangeInput start={formFields.amazonPrice} end={formFields.amazonPrice} />}
        />
        <Field
          containerClasses={classNames.rangeField}
          label={textConsts.formAvgBSRLabel}
          inputComponent={<RangeInput start={formFields.avgBSR} end={formFields.avgBSR} />}
        />
        <Field
          containerClasses={classNames.rangeField}
          label={textConsts.formAvgReviewsLabel}
          inputComponent={<RangeInput start={formFields.avgReviews} end={formFields.avgReviews} />}
        />
        <Field
          containerClasses={classNames.rangeField}
          label={textConsts.formAvgRevenueLabel}
          inputComponent={<RangeInput start={formFields.avgRevenue} end={formFields.avgRevenue} />}
        />
        <Field
          multiline
          rows={4}
          rowsMax={6}
          className={classNames.multiline}
          containerClasses={classNames.field}
          label={textConsts.formNotesLabel}
          value={formFields.notes}
        />
        <div className={classNames.checkboxWrapper}>
          <Checkbox color="primary" value={formFields.checkboxForbid} />
          <Typography>{textConsts.formCheckboxForbidLabel}</Typography>
        </div>
        <div className={classNames.checkboxWrapper}>
          <Checkbox color="primary" value={formFields.checkboxNoPay} />
          <Typography>{textConsts.formCheckboxNoPayLabel}</Typography>
        </div>

        <Field
          containerClasses={classNames.field}
          label={textConsts.formDeadlineLabel}
          inputComponent={<DatePicker value={date} onChange={handlerDate} />}
        />

        <div className={classNames.checkboxWrapper}>
          <Checkbox color="primary" value={formFields.checkboxNoCheck} />
          <Typography>{textConsts.formCheckboxNoCheckLabel}</Typography>
        </div>
      </div>
      <Button disableElevation color="primary" variant="contained" onClick={onSubmit}>
        {btnLabel}
      </Button>
    </div>
  )
}

export const RequestForm = withStyles(styles)(RequestFormRaw)
