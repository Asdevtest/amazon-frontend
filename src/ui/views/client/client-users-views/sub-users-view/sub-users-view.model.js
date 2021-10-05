import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ClientModel} from '@models/client-model'

export class ClientSubUsersViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  subUsersData = []

  activeSubCategory = 1
  drawerOpen = false
  selected = null
  modalAddSubUser = false
  modalEditSubUser = false
  modalPermission = false
  rowsPerPage = 15
  paginationPage = 1

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getUsers()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getUsers() {
    try {
      const result = await ClientModel.getUsers()
      runInAction(() => {
        this.subUsersData = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onChangeModalEditSubUser() {
    this.modalEditSubUser = !this.modalEditSubUser
  }

  onChangeModalPermission() {
    this.modalPermission = !this.modalPermission
  }

  onChangeModalAddSubUser() {
    this.modalAddSubUser = !this.modalAddSubUser
  }

  onChangeDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangePagination(e, value) {
    this.paginationPge = value
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.paginationPge = 1
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
