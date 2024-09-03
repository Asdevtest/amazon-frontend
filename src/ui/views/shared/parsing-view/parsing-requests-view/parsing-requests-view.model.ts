import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { ParserModel } from '@models/parser-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { parsingRequestsViewColumns } from './parsing-requests-view.columns'
import { ColumnsProps, additionalSearchFields, parsingRequestsViewConfig } from './parsing-requests-view.config'

export class ParsingRequestsViewModel extends DataGridFilterTableModel {
  constructor() {
    const columnsProps: ColumnsProps = {
      onApproveProfile: (id, profileId) => this.onApproveProfile(id, profileId),
      onRejectProfile: id => this.onRejectProfile(id),
    }
    const columnsModel = parsingRequestsViewColumns(columnsProps)
    const filtersFields = getFilterFields(columnsModel)
    const mainMethodURL = 'integrations/parser/admins/profiles/receiving_requests?'

    super({
      getMainDataMethod: ParserModel.getRequests,
      columnsModel,
      filtersFields,
      mainMethodURL,
      fieldsForSearch: additionalSearchFields,
      tableKey: DataGridTablesKeys.PARSING_REQUESTS,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })
    makeObservable(this, parsingRequestsViewConfig)

    this.getTableSettingsPreset()
  }

  async onApproveProfile(id: string, profileId: string) {
    try {
      await ParserModel.onApproveProfile(id, profileId)

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onRejectProfile(id: string) {
    try {
      await ParserModel.onRejectProfile(id)

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }
}
