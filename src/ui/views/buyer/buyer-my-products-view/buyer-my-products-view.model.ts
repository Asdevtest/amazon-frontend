import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { BuyerModel } from '@models/buyer-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { IProduct } from '@typings/models/products/product'

import { buyerProductsViewColumns } from './buyer-products-columns'
import { observerConfig } from './observer-config'

export class BuyerMyProductsViewModel extends DataGridFilterTableModel {
  productCardModal = false

  constructor() {
    const rowHandlers = {
      onClickShowProduct: (row: IProduct) => this.onClickTableRow(row),
    }

    const columnsModel = buyerProductsViewColumns(rowHandlers)

    super({
      getMainDataMethod: BuyerModel.getProductsMyPag,
      columnsModel,
      filtersFields: getFilterFields(columnsModel, ['amazonTitle', 'skuByClient']),
      mainMethodURL: 'buyers/products/pag/my?',
      fieldsForSearch: ['asin', 'amazonTitle', 'skuByClient'],
      tableKey: DataGridTablesKeys.BUYER_PRODUCTS,
    })
    makeObservable(this, observerConfig)

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]

    this.initHistory()
    this.getDataGridState()
    this.getCurrentData()
  }

  onClickTableRow(row: IProduct) {
    window?.open(`${window.location.origin}/buyer/my-products/product?product-id=${row._id}`, '_blank')?.focus()
  }

  onClickProductModal(row: IProduct) {
    if (row) {
      this.history.push(`/buyer/my-products?product-id=${row._id}`)
    } else {
      this.history.push(`/buyer/my-products`)
    }

    this.onTriggerOpenModal('productCardModal')
  }

  onClickShowProduct(id: string) {
    window?.open(`/buyer/my-products/product?product-id=${id}`, '_blank')?.focus()
  }
}
