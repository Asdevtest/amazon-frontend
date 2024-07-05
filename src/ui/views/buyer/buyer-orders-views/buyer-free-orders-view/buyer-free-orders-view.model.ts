import { makeObservable, runInAction } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'

import { BuyerModel } from '@models/buyer-model'
import { DataGridTableModel, filterModelInitialValue } from '@models/data-grid-table-model'
import { UserModel } from '@models/user-model'

import { IOrder } from '@typings/models/orders/order'

import { buyerFreeOrdersViewColumns } from './buyer-free-orders-columns'
import { observerConfig } from './buyer-free-orders-view.config'

export class BuyerFreeOrdersViewModel extends DataGridTableModel {
  curOrder: IOrder | null = null
  showTwoVerticalChoicesModal = false

  get isSomeFilterOn() {
    return !!this.filterModel?.items?.length
  }

  constructor() {
    const rowHandlers = {
      onClickTableRowBtn: (order: IOrder) => this.onClickTableRowBtn(order),
    }
    const columnsModel = buyerFreeOrdersViewColumns(rowHandlers)

    super({
      getMainDataMethod: BuyerModel.getOrdersVacant,
      columnsModel,
      tableKey: DataGridTablesKeys.BUYER_FREE_ORDERS,
    })

    makeObservable(this, observerConfig)

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]
    this.initHistory()

    const orderId = new URL(window.location.href)?.searchParams?.get('orderId')

    if (orderId) {
      this.history.push(`${this.history?.location?.pathname}`)
      this.onChangeFilterModel({
        items: [
          {
            field: 'ID',
            operator: '=',
            value: orderId,
          },
        ],
      })
    }

    this.getDataGridState()
    this.getCurrentData()
  }

  goToMyOrders() {
    this.onTriggerOpenModal('showTwoVerticalChoicesModal')
    this.history.push(
      this.curOrder?.status === OrderStatusByKey[OrderStatus.FORMED as keyof typeof OrderStatusByKey]
        ? `/buyer/pending-orders?orderId=${this.curOrder?._id}`
        : `/buyer/not-paid-orders?orderId=${this.curOrder?._id}`,
    )
  }

  async onClickTableRowBtn(order: IOrder, noPush: boolean = false) {
    const { status, buyer, _id } = order

    try {
      if (
        !buyer ||
        status === OrderStatusByKey[OrderStatus.FORMED as keyof typeof OrderStatusByKey] ||
        status === OrderStatusByKey[OrderStatus.NEW as keyof typeof OrderStatusByKey]
      ) {
        await BuyerModel.pickupOrder(_id)
      } else {
        await BuyerModel.setOrdersAtProcess(_id)
      }

      if (!noPush) {
        runInAction(() => {
          this.curOrder = order
        })

        this.onTriggerOpenModal('showTwoVerticalChoicesModal')
      }

      this.getCurrentData()

      UserModel.getUsersInfoCounters()
    } catch (error) {
      console.error(error)
    }
  }

  async onPickupSomeItems() {
    try {
      for (let i = 0; i < this.selectedRows.length; i++) {
        const selectedItem = this.currentData.find(item => item._id === this.selectedRows[i])

        if (selectedItem) {
          await this.onClickTableRowBtn(selectedItem, true)
        }
      }

      runInAction(() => {
        this.selectedRows = []
      })

      UserModel.getUsersInfoCounters()
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  onClickContinueWorkButton() {
    this.onTriggerOpenModal('showTwoVerticalChoicesModal')
    this.getCurrentData()
  }

  onClickResetFilters() {
    this.filterModel = filterModelInitialValue
  }
}
