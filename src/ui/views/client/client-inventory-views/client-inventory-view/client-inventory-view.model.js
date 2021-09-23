import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {ClientModel} from '@models/client-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

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
  orders = []
  selectedRowIds = []

  drawerOpen = false
  showOrderModal = false
  showSuccessModal = false
  showSetBarcodeModal = false
  selectedProduct = undefined
  showSendOwnProductModal = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.CLIENT_INVENTORY)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_INVENTORY]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.curPage = state.pagination.page
      this.rowsPerPage = state.pagination.pageSize
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e.pageSize
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onSelectionModel(model) {
    console.log('model', model)

    this.selectedRowIds = model
  }

  getCurrentData() {
    return toJS(this.productsMy)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getProductsPaid()
      await this.getOrders()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getOrders() {
    try {
      const result = await ClientModel.getOrders()

      runInAction(() => {
        this.orders = result
      })
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
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

  onClickBarcode(item) {
    if (item.barCode) {
      copyToClipBoard(item.barcCde)
    } else {
      this.setSelectedProduct(item)
      this.onTriggerOpenModal('showSetBarcodeModal')
    }
  }

  async onSubmitOrderProductModal(ordersDataState) {
    try {
      for (let i = 0; i < ordersDataState.length; i++) {
        const product = ordersDataState[i]
        await this.createOrder(product)
      }

      this.onTriggerOpenModal('showSuccessModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async createOrder(orderObject) {
    try {
      await ClientModel.createOrder(orderObject)
      await this.updateUserInfo()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  onDoubleClickBarcode = item => {
    this.setSelectedProduct(item)
    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  async onDeleteBarcode(product) {
    await this.onSaveProductData(product._id, {barCode: ''})
  }

  onClickExchange(item) {
    this.history.push('/client/inventoryes/listing', {product: toJS(item)})
  }

  onChangeCurPage(e, value) {
    this.curPage = value
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

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }
}
