import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { AdministratorModel } from '@models/administrator-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { IProduct } from '@typings/models/products/product'

import { adminExchangeColumns } from './admin-exchange-views-columns'
import { AdminExchangeStatuses } from './admin-exchange.types'
import { observerConfig } from './observer-config'

export class AdminExchangeViewModel extends DataGridFilterTableModel {
  productCardModal = false

  activeCategory = AdminExchangeStatuses.ALL

  constructor() {
    const rowHandlers = {
      onClickOpenInNewTab: (id: string) => this.onClickTableRow(id),
    }

    const columnsModel = adminExchangeColumns(rowHandlers)

    const filtersFields = getFilterFields(columnsModel, ['amazonTitle', 'skuByClient'])

    const defaultFilterParams = () => ({
      statusGroup: {
        $eq: this.activeCategory,
      },
    })

    super({
      getMainDataMethod: AdministratorModel.getProductsPag,
      columnsModel,
      filtersFields,
      mainMethodURL: 'admins/products/pag?',
      tableKey: DataGridTablesKeys.ADMIN_EXCHANGE,
      defaultFilterParams,
    })
    makeObservable(this, observerConfig)

    this.initHistory()

    this.sortModel = [{ field: 'createdAt', sort: 'desc' }]

    this.getDataGridState()
    this.getCurrentData()
  }

  onChangeSubCategory(value: AdminExchangeStatuses) {
    this.activeCategory = value
    this.getCurrentData()
  }

  onClickTableRow(id: string) {
    window?.open?.(`/admin/exchange/product?product-id=${id}`, '_blank')?.focus?.()
  }

  onClickShowProduct(id: string) {
    window?.open?.(`/admin/exchange/product?product-id=${id}`, '_blank')?.focus?.()
  }

  onClickProductModal(row: IProduct) {
    if (row) {
      this.history.push(`/admin/exchange?product-id=${row._id}`)
    } else {
      this.history.push(`/admin/exchange`)
    }

    this.onTriggerOpenModal('productCardModal')
  }
}
