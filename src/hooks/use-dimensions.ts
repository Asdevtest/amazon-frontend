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
const MIN_ALLOW_WEIGHT = 12

export enum Entities {
  WAREHOUSE = 'warehouse',
  SUPPLIER = 'supplier',
}

interface IDimensions {
  lengthCmWarehouse?: number
  widthCmWarehouse?: number
  heightCmWarehouse?: number
  weighGrossKgWarehouse?: number
  lengthCmSupplier?: number
  widthCmSupplier?: number
  heightCmSupplier?: number
  weighGrossKgSupplier?: number
  height?: number
  width?: number
  length?: number
  weight?: number
}

interface IUseDimension {
  data: IDimensions
  sizeSetting: Dimensions
  calculationField?: string
  defaultDimension?: Dimensions
}

export const useDimensions = ({
  data,
  sizeSetting = Dimensions.EU,
  calculationField,
  defaultDimension = Dimensions.EU,
}: IUseDimension) => {
  const [dimensions, setDimensions] = useState({
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    volumeWeight: 0,
    finalWeight: 0,
    totalWeight: 0,
    dimensionsSize: getDimensionsSize(sizeSetting),
    unitsSize: getUnitsSize(sizeSetting),
  })

  useEffect(() => {
    const volumeWeightCoefficient =
      (UserModel.platformSettings as unknown as IPlatformSettings)?.volumeWeightCoefficient ||
      DEFAULT_VOLUME_WEIGHT_COEFFICIENT

    let convertedLength: number,
      convertedWidth: number,
      convertedHeight: number,
      convertedWeight: number,
      convertedVolumeWeight: number

    switch (calculationField) {
      case Entities.WAREHOUSE:
        convertedLength = getConversion(sizeSetting, defaultDimension, data.lengthCmWarehouse || 0, INCHES_COEFFICIENT)
        convertedWidth = getConversion(sizeSetting, defaultDimension, data.widthCmWarehouse || 0, INCHES_COEFFICIENT)
        convertedHeight = getConversion(sizeSetting, defaultDimension, data.heightCmWarehouse || 0, INCHES_COEFFICIENT)
        convertedWeight = getConversion(
          sizeSetting,
          defaultDimension,
          data.weighGrossKgWarehouse || 0,
          POUNDS_COEFFICIENT,
        )
        convertedVolumeWeight = getConversion(
          sizeSetting,
          defaultDimension,
          ((data.lengthCmWarehouse || 0) * (data.widthCmWarehouse || 0) * (data.heightCmWarehouse || 0)) /
            volumeWeightCoefficient,
          POUNDS_COEFFICIENT,
        )
        break
      case Entities.SUPPLIER:
        convertedLength = getConversion(sizeSetting, defaultDimension, data.lengthCmSupplier || 0, INCHES_COEFFICIENT)
        convertedWidth = getConversion(sizeSetting, defaultDimension, data.widthCmSupplier || 0, INCHES_COEFFICIENT)
        convertedHeight = getConversion(sizeSetting, defaultDimension, data.heightCmSupplier || 0, INCHES_COEFFICIENT)
        convertedWeight = getConversion(
          sizeSetting,
          defaultDimension,
          data.weighGrossKgSupplier || 0,
          POUNDS_COEFFICIENT,
        )
        convertedVolumeWeight = getConversion(
          sizeSetting,
          defaultDimension,
          ((data.lengthCmSupplier || 0) * (data.widthCmSupplier || 0) * (data.heightCmSupplier || 0)) /
            volumeWeightCoefficient,
          POUNDS_COEFFICIENT,
        )
        break
      default:
        convertedLength = getConversion(sizeSetting, defaultDimension, data.length || 0, INCHES_COEFFICIENT)
        convertedWidth = getConversion(sizeSetting, defaultDimension, data.width || 0, INCHES_COEFFICIENT)
        convertedHeight = getConversion(sizeSetting, defaultDimension, data.height || 0, INCHES_COEFFICIENT)
        convertedWeight = getConversion(sizeSetting, defaultDimension, data.weight || 0, POUNDS_COEFFICIENT)
        convertedVolumeWeight = getConversion(
          sizeSetting,
          defaultDimension,
          ((data.length || 0) * (data.width || 0) * (data.height || 0)) / volumeWeightCoefficient,
          POUNDS_COEFFICIENT,
        )
        break
    }

    setDimensions(prevState => ({
      ...prevState,
      length: convertedLength,
      width: convertedWidth,
      height: convertedHeight,
      weight: convertedWeight,
      volumeWeight: convertedVolumeWeight,
      finalWeight: toFixed(Math.max(convertedWeight, convertedVolumeWeight)),
      totalWeight: toFixed(sizeSetting === Dimensions.EU ? MIN_ALLOW_WEIGHT : MIN_ALLOW_WEIGHT / POUNDS_COEFFICIENT),
      dimensionsSize: getDimensionsSize(sizeSetting),
      unitsSize: getUnitsSize(sizeSetting),
    }))
  }, [data, sizeSetting])

  return dimensions
}

const getConversion = (dimension: Dimensions, defaultDimension: Dimensions, value: number, coefficient: number) => {
  const result = dimension === defaultDimension ? value : value / coefficient

  return toFixed(result)
}
const getDimensionsSize = (dimension: Dimensions) =>
  dimension === Dimensions.EU ? t(TranslationKey.cm) : t(TranslationKey.inches)
const getUnitsSize = (dimension: Dimensions) =>
  dimension === Dimensions.EU ? t(TranslationKey.kg) : t(TranslationKey.lb)
