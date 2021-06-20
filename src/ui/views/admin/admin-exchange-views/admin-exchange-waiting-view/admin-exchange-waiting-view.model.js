import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {AdministratorModel} from '@models/administrator-model'

import {copyToClipBoard} from '@utils/clipboard'

export class AdminExchangeViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  productsWaiting = []
  productsVacant = []
  productsChecking = []

  drawerOpen = false
  rowsPerPage = 5
  curPage = 1
  showSetBarcodeModal = false
  selectedProduct = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getProductsWaiting()
      this.getProductsVacant()
      this.getProductsChecking()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getProductsWaiting() {
    try {
      const result = await AdministratorModel.getProductsWaiting()
      runInAction(() => {
        this.productsWaiting = result
      })
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async getProductsVacant() {
    try {
      const result = await AdministratorModel.getProductsVacant()
      runInAction(() => {
        this.productsVacant = result
      })
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async getProductsChecking() {
    try {
      const result = await AdministratorModel.getProductsChecking()
      runInAction(() => {
        this.productsChecking = result
      })
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onClickSaveBarcode = () => {}

  onClickBarcode = item => {
    if (item.barCode) {
      copyToClipBoard(item.barCode)
    } else {
      this.setSelectedProduct(item)
      this.onTriggerShowBarcodeModal()
    }
  }

  onClickExchange() {}

  onDoubleClickBarcode = item => {
    this.setSelectedProduct(item)
    this.onTriggerShowBarcodeModal()
  }

  onDeleteBarcode() {}

  onChangeCurPage(e) {
    this.curPage = e.page
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onTriggerShowBarcodeModal() {
    this.showSetBarcodeModal = !this.showSetBarcodeModal
  }

  setSelectedProduct(item) {
    this.selectedProduct = item
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
