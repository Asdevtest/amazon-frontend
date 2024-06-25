import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'

import { UserModel } from '@models/user-model'

import { toFixed } from '@utils/text'

import { Dimensions } from '@typings/enums/dimensions'
import { IBox } from '@typings/models/boxes/box'
import { IPlatformSettings } from '@typings/shared/patform-settings'

export const INCHES_COEFFICIENT = 2.54
export const POUNDS_COEFFICIENT = 0.4536
export const DEFAULT_VOLUME_WEIGHT_COEFFICIENT = 6000

export interface IDimensions extends IBox {
  volumeWeight?: number
  finalWeight: number
}

interface IUseDimension {
  data: IDimensions
  setData: Dispatch<SetStateAction<IDimensions>>
  sizeSetting: Dimensions
}

export const useChangeDimensions = ({ data, setData, sizeSetting = Dimensions.EU }: IUseDimension) => {
  const [isInitState, setIsInitState] = useState(true)

  useEffect(() => {
    setIsInitState(false)
  }, [])

  const volumeWeightCoefficient =
    (UserModel.platformSettings as unknown as IPlatformSettings)?.volumeWeightCoefficient ||
    DEFAULT_VOLUME_WEIGHT_COEFFICIENT

  useEffect(() => {
    if (!isInitState) {
      if (sizeSetting === Dimensions.US) {
        setData(prev => ({
          ...prev,
          lengthCmWarehouse: toFixed(Number(prev.lengthCmWarehouse) / INCHES_COEFFICIENT),
          widthCmWarehouse: toFixed(Number(prev.widthCmWarehouse) / INCHES_COEFFICIENT),
          heightCmWarehouse: toFixed(Number(prev.heightCmWarehouse) / INCHES_COEFFICIENT),
          weighGrossKgWarehouse: toFixed(Number(prev.weighGrossKgWarehouse) / POUNDS_COEFFICIENT),
        }))
      } else {
        setData(prev => ({
          ...prev,
          lengthCmWarehouse: toFixed(Number(prev.lengthCmWarehouse) * INCHES_COEFFICIENT),
          widthCmWarehouse: toFixed(Number(prev.widthCmWarehouse) * INCHES_COEFFICIENT),
          heightCmWarehouse: toFixed(Number(prev.heightCmWarehouse) * INCHES_COEFFICIENT),
          weighGrossKgWarehouse: toFixed(Number(prev.weighGrossKgWarehouse) * POUNDS_COEFFICIENT),
        }))
      }
    }
  }, [sizeSetting])

  useEffect(() => {
    if (sizeSetting === Dimensions.US) {
      setData(prev => {
        const returnEuDimensions =
          Number(prev.lengthCmWarehouse) *
          INCHES_COEFFICIENT *
          Number(prev.widthCmWarehouse) *
          INCHES_COEFFICIENT *
          Number(prev.heightCmWarehouse) *
          INCHES_COEFFICIENT

        return {
          ...prev,
          volumeWeight: toFixed(returnEuDimensions / volumeWeightCoefficient / POUNDS_COEFFICIENT),
        }
      })
    } else {
      setData(prev => ({
        ...prev,
        volumeWeight: toFixed(
          (Number(prev.lengthCmWarehouse) * Number(prev.widthCmWarehouse) * Number(prev.heightCmWarehouse)) /
            volumeWeightCoefficient,
        ),
      }))
    }
  }, [data.lengthCmWarehouse, data.widthCmWarehouse, data.heightCmWarehouse])

  useEffect(() => {
    setData(prev => ({
      ...prev,
      finalWeight: toFixed(Math.max(Number(prev.weighGrossKgWarehouse), Number(prev.volumeWeight))),
    }))
  }, [data.volumeWeight, data.weighGrossKgWarehouse])

  const handleChangeDimensions = (fieldName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    if (!/^\d*\.?\d{0,2}$/.test(e.target.value) || e.target.value.length > 6) {
      return
    }

    setData(prev => ({
      ...prev,
      [fieldName]: e.target.value,
    }))
  }

  return { onChangeDimensions: handleChangeDimensions }
}
