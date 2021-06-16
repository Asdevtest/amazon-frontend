import {makeAutoObservable, runInAction} from 'mobx'

import {AdministratorModel} from '@models/administrator-model'

export class AdminOrdersAllViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  ordersData = []

  activeSubCategory = 2
  drawerOpen = false
  modalBarcode = false
  rowsPerPage = 5
  curPage = 1

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onTriggerBarcodeModal() {
    this.modalBarcode = !this.modalBarcode
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeCurPage = value => {
    this.setState({curPage: value})
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.paginationPge = 1
  }

  async getOrders() {
    try {
      const result = await AdministratorModel.getOrders()
      runInAction(() => {
        this.subUsersData = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }
}
