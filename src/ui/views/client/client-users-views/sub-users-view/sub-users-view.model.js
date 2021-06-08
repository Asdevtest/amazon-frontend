import {makeAutoObservable, runInAction} from 'mobx'

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
  rowsPerPage = 5
  paginationPage = 1

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
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

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangePagination(e, value) {
    this.paginationPge = value
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.paginationPge = 1
  }

  async getProductsMy() {
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
}
