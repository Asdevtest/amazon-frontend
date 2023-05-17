import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid/data-grid-tables-keys'
import {loadingStatuses} from '@constants/statuses/loading-statuses'

import {AdministratorModel} from '@models/administrator-model'
import {PermissionsModel} from '@models/permissions-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {adminUsersViewColumns} from '@components/table/table-columns/admin/users-columns'

import {adminUsersDataConverter} from '@utils/data-grid-data-converters'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

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
  changeNameAndEmail = {email: '', name: ''}
  editUserFormFields = undefined
  selectionModel = undefined
  dataGridState = null

  submitEditData = undefined

  rowHandlers = {
    onClickEditUser: item => this.onClickEditUser(item),
    onClickBalance: item => this.onClickBalance(item),
    onClickUser: item => this.onClickUser(item),
  }

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = adminUsersViewColumns(this.rowHandlers)

  showConfirmModal = false
  showEditUserModal = false

  constructor({history}) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, {autoBind: true})
    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )
  }

  changeColumnsModel(newHideState) {
    runInAction(() => {
      this.columnsModel = this.columnsModel.map(el => ({
        ...el,
        hide: !!newHideState[el?.field],
      }))
    })
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()
    }
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
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
      runInAction(() => {
        this.sortModel = state.sorting.sortModel
        this.filterModel = state.filter.filterModel
        this.rowsPerPage = state.pagination.pageSize

        this.densityModel = state.density.value
        this.columnsModel = adminUsersViewColumns(this.rowHandlers).map(el => ({
          ...el,
          hide: state.columns?.lookup[el?.field]?.hide,
        }))
      })
    }
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
      await this.getUsers()

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
        this.submitEditData = {...data, permissions: data.active && data.active !== 'false' ? data.permissions : []} // удаляем пермишены если баним юзера

        this.availableSubUsers = undefined
      })

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
      runInAction(() => {
        this.error = error?.body?.message || error
      })
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
      runInAction(() => {
        this.changeNameAndEmail = {email: '', name: ''}
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
      this.selectionModel = model
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
      this.history.push('/admin/users/user', {user: result})
    } catch (error) {
      console.log(error)
    }
  }

  onClickBalance(userData) {
    this.history.push('/admin/users/balance', {user: userData})
  }

  onChangeCurPage(e) {
    runInAction(() => {
      this.curPage = e
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e
    })
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
