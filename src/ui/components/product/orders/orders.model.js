import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ClientModel} from '@models/client-model'

import {clientOrdersViewColumns} from '@components/table-columns/client/client-orders-columns'

import {clientOrdersDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDate} from '@utils/date-time'

export class OrdersModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  productId = undefined

  orders = []

  columnsModel = clientOrdersViewColumns()

  constructor({history, productId}) {
    this.history = history

    this.productId = productId
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  getCurrentData() {
    return toJS(this.orders)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getOrdersByProductId()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async getOrdersByProductId() {
    try {
      const result = await ClientModel.getOrdersByProductId(this.productId)

      runInAction(() => {
        this.orders = clientOrdersDataConverter(result).sort(sortObjectsArrayByFiledDate('createdAt'))
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickTableRow(order) {
    this.history.push('/client/orders/order', {order: toJS(order.originalData)})
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
