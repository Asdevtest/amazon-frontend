import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { AdministratorModel } from '@models/administrator-model'
import { PermissionsModel } from '@models/permissions-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { adminUsersViewColumns } from '@components/table/table-columns/admin/users-columns'

import { adminUsersDataConverter } from '@utils/data-grid-data-converters'

import { loadingStatus } from '@typings/enums/loading-status'

export class AdminUsersViewModel {
  history = undefined
  requestStatus = undefined

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

  rowCount = 0
  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = adminUsersViewColumns(this.rowHandlers)

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  showConfirmModal = false
  showEditUserModal = false

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

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
    this.nameSearchValue = e.target.value
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      this.getDataGridState()

      await Promise.all([this.getUsers(), this.getGroupPermissions(), this.getSinglePermissions()])

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async getUsers() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await AdministratorModel.getUsers()

      const usersData = adminUsersDataConverter(result?.data)

      runInAction(() => {
        this.users = usersData
        this.rowCount = usersData?.length
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
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

      await Promise.all([this.getUsers(), this.getGroupPermissions(), this.getSinglePermissions()])

      runInAction(() => {
        this.changeNameAndEmail = { email: '', name: '' }
      })
    } catch (error) {
      console.error(error)
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
    this.rowSelectionModel = model
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

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
