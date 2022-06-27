import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {ClientModel} from '@models/client-model'
import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {clientExchangeViewColumns} from '@components/table-columns/client/client-exchange-columns'

import {clientProductsDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

export class ClientExchangeViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  productsVacant = []
  dataToPay = {}
  storekeepers = []

  volumeWeightCoefficient = undefined

  destinations = []

  ordersDataStateToSubmit = undefined

  drawerOpen = false
  showPrivateLabelModal = false
  showConfirmModal = false
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

  confirmModalSettings = {
    isWarning: false,
    confirmTitle: '',
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()
    }
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
      this.getDataGridState()
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

    this.confirmModalSettings = {
      isWarning: false,
      confirmTitle: t(TranslationKey['You buy a product card, are you sure?']),
      confirmMessage: `${t(TranslationKey['You will be charged'])} (${
        this.selectedProduct && toFixedWithDollarSign(this.selectedProduct.priceForClient, 2)
      })?`,
      onClickConfirm: () => this.onClickBuyProductBtn(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async createOrder(orderObject) {
    try {
      this.uploadedFiles = []

      if (orderObject.tmpBarCode.length) {
        await onSubmitPostImages.call(this, {images: orderObject.tmpBarCode, type: 'uploadedFiles'})
      } else if (!orderObject.barCode) {
        await ClientModel.updateProductBarCode(orderObject.productId, {barCode: null})
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

  async onLaunchPrivateLabel() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const requestProduct = getObjectFilteredByKeyArrayBlackList({...this.ordersDataStateToSubmit}, [
        'tmpResearcherName',
        'tmpBuyerName',
        'tmpStrategyStatus',
      ])

      await this.createOrder(requestProduct)
      this.setRequestStatus(loadingStatuses.success)

      this.onTriggerOpenModal('showOrderModal')
      this.onTriggerOpenModal('showSuccessModal')

      this.onTriggerOpenModal('showConfirmModal')

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

  async onClickBuyProductBtn() {
    try {
      await ClientModel.makePayments([this.selectedProduct._id])

      this.onTriggerOpenModal('showConfirmModal')

      this.openCreateOrder()

      this.updateUserInfo()
      this.loadData()
    } catch (error) {
      this.showWarningModalText = t(TranslationKey["You can't buy the product"])
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

    this.showWarningModalText = t(TranslationKey['This item has been moved to Inventory'])
    this.onTriggerOpenModal('showWarningModal')
  }

  onClickOrderNowBtn = (orderData, totalOrdersCost) => {
    this.ordersDataStateToSubmit = orderData[0]

    this.confirmModalSettings = {
      isWarning: false,
      confirmTitle: t(TranslationKey['You are making an order, are you sure?']),
      confirmMessage: `${t(TranslationKey['Total amount'])}: ${totalOrdersCost}. ${t(
        TranslationKey['Confirm order'],
      )}?`,
      onClickConfirm: () => this.onLaunchPrivateLabel(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onChangeCurPage(e) {
    this.curPage = e
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }
}
