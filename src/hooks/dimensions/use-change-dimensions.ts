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
  finalWeight?: number
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
          lengthCmWarehouse: Number(toFixed(prev.lengthCmWarehouse / INCHES_COEFFICIENT)),
          widthCmWarehouse: Number(toFixed(prev.widthCmWarehouse / INCHES_COEFFICIENT)),
          heightCmWarehouse: Number(toFixed(prev.heightCmWarehouse / INCHES_COEFFICIENT)),
          weighGrossKgWarehouse: Number(toFixed(prev.weighGrossKgWarehouse / POUNDS_COEFFICIENT)),
        }))
      } else {
        setData(prev => ({
          ...prev,
          lengthCmWarehouse: Number(toFixed(prev.lengthCmWarehouse * INCHES_COEFFICIENT)),
          widthCmWarehouse: Number(toFixed(prev.widthCmWarehouse * INCHES_COEFFICIENT)),
          heightCmWarehouse: Number(toFixed(prev.heightCmWarehouse * INCHES_COEFFICIENT)),
          weighGrossKgWarehouse: Number(toFixed(prev.weighGrossKgWarehouse * POUNDS_COEFFICIENT)),
        }))
      }
    }
  }, [sizeSetting])

  useEffect(() => {
    if (sizeSetting === Dimensions.US) {
      setData(prev => {
        // use "US" dimensions for viewing (work with "EU" sizes).
        const returnEuDimensions =
          prev.lengthCmWarehouse *
          INCHES_COEFFICIENT *
          prev.widthCmWarehouse *
          INCHES_COEFFICIENT *
          prev.heightCmWarehouse *
          INCHES_COEFFICIENT

        return {
          ...prev,
          volumeWeight: Number(toFixed(returnEuDimensions / volumeWeightCoefficient / POUNDS_COEFFICIENT)),
        }
      })
    } else {
      setData(prev => ({
        ...prev,
        volumeWeight: Number(
          toFixed((prev.lengthCmWarehouse * prev.widthCmWarehouse * prev.heightCmWarehouse) / volumeWeightCoefficient),
        ),
      }))
    }
  }, [data.lengthCmWarehouse, data.widthCmWarehouse, data.heightCmWarehouse])

  useEffect(() => {
    setData(prev => ({
      ...prev,
      finalWeight: Number(toFixed(Math.max(prev.weighGrossKgWarehouse, Number(prev.volumeWeight)))),
    }))
  }, [data.volumeWeight, data.weighGrossKgWarehouse])

  const handleChangeDimensions = (fieldName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    if (!/^\d*\.?\d{0,2}$/.test(e.target.value) || e.target.value.length > 6) {
      return
    }

    setData(prev => ({
      ...prev,
      [fieldName]: Number(e.target.value),
    }))
  }

  return { onChangeDimensions: handleChangeDimensions }
}
