import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {ClientModel} from '@models/client-model'
import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {clientOrdersViewColumns} from '@components/table-columns/client/client-orders-columns'

import {clientOrdersDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

export class ClientOrdersViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  error = undefined

  successModalText = ''
  nameSearchValue = ''
  orders = []
  baseNoConvertedOrders = []
  drawerOpen = false

  showOrderModal = false
  showSetBarcodeModal = false
  showConfirmModal = false
  showSuccessModal = false

  ordersDataStateToSubmit = undefined
  selectedProduct = undefined
  reorderOrder = undefined
  uploadedFiles = []

  storekeepers = []
  destinations = []
  volumeWeightCoefficient = undefined

  confirmModalSettings = {
    isWarning: false,
    confirmTitle: '',
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  rowHandlers = {
    onClickReorder: item => this.onClickReorder(item),
  }

  firstRowId = undefined
  startFilterModel = undefined
  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = clientOrdersViewColumns(this.rowHandlers, this.firstRowId)

  constructor({history, location}) {
    this.history = history

    if (location?.state?.dataGridFilter) {
      this.startFilterModel = location.state.dataGridFilter
    }

    makeAutoObservable(this, undefined, {autoBind: true})
    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )

    reaction(
      () => this.firstRowId,
      () => this.updateColumnsModel(),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()

      this.orders = clientOrdersDataConverter(this.baseNoConvertedOrders).sort(
        sortObjectsArrayByFiledDateWithParseISO('createdAt'),
      )
    }
  }

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setDataGridState(state) {
    this.firstRowId = state.sorting.sortedRows[0]

    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_ORDERS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_ORDERS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = this.startFilterModel
        ? {
            ...this.startFilterModel,
            items: this.startFilterModel.items.map(el => ({...el, value: el.value.map(e => t(e))})),
          }
        : state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = clientOrdersViewColumns(this.rowHandlers, this.firstRowId).map(el => ({
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
    this.selectedRowIds = model
  }

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(this.orders).filter(
        el =>
          el.originalData.product.amazonTitle?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el.originalData.product.skusByClient?.some(sku =>
            sku.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
          ) ||
          el.originalData.product.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
      )
    } else {
      return toJS(this.orders)
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      await this.getOrders()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async getOrders() {
    try {
      const result = await ClientModel.getOrders()

      runInAction(() => {
        this.baseNoConvertedOrders = result

        this.orders = clientOrdersDataConverter(result).sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
      })
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onClickReorder(item) {
    try {
      const storekeepers = await StorekeeperModel.getStorekeepers()

      const destinations = await ClientModel.getDestinations()

      const result = await UserModel.getPlatformSettings()

      const order = await ClientModel.getOrderById(item._id)

      runInAction(() => {
        this.storekeepers = storekeepers

        this.destinations = destinations

        this.volumeWeightCoefficient = result.volumeWeightCoefficient

        this.reorderOrder = order
      })

      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.log(error)
    }
  }

  onDoubleClickBarcode = item => {
    this.selectedProduct = item

    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  async onClickSaveBarcode(tmpBarCode) {
    this.uploadedFiles = []

    if (tmpBarCode.length) {
      await onSubmitPostImages.call(this, {images: tmpBarCode, type: 'uploadedFiles'})
    }

    await ClientModel.updateProductBarCode(this.selectedProduct._id, {barCode: this.uploadedFiles[0]})

    this.onTriggerOpenModal('showSetBarcodeModal')
    runInAction(() => {
      this.selectedProduct = undefined
    })
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  async createOrder(orderObject) {
    try {
      await ClientModel.createOrder(getObjectFilteredByKeyArrayBlackList(orderObject, ['barCode', 'tmpBarCode']))

      await this.updateUserInfo()
    } catch (error) {
      console.log(error)

      this.showInfoModalTitle = `${t(TranslationKey["You can't order"])} "${error.body.message}"`
      this.onTriggerOpenModal('showInfoModal')
      this.error = error
    }
  }

  async onSubmitOrderProductModal() {
    try {
      this.error = undefined
      this.onTriggerOpenModal('showOrderModal')

      for (let i = 0; i < this.ordersDataStateToSubmit.length; i++) {
        const product = this.ordersDataStateToSubmit[i]

        this.uploadedFiles = []

        if (product.tmpBarCode.length) {
          await onSubmitPostImages.call(this, {images: product.tmpBarCode, type: 'uploadedFiles'})

          await ClientModel.updateProductBarCode(product.productId, {barCode: this.uploadedFiles[0]})
        } else if (!product.barCode) {
          await ClientModel.updateProductBarCode(product.productId, {barCode: null})
        }

        await this.createOrder(product)
      }

      this.loadData()

      if (!this.error) {
        this.successModalText = t(TranslationKey['The order has been created'])
        this.onTriggerOpenModal('showSuccessModal')
      }
      this.onTriggerOpenModal('showConfirmModal')
      // this.onTriggerOpenModal('showOrderModal')
      // const noProductBaseUpdate = true
      // await this.getProductsMy(noProductBaseUpdate)
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onConfirmSubmitOrderProductModal(ordersDataState, totalOrdersCost) {
    this.ordersDataStateToSubmit = ordersDataState

    this.confirmModalSettings = {
      isWarning: false,
      confirmTitle: t(TranslationKey['You are making an order, are you sure?']),
      confirmMessage: `${t(TranslationKey['Total amount'])}: ${totalOrdersCost}. ${t(
        TranslationKey['Confirm order'],
      )}?`,
      onClickConfirm: () => this.onSubmitOrderProductModal(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickTableRow(order) {
    this.history.push({
      pathname: '/client/orders/order',
      search: order.originalData._id,
    })
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }
}
