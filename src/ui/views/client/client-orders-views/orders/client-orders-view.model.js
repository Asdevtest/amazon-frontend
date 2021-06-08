import {makeAutoObservable, runInAction} from 'mobx'

import {ClientModel} from '@models/client-model'

export class ClientOrdersViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  ordersData = []

  activeSubCategory = 2
  drawerOpen = false
  modalBarcode = false
  rowsPerPage = 5
  paginationPage = 1

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeModalBarcode() {
    this.modalBarcode = !this.modalBarcode
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

  async getOrders() {
    try {
      const result = await ClientModel.getOrders()
      runInAction(() => {
        this.subUsersData = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }
}
