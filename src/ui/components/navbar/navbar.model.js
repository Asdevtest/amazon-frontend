import {makeAutoObservable, runInAction} from 'mobx'

import {OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {mapUserRoleEnumToKey, UserRole} from '@constants/user-roles'

import {ClientModel} from '@models/client-model'
import {UserModel} from '@models/user-model'

export class NavbarModel {
  ordersNotificationsAmount = undefined
  get userInfo() {
    return UserModel.userInfo
  }
  constructor() {
    makeAutoObservable(this, undefined, {autoBind: true})
    this.setClientOrdersNotificationsAmount()
  }

  async setClientOrdersNotificationsAmount() {
    if (this.userInfo.role !== mapUserRoleEnumToKey[UserRole.CLIENT]) {
      return
    }
    try {
      const orders = await ClientModel.getOrders()

      runInAction(() => {
        this.ordersNotificationsAmount = orders.filter(
          order => order.status === OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE],
        ).length
      })
    } catch (error) {
      console.warn(error)
    }
  }
}
