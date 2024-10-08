/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { getBatchParameters } from '@constants/statuses/batch-weight-calculations-method'

import { toFixedWithDollarSign } from '@utils/text'

import { useStyles } from './actual-cost-with-delivery.style'

interface ActualCostWithDeliveryProps {
  actualShippingCost: number
  rowMemo: any
  calculationMethod: number
  isActualGreaterTheVolume: boolean
  volumeWeightCoefficient: number
  finalWeight: number
}

export const ActualCostWithDelivery: FC<ActualCostWithDeliveryProps> = memo(props => {
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
    return itemsQuantity * singleProductPrice + shippingCost
  }

  return (
    <div className={styles.pricesWrapper}>
      {rowMemo.items.map((el: any, index: number) => (
        <p key={index} className={styles.multilineText}>
          {toFixedWithDollarSign(getTotalCost(el), 2) || '-'}
        </p>
      ))}
    </div>
  )
})
