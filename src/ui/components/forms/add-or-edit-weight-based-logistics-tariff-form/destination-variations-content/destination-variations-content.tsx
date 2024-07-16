import { ChangeEvent, FC, memo } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

import { currencyTypes, currencyTypesToHumanFriendlyValue } from '@constants/keys/currency'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CustomButton } from '@components/shared/custom-button'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { Text } from '@components/shared/text'

import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IDestination, IDestinationVariation } from '@typings/shared/destinations'

import { useStyles } from '../add-or-edit-weight-based-logistics-tariff-form.style'

interface DestinationVariationsContentProps {
  destinationVariations: Array<IDestinationVariation>
  destinationData: Array<IDestination>
  rangeErrorDestinationId: string
  currentCurrency: string
  destinationsFavourites: Array<Array<string>>
  setDestinationsFavouritesItem: () => void
  onChangeDestinationVariations: (fieldName: string, index: number, value: string | number) => void
  onClickAddDestinationVariation: (index: number) => void
  onClickRemoveDestinationVariation: (index: number) => void
  onApplyMinBoxWeightToAll: (index: number) => void
}

export const DestinationVariationsContent: FC<DestinationVariationsContentProps> = memo(
  ({
    rangeErrorDestinationId,
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
                    onChangeDestinationVariations('destinationId', variantIndex, el._id)
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
                    <p className={styles.weightText}>{t(TranslationKey.From)}</p>
                    <Input
                      placeholder={'0.00'}
                      value={toFixed(variant.minWeight, 2) || ''}
                      inputProps={{ maxLength: 7 }}
                      className={cx(styles.weightInput, {
                        [styles.error]:
                          (!!variant.minWeight && Number(variant.minWeight) < 1) ||
                          rangeErrorDestinationId === variant.destination?._id,
                      })}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
                          onChangeDestinationVariations('minWeight', variantIndex, e.target.value)
                        }
                      }}
                    />
                  </div>

                  <div className={styles.weightItemWrapper}>
                    <p className={styles.weightText}>{t(TranslationKey.To)}</p>
                    <Input
                      placeholder={'0.00'}
                      value={toFixed(variant.maxWeight, 2) || ''}
                      inputProps={{ maxLength: 7 }}
                      className={cx(styles.weightInput, {
                        [styles.error]:
                          (!!variant.minWeight &&
                            !!variant.maxWeight &&
                            Number(variant.maxWeight) <= Number(variant.minWeight)) ||
                          rangeErrorDestinationId === variant.destination?._id,
                      })}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const input = e.target.value

                        if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(input)) {
                          onChangeDestinationVariations('maxWeight', variantIndex, input)
                        }
                      }}
                    />
                  </div>
                </div>
              }
            />

            <Field
              label={t(TranslationKey['Minimum recommended box weight, kg'])}
              labelClasses={cx(styles.fieldLabel, styles.minBoxWeightFieldLabel)}
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
                          onChangeDestinationVariations('minBoxWeight', variantIndex, input)
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

                    <Button onClick={() => onApplyMinBoxWeightToAll(variantIndex)}>{t(TranslationKey.Apply)}</Button>
                  </div>
                </>
              }
            />

            <Field
              label={t(TranslationKey['Price per kg'])}
              labelClasses={styles.fieldLabel}
              containerClasses={styles.regionContainer}
              inputComponent={
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
                          variantIndex,
                          input,
                        )
                      }
                    }}
                  />
                  <p className={styles.currencyStyle}>{currencyTypesToHumanFriendlyValue(currentCurrency)}</p>
                </div>
              }
            />

            <div className={styles.controlOptionsButtons}>
              {destinationVariations.length > 1 && (
                <CustomButton
                  type="primary"
                  shape="circle"
                  icon={<FaMinus />}
                  onClick={() => onClickRemoveDestinationVariation(variantIndex)}
                />
              )}

              <CustomButton
                type="primary"
                shape="circle"
                icon={<FaPlus />}
                onClick={() => onClickAddDestinationVariation(variantIndex)}
              />
            </div>
          </div>
        ))}
      </>
    )
  },
)
