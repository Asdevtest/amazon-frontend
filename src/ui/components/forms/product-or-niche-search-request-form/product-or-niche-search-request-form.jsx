import {useState} from 'react'

import {Button, Checkbox, NativeSelect, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {parseISO} from 'date-fns'

import {productSizeStatus} from '@constants/product-size-status'
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
  'countOfProposals',
  'searchVolume',
]

export const ProductOrNicheSearchRequestForm = ({onSubmit, setOpenModal, isEdit, requestToEdit}) => {
  const classNames = useClassNames()

  const [itIsRequestOfNiche, setItIsRequestOfNiche] = useState(false)
  const [inChoosingRequestType, setInChoosingRequestType] = useState(!isEdit)

  const sourceProductFormFields = {
    strategy: requestToEdit?.strategy || '',
    monthlySales: requestToEdit?.monthlySales || '',
    budget: requestToEdit?.budget || '',

    countOfProposals: requestToEdit?.countOfProposals || '',
    size: requestToEdit?.size || '',
    searchVolume: requestToEdit?.searchVolume || '',

    minAmazonPrice: requestToEdit?.minAmazonPrice || '',
    maxAmazonPrice: requestToEdit?.maxAmazonPrice || '',
    minBSR: requestToEdit?.minBSR || '',
    maxBSR: requestToEdit?.maxBSR || '',
    minReviews: requestToEdit?.minReviews || '',
    maxReviews: requestToEdit?.maxReviews || '',
    minRevenue: requestToEdit?.minRevenue || '',
    maxRevenue: requestToEdit?.maxRevenue || '',

    clientComment: requestToEdit?.clientComment || '',
    deadline: requestToEdit.deadline ? parseISO(requestToEdit?.deadline) : '',

    checkboxForbid: requestToEdit?.checkboxForbid || false,
    checkboxNoCheck: requestToEdit?.checkboxNoCheck || false,
  }

  const sourceNicheFormFields = {
    monthlySales: requestToEdit?.monthlySales || '',
    budget: requestToEdit?.budget || '',

    countOfProposals: requestToEdit?.countOfProposals || '',
    size: requestToEdit?.size || '',
    searchVolume: requestToEdit?.searchVolume || '',

    minAmazonPrice: requestToEdit?.minAmazonPrice || '',
    maxAmazonPrice: requestToEdit?.maxAmazonPrice || '',
    minBSR: requestToEdit?.minBSR || '',
    maxBSR: requestToEdit?.maxBSR || '',
    minReviews: requestToEdit?.minReviews || '',
    maxReviews: requestToEdit?.maxReviews || '',
    minRevenue: requestToEdit?.minRevenue || '',
    maxRevenue: requestToEdit?.maxRevenue || '',

    clientComment: requestToEdit?.clientComment || '',
    deadline: requestToEdit.deadline ? parseISO(requestToEdit?.deadline) : '',

    checkboxForbid: requestToEdit?.checkboxForbid || false,
    checkboxNoCheck: requestToEdit?.checkboxNoCheck || false,
  }

  const sourceFormFields = itIsRequestOfNiche ? sourceNicheFormFields : sourceProductFormFields

  const [formFields, setFormFields] = useState(sourceFormFields)

  const onChangeField = fieldName => event => {
    const newFormFields = {...formFields}

    if (numberFields.includes(fieldName) && !checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(event.target.value)) {
      return
    } else if (['checkboxForbid', 'checkboxNoPay', 'checkboxNoCheck'].includes(fieldName)) {
      newFormFields[fieldName] = event.target.checked
    } else if (['minAmazonPrice', 'maxAmazonPrice', 'minRevenue', 'maxRevenue'].includes(fieldName)) {
      newFormFields[fieldName] = event.target.value || ''
    } else if (['minBSR', 'maxBSR', 'minReviews', 'maxReviews'].includes(fieldName)) {
      newFormFields[fieldName] = parseInt(event.target.value) || ''
    } else if (['deadline'].includes(fieldName)) {
      newFormFields[fieldName] = event
    } else {
      newFormFields[fieldName] = event.target.value
    }

    setFormFields(newFormFields)
  }

  const isOneStartsIsBiggerEnd =
    formFields.minAmazonPrice > formFields.maxAmazonPrice ||
    formFields.minBSR > formFields.maxBSR ||
    formFields.minReviews > formFields.maxReviews ||
    formFields.minRevenue > formFields.maxRevenue

  const isOneOfFieldIsEmpty =
    (formFields.strategy === '' && !itIsRequestOfNiche) ||
    formFields.strategy === '0' ||
    formFields.monthlySales === '' ||
    formFields.budget === '' ||
    formFields.countOfProposals === '' ||
    formFields.size === '' ||
    formFields.size === 'None' ||
    formFields.searchVolume === '' ||
    formFields.minAmazonPrice === '' ||
    formFields.maxAmazonPrice === '' ||
    formFields.minBSR === '' ||
    formFields.maxBSR === '' ||
    formFields.minReviews === '' ||
    formFields.maxReviews === '' ||
    formFields.minRevenue === '' ||
    formFields.maxRevenue === '' ||
    formFields.deadline === ''

  const isDeadlineError = formFields.deadline < new Date()

  const disableSubmitBtn =
    JSON.stringify(sourceFormFields) === JSON.stringify(formFields) ||
    isOneOfFieldIsEmpty ||
    isOneStartsIsBiggerEnd ||
    isDeadlineError

  return (
    <div className={classNames.root}>
      {inChoosingRequestType ? (
        <div className={classNames.chooseRequestTypeBtnsWrapper}>
          <Button
            disableElevation
            color="primary"
            variant="contained"
            onClick={() => {
              setItIsRequestOfNiche(false)
              setInChoosingRequestType(false)
            }}
          >
            {textConsts.requestProductBtn}
          </Button>

          <Button
            disableElevation
            color="primary"
            variant="contained"
            onClick={() => {
              setItIsRequestOfNiche(true)
              setInChoosingRequestType(false)
            }}
          >
            {textConsts.requestNicheBtn}
          </Button>
        </div>
      ) : (
        <div className={classNames.form}>
          <Typography variant="h3" className={classNames.title}>
            {itIsRequestOfNiche ? textConsts.nicheTitle : textConsts.productTitle}
          </Typography>

          {!itIsRequestOfNiche && (
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
          )}

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
            label={textConsts.countOfProposals}
            value={formFields.countOfProposals}
            onChange={onChangeField('countOfProposals')}
          />

          <Field
            disabled
            containerClasses={classNames.field}
            label={textConsts.countOfOneProposals}
            value={formFields.budget / formFields.countOfProposals || 0}
          />

          <Field
            containerClasses={classNames.field}
            label={textConsts.size}
            inputComponent={
              <NativeSelect
                variant="filled"
                value={formFields.size}
                input={<Input fullWidth />}
                onChange={onChangeField('size')}
              >
                {Object.values(productSizeStatus).map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </NativeSelect>
            }
          />

          <Field
            containerClasses={classNames.field}
            label={textConsts.searchVolume}
            value={formFields.searchVolume}
            onChange={onChangeField('searchVolume')}
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
            className={classNames.noteField}
            label={textConsts.formNotesLabel}
            value={formFields.clientComment}
            onChange={onChangeField('clientComment')}
          />

          <Field
            containerClasses={classNames.field}
            label={textConsts.formDeadlineLabel}
            inputComponent={
              <div className={clsx({[classNames.deadlineError]: isDeadlineError})}>
                <DatePicker value={formFields.deadline} onChange={onChangeField('deadline')} />
                {isDeadlineError && <p className={classNames.deadlineErrorText}>{textConsts.formDeadlineErrorText}</p>}
              </div>
            }
          />

          <div className={classNames.checkboxWrapper}>
            <Checkbox
              color="primary"
              checked={formFields.checkboxForbid} /* onChange={onChangeField('checkboxForbid')} */
            />
            <Typography>
              {itIsRequestOfNiche
                ? textConsts.formCheckboxNoPurchasedNiches
                : textConsts.formCheckboxNoPurchasedProducts}
            </Typography>
          </div>

          {!itIsRequestOfNiche && (
            <div className={classNames.checkboxWrapper}>
              <Checkbox
                color="primary"
                checked={formFields.checkboxForbid}
                onChange={onChangeField('checkboxForbid')}
              />
              <Typography>{textConsts.formCheckboxForbidLabel}</Typography>
            </div>
          )}

          {!itIsRequestOfNiche && (
            <div className={classNames.checkboxWrapper}>
              <Checkbox
                color="primary"
                checked={formFields.checkboxForbid} /* onChange={onChangeField('checkboxForbid')} */
              />
              <Typography>{textConsts.formCheckboxFindSupplier}</Typography>
            </div>
          )}

          {!itIsRequestOfNiche && (
            <div className={classNames.checkboxWrapper}>
              <Checkbox
                color="primary"
                checked={formFields.checkboxNoCheck}
                onChange={onChangeField('checkboxNoCheck')}
              />
              <Typography>{textConsts.formCheckboxNoCheckLabel}</Typography>
            </div>
          )}
        </div>
      )}

      <Button
        disableElevation
        disabled={disableSubmitBtn}
        color="primary"
        variant="contained"
        onClick={() => onSubmit(formFields, requestToEdit._id)}
      >
        {isEdit ? textConsts.editBtn : textConsts.createBtn}
      </Button>

      <Button
        disableElevation
        className={classNames.button}
        color="primary"
        variant="contained"
        onClick={() => setOpenModal()}
      >
        {textConsts.cancelBtn}
      </Button>
    </div>
  )
}
