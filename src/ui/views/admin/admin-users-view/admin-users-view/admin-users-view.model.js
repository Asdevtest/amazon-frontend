/* eslint-disable no-unused-vars */
import {action, makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {AdministratorModel} from '@models/administrator-model'

import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'

export class AdminUsersViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  users = []

  drawerOpen = false
  curPage = 1
  rowsPerPage = 5
  selectedUser = undefined
  editUserFormFields = undefined
  showEditUserModal = false
  showPermissionModal = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onClickEditUser(user) {
    this.selectedUser = user
    this.editUserFormFields = {...user}
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
    this.curPage = Number(e.target.textContent)
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
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
      runInAction(() => {
        this.users = result
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
      const data = getObjectFilteredByKeyArrayBlackList(this.editUserFormFields, ['_id'])
      await AdministratorModel.updateUser(this.selectedUser._id, data)
      const result = await AdministratorModel.getUsers()
      runInAction(() => {
        this.users = result
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error?.body?.message || error
    }
  }
}
