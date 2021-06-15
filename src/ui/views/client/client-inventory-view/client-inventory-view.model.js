import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ClientModel} from '@models/client-model'

import {copyToClipBoard} from '@utils/clipboard'

export class ClientInventoryViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  productsPaid = []
  drawerOpen = false
  rowsPerPage = 5
  curPage = 1
  showSetBarcodeModal = false
  curProduct = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getProductsPaid()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getProductsPaid() {
    try {
      const result = await ClientModel.getProductsPaid()
      runInAction(() => {
        this.productsPaid = result
      })
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onClickBarcode = item => {
    if (item.barcode) {
      copyToClipBoard(item.barcode)
    } else {
      this.setCurProduct(item)
      this.onTriggerShowBarcodeModal()
    }
  }

  onClickExchange() {}

  onDoubleClickBarcode = item => {
    this.setCurProduct(item)
    this.onTriggerShowBarcodeModal()
  }

  onDeleteBarcode() {}

  onSaveBarcode() {}

  onChangeCurPage(e, value) {
    this.curPage = value
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

  setCurProduct(item) {
    this.curProduct = item
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
