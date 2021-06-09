import {makeAutoObservable, runInAction} from 'mobx'

import {ClientModel} from '@models/client-model'

import {copyToClipBoard} from '@utils/clipboard'

export class ClientInventoryViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  productsData = []

  drawerOpen = false
  rowsPerPage = 5
  paginationPage = 1
  showSetBarcodeModal = false
  curProduct = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onClickBarcode(item) {
    if (item.barcode) {
      copyToClipBoard(item.barcode)
    } else {
      this.setCurProduct(item)
      this.onTriggerShowBarcodeModal()
    }
  }

  onClickExchange = () => {}

  onDoubleClickBarcode(item) {
    this.setCurProduct(item)
    this.onTriggerShowBarcodeModal()
  }

  onDeleteBarcode = () => {}

  onSaveBarcode = () => {}

  onChangePagination(e, value) {
    this.paginationPge = value
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.paginationPge = 1
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

  async getProductsMy() {
    try {
      const result = await ClientModel.getProductsMy()
      runInAction(() => {
        this.productsData = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }
}
