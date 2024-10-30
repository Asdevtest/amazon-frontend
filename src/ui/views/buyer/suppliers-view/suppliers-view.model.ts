import { RadioChangeEvent } from 'antd'
import { makeObservable, runInAction } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { observerConfig } from './observer.config'
import { suppliersViewColumns } from './suppliers-view.columns'
import { TableView } from './suppliers-view.type'

export class SuppliersViewModel extends DataGridFilterTableModel {
  currentTable: TableView = TableView.SUPLLIERS

  showAddSupplierModal: boolean = false

  constructor() {
    const columnsModel = suppliersViewColumns()

    super({
      getMainDataMethod: () => console.log('call :>> '),
      columnsModel,
      filtersFields: getFilterFields(columnsModel, ['amazonTitle', 'skuByClient']),
      mainMethodURL: 'buyers/products/pag/my?',
      fieldsForSearch: [],
      tableKey: DataGridTablesKeys.BUYER_SUPPLIERS,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })

    makeObservable(this, observerConfig)
  }

  onChangeRadioButtonOption(event: RadioChangeEvent) {
    runInAction(() => {
      this.currentTable = event.target.value
    })
  }

  onClickCreateSupplier() {
    this.onTriggerOpenModal('showAddSupplierModal', true)
  }
}
