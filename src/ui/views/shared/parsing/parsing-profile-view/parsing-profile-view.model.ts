import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { ClientModel } from '@models/client-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { parsingProdileViewColumns } from './parsing-profile-view.columns'
import { additionalFilterFields, additionalSearchFields, parsingProdileViewConfig } from './parsing-profile-view.config'

export class ParsingProdileViewModel extends DataGridFilterTableModel {
  constructor() {
    const columnsProps = {}
    const columnsModel = parsingProdileViewColumns(columnsProps)
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

    makeObservable(this, parsingProdileViewConfig)
  }
}
