import { IBoxItem } from '@typings/models/boxes/box-item'

export const getWeightPerUnitByProduct = (item: IBoxItem) => {
  const boxProperties = item?.product?.currentSupplier?.boxProperties

  return (boxProperties?.boxWeighGrossKg || 0) / (boxProperties?.amountInBox || 0)
}
