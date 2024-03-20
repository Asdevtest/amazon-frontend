/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { getBatchParameters } from '@constants/statuses/batch-weight-calculations-method'

import { toFixedWithDollarSign } from '@utils/text'

import { useStyles } from './actual-cost-with-delivery-per-unit.style'

interface ActualCostWithDeliveryPerUnitProps {
  actualShippingCost: number
  rowMemo: any
  calculationMethod: number
  isActualGreaterTheVolume: boolean
  volumeWeightCoefficient: number
  finalWeight: number
}

export const ActualCostWithDeliveryPerUnit: FC<ActualCostWithDeliveryPerUnitProps> = memo(props => {
  const { classes: styles } = useStyles()
  const {
    actualShippingCost,
    rowMemo,
    calculationMethod,
    isActualGreaterTheVolume,
    volumeWeightCoefficient,
    finalWeight,
  } = props

  const getTotalCost = (item: any) => {
    const { shippingCost, itemsQuantity, singleProductPrice } = getBatchParameters(
      rowMemo,
      item,
      volumeWeightCoefficient,
      finalWeight,
      calculationMethod,
      isActualGreaterTheVolume,
      actualShippingCost,
    )

    const fullBatchPrice = itemsQuantity * singleProductPrice + shippingCost

    return fullBatchPrice / itemsQuantity
  }

  return (
    <div className={styles.pricesWrapper}>
      {rowMemo.items.map((el: any, index: number) => (
        <p key={index} className={styles.multilineText}>
          {(!!actualShippingCost && toFixedWithDollarSign(getTotalCost(el), 2)) || '-'}
        </p>
      ))}
    </div>
  )
})
