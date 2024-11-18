import { RadioChangeEvent } from 'antd'
import { makeObservable, runInAction } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { SupplierModel } from '@models/supplier-model'
import { SupplierV2Model } from '@models/supplier-v2-model/supplier-v2-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { observerConfig } from './observer.config'
import { suppliersViewColumns } from './suppliers-view.columns'
import { IHandlers, TableView } from './suppliers-view.type'

export class SuppliersViewModel extends DataGridFilterTableModel {
  currentTable: TableView = TableView.SUPLLIERS

  supplierIdToEdit: string = ''

  showAddSupplierModal: boolean = false
  showAddSupplierProductModal: boolean = false

  constructor() {
    const handlers: IHandlers = {
      onClickOpenInNewTab: (link: string) => this.onClickOpenInNewTab(link),
      onClickEdit: (id: string) => this.onClickEdit(id),
      onClickDelete: (id: string) => this.onClickDelete(id),
    }

    const columnsModel = suppliersViewColumns(handlers)

    super({
      getMainDataMethod: SupplierV2Model?.getSuppliers,
      columnsModel,
      filtersFields: getFilterFields(columnsModel, ['amazonTitle', 'skuByClient']),
      mainMethodURL: 'v2/suppliers?',
      fieldsForSearch: [],
      tableKey: DataGridTablesKeys.BUYER_SUPPLIERS,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })
    makeObservable(this, observerConfig)
    this.initHistory()

    this.getTableSettingsPreset()
  }

  onChangeRadioButtonOption(event: RadioChangeEvent) {
    runInAction(() => {
      this.currentTable = event.target.value
    })
  }

  onClickCreateSupplier() {
    this.onTriggerOpenModal('showAddSupplierModal', true)
  }

  onClickOpenInNewTab(link: string) {
    this.history.push(link)
  }

  onClickEdit(id: string) {
    this.supplierIdToEdit = id
    this.onTriggerOpenModal('showAddSupplierModal', true)
  }

  async onClickDelete(id: string) {
    await SupplierModel?.removeSupplier(id)
    this.getCurrentData()
  }

  onCloseAddSupplierModal() {
    this.onTriggerOpenModal('showAddSupplierModal', false)
    this.supplierIdToEdit = ''
  }

  onClickAddSupplierProduct() {
    this.onTriggerOpenModal('showAddSupplierProductModal', true)
  }
  onCloseAddSupplierProductModal() {
    this.onTriggerOpenModal('showAddSupplierProductModal', false)
  }
}
