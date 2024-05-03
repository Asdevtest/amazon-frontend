import { ChangeEvent, useEffect, useState } from 'react'

import { UserModel } from '@models/user-model'

import { toFixed } from '@utils/text'

import { Dimensions } from '@typings/enums/dimensions'
import { IPlatformSettings } from '@typings/shared/patform-settings'

export const INCHES_COEFFICIENT = 2.54
export const POUNDS_COEFFICIENT = 0.4536
export const DEFAULT_VOLUME_WEIGHT_COEFFICIENT = 6000

export interface IFormattedDimensions {
  length: string
  width: string
  height: string
  weight: string
  volumeWeight: number
  finalWeight: number
}

export interface IDimensions {
  lengthCmWarehouse: number
  widthCmWarehouse: number
  heightCmWarehouse: number
  weighGrossKgWarehouse: number
}

interface IUseDimension {
  data: IDimensions
  sizeSetting: Dimensions
}

export const useChangeDimensions = ({ data, sizeSetting = Dimensions.EU }: IUseDimension) => {
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
    weight: '',
    volumeWeight: 0,
    finalWeight: 0,
  })
  const [isInitState, setIsInitState] = useState(true)

  const volumeWeightCoefficient =
    (UserModel.platformSettings as unknown as IPlatformSettings)?.volumeWeightCoefficient ||
    DEFAULT_VOLUME_WEIGHT_COEFFICIENT

  useEffect(() => {
    setDimensions(prev => ({
      ...prev,
      length: String(data.lengthCmWarehouse),
      width: String(data.widthCmWarehouse),
      height: String(data.heightCmWarehouse),
      weight: String(data.weighGrossKgWarehouse),
    }))
    setIsInitState(false)
  }, [])

  useEffect(() => {
    if (!isInitState) {
      if (sizeSetting === Dimensions.US) {
        setDimensions(prev => ({
          ...prev,
          length: String(toFixed(Number(prev.length) / INCHES_COEFFICIENT)),
          width: String(toFixed(Number(prev.width) / INCHES_COEFFICIENT)),
          height: String(toFixed(Number(prev.height) / INCHES_COEFFICIENT)),
          weight: String(toFixed(Number(prev.weight) / POUNDS_COEFFICIENT)),
        }))
      } else {
        setDimensions(prev => ({
          ...prev,
          length: String(toFixed(Number(prev.length) * INCHES_COEFFICIENT)),
          width: String(toFixed(Number(prev.width) * INCHES_COEFFICIENT)),
          height: String(toFixed(Number(prev.height) * INCHES_COEFFICIENT)),
          weight: String(toFixed(Number(prev.weight) * POUNDS_COEFFICIENT)),
        }))
      }
    }
  }, [sizeSetting])

  useEffect(() => {
    if (sizeSetting === Dimensions.US) {
      setDimensions(prev => {
        // use "US" dimensions for viewing (work with "EU" sizes).
        const returnEuDimensions =
          Number(prev.length) *
          INCHES_COEFFICIENT *
          Number(prev.width) *
          INCHES_COEFFICIENT *
          Number(prev.height) *
          INCHES_COEFFICIENT

        return {
          ...prev,
          volumeWeight: toFixed(returnEuDimensions / volumeWeightCoefficient / POUNDS_COEFFICIENT),
        }
      })
    } else {
      setDimensions(prev => ({
        ...prev,
        volumeWeight: toFixed(
          (Number(prev.length) * Number(prev.width) * Number(prev.height)) / volumeWeightCoefficient,
        ),
      }))
    }
  }, [dimensions.length, dimensions.width, dimensions.height])

  useEffect(() => {
    setDimensions(prev => ({
      ...prev,
      finalWeight: toFixed(Math.max(Number(prev.weight), Number(prev.volumeWeight))),
    }))
  }, [dimensions.volumeWeight, dimensions.weight])

  const handleChangeDimensions = (fieldName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    if (!/^\d*\.?\d{0,2}$/.test(e.target.value)) {
      return
    }

    setDimensions(prevState => ({
      ...prevState,
      [fieldName]: e.target.value,
    }))
  }

  return { dimensions, onChangeDimensions: handleChangeDimensions }
}
