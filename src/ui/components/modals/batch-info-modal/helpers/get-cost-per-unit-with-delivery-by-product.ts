export const getCostPerUnitWithDeliveryByProduct = (perUnit: number, deliveryCostByProductPerUnit: number) => {
  if (!deliveryCostByProductPerUnit) {
    return 0
  }

  return perUnit + deliveryCostByProductPerUnit
}
