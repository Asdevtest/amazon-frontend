import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const sizesType = {
  INCHES: 'INCHES',
  CM: 'CM',
}

export const unitsOfChangeOptions = {
  EU: 'EU',
  US: 'US',
}

export const inchesCoefficient = 2.54

export const poundsCoefficient = /* 2.046223 */ 2.20462

export const poundsWeightCoefficient = 0.4535923745

export const volumePoundsWeightCoefficient = 166

export const RIGHT_BLOCK_WIDTH = 100

export const getConversion = (unitsOptions, coefficient, divider = 1) =>
  unitsOptions === unitsOfChangeOptions.US ? coefficient : divider

export const getWeightSizesType = sizeSetting =>
  sizeSetting === unitsOfChangeOptions.US ? t(TranslationKey.lb) : t(TranslationKey.kg)

export const getDimensionsSizesType = sizeSetting =>
  sizeSetting === unitsOfChangeOptions.EU ? t(TranslationKey.cm) : t(TranslationKey.inches)
