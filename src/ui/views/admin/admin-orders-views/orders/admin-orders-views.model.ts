import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { AdministratorModel } from '@models/administrator-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { IOrder } from '@typings/models/orders/order'

import { adminOrdersViewColumns } from './admin-orders-columns'
import { fieldsForSearch } from './admin-orders-views.constants'
import { AdminOrdersStatusGroup } from './admin-orders-views.types'
import { observerConfig } from './observer-config'

export class AdminOrdersAllViewModel extends DataGridFilterTableModel {
  activeCategory = AdminOrdersStatusGroup.ALL

  constructor() {
    const columnsModel = adminOrdersViewColumns()

    const defaultFilterParams = () => ({
      statusGroup: {
        $eq: this.activeCategory,
      },
    })

    super({
      getMainDataMethod: AdministratorModel.getOrdersPag,
      columnsModel,
      filtersFields: getFilterFields(columnsModel, ['skuByClient', 'amazonTitle']),
      mainMethodURL: 'admins/orders/pag?',
      fieldsForSearch,
      tableKey: DataGridTablesKeys.ADMIN_ORDERS,
      defaultFilterParams,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })

    makeObservable(this, observerConfig)

    this.getTableSettingsPreset()
  }

  onClickTableRow(order: IOrder) {
    window?.open(`/admin/orders/order?orderId=${order._id}`, '_blank')?.focus?.()
  }

  onChangeActiveCategory(value: AdminOrdersStatusGroup) {
    this.activeCategory = value
    this.getCurrentData()
  }
}
