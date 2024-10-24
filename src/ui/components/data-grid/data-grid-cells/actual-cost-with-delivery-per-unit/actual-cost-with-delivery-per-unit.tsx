/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { getBatchParameters } from '@constants/statuses/batch-weight-calculations-method'

import { getCostPerUnitWithDeliveryByProduct } from '@components/modals/batch-info-modal/helpers/get-cost-per-unit-with-delivery-by-product'
import { getDeliveryCostByProduct } from '@components/modals/batch-info-modal/helpers/get-delivery-cost-by-product'
import { getDeliveryCostByProductPerUnit } from '@components/modals/batch-info-modal/helpers/get-delivery-cost-by-product-per-unit'
import { getPartOfWeight } from '@components/modals/batch-info-modal/helpers/get-part-of-weight'
import { getPricePerUnit } from '@components/modals/batch-info-modal/helpers/get-price-per-unit'
import { getWeightPerAllUnitsByProduct } from '@components/modals/batch-info-modal/helpers/get-weight-per-all-units-by-product'
import { getWeightPerUnitByProduct } from '@components/modals/batch-info-modal/helpers/get-weight-per-unit-by-product'

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

  const renderItem = () => {
    return (
      <>
        {rowMemo.items.map((el: any, index: number) => (
          <p key={index} className={styles.multilineText}>
            {(!!actualShippingCost && toFixedWithDollarSign(getTotalCost(el), 2)) || '-'}
          </p>
        ))}
      </>
    )
  }

  const renderManyItems = () => {
    return (
      <>
        {rowMemo.items.map((el: any, index: number) => {
          const weightPerUnitByProduct = getWeightPerUnitByProduct(el)
          const weightPerAllUnitsByProduct = getWeightPerAllUnitsByProduct(
            weightPerUnitByProduct,
            el?.amount,
            rowMemo.amount,
          )
          const partOfWeight = getPartOfWeight(weightPerAllUnitsByProduct, rowMemo.finalWeight)
          const deliveryCostByProduct = getDeliveryCostByProduct(rowMemo?.actualShippingCost, partOfWeight)
          const deliveryCostByProductPerUnit = getDeliveryCostByProductPerUnit(
            deliveryCostByProduct,
            rowMemo.amount,
            el.amount,
          )
          const perUnit = getPricePerUnit(el)

          const costPerUnitWithDeliveryByProduct = getCostPerUnitWithDeliveryByProduct(
            perUnit,
            deliveryCostByProductPerUnit,
          )

          return (
            <p key={index} className={styles.multilineText}>
              {costPerUnitWithDeliveryByProduct ? toFixedWithDollarSign(costPerUnitWithDeliveryByProduct, 2) : '-'}
            </p>
          )
        })}
      </>
    )
  }

  return <div className={styles.pricesWrapper}>{rowMemo.items === 1 ? renderItem() : renderManyItems()}</div>
})
