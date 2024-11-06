import { IBoxItem } from '@typings/models/boxes/box-item'

export const getWeightPerAllUnitsByProduct = (weightPerUnitByProduct: number, itemAmount: number, boxAmount: number) =>
  weightPerUnitByProduct * itemAmount * boxAmount
