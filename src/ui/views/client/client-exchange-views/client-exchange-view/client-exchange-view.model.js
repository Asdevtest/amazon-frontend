import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {ClientModel} from '@models/client-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {clientExchangeViewColumns} from '@components/table-columns/client/client-exchange-columns'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

const fieldsOfProductAllowedToUpdate = ['barCode']
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

  selectedProduct = {}

  rowHandlers = {
    onClickLaunchPrivateLabelBtn: item => this.onClickLaunchPrivateLabelBtn(item),
  }

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'standart'
  columnsModel = clientExchangeViewColumns(this.rowHandlers)

  showOrderModal = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  onDoubleClickBarcode = item => {
    this.setSelectedProduct(item)
    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  async onSaveProductData(productId, updateProductData) {
    try {
      const updateProductDataFiltered = getObjectFilteredByKeyArrayWhiteList(
        toJS(updateProductData),
        fieldsOfProductAllowedToUpdate,
        true,
      )

      await ClientModel.updateProduct(productId, updateProductDataFiltered)
      await this.loadData()
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_EXCHANGE)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_EXCHANGE]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = clientExchangeViewColumns(this.rowHandlers).map(el => ({
        ...el,
        hide: state.columns.lookup[el.field].hide,
      }))
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
        this.productsVacant = result.sort(sortObjectsArrayByFiledDate('checkedAt')).map(item => ({
          ...item,
          tmpResearcherName: item.createdBy.name,
          tmpBuyerName: item.buyer.name,
        }))
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
    this.onTriggerOpenModal('showConfirmPayModal')
  }

  async createOrder(orderObject) {
    try {
      const createorderData = {
        status: 0,
        amount: orderObject.amount,
        deliveryMethod: orderObject.deliveryMethod,
        warehouse: orderObject.warehouse,
        clientComment: orderObject.clientComment,
        productId: orderObject.productId,
      }
      await ClientModel.createOrder(createorderData)
      this.selectedProduct = {}
      await this.updateUserInfo()
    } catch (error) {
      console.log(error)
      this.error = error
      throw new Error('Failed to create order')
    }
  }

  async onLaunchPrivateLabel(order) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const requestProduct = getObjectFilteredByKeyArrayBlackList({...order}, ['tmpResearcherName', 'tmpBuyerName'])

      await this.createOrder(requestProduct)
      await this.onSaveProductData(requestProduct.productId, {barCode: requestProduct.barCode})
      this.setRequestStatus(loadingStatuses.success)

      this.onTriggerOpenModal('showOrderModal')
      this.onTriggerOpenModal('showSuccessModal')

      this.loadData()
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onClickBuyProductBtn(product) {
    try {
      console.log('product ', product)
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
    this.onTriggerOpenModal('showOrderModal')

    this.selectedProduct = {}
    this.onTriggerOpenModal('showWarningModal')
  }

  onClickOrderNowBtn = orderData => {
    this.onTriggerOpenModal('showOrderModal')

    this.onLaunchPrivateLabel(orderData[0])
  }

  onChangeCurPage(e) {
    this.curPage = e
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }
}
