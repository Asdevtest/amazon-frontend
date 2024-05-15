import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { ClientModel } from '@models/client-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { reportsViewColumns } from './reports-view.columns'
import { reportsViewConfig } from './reports-view.config'

export class ReportsViewModel extends DataGridFilterTableModel {
  get rows() {
    return this.currentData
  }
  constructor() {
    const columnsModel = reportsViewColumns()
    const filtersFields = getFilterFields(columnsModel)

    super({
      getMainDataMethod: ClientModel.getListingReports,
      columnsModel,
      filtersFields,
      mainMethodURL: '',
      tableKey: DataGridTablesKeys.LISTING_REPORTS,
    })

    this.getDataGridState()
    this.getCurrentData()

    makeObservable(this, reportsViewConfig)
  }
}
