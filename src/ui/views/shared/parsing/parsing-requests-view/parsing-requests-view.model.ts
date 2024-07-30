import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { ParserModel } from '@models/parser-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { parsingRequestsViewColumns } from './parsing-requests-view.columns'
import { additionalSearchFields, parsingRequestsViewConfig } from './parsing-requests-view.config'

export class ParsingRequestsViewModel extends DataGridFilterTableModel {
  constructor() {
    const columnsProps = {}
    const columnsModel = parsingRequestsViewColumns()
    const filtersFields = getFilterFields(columnsModel)
    const mainMethodURL = 'integrations/parser/admins/profiles/receiving_requests?'

    super({
      getMainDataMethod: ParserModel.getRequests,
      columnsModel,
      filtersFields,
      mainMethodURL,
      fieldsForSearch: additionalSearchFields,
      tableKey: DataGridTablesKeys.PARSING_REQUESTS,
    })

    // this.getDataGridState()
    this.getCurrentData()

    makeObservable(this, parsingRequestsViewConfig)
  }
}
