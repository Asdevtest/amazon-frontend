import { makeObservable } from 'mobx'

import { ClientModel } from '@models/client-model'
import { DataGridTableModel } from '@models/data-grid-table-model'

import { ordersColumns } from './orders.columns'
import { observerConfig } from './orders.config'

export class OrdersModel extends DataGridTableModel {
  productId?: string
  showOrderModal = false
  showSetBarcodeModal = false

  constructor(productId?: string) {
    const defaultGetCurrentDataOptions = () => ({
      guid: productId,
    })

    super({
      getMainDataMethod: ClientModel.getOrdersByProductId,
      columnsModel: ordersColumns(),
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
      defaultGetCurrentDataOptions,
    })

    makeObservable(this, observerConfig)

    this.getTableSettingsPreset()
  }

  onToggleOrderModal() {
    this.showOrderModal = !this.showOrderModal
  }

  onRedirectToOrder(id: string) {
    window?.open(`/client/my-orders/orders/order?orderId=${id}`, '_blank')?.focus()
  }
}
