import {useState} from 'react'

import {Button, Checkbox, NativeSelect, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {mapProductStrategyStatusEnum} from '@constants/product-strategy-status'
import {texts} from '@constants/texts'

import {DatePicker} from '@components/date-picker'
import {Field} from '@components/field'
import {Input} from '@components/input'
import {RangeInput} from '@components/range-input'

import {checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {styles} from './request-form.style'

const textConsts = getLocalizedTexts(texts, 'en').clientExchangeRequestsView

const numberFields = [
  'strategy',
  'monthlySales',
  'budget',
  'minAmazonPrice',
  'maxAmazonPrice',
  'minBSR',
  'maxBSR',
  'minReviews',
  'minRevenue',
  'maxRevenue',
  'maxReviews',
]

export const RequestFormRaw = ({classes: classNames, onSubmit, btnLabel}) => {
  const sourceFormFields = {
    strategy: '',
    monthlySales: '',
    budget: '',
    minAmazonPrice: '',
    maxAmazonPrice: '',

    minBSR: '',
    maxBSR: '',

    minReviews: '',
    maxReviews: '',

    minRevenue: '',
    maxRevenue: '',

    clientComment: '',
    deadline: new Date(),

    checkboxForbid: false,
    checkboxNoPay: false,
    checkboxNoCheck: false,
  }
  const [formFields, setFormFields] = useState(sourceFormFields)
  const onChangeField = fieldName => event => {
    const newFormFields = {...formFields}

    if (numberFields.includes(fieldName) && !checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(event.target.value)) {
      return
    } else if (['checkboxForbid', 'checkboxNoPay', 'checkboxNoCheck'].includes(fieldName)) {
      newFormFields[fieldName] = event.target.checked
    } else if (['deadline'].includes(fieldName)) {
      newFormFields[fieldName] = event
    } else {
      newFormFields[fieldName] = event.target.value
    }

    setFormFields(newFormFields)
  }

  return (
    <div className={classNames.root}>
      <div className={classNames.form}>
        <Field
          containerClasses={classNames.field}
          label={textConsts.formStrategyLabel}
          inputComponent={
            <NativeSelect
              variant="filled"
              value={formFields.strategy}
              input={<Input fullWidth />}
              onChange={onChangeField('strategy')}
            >
              {Object.keys(mapProductStrategyStatusEnum).map((option, index) => (
                <option key={index} value={option}>
                  {mapProductStrategyStatusEnum[option]}
                </option>
              ))}
            </NativeSelect>
          }
        />

        <Field
          containerClasses={classNames.field}
          label={textConsts.formMonthlySalesLabel}
          value={formFields.monthlySales}
          onChange={onChangeField('monthlySales')}
        />
        <Field
          containerClasses={classNames.field}
          label={textConsts.formBudgetLabel}
          value={formFields.budget}
          onChange={onChangeField('budget')}
        />
        <Field
          containerClasses={classNames.rangeField}
          label={textConsts.formAmazonPriceLabel}
          inputComponent={
            <RangeInput
              start={formFields.minAmazonPrice}
              end={formFields.maxAmazonPrice}
              onChangeRangeStart={onChangeField('minAmazonPrice')}
              onChangeRangeEnd={onChangeField('maxAmazonPrice')}
            />
          }
        />
        <Field
          containerClasses={classNames.rangeField}
          label={textConsts.formAvgBSRLabel}
          inputComponent={
            <RangeInput
              start={formFields.minBSR}
              end={formFields.maxBSR}
              onChangeRangeStart={onChangeField('minBSR')}
              onChangeRangeEnd={onChangeField('maxBSR')}
            />
          }
        />
        <Field
          containerClasses={classNames.rangeField}
          label={textConsts.formAvgReviewsLabel}
          inputComponent={
            <RangeInput
              start={formFields.minReviews}
              end={formFields.maxReviews}
              onChangeRangeStart={onChangeField('minReviews')}
              onChangeRangeEnd={onChangeField('maxReviews')}
            />
          }
        />
        <Field
          containerClasses={classNames.rangeField}
          label={textConsts.formAvgRevenueLabel}
          inputComponent={
            <RangeInput
              start={formFields.minRevenue}
              end={formFields.maxRevenue}
              onChangeRangeStart={onChangeField('minRevenue')}
              onChangeRangeEnd={onChangeField('maxRevenue')}
            />
          }
        />
        <Field
          multiline
          rows={4}
          rowsMax={6}
          className={classNames.multiline}
          containerClasses={classNames.field}
          label={textConsts.formNotesLabel}
          value={formFields.clientComment}
          onChange={onChangeField('clientComment')}
        />

        <Field
          containerClasses={classNames.field}
          label={textConsts.formDeadlineLabel}
          inputComponent={<DatePicker value={formFields.deadline} onChange={onChangeField('deadline')} />}
        />

        <div className={classNames.checkboxWrapper}>
          <Checkbox color="primary" value={formFields.checkboxForbid} onChange={onChangeField('checkboxForbid')} />
          <Typography>{textConsts.formCheckboxForbidLabel}</Typography>
        </div>
        <div className={classNames.checkboxWrapper}>
          <Checkbox color="primary" value={formFields.checkboxNoPay} onChange={onChangeField('checkboxNoPay')} />
          <Typography>{textConsts.formCheckboxNoPayLabel}</Typography>
        </div>

        <div className={classNames.checkboxWrapper}>
          <Checkbox color="primary" value={formFields.checkboxNoCheck} onChange={onChangeField('checkboxNoCheck')} />
          <Typography>{textConsts.formCheckboxNoCheckLabel}</Typography>
        </div>
      </div>

      <Button disableElevation color="primary" variant="contained" onClick={() => onSubmit(formFields)}>
        {btnLabel}
      </Button>
    </div>
  )
}

export const RequestForm = withStyles(styles)(RequestFormRaw)
