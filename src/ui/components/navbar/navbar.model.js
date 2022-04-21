import {makeAutoObservable, runInAction} from 'mobx'

import {BoxStatus} from '@constants/box-status'
import {OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {mapUserRoleEnumToKey, UserRole} from '@constants/user-roles'

import {BoxesModel} from '@models/boxes-model'
import {ClientModel} from '@models/client-model'
import {UserModel} from '@models/user-model'

export class NavbarModel {
  ordersNotificationsAmount = 0
  boxesNotificationsAmount = 0
  get userInfo() {
    return UserModel.userInfo
  }
  constructor() {
    makeAutoObservable(this, undefined, {autoBind: true})
    this.setClientNotificationsAmount()
  }

  async setClientNotificationsAmount() {
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

      const boxes = await BoxesModel.getBoxesForCurClient(BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE)

      runInAction(() => {
        this.boxesNotificationsAmount = boxes.length
      })
    } catch (error) {
      console.warn(error)
    }
  }
}
