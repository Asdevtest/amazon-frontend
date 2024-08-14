import { makeObservable } from 'mobx'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { SellerBoardModel } from '@models/seller-board-model'

import { observerConfig } from './observer-config'
import { ParsingReportsType } from './parsing-reports.type'

export class ParsingReportsModel extends DataGridFilterTableModel {
  table: ParsingReportsType = ParsingReportsType.BUSINESS_REPORTS

  constructor() {
    const defaultGetCurrentDataOptions = () => ({
      table: this.table,
    })

    super({
      getMainDataMethod: SellerBoardModel.getIntegrationsReports,
      columnsModel: [],
      filtersFields: [],
      mainMethodURL: 'integrations/reports',
      fieldsForSearch: [],
      tableKey: ParsingReportsType.BUSINESS_REPORTS,
      defaultGetCurrentDataOptions,
    })

    // additionalPropertiesColumnMenuSettings,
    // additionalPropertiesGetFilters,
    // operatorsSettings,
    // defaultFilterParams,
    makeObservable(this, observerConfig)

    this.sortModel = [{ field: 'unitsOrdered', sort: 'desc' }]

    this.getDataGridState()
    this.getCurrentData()
  }

  onChangeActiveTable(value: ParsingReportsType) {
    this.table = value
  }
}
