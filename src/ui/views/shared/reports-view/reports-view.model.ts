import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { ClientModel } from '@models/client-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { IProduct } from '@typings/models/products/product'

import { reportsViewColumns } from './reports-view.columns'
import { reportsViewConfig } from './reports-view.config'

export class ReportsViewModel extends DataGridFilterTableModel {
  product?: IProduct
  get rows() {
    return this.currentData
  }

  constructor(productId: string) {
    const columnsModel = reportsViewColumns()
    const filtersFields = getFilterFields(columnsModel, ['productId'])
    const mainMethodURL = `clients/products/listing_reports/${productId}?`

    super({
      getMainDataMethod: ClientModel.getListingReports,
      columnsModel,
      filtersFields,
      mainMethodURL,
      tableKey: DataGridTablesKeys.PRODUCT_LISTING_REPORTS,
    })

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]
    this.onChangeFullFieldMenuItem([productId], 'productId')
    this.getCurrentData()

    makeObservable(this, reportsViewConfig)
  }
}
