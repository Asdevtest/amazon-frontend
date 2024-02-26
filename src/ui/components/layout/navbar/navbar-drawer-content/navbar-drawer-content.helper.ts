import { IInfoCounters } from '@typings/shared/info-counters'
import { NavbarConfigTypes } from '@typings/shared/navbar-config'

export const getCategoryBadge = (category: NavbarConfigTypes.Route, userInfo: IInfoCounters) => {
  if (category.route?.includes('/client/notifications')) {
    return (
      userInfo?.needConfirmPriceChange?.boxes +
      userInfo?.needConfirmPriceChange?.orders +
      userInfo?.needUpdateTariff?.boxes +
      // userInfo.updatesOnIdeas +
      userInfo?.freelanceNotices?.length +
      userInfo?.notificationCounter
    )
  } else if (category?.route?.includes('/freelancer/notifications')) {
    return userInfo?.freelanceNotices?.length + userInfo?.notificationCounter
  } else if (category?.route?.includes('/buyer/notifications')) {
    return /* userInfo.updatesOnIdeas +*/ userInfo?.notificationCounter
  } else if (category?.route?.includes('/client/my-orders/orders')) {
    return userInfo?.allOrders
  } else if (category?.route?.includes('/warehouse/tasks')) {
    return userInfo?.tasksAtProcessAll + userInfo?.tasksNewAll
  } else if (category?.route?.includes('/buyer/free-orders')) {
    return userInfo?.freeOrders
  } else if (category?.route?.includes('/buyer/pending-orders')) {
    return userInfo?.pendingOrders
  } else if (category?.route?.includes('/client/ideas')) {
    return (
      userInfo?.ideas?.addingAsin +
      userInfo?.ideas?.new +
      userInfo?.ideas?.onCheck +
      userInfo?.ideas?.productCreating +
      userInfo?.ideas?.supplierSearch
    )
  }
  return 0
}
