import { makeObservable } from 'mobx'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { paginationModelInitialValue } from '@models/data-grid-table-model'
import { SellerBoardModel } from '@models/seller-board-model'

import { getParsingReportsModelSettings } from './helpers/get-parsing-reports-model-settings'
import { parsingReportsModelConfig } from './parsing-reports.config'
import { ParsingReportsModelParams, ParsingReportsType } from './parsing-reports.type'

export class ParsingReportsModel extends DataGridFilterTableModel {
  table: ParsingReportsType = ParsingReportsType.BUSINESS_REPORTS

  constructor({ table = ParsingReportsType.BUSINESS_REPORTS, productId }: ParsingReportsModelParams) {
    const { columnsModel, filtersFields, mainMethodURL, sortModel, fieldsForSearch } =
      getParsingReportsModelSettings(table)

    const defaultGetCurrentDataOptions = () => ({
      table: this.table,
    })

    const defaultFilterParams = () => {
      return {
        product: { $eq: productId },
      }
    }

    super({
      getMainDataMethod: SellerBoardModel.getIntegrationsReports,
      columnsModel,
      filtersFields,
      mainMethodURL,
      fieldsForSearch,
      tableKey: table,
      defaultGetCurrentDataOptions,
      defaultSortModel: sortModel,
      defaultColumnVisibilityModel: { client: false },
      defaultFilterParams,
    })
    makeObservable(this, parsingReportsModelConfig)

    this.table = table

    this.getTableSettingsPreset()
  }

  onChangeActiveTable(value: ParsingReportsType) {
    const { columnsModel, filtersFields, mainMethodURL, sortModel, fieldsForSearch } =
      getParsingReportsModelSettings(value)

    this.table = value
    this.tableKey = value
    this.columnsModel = columnsModel
    this.defaultColumnsModel = columnsModel
    this.filtersFields = filtersFields
    this.mainMethodURL = mainMethodURL
    this.fieldsForSearch = fieldsForSearch
    this.setColumnMenuSettings(filtersFields)
    this.sortModel = sortModel
    this.paginationModel = paginationModelInitialValue
    this.setDefaultPinnedColumns()
    this.getTableSettingsPreset()
  }
}
