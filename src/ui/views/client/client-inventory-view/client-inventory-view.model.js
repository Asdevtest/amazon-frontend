import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ClientModel} from '@models/client-model'

import {copyToClipBoard} from '@utils/clipboard'
import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

const fieldsOfProductAllowedToUpdate = [
  'dirdecision',
  'researcherFine',
  'researcherFineComment',
  'supervisorFine',
  'supervisorFineComment',
  'barCode',
]

export class ClientInventoryViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  productsMy = []
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
        this.productsMy = result.sort(sortObjectsArrayByFiledDate('checkedat'))
      })
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onClickSaveBarcode(barCode) {
    await this.onSaveProductData(this.selectedProduct._id, {barCode})
    this.onTriggerShowBarcodeModal()
    this.selectedProduct = undefined
  }

  async onSaveProductData(productId, updateProductData) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      const updateProductDataFiltered = getObjectFilteredByKeyArrayWhiteList(
        toJS(updateProductData),
        fieldsOfProductAllowedToUpdate,
        true,
      )
      console.log('updateProductData ', updateProductDataFiltered)
      await ClientModel.updateProduct(productId, updateProductDataFiltered)
      this.setActionStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onClickBarcode = item => {
    if (item.barCode) {
      copyToClipBoard(item.barcCde)
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

  setSelectedProduct(item) {
    this.selectedProduct = item
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }
}
