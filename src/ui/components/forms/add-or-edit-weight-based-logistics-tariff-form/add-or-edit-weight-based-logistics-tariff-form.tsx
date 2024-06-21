/* eslint-disable no-prototype-builtins */
import { observer } from 'mobx-react'
import { ChangeEvent, FC, memo, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Typography } from '@mui/material'

import { currencyTypes, currencyTypesToHumanFriendlyValue } from '@constants/keys/currency'
import { tariffTypes } from '@constants/keys/tariff-types'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { DatePicker } from '@components/shared/date-picker'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { ClsIcon, EtaIcon, EtdIcon } from '@components/shared/svg-icons'
import { Text } from '@components/shared/text'

import { checkDateByDeadline, checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'
import { IDestination, IDestinationVariation } from '@typings/shared/destinations'
import { ILogicTariff } from '@typings/shared/logic-tariff'

import { useStyles } from './add-or-edit-weight-based-logistics-tariff-form.style'

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
  destinationVariations: Array<IDestinationVariation>
}

interface DestinationVariationsContentProps {
  destinationVariations: Array<IDestinationVariation>
  destinationData: Array<IDestination>
  currentCurrency: string
  destinationsFavourites: Array<Array<string>>
  setDestinationsFavouritesItem: () => void
  onChangeDestinationVariations: (fieldName: string) => (index: number) => (value: string | number) => void
  onClickAddDestinationVariation: (index: number) => void
  onClickRemoveDestinationVariation: (index: number) => void
  onApplyMinBoxWeightToAll: (index: number) => void
}

interface AddOrEditWeightBasedLogisticsTariffFormProps {
  tariffToEdit: ILogicTariff
  sourceYuanToDollarRate: number
  logisticsTariffsData: Array<ILogicTariff>
  destinationData: Array<IDestination>
  destinationsFavourites: Array<Array<string>>
  setDestinationsFavouritesItem: () => void
  onCreateSubmit: (formFields: FormFields) => void
  onEditSubmit: (id: string, formFields: FormFields) => void
  onClickClose: () => void
}

export const AddOrEditWeightBasedLogisticsTariffForm: FC<AddOrEditWeightBasedLogisticsTariffFormProps> = observer(
  props => {
    const { classes: styles, cx } = useStyles()

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
      minBoxWeight: '',
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
        pricePerKgUsd: variation.pricePerKgUsd,
        pricePerKgRmb: variation.pricePerKgRmb,
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
        (variant: IDestinationVariation) =>
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

    const [selectedLogisticTariff, setSelectedLogisticTariff] = useState<ILogicTariff | undefined>(undefined)

    const onSetDataFromTariff = (tariff: ILogicTariff) => {
      setSelectedLogisticTariff(tariff)
      // @ts-ignore
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
          minBoxWeight: item?.minBoxWeight,
        })),
        deliveryTimeInDay: tariff.deliveryTimeInDay,
      }))
    }

    const [currentCurrency, setCurrentCurrency] = useState(currencyTypes.DOLLAR)

    const onChangeField = (fieldName: string) => (value: string | number | Array<IDestinationVariation>) => {
      const newFormFields = { ...formFields }
      if (fieldName === 'yuanToDollarRate') {
        // @ts-ignore
        newFormFields[fieldName] = value
        newFormFields.destinationVariations = newFormFields.destinationVariations.map(variant => ({
          ...variant,
          // pricePerKgUsd: '',
          pricePerKgRmb: Number(variant.pricePerKgUsd) * Number(value),
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
          updatedDestinationVariation[fieldName] = value as number
          updatedDestinationVariation.pricePerKgRmb = Number(value) * Number(formFields.yuanToDollarRate)
          newDestinationVariations[index] = updatedDestinationVariation
        } else if (fieldName === 'pricePerKgRmb') {
          const updatedDestinationVariation = { ...newDestinationVariations[index] }
          updatedDestinationVariation[fieldName] = value as number
          updatedDestinationVariation.pricePerKgUsd = Number(value) / Number(formFields.yuanToDollarRate)
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

    const calcWeightRangeValid = (destinationVariations: Array<IDestinationVariation>) => {
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
            (a: IDestinationVariation, b: IDestinationVariation) => a.minWeight - b.minWeight,
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

    const onApplyMinBoxWeightToAll = (variantIndex: number) => {
      setFormFields(prevState => {
        const { minBoxWeight } = prevState.destinationVariations[variantIndex]

        const newDestinationVariations = prevState.destinationVariations.map(variant => ({
          ...variant,
          minBoxWeight,
        }))

        return {
          ...prevState,
          destinationVariations: newDestinationVariations,
        }
      })
    }

    return (
      <div className={styles.root}>
        <Typography className={styles.modalTitle}>{t(TranslationKey['Adding tariff'])}</Typography>

        <div className={styles.nameWrapper}>
          <Field
            label={t(TranslationKey.Title) + '*'}
            // @ts-ignore
            placeholder={t(TranslationKey['Service name'])}
            value={formFields.name}
            // @ts-ignore
            inputProps={{ maxLength: 50 }}
            inputClasses={styles.fieldInput}
            labelClasses={styles.fieldLabel}
            containerClasses={styles.fieldContainer}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeField('name')(e.target.value)}
          />

          <Field
            inputClasses={[styles.fieldInput, styles.deliveryFieldInput]}
            labelClasses={styles.fieldLabel}
            // @ts-ignore
            inputProps={{ maxLength: 10 }}
            containerClasses={styles.fieldContainer}
            value={formFields.deliveryTimeInDay}
            placeholder={t(TranslationKey['Amount of days'])}
            label={t(TranslationKey['Delivery time, days']) + '*'}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (regex.test(e.target.value) || e.target.value === '') {
                onChangeField('deliveryTimeInDay')(e.target.value)
              }
            }}
          />

          <Field
            label={t(TranslationKey['Add data from tariff'])}
            inputClasses={[styles.fieldInput, styles.tariffFieldInput]}
            labelClasses={styles.fieldLabel}
            containerClasses={styles.fieldContainer}
            inputComponent={
              /* @ts-ignore */
              <WithSearchSelect
                // @ts-ignore
                grayBorder
                blackSelectedItem
                darkIcon
                chosenItemNoHover
                data={logisticsTariffsData}
                width={'245px'}
                searchFields={['name']}
                fieldNamesWrapperStyles={styles.fieldNamesWrapperStyles}
                buttonStyles={styles.buttonStyles}
                fieldNameStyles={styles.fieldNameStyles}
                customItemsWrapper={styles.customItemsWrapper}
                customSubMainWrapper={styles.customSubMainWrapper}
                customSearchInput={styles.customSearchInput}
                selectedItemName={
                  (!!selectedLogisticTariff && selectedLogisticTariff.name) || t(TranslationKey['Select Tariff'])
                }
                onClickSelect={(el: ILogicTariff) => onSetDataFromTariff(el)}
              />
            }
          />
        </div>

        <div className={styles.rateWrapper}>
          <div className={styles.customSwitcherWrapper}>
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
              changeConditionHandler={setCurrentCurrency}
            />
          </div>

          <div className={styles.rateContainer}>
            <div className={styles.currentRateWrapper}>
              <Typography className={styles.currentRate}>{t(TranslationKey['Current exchange rate'])}</Typography>
              <Typography className={styles.currentRateText}>{sourceYuanToDollarRate}</Typography>
            </div>

            <Field
              error={Number(formFields.yuanToDollarRate) !== Number(sourceYuanToDollarRate)}
              inputClasses={styles.rateFieldInput}
              labelClasses={styles.currentRate}
              containerClasses={styles.rateFieldContainer}
              inputProps={{ maxLength: 6 }}
              value={formFields.yuanToDollarRate}
              label={t(TranslationKey['Yuan to USD exchange rate'])}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
                  onChangeField('yuanToDollarRate')(e.target.value)
                }
              }}
            />
          </div>
        </div>

        <div>
          <DestinationVariationsContent
            destinationVariations={formFields.destinationVariations}
            destinationData={destinationData}
            destinationsFavourites={destinationsFavourites}
            setDestinationsFavouritesItem={setDestinationsFavouritesItem}
            currentCurrency={currentCurrency}
            onClickAddDestinationVariation={onClickAddDestinationVariation}
            onClickRemoveDestinationVariation={onClickRemoveDestinationVariation}
            onChangeDestinationVariations={onChangeDestinationVariations}
            onApplyMinBoxWeightToAll={onApplyMinBoxWeightToAll}
          />

          {formFields.destinationVariations.length > 1 && !isWeightRangeValid && (
            <p className={styles.deadlineErrorText}>
              {t(TranslationKey['The intersections of the weights are found'])}
            </p>
          )}
        </div>

        <div className={styles.shippingDateWrapper}>
          <Typography className={styles.modalTitle}>{t(TranslationKey['Shipping dates'])}</Typography>

          <div className={styles.dateBlockWrapper}>
            <Field
              label={t(TranslationKey['CLS (batch closing date)'])}
              labelClasses={styles.fieldLabel}
              containerClasses={styles.blockItemContainer}
              inputComponent={
                <div
                  className={cx({
                    [styles.deadlineError]: checkDateByDeadline(formFields.cls),
                  })}
                >
                  <DatePicker
                    disablePast
                    slotProps={{
                      textField: {
                        InputProps: { startAdornment: <ClsIcon className={styles.datePickerIcon} /> },
                      },
                    }}
                    value={formFields.cls}
                    onChange={onChangeField('cls')}
                  />
                  {!!formFields.cls && checkDateByDeadline(formFields.cls) && (
                    <p className={styles.deadlineErrorText}>
                      {t(TranslationKey['Deadline date cannot be earlier than the current date'])}
                    </p>
                  )}
                </div>
              }
            />

            <Field
              label={t(TranslationKey['ETD (date of shipment)'])}
              labelClasses={styles.fieldLabel}
              containerClasses={styles.blockItemContainer}
              inputComponent={
                <div
                  className={cx({
                    [styles.deadlineError]: checkDateByDeadline(formFields.etd),
                  })}
                >
                  <DatePicker
                    disablePast
                    value={formFields.etd}
                    slotProps={{
                      textField: {
                        InputProps: { startAdornment: <EtdIcon className={styles.datePickerIcon} /> },
                      },
                    }}
                    onChange={onChangeField('etd')}
                  />

                  {!!formFields.etd && checkDateByDeadline(formFields.etd) && (
                    <p className={styles.deadlineErrorText}>
                      {t(TranslationKey['Deadline date cannot be earlier than the current date'])}
                    </p>
                  )}
                </div>
              }
            />

            <Field
              label={t(TranslationKey['ETA (arrival date)'])}
              labelClasses={styles.fieldLabel}
              containerClasses={styles.blockItemContainer}
              inputComponent={
                <div
                  className={cx({
                    [styles.deadlineError]: checkDateByDeadline(formFields.eta),
                  })}
                >
                  <DatePicker
                    disablePast
                    value={formFields.eta}
                    slotProps={{
                      textField: {
                        InputProps: { startAdornment: <EtaIcon className={styles.datePickerIcon} /> },
                      },
                    }}
                    onChange={onChangeField('eta')}
                  />
                  {!!formFields.eta && checkDateByDeadline(formFields.eta) && (
                    <p className={styles.deadlineErrorText}>
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
          labelClasses={styles.fieldLabel}
          classes={{ root: styles.inputClass }}
          // @ts-ignore
          inputProps={{ maxLength: 255, padding: '10px' }}
          className={styles.descriptionField}
          tooltipInfoContent={t(TranslationKey['Additional information about the rate'])}
          placeholder={t(TranslationKey['Service description'])}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeField('description')(e.target.value)}
        />

        <div className={styles.btnsWrapper}>
          <Button
            styleType={ButtonStyle.SUCCESS}
            disabled={disableSubmitBtn}
            className={styles.button}
            onClick={() => onSubmit()}
          >
            {t(TranslationKey.Save)}
          </Button>

          <Button
            variant={ButtonVariant.OUTLINED}
            className={cx(styles.button, styles.cancelBtn)}
            onClick={() => onClickClose()}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    )
  },
)

const DestinationVariationsContent: FC<DestinationVariationsContentProps> = memo(
  ({
    destinationVariations,
    destinationData,
    currentCurrency,
    destinationsFavourites,
    setDestinationsFavouritesItem,
    onChangeDestinationVariations,
    onClickAddDestinationVariation,
    onClickRemoveDestinationVariation,
    onApplyMinBoxWeightToAll,
  }) => {
    const { classes: styles, cx } = useStyles()

    return (
      <>
        {destinationVariations?.map((variant: IDestinationVariation, variantIndex: number) => (
          <div key={variantIndex} className={styles.optionsWrapper}>
            <Field
              label={t(TranslationKey.Destination)}
              inputClasses={styles.fieldInput}
              labelClasses={styles.fieldLabel}
              containerClasses={styles.destinationContainer}
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
                  fieldNamesWrapperStyles={styles.fieldNamesWrapperStyles}
                  buttonStyles={styles.buttonStyles}
                  fieldNameStyles={styles.fieldNameStyles}
                  customItemsWrapper={styles.customItemsWrapper}
                  customSubMainWrapper={styles.destinationWrapper}
                  customSearchInput={styles.destinationSearchInput}
                  selectedItemName={
                    variant.destination?._id
                      ? destinationData?.find(obj => obj?._id === variant?.destination?._id)?.name
                      : t(TranslationKey.Select)
                  }
                  onClickSetDestinationFavourite={setDestinationsFavouritesItem}
                  onClickSelect={(el: IDestination) => {
                    onChangeDestinationVariations('destinationId')(variantIndex)(el._id)
                  }}
                />
              }
            />

            <Field
              label={t(TranslationKey['Weight, kg'])}
              labelClasses={styles.fieldLabel}
              containerClasses={styles.weightContainer}
              inputComponent={
                <div className={styles.weightMainWrapper}>
                  <div className={styles.weightItemWrapper}>
                    <Typography className={styles.weightText}>{t(TranslationKey.From)}</Typography>
                    <Input
                      placeholder={'0.00'}
                      value={toFixed(variant.minWeight, 2) || ''}
                      inputProps={{ maxLength: 7 }}
                      className={cx(styles.weightInput, {
                        [styles.error]: !!variant.minWeight && Number(variant.minWeight) < 1,
                      })}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
                          onChangeDestinationVariations('minWeight')(variantIndex)(e.target.value)
                        }
                      }}
                    />
                  </div>

                  <div className={styles.weightItemWrapper}>
                    <Typography className={styles.weightText}>{t(TranslationKey.To)}</Typography>
                    <Input
                      placeholder={'0.00'}
                      value={toFixed(variant.maxWeight, 2) || ''}
                      inputProps={{ maxLength: 7 }}
                      className={cx(styles.weightInput, {
                        [styles.error]:
                          !!variant.minWeight &&
                          !!variant.maxWeight &&
                          Number(variant.maxWeight) <= Number(variant.minWeight),
                      })}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const input = e.target.value

                        if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(input)) {
                          onChangeDestinationVariations('maxWeight')(variantIndex)(input)
                        }
                      }}
                    />
                  </div>
                </div>
              }
            />

            <Field
              label={t(TranslationKey['Minimum recommended box weight, kg'])}
              labelClasses={[styles.fieldLabel, styles.minBoxWeightFieldLabel]}
              containerClasses={styles.minBoxWeightContainer}
              inputComponent={
                <>
                  <div className={styles.minBoxWeightWrapper}>
                    <Input
                      placeholder={'0.00'}
                      value={toFixed(variant.minBoxWeight, 2) || ''}
                      inputProps={{ maxLength: 7 }}
                      className={styles.fieldInput}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const input = e.target.value

                        if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(input)) {
                          onChangeDestinationVariations('minBoxWeight')(variantIndex)(input)
                        }
                      }}
                    />
                  </div>

                  <div className={styles.minBoxWeightContainerBtn}>
                    <Text
                      tooltipInfoContent={t(
                        TranslationKey['Apply the value "min recommended box weight" to all variations in the tariff'],
                      )}
                      containerClasses={styles.applyToAll}
                    >
                      {t(TranslationKey['Apply to all'])}
                    </Text>

                    <Button className={styles.applyButton} onClick={() => onApplyMinBoxWeightToAll(variantIndex)}>
                      {t(TranslationKey.Apply)}
                    </Button>
                  </div>
                </>
              }
            />

            <Field
              label={t(TranslationKey['Price per kg'])}
              labelClasses={styles.fieldLabel}
              containerClasses={styles.regionContainer}
              inputComponent={
                <div className={styles.regionMainWrapper}>
                  <div className={styles.regionWrapper}>
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
                      className={styles.fieldInput}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const input = e.target.value

                        if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(input) && Number(input) < 100000) {
                          // e.target.value = toFixed(e.target.value, 2)
                          onChangeDestinationVariations(
                            currentCurrency === currencyTypes.DOLLAR ? 'pricePerKgUsd' : 'pricePerKgRmb',
                          )(variantIndex)(input)
                        }
                      }}
                    />
                    <Typography className={styles.currencyStyle}>
                      {currencyTypesToHumanFriendlyValue(currentCurrency)}
                    </Typography>
                  </div>
                </div>
              }
            />

            <div className={styles.controlOptionsButtons}>
              {destinationVariations.length > 1 && (
                <Button className={styles.plusButton} onClick={() => onClickRemoveDestinationVariation(variantIndex)}>
                  <RemoveIcon className={styles.plusIcon} />
                </Button>
              )}

              <Button className={styles.plusButton} onClick={() => onClickAddDestinationVariation(variantIndex)}>
                <AddIcon className={styles.plusIcon} />
              </Button>
            </div>
          </div>
        ))}
      </>
    )
  },
)
