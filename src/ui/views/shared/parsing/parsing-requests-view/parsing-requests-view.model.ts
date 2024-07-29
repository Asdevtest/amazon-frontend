import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { ClientModel } from '@models/client-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { parsingRequestsViewColumns } from './parsing-requests-view.columns'
import {
  additionalFilterFields,
  additionalSearchFields,
  parsingRequestsViewConfig,
} from './parsing-requests-view.config'

export class ParsingRequestsViewModel extends DataGridFilterTableModel {
  constructor() {
    const columnsProps = {}
    const columnsModel = parsingRequestsViewColumns(columnsProps)
    const filtersFields = getFilterFields(columnsModel, additionalFilterFields)
    const mainMethodURL = 'clients/products/listing_reports?'

    super({
      getMainDataMethod: ClientModel.getListingReports,
      columnsModel,
      filtersFields,
      mainMethodURL,
      fieldsForSearch: additionalSearchFields,
      tableKey: DataGridTablesKeys.PRODUCT_LISTING_REPORTS,
    })

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]
    this.getCurrentData()

    makeObservable(this, parsingRequestsViewConfig)
  }
}
