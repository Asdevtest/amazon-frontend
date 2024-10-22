import { getCostPerUnitWithDeliveryByProduct } from './get-cost-per-unit-with-delivery-by-product'
import { getDeliveryCostByProduct } from './get-delivery-cost-by-product'
import { getDeliveryCostByProductPerUnit } from './get-delivery-cost-by-product-per-unit'
import { getPartOfWeight } from './get-part-of-weight'
import { getPricePerUnit } from './get-price-per-unit'
import { getWeightPerAllUnitsByProduct } from './get-weight-per-all-units-by-product'
import { getWeightPerUnitByProduct } from './get-weight-per-unit-by-product'

export const getActualCostWithDeliveryPerUnit = (box: any, item: any) => {
  const weightPerUnitByProduct = getWeightPerUnitByProduct(item)
  const weightPerAllUnitsByProduct = getWeightPerAllUnitsByProduct(weightPerUnitByProduct, item?.amount, box.amount)
  const partOfWeight = getPartOfWeight(weightPerAllUnitsByProduct, box.finalWeight)
  const deliveryCostByProduct = getDeliveryCostByProduct(box?.actualShippingCost, partOfWeight)
  const deliveryCostByProductPerUnit = getDeliveryCostByProductPerUnit(deliveryCostByProduct, box.amount, item.amount)
  const perUnit = getPricePerUnit(item)

  return getCostPerUnitWithDeliveryByProduct(perUnit, deliveryCostByProductPerUnit)
}
