import { ChangeEvent, useEffect, useState } from 'react'

import { UserModel } from '@models/user-model'

import { toFixed } from '@utils/text'

import { Dimensions } from '@typings/enums/dimensions'
import { IPlatformSettings } from '@typings/shared/patform-settings'

const INCHES_COEFFICIENT = 2.54
const POUNDS_COEFFICIENT = 0.4536
const DEFAULT_VOLUME_WEIGHT_COEFFICIENT = 6000

export interface IDimensions {
  lengthCmWarehouse: number
  widthCmWarehouse: number
  heightCmWarehouse: number
  weighGrossKgWarehouse: number
}

interface IUseDimension {
  data: IDimensions
  sizeSetting: Dimensions
  defaultDimension?: Dimensions
}

export const useChangeDimensions = ({
  data,
  sizeSetting = Dimensions.EU,
  defaultDimension = Dimensions.EU,
}: IUseDimension) => {
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
    weight: '',
    volumeWeight: 0,
    finalWeight: 0,
  })

  const volumeWeightCoefficient =
    (UserModel.platformSettings as unknown as IPlatformSettings)?.volumeWeightCoefficient ||
    DEFAULT_VOLUME_WEIGHT_COEFFICIENT
  const convertValue = (value: number, dimension: Dimensions, coefficient: number) => {
    return toFixed(dimension === defaultDimension ? value : value / coefficient)
  }
  const convertAndSetDimensions = (length: number, width: number, height: number, weight: number) => {
    const convertedLength = convertValue(length, sizeSetting, INCHES_COEFFICIENT)
    const convertedWidth = convertValue(width, sizeSetting, INCHES_COEFFICIENT)
    const convertedHeight = convertValue(height, sizeSetting, INCHES_COEFFICIENT)
    const convertedWeight = convertValue(weight, sizeSetting, POUNDS_COEFFICIENT)
    const convertedVolumeWeight = convertValue(
      (length * width * height) / volumeWeightCoefficient,
      sizeSetting,
      POUNDS_COEFFICIENT,
    )

    setDimensions(prevState => ({
      ...prevState,
      length: String(convertedLength),
      width: String(convertedWidth),
      height: String(convertedHeight),
      weight: String(convertedWeight),
      volumeWeight: convertedVolumeWeight,
      finalWeight: toFixed(Math.max(convertedWeight, convertedVolumeWeight)),
    }))
  }

  useEffect(() => {
    convertAndSetDimensions(
      data.lengthCmWarehouse,
      data.widthCmWarehouse,
      data.heightCmWarehouse,
      data.weighGrossKgWarehouse,
    )
  }, [data])

  const handleChangeDimensions = (fieldName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    if (!/^\d*\.?\d{0,2}$/.test(e.target.value)) {
      return
    }

    switch (fieldName) {
      case 'length':
        convertAndSetDimensions(
          Number(e.target.value),
          Number(dimensions.width),
          Number(dimensions.height),
          Number(dimensions.weight),
        )
        break
      case 'width':
        convertAndSetDimensions(
          Number(dimensions.length),
          Number(e.target.value),
          Number(dimensions.height),
          Number(dimensions.weight),
        )
        break
      case 'height':
        convertAndSetDimensions(
          Number(dimensions.length),
          Number(dimensions.width),
          Number(e.target.value),
          Number(dimensions.weight),
        )
        break
      case 'weight':
        convertAndSetDimensions(
          Number(dimensions.length),
          Number(dimensions.width),
          Number(dimensions.height),
          Number(e.target.value),
        )
        break
      default:
        break
    }

    setDimensions(prevState => ({
      ...prevState,
      [fieldName]: e.target.value,
    }))
  }

  return { dimensions, onChangeDimensions: handleChangeDimensions }
}
