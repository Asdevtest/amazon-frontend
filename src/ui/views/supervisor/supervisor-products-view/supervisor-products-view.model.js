import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { SupervisorModel } from '@models/supervisor-model'
import { UserModel } from '@models/user-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { supervisorProductsViewColumns } from './supervisor-products-columns'
import { supervisorProductsConfig } from './supervisor-products-view.config'
import { filtersFields } from './supervisor-products-view.constants'

export class SupervisorProductsViewModel extends DataGridFilterTableModel {
  switcherFilterStatuses = []
  showProductModal = false

  get userInfo() {
    return UserModel.userInfo
  }
  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  constructor() {
    const additionalPropertiesGetFilters = () => ({
      ...(this.switcherFilterStatuses.length > 0 && {
        status: { $eq: this.switcherFilterStatuses.join(',') },
      }),
    })
    const rowHandlers = {
      onClickTableRow: id => this.onClickTableRow(id),
    }
    const columns = supervisorProductsViewColumns(rowHandlers)
    const filtersFields = getFilterFields(columns)

    super({
      getMainDataMethod: SupervisorModel.getProductsMyPag,
      columnsModel: columns,
      filtersFields,
      mainMethodURL: 'supervisors/products/pag/my?',
      fieldsForSearch: ['asin', 'amazonTitle', 'skuByClient'],
      tableKey: DataGridTablesKeys.SUPERVISOR_PRODUCTS,
      additionalPropertiesGetFilters,
    })

    this.initHistory()
    this.getDataGridState()
    this.getCurrentData()

    makeObservable(this, supervisorProductsConfig)
  }

  onClickStatusFilterButton(statuses) {
    this.switcherFilterStatuses = statuses

    this.getCurrentData()
  }

  onClickTableRow(id) {
    const win = window.open(`${window.location.origin}/supervisor/products/product?product-id=${id}`, '_blank')
    win.focus()
  }

  onClickProductModal(id) {
    if (id) {
      this.history.push(`/supervisor/products?product-id=${id}`)
    } else {
      this.history.push(`/supervisor/products`)
    }

    this.onTriggerOpenModal('productCardModal')
  }

  onToggleModal(modal) {
    this[modal] = !this[modal]
  }
}
