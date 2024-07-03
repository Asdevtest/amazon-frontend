import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { AdministratorModel } from '@models/administrator-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { IProduct } from '@typings/models/products/product'

import { adminInventoryColumns } from './admin-inventory-view.columns'
import { fieldsForSearch } from './admin-inventory-view.constants'
import { observerConfig } from './observer-config'

export class AdminInventoryViewModel extends DataGridFilterTableModel {
  productCardModal = false

  constructor() {
    const rowHandlers = {
      onClickOpenInNewTab: (id: string) => this.onClickTableRow(id),
    }
    const columnsModel = adminInventoryColumns(rowHandlers)

    super({
      getMainDataMethod: AdministratorModel.getProductsPag,
      columnsModel,
      filtersFields: getFilterFields(columnsModel, ['skuByClient', 'amazonTitle']),
      mainMethodURL: 'admins/products/pag?',
      fieldsForSearch,
      tableKey: DataGridTablesKeys.ADMIN_INVENTORY,
    })

    makeObservable(this, observerConfig)

    this.initHistory()

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]

    this.getDataGridState()
    this.getCurrentData()
  }

  onClickTableRow(id: string) {
    window.open?.(`/admin/inventory/product?product-id=${id}`, '_blank')?.focus?.()
  }

  onClickShowProduct(id: string) {
    window?.open?.(`/admin/inventory/product?product-id=${id}`, '_blank')?.focus?.()
  }

  onClickProductModal(row: IProduct) {
    if (row) {
      this.history.push(`/admin/inventory?product-id=${row._id}`)
    } else {
      this.history.push(`/admin/inventory`)
    }

    this.onTriggerOpenModal('productCardModal')
  }
}
