import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { BoxesModel } from '@models/boxes-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { IBox } from '@typings/models/boxes/box'

import { adminWarehouseBoxesColumns } from './admin-warehouse-boxes-columns'
import { observerConfig } from './observer-config'

export class AdminWarehouseBoxesViewModel extends DataGridFilterTableModel {
  showBoxViewModal = false

  curBox: string = ''

  constructor() {
    const columnsModel = adminWarehouseBoxesColumns()

    super({
      getMainDataMethod: BoxesModel.getBoxes,
      columnsModel,
      filtersFields: getFilterFields(columnsModel, ['skuByClient', 'amazonTitle']),
      mainMethodURL: 'boxes?',
      fieldsForSearch: ['asin', 'skuByClient', 'amazonTitle'],
      tableKey: DataGridTablesKeys.ADMIN_BOXES,
    })

    makeObservable(this, observerConfig)

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]

    this.getDataGridState()
    this.getCurrentData()
  }

  async setCurrentOpenedBox(row: IBox) {
    try {
      this.curBox = row._id

      this.onTriggerOpenModal('showBoxViewModal')
    } catch (error) {
      console.error(error)
    }
  }
}
