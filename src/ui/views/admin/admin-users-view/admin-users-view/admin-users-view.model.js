import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {UserRoleCodeMap} from '@constants/user-roles'

import {AdministratorModel} from '@models/administrator-model'
import {PermissionsModel} from '@models/permissions-model'
import {SettingsModel} from '@models/settings-model'

import {adminUsersViewColumns} from '@components/table-columns/admin/users-columns'

import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class AdminUsersViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  users = []
  groupPermissions = []
  singlePermissions = []

  editUserFormFields = undefined
  selectionModel = undefined
  dataGridState = null

  rowHandlers = {
    onClickEditUser: () => this.onClickEditUser(),
    onClickBalance: item => this.onClickBalance(item),
  }

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'standart'
  columnsModel = adminUsersViewColumns(this.rowHandlers)

  drawerOpen = false

  showEditUserModal = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_USERS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_USERS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = adminUsersViewColumns(this.rowHandlers).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getUsers()

      this.getDataGridState()

      await this.getGroupPermissions()
      await this.getSinglePermissions()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getUsers() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.error = undefined
      const result = await AdministratorModel.getUsers()

      const usersData = await result.map(user => ({
        ...user,
        id: user._id,
        tmpRole: UserRoleCodeMap[user.role],
        tmpActive: user.active === true ? 'Active' : 'Banned',
      }))

      runInAction(() => {
        this.users = usersData
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error?.body?.message || error
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

  async submitEditUserForm(data) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.error = undefined

      await AdministratorModel.updateUser(this.selectionModel, data)

      this.setRequestStatus(loadingStatuses.success)

      this.onTriggerOpenModal('showEditUserModal')
      await this.getUsers()
      await this.getGroupPermissions()
      await this.getSinglePermissions()
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error?.body?.message || error
    }
  }

  getCurrentData() {
    return toJS(this.users)
  }

  onSelectionModel(model) {
    this.editUserFormFields = this.users.find(el => el.id === model)
    this.selectionModel = model
  }

  onClickEditUser() {
    this.showEditUserModal = !this.showEditUserModal
  }

  onClickBalance(userData) {
    this.history.push('/admin/user/user_id/balance', {user: userData})
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
