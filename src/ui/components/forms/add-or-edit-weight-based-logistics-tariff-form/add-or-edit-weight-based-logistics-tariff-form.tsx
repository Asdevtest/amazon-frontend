/* eslint-disable no-prototype-builtins */

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { FC, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Typography } from '@mui/material'

import { currencyTypes, currencyTypesToHumanFriendlyValue } from '@constants/keys/currency'
import { tariffTypes } from '@constants/keys/tariff-types'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { NewDatePicker } from '@components/shared/date-picker/date-picker'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { checkDateByDeadline, checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './add-or-edit-weight-based-logistics-tariff-form.style'

import { DestinationType, DestinationVariationType } from '../../../../typings/destination'
import { LogisticTariffInterface } from '../../../../typings/logistics-tariff'

interface FormFields {
  tariffType: number
  name: string
  description: string
  deliveryTimeInDay: string
  cls: string | undefined
  etd: string | undefined
  eta: string | undefined
  minWeightInKg: number
  archive: boolean
  yuanToDollarRate: number
  destinationVariations: Array<DestinationVariationType>
}

interface DestinationVariationsContentProps {
  destinationVariations: Array<DestinationVariationType>
  destinationData: Array<DestinationType>
  currentCurrency: string
  destinationsFavourites: Array<Array<string>>
  setDestinationsFavouritesItem: () => void
  onChangeDestinationVariations: (fieldName: string) => (index: number) => (value: string | number) => void
  onClickAddDestinationVariation: (index: number) => void
  onClickRemoveDestinationVariation: (index: number) => void
}

interface AddOrEditWeightBasedLogisticsTariffFormProps {
  tariffToEdit: LogisticTariffInterface
  sourceYuanToDollarRate: number
  logisticsTariffsData: Array<LogisticTariffInterface>
  destinationData: Array<DestinationType>
  destinationsFavourites: Array<Array<string>>
  setDestinationsFavouritesItem: () => void
  onCreateSubmit: (formFields: FormFields) => void
  onEditSubmit: (id: string, formFields: FormFields) => void
  onClickClose: () => void
}

export const AddOrEditWeightBasedLogisticsTariffForm: FC<AddOrEditWeightBasedLogisticsTariffFormProps> = observer(
  props => {
    const { classes: classNames } = useClassNames()

    const {
      tariffToEdit,
      sourceYuanToDollarRate,
      logisticsTariffsData,
      destinationData,
      destinationsFavourites,
      setDestinationsFavouritesItem,
      onCreateSubmit,
      onEditSubmit,
      onClickClose,
    } = props

    const regex = /^[-0-9]+$/

    const emptyDestinationVariation = {
      destination: {
        _id: '',
        name: '',
      },
      minWeight: '',
      maxWeight: '',
      pricePerKgRmb: '',
      pricePerKgUsd: '',
    }

    const initialState = {
      tariffType: tariffToEdit?.tariffType || tariffTypes.WEIGHT_BASED_LOGISTICS_TARIFF,
      name: tariffToEdit?.name || '',
      description: tariffToEdit?.description || '',
      deliveryTimeInDay: tariffToEdit?.deliveryTimeInDay || '',
      cls: tariffToEdit?.cls || undefined,
      etd: tariffToEdit?.etd || undefined,
      eta: tariffToEdit?.eta || undefined,
      minWeightInKg: tariffToEdit?.minWeightInKg || 0,
      archive: tariffToEdit?.archive || false,
      yuanToDollarRate: tariffToEdit?.conditionsByRegion.yuanToDollarRate || sourceYuanToDollarRate || 6.5,
      destinationVariations: tariffToEdit?.destinationVariations?.map(variation => ({
        ...variation,
        pricePerKgUsd: toFixed(variation.pricePerKgUsd, 2),
        pricePerKgRmb: toFixed(variation.pricePerKgRmb, 2),
      })) || [emptyDestinationVariation],
    }

    const [formFields, setFormFields] = useState<FormFields>(initialState)

    const [isWeightRangeValid, setIsWeightRangeValid] = useState(true)

    const disableSubmitBtn =
      !formFields.name ||
      !formFields.deliveryTimeInDay ||
      !formFields.yuanToDollarRate ||
      !formFields.cls ||
      !formFields.etd ||
      !formFields.eta ||
      formFields.destinationVariations.some(
        (variant: DestinationVariationType) =>
          !variant.destination._id ||
          !variant.pricePerKgRmb ||
          !variant.pricePerKgUsd ||
          !variant.minWeight ||
          !variant.maxWeight ||
          Number(variant.minWeight) === Number(variant.maxWeight) ||
          (variant.minWeight && Number(variant.minWeight) < 1) ||
          (variant.minWeight && variant.maxWeight && Number(variant.maxWeight) < Number(variant.minWeight)),
      ) ||
      !isWeightRangeValid

    const [selectedLogisticTariff, setSelectedLogisticTariff] = useState<LogisticTariffInterface | undefined>(undefined)

    const onSetDataFromTariff = (tariff: LogisticTariffInterface) => {
      setSelectedLogisticTariff(tariff)

      setFormFields(prevState => ({
        ...prevState,
        name: tariff.name,
        description: tariff.description,
        destinationVariations: tariff.destinationVariations.map(item => ({
          destination: item.destination,
          minWeight: item.minWeight,
          maxWeight: item.maxWeight,
          pricePerKgRmb: item.pricePerKgRmb,
          pricePerKgUsd: item.pricePerKgUsd,
        })),
        deliveryTimeInDay: tariff.deliveryTimeInDay,
      }))
    }

    const [currentCurrency, setCurrentCurrency] = useState(currencyTypes.DOLLAR)

    const onChangeField = (fieldName: string) => (value: string | number | Array<DestinationVariationType>) => {
      const newFormFields = { ...formFields }
      if (fieldName === 'yuanToDollarRate') {
        newFormFields[fieldName] = Number(value)
        newFormFields.destinationVariations = newFormFields.destinationVariations.map(variant => ({
          ...variant,
          // pricePerKgUsd: '',
          pricePerKgRmb: variant.pricePerKgUsd * Number(value),
        }))
      } else {
        // @ts-ignore
        newFormFields[fieldName] = value
      }

      setFormFields(newFormFields)
    }

    const onChangeDestinationVariations = (fieldName: string) => (index: number) => (value: string | number) => {
      setIsWeightRangeValid(true)
      setFormFields(prevState => {
        const newDestinationVariations = [...prevState.destinationVariations]

        if (fieldName === 'pricePerKgUsd') {
          const updatedDestinationVariation = { ...newDestinationVariations[index] }
          updatedDestinationVariation[fieldName] = toFixed(value, 2)
          updatedDestinationVariation.pricePerKgRmb = toFixed(value, 2) * Number(formFields.yuanToDollarRate)
          newDestinationVariations[index] = updatedDestinationVariation
        } else if (fieldName === 'pricePerKgRmb') {
          const updatedDestinationVariation = { ...newDestinationVariations[index] }
          updatedDestinationVariation[fieldName] = toFixed(value, 2)
          updatedDestinationVariation.pricePerKgUsd = toFixed(value, 2) / Number(formFields.yuanToDollarRate)
          newDestinationVariations[index] = updatedDestinationVariation
        } else if (fieldName === 'destinationId') {
          const updatedDestinationVariation = { ...newDestinationVariations[index] }
          updatedDestinationVariation.destination._id = String(value)
        } else {
          const updatedDestinationVariation = { ...newDestinationVariations[index] }
          // @ts-ignore
          updatedDestinationVariation[fieldName] = value
          newDestinationVariations[index] = updatedDestinationVariation
        }

        return {
          ...prevState,
          destinationVariations: newDestinationVariations,
        }
      })
    }

    const onClickAddDestinationVariation = (index: number) => {
      setIsWeightRangeValid(true)
      // @ts-ignore
      setFormFields(prevState => {
        const firstPart = prevState.destinationVariations.slice(0, index + 1)
        const secondPart = prevState.destinationVariations.slice(index + 1)
        const newDestinationVariation = emptyDestinationVariation
        const newDestinationVariations = [...firstPart, newDestinationVariation, ...secondPart]

        return {
          ...prevState,
          destinationVariations: newDestinationVariations,
        }
      })
    }

    const onClickRemoveDestinationVariation = (index: number) => {
      setIsWeightRangeValid(true)
      setFormFields(prevState => {
        const newDestinationVariations = [...prevState.destinationVariations]
        newDestinationVariations.splice(index, 1)

        return {
          ...prevState,
          destinationVariations: newDestinationVariations,
        }
      })
    }

    const onSubmit = () => {
      setIsWeightRangeValid(calcWeightRangeValid(formFields.destinationVariations))

      if (isWeightRangeValid) {
        if (tariffToEdit) {
          onEditSubmit(tariffToEdit._id, formFields)
        } else {
          onCreateSubmit(formFields)
        }
      }
    }

    const calcWeightRangeValid = (destinationVariations: Array<DestinationVariationType>) => {
      const currectArray = destinationVariations.map(variant => ({
        destinationId: variant.destination._id,
        minWeight: variant.minWeight,
        maxWeight: variant.maxWeight,
      }))

      const groupedByDestinationId = {}

      // Group objects by destinationId
      currectArray.forEach(variant => {
        const { destinationId, minWeight, maxWeight } = variant

        if (groupedByDestinationId.hasOwnProperty(destinationId)) {
          // @ts-ignore
          groupedByDestinationId[destinationId].push({ minWeight, maxWeight })
        } else {
          // @ts-ignore
          groupedByDestinationId[destinationId] = [{ minWeight, maxWeight }]
        }
      })

      for (const destinationId in groupedByDestinationId) {
        if (groupedByDestinationId.hasOwnProperty(destinationId)) {
          // @ts-ignore
          const group = groupedByDestinationId[destinationId]
          const sortedRanges = group.sort(
            (a: DestinationVariationType, b: DestinationVariationType) => a.minWeight - b.minWeight,
          )

          for (let i = 0; i < sortedRanges.length - 1; i++) {
            const currentRange = sortedRanges[i]
            const nextRange = sortedRanges[i + 1]

            if (currentRange.maxWeight >= nextRange.minWeight || nextRange.minWeight <= currentRange.maxWeight) {
              return false // Found intersecting or containing ranges
            }
          }
        }
      }

      return true // All weight ranges are valid
    }

    return (
      <div className={classNames.root}>
        <Typography className={classNames.modalTitle}>{t(TranslationKey['Adding tariff'])}</Typography>

        <div className={classNames.nameWrapper}>
          <div className={classNames.fieldsWrapper}>
            <Field
              label={t(TranslationKey.Title) + '*'}
              // @ts-ignore
              placeholder={t(TranslationKey['Service name'])}
              value={formFields.name}
              inputProps={{ maxLength: 50 }}
              inputClasses={classNames.fieldInput}
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.fieldContainer}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeField('name')(e.target.value)}
            />

            <Field
              inputClasses={classNames.fieldInput}
              labelClasses={classNames.fieldLabel}
              // @ts-ignore
              inputProps={{ maxLength: 10 }}
              containerClasses={classNames.fieldContainer}
              value={formFields.deliveryTimeInDay}
              placeholder={t(TranslationKey['Amount of days'])}
              label={t(TranslationKey['Delivery time, days']) + '*'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (regex.test(e.target.value) || e.target.value === '') {
                  onChangeField('deliveryTimeInDay')(e.target.value)
                }
              }}
            />
          </div>

          <div className={classNames.fieldsWrapper}>
            {/* <Field
              inputClasses={classNames.fieldInput}
              labelClasses={classNames.fieldLabel}
              // @ts-ignore
              inputProps={{ maxLength: 50 }}
              containerClasses={classNames.fieldContainer}
              value={formFields.deliveryTimeInDay}
              placeholder={t(TranslationKey['Amount of days'])}
              label={t(TranslationKey['Minimum weight']) + ', ' + t(TranslationKey.kg)}
              onChange={onChangeField('days')}
            /> */}

            <Field
              label={t(TranslationKey['Add data from tariff'])}
              inputClasses={classNames.fieldInput}
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.fieldContainer}
              inputComponent={
                /* @ts-ignore */
                <WithSearchSelect
                  // @ts-ignore
                  grayBorder
                  blackSelectedItem
                  darkIcon
                  chosenItemNoHover
                  data={logisticsTariffsData}
                  width={'100%'}
                  searchFields={['name']}
                  fieldNamesWrapperStyles={classNames.fieldNamesWrapperStyles}
                  buttonStyles={classNames.buttonStyles}
                  fieldNameStyles={classNames.fieldNameStyles}
                  customItemsWrapper={classNames.customItemsWrapper}
                  customSubMainWrapper={classNames.customSubMainWrapper}
                  customSearchInput={classNames.customSearchInput}
                  selectedItemName={
                    (!!selectedLogisticTariff && selectedLogisticTariff.name) || t(TranslationKey['Select Tariff'])
                  }
                  onClickSelect={(el: LogisticTariffInterface) => onSetDataFromTariff(el)}
                />
              }
            />
          </div>
        </div>

        <div>
          <div className={classNames.rateWrapper}>
            <Typography className={classNames.modalTitle}>{t(TranslationKey.Rates)}</Typography>

            <div className={classNames.customSwitcherWrapper}>
              <CustomSwitcher
                condition={currentCurrency}
                switcherSettings={[
                  {
                    label: () => currencyTypesToHumanFriendlyValue(currencyTypes.DOLLAR) || '',
                    value: currencyTypes.DOLLAR,
                  },
                  {
                    label: () => currencyTypesToHumanFriendlyValue(currencyTypes.YUAN) || '',
                    value: currencyTypes.YUAN,
                  },
                ]}
                changeConditionHandler={value => {
                  if (typeof value === 'string') {
                    setCurrentCurrency(value)
                  }
                }}
              />
            </div>

            <div className={classNames.currentRateWrapper}>
              <Typography className={classNames.currentRate}>{t(TranslationKey['Current exchange rate'])}</Typography>
              <Typography className={classNames.currentRateText}>{sourceYuanToDollarRate}</Typography>
            </div>

            <Field
              error={Number(formFields.yuanToDollarRate) !== Number(sourceYuanToDollarRate)}
              inputClasses={classNames.rateFieldInput}
              labelClasses={classNames.currentRate}
              containerClasses={classNames.rateFieldContainer}
              // @ts-ignore
              inputProps={{ maxLength: 6 }}
              value={formFields.yuanToDollarRate}
              label={t(TranslationKey['Yuan to USD exchange rate'])}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
                  onChangeField('yuanToDollarRate')(e.target.value)
                }
              }}
            />
          </div>

          <DestinationVariationsContent
            destinationVariations={formFields.destinationVariations}
            destinationData={destinationData}
            destinationsFavourites={destinationsFavourites}
            setDestinationsFavouritesItem={setDestinationsFavouritesItem}
            currentCurrency={currentCurrency}
            onClickAddDestinationVariation={onClickAddDestinationVariation}
            onClickRemoveDestinationVariation={onClickRemoveDestinationVariation}
            onChangeDestinationVariations={onChangeDestinationVariations}
          />

          {formFields.destinationVariations.length > 1 && !isWeightRangeValid && (
            <p className={classNames.deadlineErrorText}>
              {t(TranslationKey['The intersections of the weights are found'])}
            </p>
          )}
        </div>

        <div className={classNames.shippingDateWrapper}>
          <Typography className={classNames.modalTitle}>{t(TranslationKey['Shipping dates'])}</Typography>

          <div className={classNames.dateBlockWrapper}>
            <Field
              label={t(TranslationKey['CLS (batch closing date)'])}
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.blockItemContainer}
              inputComponent={
                <div
                  className={cx({
                    [classNames.deadlineError]: checkDateByDeadline(formFields.cls),
                  })}
                >
                  <NewDatePicker disablePast value={formFields.cls} onChange={onChangeField('cls')} />
                  {!!formFields.cls && checkDateByDeadline(formFields.cls) && (
                    <p className={classNames.deadlineErrorText}>
                      {t(TranslationKey['Deadline date cannot be earlier than the current date'])}
                    </p>
                  )}
                </div>
              }
            />

            <Field
              label={t(TranslationKey['ETD (date of shipment)'])}
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.blockItemContainer}
              inputComponent={
                <div
                  className={cx({
                    [classNames.deadlineError]: checkDateByDeadline(formFields.etd),
                  })}
                >
                  <NewDatePicker disablePast value={formFields.etd} onChange={onChangeField('etd')} />

                  {!!formFields.etd && checkDateByDeadline(formFields.etd) && (
                    <p className={classNames.deadlineErrorText}>
                      {t(TranslationKey['Deadline date cannot be earlier than the current date'])}
                    </p>
                  )}
                </div>
              }
            />

            <Field
              label={t(TranslationKey['ETA (arrival date)'])}
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.blockItemContainer}
              inputComponent={
                <div
                  className={cx({
                    [classNames.deadlineError]: checkDateByDeadline(formFields.eta),
                  })}
                >
                  <NewDatePicker disablePast value={formFields.eta} onChange={onChangeField('eta')} />
                  {!!formFields.eta && checkDateByDeadline(formFields.eta) && (
                    <p className={classNames.deadlineErrorText}>
                      {t(TranslationKey['Deadline date cannot be earlier than the current date'])}
                    </p>
                  )}
                </div>
              }
            />
          </div>
        </div>
        <Field
          // @ts-ignore
          multiline
          minRows={4}
          maxRows={4}
          value={formFields.description}
          label={t(TranslationKey.Description)}
          labelClasses={classNames.fieldLabel}
          classes={{ root: classNames.inputClass }}
          inputProps={{ maxLength: 320, padding: '10px' }}
          className={classNames.descriptionField}
          tooltipInfoContent={t(TranslationKey['Additional information about the rate'])}
          placeholder={t(TranslationKey['Service description'])}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeField('description')(e.target.value)}
        />

        <div className={classNames.btnsWrapper}>
          <Button success disabled={disableSubmitBtn} className={classNames.button} onClick={() => onSubmit()}>
            {t(TranslationKey.Save)}
          </Button>

          <Button className={cx(classNames.button, classNames.cancelBtn)} variant="text" onClick={() => onClickClose()}>
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    )
  },
)

const DestinationVariationsContent: FC<DestinationVariationsContentProps> = React.memo(
  ({
    destinationVariations,
    destinationData,
    currentCurrency,
    destinationsFavourites,
    setDestinationsFavouritesItem,
    onChangeDestinationVariations,
    onClickAddDestinationVariation,
    onClickRemoveDestinationVariation,
  }) => {
    const { classes: classNames } = useClassNames()

    return (
      <>
        {destinationVariations?.map((variant: DestinationVariationType, variantIndex: number) => (
          <div key={variantIndex} className={classNames.optionsWrapper}>
            <Field
              label={t(TranslationKey.Destination)}
              inputClasses={classNames.fieldInput}
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.destinationContainer}
              inputComponent={
                /* @ts-ignore */
                <WithSearchSelect
                  // @ts-ignore
                  grayBorder
                  blackSelectedItem
                  darkIcon
                  chosenItemNoHover
                  data={destinationData}
                  favourites={destinationsFavourites}
                  width={'100%'}
                  searchFields={['name']}
                  fieldNamesWrapperStyles={classNames.fieldNamesWrapperStyles}
                  buttonStyles={classNames.buttonStyles}
                  fieldNameStyles={classNames.fieldNameStyles}
                  customItemsWrapper={classNames.customItemsWrapper}
                  customSubMainWrapper={classNames.destinationWrapper}
                  customSearchInput={classNames.destinationSearchInput}
                  selectedItemName={
                    variant.destination?._id
                      ? destinationData?.find(obj => obj?._id === variant?.destination?._id)?.name
                      : t(TranslationKey.Select)
                  }
                  onClickSetDestinationFavourite={setDestinationsFavouritesItem}
                  onClickSelect={(el: DestinationType) => {
                    onChangeDestinationVariations('destinationId')(variantIndex)(el._id)
                  }}
                />
              }
            />

            <Field
              label={t(TranslationKey['Weight, kg'])}
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.weightContainer}
              inputComponent={
                <div className={classNames.weightMainWrapper}>
                  <div className={classNames.weightItemWrapper}>
                    <Typography className={classNames.weightText}>{t(TranslationKey.From)}</Typography>
                    <Input
                      placeholder={'0.00'}
                      value={toFixed(variant.minWeight, 2) || ''}
                      inputProps={{ maxLength: 7 }}
                      className={cx(classNames.weightInput, {
                        [classNames.error]: !!variant.minWeight && Number(variant.minWeight) < 1,
                      })}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
                          onChangeDestinationVariations('minWeight')(variantIndex)(e.target.value)
                        }
                      }}
                    />
                  </div>

                  <div className={classNames.weightItemWrapper}>
                    <Typography className={classNames.weightText}>{t(TranslationKey.To)}</Typography>
                    <Input
                      placeholder={'0.00'}
                      value={toFixed(variant.maxWeight, 2) || ''}
                      inputProps={{ maxLength: 7 }}
                      className={cx(classNames.weightInput, {
                        [classNames.error]:
                          !!variant.minWeight &&
                          !!variant.maxWeight &&
                          Number(variant.maxWeight) < Number(variant.minWeight),
                      })}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
                          onChangeDestinationVariations('maxWeight')(variantIndex)(e.target.value)
                        }
                      }}
                    />
                  </div>
                </div>
              }
            />

            <Field
              label={t(TranslationKey['Price per kg'])}
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.regionContainer}
              inputComponent={
                <div className={classNames.regionMainWrapper}>
                  <div className={classNames.regionWrapper}>
                    <Input
                      placeholder={'0.00'}
                      value={
                        currentCurrency === currencyTypes.DOLLAR
                          ? variant.pricePerKgUsd
                          : currentCurrency === currencyTypes.YUAN
                          ? variant.pricePerKgRmb
                          : ''
                      }
                      inputProps={{ maxLength: 7 }}
                      className={classNames.regionFieldInput}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const input = e.target.value

                        if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(input)) {
                          // e.target.value = toFixed(e.target.value, 2)
                          onChangeDestinationVariations(
                            currentCurrency === currencyTypes.DOLLAR ? 'pricePerKgUsd' : 'pricePerKgRmb',
                          )(variantIndex)(input)
                        }
                      }}
                    />
                    <Typography className={classNames.currencyStyle}>
                      {currencyTypesToHumanFriendlyValue(currentCurrency)}
                    </Typography>
                  </div>

                  <div className={classNames.controlOptionsButtons}>
                    {destinationVariations.length > 1 && (
                      <Button
                        className={classNames.plusButton}
                        onClick={() => onClickRemoveDestinationVariation(variantIndex)}
                      >
                        <RemoveIcon className={classNames.plusIcon} />
                      </Button>
                    )}

                    <Button
                      className={classNames.plusButton}
                      onClick={() => onClickAddDestinationVariation(variantIndex)}
                    >
                      <AddIcon className={classNames.plusIcon} />
                    </Button>
                  </div>
                </div>
              }
            />
          </div>
        ))}
      </>
    )
  },
)
