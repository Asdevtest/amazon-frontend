import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'

import {ClientModel} from '@models/client-model'
import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {clientExchangeViewColumns} from '@components/table-columns/client/client-exchange-columns'

import {clientProductsDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {onSubmitPostImages} from '@utils/upload-files'

const textConsts = getLocalizedTexts(texts, 'en').clientExchangeView

export class ClientExchangeViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  productsVacant = []
  dataToPay = {}
  storekeepers = []

  volumeWeightCoefficient = undefined

  destinations = []

  drawerOpen = false
  showPrivateLabelModal = false
  showConfirmPayModal = false
  showSuccessModal = false
  showWarningModal = false

  showWarningModalText = ''

  selectedProduct = {}
  uploadedFiles = []

  rowHandlers = {
    onClickLaunchPrivateLabelBtn: item => this.onClickLaunchPrivateLabelBtn(item),
  }

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
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
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = clientExchangeViewColumns(this.rowHandlers).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
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
        this.productsVacant = clientProductsDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )
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
      this.uploadedFiles = []

      if (orderObject.tmpBarCode.length) {
        await onSubmitPostImages.call(this, {images: orderObject.tmpBarCode, type: 'uploadedFiles'})
      }

      const createorderData = {
        amount: orderObject.amount,
        deliveryMethod: orderObject.deliveryMethod,
        warehouse: orderObject.warehouse,
        clientComment: orderObject.clientComment,
        productId: orderObject.productId,
        storekeeperId: orderObject.storekeeperId,
        destinationId: orderObject.destinationId,
        logicsTariffId: orderObject.logicsTariffId,
      }
      await ClientModel.createOrder(createorderData)

      if (this.uploadedFiles.length) {
        await ClientModel.updateProductBarCode(orderObject.productId, {barCode: this.uploadedFiles[0]})
      }

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

      const requestProduct = getObjectFilteredByKeyArrayBlackList({...order}, [
        'tmpResearcherName',
        'tmpBuyerName',
        'tmpStrategyStatus',
      ])

      await this.createOrder(requestProduct)
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

  async openCreateOrder() {
    try {
      const storekeepers = await StorekeeperModel.getStorekeepers()

      const destinations = await ClientModel.getDestinations()

      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.storekeepers = storekeepers

        this.destinations = destinations

        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })

      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onClickBuyProductBtn(product) {
    try {
      await ClientModel.makePayments([product._id])

      this.onTriggerOpenModal('showConfirmPayModal')

      this.openCreateOrder()

      this.updateUserInfo()
      this.loadData()
    } catch (error) {
      this.showWarningModalText = textConsts.productNoBuy
      this.onTriggerOpenModal('showWarningModal')

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

    this.showWarningModalText = textConsts.productIsMoveToInventoryTitle
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
