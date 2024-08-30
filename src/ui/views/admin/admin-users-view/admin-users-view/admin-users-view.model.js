import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { AdministratorModel } from '@models/administrator-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'

import { adminUsersViewColumns } from '@components/table/table-columns/admin/users-columns'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { adminUsersViewModelConfig, fieldsForSearch } from './admin-users-view.config'

export class AdminUsersViewModel extends DataGridFilterTableModel {
  switcherCondition = null

  constructor() {
    const additionalPropertiesGetFilters = () => {
      return !this.columnMenuSettings?.role?.currentFilterData?.length && this.switcherCondition
        ? {
            role: {
              $eq: this.switcherCondition,
            },
          }
        : {}
    }

    const rowHandlers = {
      onClickBalance: item => this.onClickBalance(item),
      onClickUser: item => this.onClickUser(item),
    }

    const columnsModel = adminUsersViewColumns(rowHandlers)

    super({
      getMainDataMethod: AdministratorModel.getUsers,
      columnsModel,
      filtersFields: getFilterFields(columnsModel),
      mainMethodURL: `admins/users/pag?`,
      fieldsForSearch,
      tableKey: DataGridTablesKeys.ADMIN_USERS,
      additionalPropertiesGetFilters,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })
    makeObservable(this, adminUsersViewModelConfig)

    this.initHistory()
    this.getTableSettingsPreset()
  }

  async onClickUser(userData) {
    try {
      const result = await AdministratorModel.getUsersById(userData._id)
      this.history.push('/admin/users/user', { user: result })
    } catch (error) {
      console.error(error)
    }
  }

  onClickBalance(userData) {
    this.history.push('/admin/users/balance', { user: userData })
  }

  onClickChangeRole(event) {
    const currentValue = event.target.value
    this.switcherCondition = currentValue

    this.getCurrentData()
  }
}
