import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {ClientModel} from '@models/client-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'

export class ClientExchangeViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  productsVacant = []
  dataToPay = {}

  drawerOpen = false
  showPrivateLabelModal = false
  showConfirmPayModal = false
  showSuccessModal = false
  showWarningModal = false
  selectedProduct = undefined

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.CLIENT_EXCHANGE)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_EXCHANGE]

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
    this.selectionModel = model
  }

  getCurrentData() {
    return toJS(this.productsVacant)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getProductsVacant()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  async getProductsVacant() {
    try {
      const result = await ClientModel.getProductsVacant()
      runInAction(() => {
        this.productsVacant = result.sort(sortObjectsArrayByFiledDate('checkedat'))
      })
    } catch (error) {
      console.log(error)
      this.productsVacant = []
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onClickLaunchPrivateLabelBtn(product) {
    this.selectedProduct = product
  }

  async onLaunchPrivateLabel(product, orderData) {
    try {
      await this.createOrder(product, orderData)

      this.onTriggerOpenModal('showSuccessModal')

      this.loadData()
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async createOrder(product, orderData) {
    try {
      const createorderData = {
        status: 0,
        amount: orderData.amount,
        deliveryMethod: orderData.deliveryMethod,
        warehouse: orderData.warehouse,
        clientComment: orderData.clientComment,
        barCode: orderData.barCode,
        product: product._id,
      }
      const createOrderResult = await ClientModel.createOrder(createorderData)
      console.log('createOrderResult ', createOrderResult)
      await this.updateUserInfo()
      await this.loadData()
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onClickBuyProductBtn(product) {
    try {
      const pickUpProductResult = await ClientModel.pickupProduct(product._id)
      console.log('pickUpProductResult ', pickUpProductResult)
      const makePaymentsResult = await ClientModel.makePayments([product._id])
      console.log('makePaymentsResult ', makePaymentsResult)
      await this.updateUserInfo()
      this.loadData()
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  setDataToPay(data) {
    this.dataToPay = data
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onChangeManager(e) {
    this.modalManagerIndex = Number(e.target.value)
  }

  onChangeModalQty(e) {
    this.modalQty = Number(e.target.value)
  }

  onClickUsername() {
    this.history.push('/user/subusers')
  }

  onClickCancelBtn = () => {
    this.onTriggerPrivateLabelModal()
    this.selectedProduct = undefined
    this.onTriggerOpenModal('showWarningModal')
  }

  onClickOrderNowBtn = (product, orderData) => {
    this.onTriggerPrivateLabelModal()
    this.onLaunchPrivateLabel(product, orderData)
    this.selectedProduct = undefined
  }

  onChangeCurPage(e) {
    this.curPage = e.page
  }

  onTriggerPrivateLabelModal() {
    this.showPrivateLabelModal = !this.showPrivateLabelModal
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }
}
