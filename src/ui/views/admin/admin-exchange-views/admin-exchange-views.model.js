import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {ProductStatus, ProductStatusByKey} from '@constants/product-status'

import {AdministratorModel} from '@models/administrator-model'

import {copyToClipBoard} from '@utils/clipboard'

const productsStatusBySubCategory = {
  0: ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS],
  1: ProductStatusByKey[ProductStatus.PURCHASED_PRODUCT],
  2: ProductStatusByKey[ProductStatus.RESEARCHER_FOUND_SUPPLIER],
  3: ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH],
  4: ProductStatusByKey[ProductStatus.BUYER_FOUND_SUPPLIER],
  5: ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER],
  6: ProductStatusByKey[ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE],
  7: ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP],
}

export class AdminExchangeViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  activeSubCategory = 0
  currentProductsData = []

  selectionModel = undefined

  drawerOpen = false
  rowsPerPage = 15
  curPage = 0
  showSetBarcodeModal = false
  selectedProduct = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeSubCategory(value) {
    this.activeSubCategory = value
    this.getProductsByStatus(value)
  }

  onSelectionModel(model) {
    this.selectionModel = model
  }

  getCurrentData() {
    return toJS(this.currentProductsData)
  }

  async getProductsByStatus(activeSubCategory) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      const result = await AdministratorModel.getProductsByStatus({
        status: productsStatusBySubCategory[activeSubCategory],
      })

      runInAction(() => {
        this.currentProductsData = result
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error
      this.currentProductsData = []
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
