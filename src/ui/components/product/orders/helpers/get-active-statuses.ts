import { chosenStatusesByFilter } from '@constants/statuses/inventory-product-orders-statuses'

export const getActiveStatuses = (isAtProcessOnly: boolean) => {
  let statuses = {
    [chosenStatusesByFilter.ALL]: true,
    [chosenStatusesByFilter.AT_PROCESS]: true,
    [chosenStatusesByFilter.CANCELED]: true,
    [chosenStatusesByFilter.COMPLETED]: true,
  }

  if (isAtProcessOnly) {
    statuses = {
      [chosenStatusesByFilter.ALL]: false,
      [chosenStatusesByFilter.AT_PROCESS]: true,
      [chosenStatusesByFilter.CANCELED]: false,
      [chosenStatusesByFilter.COMPLETED]: false,
    }
  }

  return statuses
}
