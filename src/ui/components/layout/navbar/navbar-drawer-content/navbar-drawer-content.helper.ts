import { IUser } from '@typings/user'

import { CurNavbarType } from './navbar-drawer-content'

export const getCategoryBadge = (category: CurNavbarType, userInfo: IUser) => {
  if (category.route?.includes('/client/notifications')) {
    return (
      userInfo.needConfirmPriceChange?.boxes +
      userInfo.needConfirmPriceChange?.orders +
      userInfo.needUpdateTariff?.boxes +
      userInfo.updatesOnIdeas +
      userInfo.freelanceNotices.length
    )
  } else if (category.route?.includes('/freelancer/notifications')) {
    return userInfo.freelanceNotices.length
  } else if (category.route?.includes('/buyer/notifications')) {
    return userInfo.updatesOnIdeas
  } else if (category.route?.includes('/client/my-orders/orders')) {
    return userInfo.allOrders
  } else if (category.route?.includes('/warehouse/tasks')) {
    return userInfo.tasksAtProcessAll + userInfo.tasksNewAll
  } else if (category.route?.includes('/buyer/free-orders')) {
    return userInfo.freeOrders
  } else if (category.route?.includes('/buyer/pending-orders')) {
    return userInfo.pendingOrders
  }
  return 0
}
