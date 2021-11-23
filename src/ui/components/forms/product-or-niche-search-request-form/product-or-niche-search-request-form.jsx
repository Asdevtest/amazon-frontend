import {useState} from 'react'

import {Button, Checkbox, NativeSelect, Typography} from '@material-ui/core'
import {parseISO} from 'date-fns'

import {mapProductStrategyStatusEnum} from '@constants/product-strategy-status'
import {texts} from '@constants/texts'

import {DatePicker} from '@components/date-picker'
import {Field} from '@components/field'
import {Input} from '@components/input'
import {RangeInput} from '@components/range-input'

import {checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './product-or-niche-search-request-form.style'

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

export const ProductOrNicheSearchRequestForm = ({onSubmit, setOpenModal, isEdit, requestToEdit}) => {
  const classNames = useClassNames()

  const sourceFormFields = {
    strategy: requestToEdit?.strategy || '',
    monthlySales: requestToEdit?.monthlySales || '',
    budget: requestToEdit?.budget || '',

    countOfProposals: requestToEdit?.countOfProposals || '',

    minProductInProposals: requestToEdit?.minProductInProposals || '',
    minKeywords: requestToEdit?.minKeywords || '',

    size: requestToEdit?.size || '',
    searchVolume: requestToEdit?.searchVolume || '', // tmp
    // minSearchVolume: '', //
    // maxSearchVolume: '', //

    minAmazonPrice: requestToEdit?.minAmazonPrice || '',
    maxAmazonPrice: requestToEdit?.maxAmazonPrice || '',

    minBSR: requestToEdit?.minBSR || '',
    maxBSR: requestToEdit?.maxBSR || '',

    minReviews: requestToEdit?.minReviews || '',
    maxReviews: requestToEdit?.maxReviews || '',

    minRevenue: requestToEdit?.minRevenue || '',
    maxRevenue: requestToEdit?.maxRevenue || '',

    clientComment: requestToEdit?.clientComment || '',
    deadline: parseISO(requestToEdit?.deadline) || new Date(),

    checkboxForbid: requestToEdit?.checkboxForbid || false,
    // checkboxNoPay: false,
    checkboxNoCheck: requestToEdit?.checkboxNoCheck || false,
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
          containerClasses={classNames.field}
          label={'Count of proposals'}
          value={formFields.countOfProposals}
          onChange={onChangeField('countOfProposals')}
        />

        <Field
          disabled
          containerClasses={classNames.field}
          label={'Cost of one proposal'}
          value={formFields.budget / formFields.countOfProposals || 0}
        />

        <Field
          containerClasses={classNames.field}
          label={'Count of min product in proposals'}
          value={formFields.minProductInProposals}
          onChange={onChangeField('minProductInProposals')}
        />

        <Field
          containerClasses={classNames.field}
          label={'Count of min key words in proposals'}
          value={formFields.minKeywords}
          onChange={onChangeField('minKeywords')}
        />

        <Field
          containerClasses={classNames.field}
          label={'Size tier'}
          value={formFields.size}
          onChange={onChangeField('size')}
        />

        <Field // tmp
          containerClasses={classNames.field}
          label={'Search volume'}
          value={formFields.searchVolume}
          onChange={onChangeField('searchVolume')}
        />

        {/* <Field
          containerClasses={classNames.rangeField}
          label={'Search volume'}
          inputComponent={
            <RangeInput
              start={formFields.minSearchVolume}
              end={formFields.maxSearchVolume}
              onChangeRangeStart={onChangeField('minSearchVolume')}
              onChangeRangeEnd={onChangeField('maxSearchVolume')}
            />
          }
        /> */}

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
        {/* <div className={classNames.checkboxWrapper}>
          <Checkbox color="primary" value={formFields.checkboxNoPay} onChange={onChangeField('checkboxNoPay')} />
          <Typography>{textConsts.formCheckboxNoPayLabel}</Typography>
        </div> */}

        <div className={classNames.checkboxWrapper}>
          <Checkbox color="primary" value={formFields.checkboxNoCheck} onChange={onChangeField('checkboxNoCheck')} />
          <Typography>{textConsts.formCheckboxNoCheckLabel}</Typography>
        </div>
      </div>

      <Button
        disableElevation
        disabled={JSON.stringify(sourceFormFields) === JSON.stringify(formFields)}
        color="primary"
        variant="contained"
        onClick={() => onSubmit(formFields, requestToEdit._id)}
      >
        {isEdit ? 'Изменить' : 'Создать заявку'}
      </Button>

      <Button
        disableElevation
        className={classNames.button}
        color="primary"
        variant="contained"
        onClick={() => setOpenModal()}
      >
        {'Отмена'}
      </Button>
    </div>
  )
}
