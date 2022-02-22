import {makeAutoObservable, runInAction} from 'mobx'

import {UserRole} from '@constants/user-roles'

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
    if (this.curUserRole !== UserRole.CLIENT) {
      return
    }
    try {
      const orders = await ClientModel.getOrders()
      runInAction(() => {
        this.ordersNotificationsAmount = orders.filter(order => order.totalPrice < order.totalPriceChanged).length
      })
    } catch (error) {
      console.warn(error)
    }
  }
}
