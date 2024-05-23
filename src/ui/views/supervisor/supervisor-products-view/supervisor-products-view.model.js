import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { SupervisorModel } from '@models/supervisor-model'
import { UserModel } from '@models/user-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { supervisorProductsViewColumns } from './supervisor-products-columns'
import { additionalFields, supervisorProductsConfig } from './supervisor-products-view.config'
import { filtersFields } from './supervisor-products-view.constants'

export class SupervisorProductsViewModel extends DataGridFilterTableModel {
  switcherFilterStatuses = []
  showProductModal = false

  get userInfo() {
    return UserModel.userInfo
  }
  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  constructor() {
    const additionalPropertiesColumnMenuSettings = {
      orderedYesNoFilterData: {
        yes: true,
        no: true,
        handleFilters: (yes, no) => {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            orderedYesNoFilterData: {
              ...this.columnMenuSettings.orderedYesNoFilterData,
              yes,
              no,
            },
          }
          this.getCurrentData()
        },
      },
    }
    const additionalPropertiesGetFilters = () => ({
      ...(this.switcherFilterStatuses.length > 0 && {
        status: { $eq: this.switcherFilterStatuses.join(',') },
      }),
      ...(this.columnMenuSettings.orderedYesNoFilterData.yes && this.columnMenuSettings.orderedYesNoFilterData.no
        ? {}
        : {
            ordered: { $eq: this.columnMenuSettings.orderedYesNoFilterData.yes },
          }),
    })
    const rowHandlers = {
      onClickTableRow: id => this.onClickTableRow(id),
    }
    const columns = supervisorProductsViewColumns(rowHandlers)

    const filtersFields = getFilterFields(columns, additionalFields)

    super({
      getMainDataMethod: SupervisorModel.getProductsMyPag,
      columnsModel: columns,
      filtersFields,
      mainMethodURL: 'supervisors/products/pag/my?',
      fieldsForSearch: additionalFields,
      tableKey: DataGridTablesKeys.SUPERVISOR_PRODUCTS,
      additionalPropertiesColumnMenuSettings,
      additionalPropertiesGetFilters,
    })
    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]
    this.initHistory()
    this.getDataGridState()
    this.getCurrentData()

    makeObservable(this, supervisorProductsConfig)
  }

  onClickStatusFilterButton(statuses) {
    this.switcherFilterStatuses = statuses

    this.getCurrentData()
  }

  onClickTableRow(id) {
    const win = window.open(`${window.location.origin}/supervisor/products/product?product-id=${id}`, '_blank')
    win.focus()
  }

  onClickProductModal(id) {
    if (id) {
      this.history.push(`/supervisor/products?product-id=${id}`)
    } else {
      this.history.push(`/supervisor/products`)
    }

    this.onTriggerOpenModal('showProductModal')
  }

  onToggleModal(modal) {
    this[modal] = !this[modal]
  }
}
