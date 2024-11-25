/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { getCostPerUnitWithDeliveryByProduct } from '@components/modals/batch-info-modal/helpers/get-cost-per-unit-with-delivery-by-product'
import { getDeliveryCostByProduct } from '@components/modals/batch-info-modal/helpers/get-delivery-cost-by-product'
import { getDeliveryCostByProductPerUnit } from '@components/modals/batch-info-modal/helpers/get-delivery-cost-by-product-per-unit'
import { getPartOfWeight } from '@components/modals/batch-info-modal/helpers/get-part-of-weight'
import { getPricePerUnit } from '@components/modals/batch-info-modal/helpers/get-price-per-unit'
import { getWeightPerAllUnitsByProduct } from '@components/modals/batch-info-modal/helpers/get-weight-per-all-units-by-product'
import { getWeightPerUnitByProduct } from '@components/modals/batch-info-modal/helpers/get-weight-per-unit-by-product'

import { getTariffRateForBoxOrOrder } from '@utils/calculation'
import { toFixedWithDollarSign } from '@utils/text'

import { IBox } from '@typings/models/boxes/box'

import { useStyles } from './final-price-per-unit-cell.style'

interface FinalPricePerUnitCellProps {
  box: IBox & { calculatedShippingCost: number }
  boxFinalWeight: number
}

export const FinalPricePerUnitCell: FC<FinalPricePerUnitCellProps> = memo(({ box, boxFinalWeight }) => {
  const { classes: styles } = useStyles()

  const renderItem = () => {
    return (
      <>
        {box.items.map((el: any, index: number) => (
          <p key={index} className={styles.multilineText}>
            {toFixedWithDollarSign(
              el.order?.totalPrice / el.order?.amount + (boxFinalWeight * getTariffRateForBoxOrOrder(box)) / el.amount,
              2,
            )}
          </p>
        ))}
      </>
    )
  }

  const renderManyItems = () => {
    return (
      <>
        {box.items.map((el: any, index: number) => {
          const weightPerUnitByProduct = getWeightPerUnitByProduct(el)

          const weightPerAllUnitsByProduct = getWeightPerAllUnitsByProduct(
            weightPerUnitByProduct,
            el?.amount,
            box.amount,
          )

          const partOfWeight = getPartOfWeight(weightPerAllUnitsByProduct, box.finalWeight)

          const deliveryCostByProduct = getDeliveryCostByProduct(box?.calculatedShippingCost, partOfWeight)

          const deliveryCostByProductPerUnit = getDeliveryCostByProductPerUnit(
            deliveryCostByProduct,
            box.amount,
            el.amount,
          )

          const perUnit = getPricePerUnit(el)

          const costPerUnitWithDeliveryByProduct = getCostPerUnitWithDeliveryByProduct(
            perUnit,
            deliveryCostByProductPerUnit,
          )

          return (
            <p key={index} className={styles.multilineText}>
              {toFixedWithDollarSign(costPerUnitWithDeliveryByProduct, 2)}
            </p>
          )
        })}
      </>
    )
  }

  return <div className={styles.pricesWrapper}>{box.items.length === 1 ? renderItem() : renderManyItems()}</div>
})
