import { makeObservable } from 'mobx'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { paginationModelInitialValue } from '@models/data-grid-table-model'
import { SellerBoardModel } from '@models/seller-board-model'

import { getParsingReportsModelSettings } from './helpers/get-parsing-reports-model-settings'
import { observerConfig } from './observer-config'
import { ParsingReportsType } from './parsing-reports.type'

export class ParsingReportsModel extends DataGridFilterTableModel {
  table: ParsingReportsType = ParsingReportsType.BUSINESS_REPORTS

  constructor() {
    const { columnsModel, filtersFields, mainMethodURL, sortModel } = getParsingReportsModelSettings(
      ParsingReportsType.BUSINESS_REPORTS,
    )

    const defaultGetCurrentDataOptions = () => ({
      table: this.table,
    })

    super({
      getMainDataMethod: SellerBoardModel.getIntegrationsReports,
      columnsModel,
      filtersFields,
      mainMethodURL,
      fieldsForSearch: [],
      tableKey: ParsingReportsType.BUSINESS_REPORTS,
      defaultGetCurrentDataOptions,
      defaultSortModel: sortModel,
    })

    makeObservable(this, observerConfig)

    this.getTableSettingsPreset()
  }

  onChangeActiveTable(value: ParsingReportsType) {
    const { columnsModel, filtersFields, mainMethodURL, sortModel } = getParsingReportsModelSettings(value)

    this.table = value
    this.tableKey = value
    this.columnsModel = columnsModel
    this.defaultColumnsModel = columnsModel
    this.filtersFields = filtersFields
    this.mainMethodURL = mainMethodURL
    this.setColumnMenuSettings(filtersFields)

    this.sortModel = sortModel
    this.paginationModel = paginationModelInitialValue
    this.setDefaultPinnedColumns()

    this.getTableSettingsPreset()
  }
}
