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
  selectedProducts = []
  drawerOpen = false
  rowsPerPage = 15
  curPage = 1
  showOrderModal = false
  showSetBarcodeModal = false
  selectedProduct = undefined
  showSendOwnProductModal = false

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
    this.onTriggerOpenModal('showSetBarcodeModal')
    runInAction(() => {
      this.selectedProduct = undefined
    })
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
      await this.loadData()
      this.setActionStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onTriggerCheckbox(productId) {
    const updatedselectedProducts = this.selectedProducts.includes(productId)
      ? this.selectedProducts.filter(_id => _id !== productId)
      : this.selectedProducts.concat(productId)
    this.selectedProducts = updatedselectedProducts
  }

  onClickBarcode(item) {
    if (item.barCode) {
      copyToClipBoard(item.barcCde)
    } else {
      this.setSelectedProduct(item)
      this.onTriggerOpenModal('showSetBarcodeModal')
    }
  }

  async onSubmitOrderProductModal(ordersDataState) {
    for (let i = 0; i < ordersDataState.length; i++) {
      const product = ordersDataState[i]
      await this.createOrder(product)
    }
    this.selectedProducts = []
  }

  async createOrder(orderObject) {
    try {
      await ClientModel.createOrder(orderObject)
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickExchange() {}

  onDoubleClickBarcode = item => {
    this.setSelectedProduct(item)
    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  async onDeleteBarcode(product) {
    await this.onSaveProductData(product._id, {barCode: ''})
  }

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

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
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
