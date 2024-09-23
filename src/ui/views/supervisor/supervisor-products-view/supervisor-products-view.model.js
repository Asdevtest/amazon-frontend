import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { SupervisorModel } from '@models/supervisor-model'
import { UserModel } from '@models/user-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { supervisorProductsViewColumns } from './supervisor-products-view.columns'
import { additionalFields, supervisorProductsConfig } from './supervisor-products-view.config'

export class SupervisorProductsViewModel extends DataGridFilterTableModel {
  switcherFilterStatuses = null
  showProductModal = false

  get userInfo() {
    return UserModel.userInfo
  }

  get isSomeFilterOn() {
    const orderedYesNoFilterData = this.columnMenuSettings?.orderedYesNoFilterData

    return this.filtersFields.some(
      el =>
        this.columnMenuSettings[el]?.currentFilterData?.length ||
        !orderedYesNoFilterData.yes ||
        !orderedYesNoFilterData.no,
    )
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
      ...(this.columnMenuSettings.orderedYesNoFilterData.yes && this.columnMenuSettings.orderedYesNoFilterData.no
        ? {}
        : {
            ordered: { $eq: this.columnMenuSettings.orderedYesNoFilterData.yes },
          }),
    })
    const rowHandlers = {
      onClickTableRow: id => this.onClickTableRow(id),
      onClickTag: tag => this.setActiveProductsTagFromTable(tag),
    }
    const columns = supervisorProductsViewColumns(rowHandlers)
    const filtersFields = getFilterFields(columns, additionalFields)

    const defaultFilterParams = () => ({
      ...(this.switcherFilterStatuses ? { statusGroup: { $eq: this.switcherFilterStatuses } } : {}),
    })

    super({
      getMainDataMethod: SupervisorModel.getProductsMyPag,
      columnsModel: columns,
      filtersFields,
      mainMethodURL: 'supervisors/products/pag/my?',
      fieldsForSearch: additionalFields,
      tableKey: DataGridTablesKeys.SUPERVISOR_PRODUCTS,
      additionalPropertiesColumnMenuSettings,
      additionalPropertiesGetFilters,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
      defaultFilterParams,
    })
    makeObservable(this, supervisorProductsConfig)

    this.initHistory()

    this.getTableSettingsPreset()
  }

  onClickStatusFilterButton(value) {
    this.switcherFilterStatuses = value
    this.onChangeFullFieldMenuItem([], 'status')

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

  setActiveProductsTag(tags) {
    this.columnMenuSettings?.onChangeFullFieldMenuItem(tags, 'tags')
    this.columnMenuSettings?.onClickAccept()
  }

  setActiveProductsTagFromTable(tag) {
    const index = this.columnMenuSettings?.tags?.currentFilterData?.findIndex(
      currentTag => currentTag?._id === tag?._id,
    )

    const newTags = [...this.columnMenuSettings.tags.currentFilterData]

    if (index > -1) {
      newTags.splice(index, 1)
    } else {
      newTags.push(tag)
    }

    this.setActiveProductsTag(newTags)
  }
}
