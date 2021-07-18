import {action, makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {ADMIN_USERS_INITIAL_DATA} from '@constants/mocks'

import {AdministratorModel} from '@models/administrator-model'

import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'

export class AdminUsersViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  users = [...ADMIN_USERS_INITIAL_DATA]
  editUserFormFields = undefined
  selectionModel = undefined

  drawerOpen = false
  curPage = 0
  rowsPerPage = 15
  showEditUserModal = false
  showPermissionModal = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
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

  onClickBalance() {
    this.history.push('/admin/user/user_id/balance')
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

  async getUsers() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.error = undefined
      const result = await AdministratorModel.getUsers()

      const usersData = result.map(user => ({...getObjectFilteredByKeyArrayBlackList(user, ['_id']), id: user._id}))

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
      const data = getObjectFilteredByKeyArrayBlackList(this.editUserFormFields, ['_id', 'id'])
      await AdministratorModel.updateUser(this.selectionModel, data)
      this.getUsers()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error?.body?.message || error
    }
  }
}
