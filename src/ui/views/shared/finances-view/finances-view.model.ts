import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { OtherModel } from '@models/other-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { financesViewColumns } from './finances-view.columns'
import { observerConfig } from './observer-config'

export class FinancesViewModel extends DataGridFilterTableModel {
  currentFinancesData = []

  constructor() {
    const columnsModel = financesViewColumns()

    super({
      getMainDataMethod: OtherModel.getFinancesPag,
      columnsModel,
      filtersFields: getFilterFields(columnsModel, ['skuByClient', 'amazonTitle']),
      mainMethodURL: 'other/payments/pag/my?',
      tableKey: DataGridTablesKeys.SHARED_FINANCES,
    })

    makeObservable(this, observerConfig)

    // getMainDataMethod: (...args: any) => any
    // columnsModel: GridColDef[]
    // tableKey?: string
    // fieldsForSearch?: string[]
    // defaultGetCurrentDataOptions?: any
    //   filtersFields: string[]
    // mainMethodURL: string
    // additionalPropertiesColumnMenuSettings?: any
    // additionalPropertiesGetFilters?: any
    // operatorsSettings?: {
    //   [key: string]: string
    // }

    this.sortModel = [{ field: 'createdAt', sort: 'desc' }]

    this.getDataGridState()

    this.getCurrentData()
  }
}
