import { RadioChangeEvent } from 'antd'
import { makeObservable, runInAction } from 'mobx'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { paginationModelInitialValue } from '@models/data-grid-table-model'
import { SupplierModel } from '@models/supplier-model'

import { getModelSettings } from './helpers/get-model-settings'
import { observerConfig } from './observer.config'
import { IHandlers, IHandlersCards, IHandlersSuppliers, TableView } from './suppliers-view.type'

export class SuppliersViewModel extends DataGridFilterTableModel {
  currentTable: TableView = TableView.SUPLLIERS

  tablesHandlers: Record<TableView, IHandlers>

  supplierIdToEdit: string = ''
  supplierCardIdToEdit: string = ''

  showAddSupplierModal: boolean = false
  showAddSupplierProductModal: boolean = false

  constructor() {
    const supplierHandlers: IHandlersSuppliers = {
      onClickOpenInNewTab: (link: string) => this.onClickOpenInNewTab(link),
      onClickEdit: (id: string) => this.onClickEdit(id),
      onClickDelete: (id: string) => this.onClickDelete(id),
    }
    const cardHandlers: IHandlersCards = {
      onClickEdit: (id: string) => this.onClickEditSupplierCard(id),
      onClickDelete: (id: string) => this.onClickEditSupplierCard(id),
    }

    const { getMainDataMethod, mainMethodURL, columnsModel, tableKey, filtersFields, sortModel, fieldsForSearch } =
      getModelSettings(TableView.SUPLLIERS, supplierHandlers)

    super({
      getMainDataMethod,
      columnsModel,
      filtersFields,
      mainMethodURL,
      fieldsForSearch,
      tableKey,
      defaultSortModel: sortModel,
    })
    makeObservable(this, observerConfig)

    this.tablesHandlers = {
      [TableView.SUPLLIERS]: supplierHandlers,
      [TableView.CARDS]: cardHandlers,
    }

    this.initHistory()
    this.getTableSettingsPreset()
  }

  onChangeRadioButtonOption(event: RadioChangeEvent) {
    const value = event.target.value as TableView

    runInAction(() => {
      this.currentTable = value
    })

    const { getMainDataMethod, mainMethodURL, columnsModel, tableKey, filtersFields, sortModel, fieldsForSearch } =
      getModelSettings(value, this.tablesHandlers[value])

    this.getMainDataMethod = getMainDataMethod
    this.tableKey = tableKey
    this.columnsModel = columnsModel
    this.defaultColumnsModel = columnsModel
    this.filtersFields = filtersFields
    this.mainMethodURL = mainMethodURL
    this.fieldsForSearch = fieldsForSearch
    this.setColumnMenuSettings(filtersFields)
    this.defaultSortModel = sortModel
    this.paginationModel = paginationModelInitialValue
    this.setDefaultPinnedColumns()
    this.getTableSettingsPreset()
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

  onClickEditSupplierCard(id: string) {
    this.supplierCardIdToEdit = id
    this.onClickAddSupplierProduct()
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
    this.supplierCardIdToEdit = ''
  }
}
