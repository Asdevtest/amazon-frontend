import { RadioChangeEvent } from 'antd'
import { makeObservable, runInAction } from 'mobx'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { paginationModelInitialValue } from '@models/data-grid-table-model'
import { SupplierModel } from '@models/supplier-model'
import { SupplierV2Model } from '@models/supplier-v2-model/supplier-v2-model'

import { ISupplierV2 } from '@typings/models/suppliers/supplier-v2'

import { getModelSettings } from './helpers/get-model-settings'
import { observerConfig } from './observer.config'
import { IHandlers, IHandlersCards, IHandlersSuppliers, TableView } from './suppliers-view.type'

export class SuppliersViewModel extends DataGridFilterTableModel {
  currentTable: TableView

  isSupplierCardsActive: boolean = false

  tablesHandlers: Record<TableView, IHandlers>

  supplierIdToEdit: string = ''
  supplierCardIdToEdit: string = ''
  supplierIdToShow: string = ''

  showSupplierModal: boolean = false
  showAddSupplierModal: boolean = false
  showAddSupplierProductModal: boolean = false

  constructor(table?: TableView) {
    const initialTable = table || TableView.SUPLLIERS

    const supplierHandlers: IHandlersSuppliers = {
      onClickOpenInNewTab: (link: string) => this.onClickOpenInNewTab(link),
      onClickEdit: (id: string) => this.onClickEdit(id),
      onClickDelete: (id: string) => this.onClickDelete(id),
    }
    const cardHandlers: IHandlersCards = {
      onClickEdit: (id: string) => this.onClickEditSupplierCard(id),
      onClickDelete: (id: string) => this.onClickDeleteSupplierCard(id),
    }

    const initialHandlers = initialTable === TableView.SUPLLIERS ? supplierHandlers : cardHandlers

    const { getMainDataMethod, mainMethodURL, columnsModel, tableKey, filtersFields, sortModel, fieldsForSearch } =
      getModelSettings(initialTable, initialHandlers)

    const defaultFilterParams = () => {
      const isArchive = this.isSupplierCardsActive && this.currentTable === TableView.CARDS

      if (isArchive) {
        return {
          archive: {
            $eq: true,
          },
        }
      }

      return {}
    }

    super({
      getMainDataMethod,
      columnsModel,
      filtersFields,
      mainMethodURL,
      fieldsForSearch,
      tableKey,
      defaultSortModel: sortModel,
      defaultFilterParams,
    })
    makeObservable(this, observerConfig)

    this.currentTable = initialTable

    this.tablesHandlers = {
      [TableView.SUPLLIERS]: supplierHandlers,
      [TableView.CARDS]: cardHandlers,
    }

    this.initHistory()

    if (!table) {
      this.getTableSettingsPreset()
    }
  }

  onChangeRadioButtonOption(event: RadioChangeEvent) {
    const value = event.target.value as TableView

    runInAction(() => {
      this.currentTable = value
    })

    const { getMainDataMethod, mainMethodURL, columnsModel, tableKey, filtersFields, sortModel, fieldsForSearch } =
      getModelSettings(value, this.tablesHandlers[value])

    runInAction(() => {
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
      this.isSupplierCardsActive = false
    })
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
    try {
      await SupplierModel?.removeSupplier(id)
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
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

  async onClickDeleteSupplierCard(id: string) {
    try {
      await SupplierV2Model?.deleteSupplierCard(id)
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  onTriggerArchive() {
    runInAction(() => {
      this.isSupplierCardsActive = !this.isSupplierCardsActive
    })
    this.getCurrentData()
  }

  onOpenSupplierModal(supplier: ISupplierV2) {
    if (this.currentTable === TableView.CARDS) {
      return
    }

    this.supplierIdToShow = supplier._id
    this.onTriggerOpenModal('showSupplierModal', true)
  }
  onCloseSupplierModal() {
    this.supplierIdToShow = ''
    this.onTriggerOpenModal('showSupplierModal', false)
  }
}
