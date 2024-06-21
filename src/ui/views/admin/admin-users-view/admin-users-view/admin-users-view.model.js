import { makeObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { AdministratorModel } from '@models/administrator-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { PermissionsModel } from '@models/permissions-model'
import { UserModel } from '@models/user-model'

import { adminUsersViewColumns } from '@components/table/table-columns/admin/users-columns'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { loadingStatus } from '@typings/enums/loading-status'

import { fieldsForSearch } from './admin-users-view.constants'
import { observerConfig } from './observer-config'

export class AdminUsersViewModel extends DataGridFilterTableModel {
  groupPermissions = []
  singlePermissions = []
  checkValidationNameOrEmail = {}
  availableSubUsers = undefined
  changeNameAndEmail = { email: '', name: '' }
  editUserFormFields = undefined
  rowSelectionModel = undefined
  switcherCondition = null

  submitEditData = undefined

  showConfirmModal = false
  showEditUserModal = false

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
      onClickEditUser: item => this.onClickEditUser(item),
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
    })
    makeObservable(this, observerConfig)

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]

    this.initHistory()

    this.getDataGridState()
    this.loadData()
  }

  async loadData() {
    try {
      this.getDataGridState()
      this.getCurrentData()
      this.getGroupPermissions()
      this.getSinglePermissions()
    } catch (error) {
      console.error(error)
    }
  }

  async getGroupPermissions() {
    try {
      const result = await PermissionsModel.getGroupPermissions()

      runInAction(() => {
        this.groupPermissions = result.sort((a, b) => a.role - b.role)
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getSinglePermissions() {
    try {
      const result = await PermissionsModel.getSinglePermissions()

      runInAction(() => {
        this.singlePermissions = result.sort((a, b) => a.role - b.role)
      })
    } catch (error) {
      console.error(error)
    }
  }

  async submitEditUserForm(data, sourceData) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      this.checkValidationNameOrEmail = await UserModel.isCheckUniqueUser({
        name: this.changeNameAndEmail.name,
        email: this.changeNameAndEmail.email,
      })

      runInAction(() => {
        this.submitEditData = { ...data, permissions: data.active && data.active !== 'false' ? data.permissions : [] } // удаляем пермишены если баним юзера

        this.availableSubUsers = undefined
      })

      if (sourceData.canByMasterUser === true && data.canByMasterUser === false) {
        this.availableSubUsers = !!(await AdministratorModel.getUsersById(this.rowSelectionModel)).subUsers.length
      }

      if (
        this.checkValidationNameOrEmail.nameIsUnique === false ||
        this.checkValidationNameOrEmail.emailIsUnique === false
      ) {
        return
      } else if (this.availableSubUsers) {
        this.onTriggerOpenModal('showConfirmModal')
      } else {
        await this.finalStepSubmitEditUserForm()
      }
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async finalStepSubmitEditUserForm() {
    try {
      await AdministratorModel.updateUser(this.rowSelectionModel, this.submitEditData)
      this.setRequestStatus(loadingStatus.SUCCESS)

      this.onTriggerOpenModal('showEditUserModal')

      await this.getCurrentData()

      runInAction(() => {
        this.changeNameAndEmail = { email: '', name: '' }
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickEditUser(row) {
    try {
      const result = await AdministratorModel.getUsersById(row._id)

      runInAction(() => {
        this.editUserFormFields = result
        this.showEditUserModal = !this.showEditUserModal
      })
    } catch (error) {
      console.error(error)
    }
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

  onClickChangeRole(value) {
    this.switcherCondition = value

    this.getCurrentData()
  }
}
