import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { AdministratorModel } from '@models/administrator-model'
import { PermissionsModel } from '@models/permissions-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { adminUsersViewColumns } from '@components/table/table-columns/admin/users-columns'

import { adminUsersDataConverter } from '@utils/data-grid-data-converters'

export class AdminUsersViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  nameSearchValue = ''

  users = []
  groupPermissions = []
  singlePermissions = []
  checkValidationNameOrEmail = {}
  availableSubUsers = undefined
  changeNameAndEmail = { email: '', name: '' }
  editUserFormFields = undefined
  rowSelectionModel = undefined
  dataGridState = null

  submitEditData = undefined

  rowHandlers = {
    onClickEditUser: item => this.onClickEditUser(item),
    onClickBalance: item => this.onClickBalance(item),
    onClickUser: item => this.onClickUser(item),
  }

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = adminUsersViewColumns(this.rowHandlers)

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  showConfirmModal = false
  showEditUserModal = false

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })

    this.setDataGridState()
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_USERS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_USERS]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()

      await Promise.all([this.getUsers(), this.getGroupPermissions(), this.getSinglePermissions()])

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getUsers() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      runInAction(() => {
        this.error = undefined
      })
      const result = await AdministratorModel.getUsers()

      const usersData = adminUsersDataConverter(result)

      runInAction(() => {
        this.users = usersData
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      runInAction(() => {
        this.error = error?.body?.message || error
      })
    }
  }

  async getGroupPermissions() {
    try {
      const result = await PermissionsModel.getGroupPermissions()

      runInAction(() => {
        this.groupPermissions = result.sort((a, b) => a.role - b.role)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getSinglePermissions() {
    try {
      const result = await PermissionsModel.getSinglePermissions()

      runInAction(() => {
        this.singlePermissions = result.sort((a, b) => a.role - b.role)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async submitEditUserForm(data, sourceData) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      runInAction(() => {
        this.error = undefined
      })

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
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      runInAction(() => {
        this.error = error?.body?.message || error
      })
    }
  }

  async finalStepSubmitEditUserForm() {
    try {
      await AdministratorModel.updateUser(this.rowSelectionModel, this.submitEditData)
      this.setRequestStatus(loadingStatuses.success)

      this.onTriggerOpenModal('showEditUserModal')

      await Promise.all([this.getUsers(), this.getGroupPermissions(), this.getSinglePermissions()])

      runInAction(() => {
        this.changeNameAndEmail = { email: '', name: '' }
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error?.body?.message || error
      })
    }
  }

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(this.users).filter(
        user =>
          user.name.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          user.email.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
      )
    } else {
      return toJS(this.users)
    }
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.rowSelectionModel = model
    })
  }

  async onClickEditUser(row) {
    try {
      const result = await AdministratorModel.getUsersById(row._id)

      runInAction(() => {
        this.editUserFormFields = result
      })

      runInAction(() => {
        this.showEditUserModal = !this.showEditUserModal
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onClickUser(userData) {
    try {
      const result = await AdministratorModel.getUsersById(userData._id)
      this.history.push('/admin/users/user', { user: result })
    } catch (error) {
      console.log(error)
    }
  }

  onClickBalance(userData) {
    this.history.push('/admin/users/balance', { user: userData })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.setDataGridState()
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
