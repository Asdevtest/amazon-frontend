import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {AdministratorModel} from '@models/administrator-model'
import {PermissionsModel} from '@models/permissions-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {adminUsersViewColumns} from '@components/table-columns/admin/users-columns'

import {adminUsersDataConverter} from '@utils/data-grid-data-converters'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class AdminUsersViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  users = []
  groupPermissions = []
  singlePermissions = []
  checkValidationNameOrEmail = {}
  availableSubUsers = undefined
  changeNameAndEmail = {email: '', name: ''}
  editUserFormFields = undefined
  selectionModel = undefined
  dataGridState = null

  submitEditData = undefined

  rowHandlers = {
    onClickEditUser: item => this.onClickEditUser(item),
    onClickBalance: item => this.onClickBalance(item),
  }

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = adminUsersViewColumns(this.rowHandlers)

  drawerOpen = false
  showConfirmModal = false
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
      this.filterModel = state.filter.filterModel
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

      const usersData = adminUsersDataConverter(result)

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

  async submitEditUserForm(data, sourceData) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.error = undefined
      this.checkValidationNameOrEmail = await UserModel.isCheckUniqueUser({
        name: this.changeNameAndEmail.name,
        email: this.changeNameAndEmail.email,
      })

      this.submitEditData = {...data, permissions: data.active && data.active !== 'false' ? data.permissions : []} // удаляем пермишены если баним юзера

      this.availableSubUsers = undefined

      if (sourceData.canByMasterUser === true && data.canByMasterUser === false) {
        this.availableSubUsers = !!(await AdministratorModel.getUsersById(this.selectionModel)).subUsers.length
      }

      if (this.checkValidationNameOrEmail.nameIsUnique || this.checkValidationNameOrEmail.emailIsUnique) {
        return
      } else if (this.availableSubUsers) {
        this.onTriggerOpenModal('showConfirmModal')
      } else {
        await this.finalStepSubmitEditUserForm()
      }
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error?.body?.message || error
    }
  }

  async finalStepSubmitEditUserForm() {
    try {
      await AdministratorModel.updateUser(this.selectionModel, this.submitEditData)
      this.setRequestStatus(loadingStatuses.success)

      this.onTriggerOpenModal('showEditUserModal')
      await this.getUsers()
      await this.getGroupPermissions()
      await this.getSinglePermissions()
      this.changeNameAndEmail = {email: '', name: ''}
    } catch (error) {
      console.log(error)
      this.error = error?.body?.message || error
    }
  }

  getCurrentData() {
    return toJS(this.users)
  }

  onSelectionModel(model) {
    this.selectionModel = model
  }

  async onClickEditUser(row) {
    try {
      const result = await AdministratorModel.getUsersById(row._id)

      this.editUserFormFields = result

      this.showEditUserModal = !this.showEditUserModal
    } catch (error) {
      console.log(error)
    }
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
