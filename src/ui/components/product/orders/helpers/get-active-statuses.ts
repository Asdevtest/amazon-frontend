import { chosenStatusesByFilter } from '@constants/statuses/inventory-product-orders-statuses'

type FilterStatus = keyof typeof chosenStatusesByFilter

export const getActiveStatuses = (filterStatus?: FilterStatus) => {
  const statuses: Record<FilterStatus, boolean> = {
    [chosenStatusesByFilter.ALL]: false,
    [chosenStatusesByFilter.AT_PROCESS]: false,
    [chosenStatusesByFilter.CANCELED]: false,
    [chosenStatusesByFilter.COMPLETED]: false,
    [chosenStatusesByFilter.PENDING]: false,
  }

  if (!filterStatus || filterStatus === 'ALL') {
    Object.keys(statuses).forEach(key => {
      const statusKey = key as FilterStatus
      statuses[statusKey] = true
    })
  } else if (Object.prototype.hasOwnProperty.call(statuses, filterStatus)) {
    statuses[filterStatus] = true
  } else {
    throw new Error(`Invalid filterStatus: ${filterStatus}`)
  }

  return statuses
}
