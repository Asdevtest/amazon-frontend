export const getDeliveryCostByProductPerUnit = (
  calculatedShippingCost: number,
  boxAmount: number,
  itemAmount: number,
) => calculatedShippingCost / (boxAmount * itemAmount)
