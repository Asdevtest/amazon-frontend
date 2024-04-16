import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { UserModel } from '@models/user-model'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { Dimensions } from '@typings/enums/dimensions'
import { IPlatformSettings } from '@typings/shared/patform-settings'

const INCHES_COEFFICIENT = 2.54 // 1 inch = 2.54 cm
const POUNDS_COEFFICIENT = 0.4536 // 1 lb = 0.4536 kg
const DEFAULT_VOLUME_WEIGHT_COEFFICIENT = 6000 // if don't get value from UserModel

const getConversion = (dimension: Dimensions, value: number, coefficient: number) => {
  const result = dimension === Dimensions.EU ? value : value / coefficient

  return toFixed(result)
}
const getDimensionsSize = (dimension: Dimensions) =>
  dimension === Dimensions.EU ? t(TranslationKey.cm) : t(TranslationKey.inches)
const getUnitsSize = (dimension: Dimensions) =>
  dimension === Dimensions.EU ? t(TranslationKey.kg) : t(TranslationKey.lb)

interface IDimensions {
  lengthCmWarehouse?: number
  widthCmWarehouse?: number
  heightCmWarehouse?: number
  weighGrossKgWarehouse?: number
  height?: number
  width?: number
  length?: number
  weight?: number
}

export const useDimensions = (fields: IDimensions, dimension: Dimensions = Dimensions.EU) => {
  const [dimensions, setDimensions] = useState({
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    volumeWeight: 0,
    finalWeight: 0,
    dimensionsSize: getDimensionsSize(dimension),
    unitsSize: getUnitsSize(dimension),
  })

  useEffect(() => {
    const volumeWeightCoefficient =
      (UserModel.platformSettings as unknown as IPlatformSettings)?.volumeWeightCoefficient ||
      DEFAULT_VOLUME_WEIGHT_COEFFICIENT

    const convertedLength = getConversion(dimension, fields.lengthCmWarehouse || fields.length || 0, INCHES_COEFFICIENT)
    const convertedWidth = getConversion(dimension, fields.widthCmWarehouse || fields.width || 0, INCHES_COEFFICIENT)
    const convertedHeight = getConversion(dimension, fields.heightCmWarehouse || fields.height || 0, INCHES_COEFFICIENT)
    const convertedWeight = getConversion(
      dimension,
      fields.weighGrossKgWarehouse || fields.weight || 0,
      POUNDS_COEFFICIENT,
    )
    const convertedVolumeWeight = getConversion(
      dimension,
      ((fields.lengthCmWarehouse || fields.length || 0) *
        (fields.widthCmWarehouse || fields.width || 0) *
        (fields.heightCmWarehouse || fields.height || 0)) /
        volumeWeightCoefficient,
      POUNDS_COEFFICIENT,
    )

    setDimensions(prevState => ({
      ...prevState,
      length: convertedLength,
      width: convertedWidth,
      height: convertedHeight,
      weight: convertedWeight,
      volumeWeight: convertedVolumeWeight,
      finalWeight: toFixed(Math.max(convertedWeight, convertedVolumeWeight)),
      dimensionsSize: getDimensionsSize(dimension),
      unitsSize: getUnitsSize(dimension),
    }))
  }, [fields, dimension])

  return dimensions
}
