/* eslint-disable import/no-unresolved */
import { DestinationVariationApproximateCalculationsType } from '../../typings/destination'

export const getGroupDataByDestinationId = (
  destinationVariations: Array<DestinationVariationApproximateCalculationsType>,
): Record<string, Array<DestinationVariationApproximateCalculationsType>> => {
  return destinationVariations.reduce(
    (groups: Record<string, Array<DestinationVariationApproximateCalculationsType>>, obj) => {
      const destinationId = obj?.destination?._id

      if (!destinationId) {
        return groups
      }

      if (!groups[destinationId]) {
        groups[destinationId] = []
      }
      groups[destinationId].push(obj)
      return groups
    },
    {},
  )
}

export const deepArrayCompare = (firstArray: Array<unknown>, secondArray: Array<unknown>) => {
  // Проверка на равное количество элементов в массивах
  if (firstArray.length !== secondArray.length) {
    return false
  }

  // Проверка каждого элемента массива
  for (let i = 0; i < firstArray.length; i++) {
    const firstArrayItem = firstArray[i]
    const secondArrayItem = secondArray[i]

    // Рекурсивное сравнение вложенных массивов
    if (Array.isArray(firstArrayItem) && Array.isArray(secondArrayItem)) {
      if (!deepArrayCompare(firstArrayItem, secondArrayItem)) {
        return false
      }
    } else if (firstArrayItem !== secondArrayItem) {
      // Сравнение простых значений
      return false
    }
  }

  return true
}
