import {action, makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {UserRoleCodeMap} from '@constants/user-roles'

import {AdministratorModel} from '@models/administrator-model'
import {SettingsModel} from '@models/settings-model'

import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'

export class AdminUsersViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  users = []
  editUserFormFields = undefined
  selectionModel = undefined
  dataGridState = null

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15

  drawerOpen = false

  showEditUserModal = false
  showPermissionModal = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.ADMIN_USERS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_USERS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.curPage = state.pagination.page
      this.rowsPerPage = state.pagination.pageSize
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

  async submitEditUserForm() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.error = undefined
      const data = getObjectFilteredByKeyArrayBlackList(this.editUserFormFields, ['_id', 'id', 'createdAt'])
      await AdministratorModel.updateUser(this.selectionModel, data)
      await this.getUsers()
      this.setRequestStatus(loadingStatuses.success)
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

  onTriggerEditUserModal() {
    this.showEditUserModal = !this.showEditUserModal
  }

  onTriggerPermissionModal() {
    this.showPermissionModal = !this.showPermissionModal
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e.page
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e.pageSize
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeFormField = fieldName =>
    action(e => {
      this.editUserFormFields = {...this.editUserFormFields, [fieldName]: e.target.value}
    })
}
