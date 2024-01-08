import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { routsPathes } from '@constants/navigation/routs-pathes'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { BoxesModel } from '@models/boxes-model'
import { ClientModel } from '@models/client-model'
import { GeneralModel } from '@models/general-model'
import { OrderModel } from '@models/order-model'
import { SettingsModel } from '@models/settings-model'
import { ShopModel } from '@models/shop-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { SwitcherConditions } from '@components/modals/my-order-modal/components/tabs/tabs.type'
import { clientOrdersViewColumns } from '@components/table/table-columns/client/client-orders-columns'

import { addIdDataConverter, clientOrdersDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { filtersFields } from './client-orders-view.constants'

export class ClientOrdersViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  nameSearchValue = ''
  orders = []
  baseNoConvertedOrders = []

  // НЕ было до создания фильтрации по статусам (3 строки)
  orderStatusDataBase = []
  chosenStatus = []
  filteredStatus = []

  get currentData() {
    return this.orders
  }
  selectedRowIds = []
  order = undefined
  orderBoxes = []

  showOrderModal = false
  showSetBarcodeModal = false
  showConfirmModal = false
  showCheckPendingOrderFormModal = false
  showMyOrderModal = false

  switcherCondition = SwitcherConditions.BASIC_INFORMATION

  existingProducts = []
  shopsData = []

  alertShieldSettings = {
    showAlertShield: false,
    alertShieldMessage: '',
  }

  selectedProduct = undefined
  reorderOrdersData = []
  uploadedFiles = []

  storekeepers = []
  destinations = []
  platformSettings = undefined

  onHover = null

  confirmModalSettings = {
    isWarning: false,
    confirmTitle: '',
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  rowHandlers = {
    onClickReorder: (item, isPending) => this.onClickReorder(item, isPending),
    onClickOpenNewTab: id => this.onClickOpenNewTab(id),
  }

  rowCount = 0
  startFilterModel = undefined
  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  amountLimit = 1000
  columnsModel = clientOrdersViewColumns(
    this.rowHandlers,
    () => this.columnMenuSettings,
    () => this.onHover,
  )

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }

  get isPendingOrdering() {
    return this.history.location.pathname === routsPathes.CLIENT_PENDING_ORDERS
  }

  // НЕ было до создания фильтрации по статусам

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.onLeaveColumnField()
      this.getOrders()
      this.getDataGridState()
    },

    filterRequestStatus: undefined,

    isFormedData: { isFormed: null, onChangeIsFormed: value => this.onChangeIsFormed(value) },

    ...dataGridFiltersInitializer(filtersFields),
  }

  constructor({ history }) {
    this.history = history

    if (history.location?.state?.dataGridFilter) {
      this.startFilterModel = history.location.state.dataGridFilter
    }

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async onClickFilterBtn(column) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const curShops = this.columnMenuSettings.shopId.currentFilterData?.map(shop => shop._id).join(',')
      const shopFilter = this.columnMenuSettings.shopId.currentFilterData && column !== 'shopId' ? curShops : null
      const isFormedFilter = this.columnMenuSettings.isFormedData.isFormed

      const orderStatus = this.filteredStatus.map(item => OrderStatusByKey[item]).join(',')

      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'orders'),
        column,
        `clients/pag/orders?filters=${this.getFilter(column)}${shopFilter ? ';&' + '[shopId][$eq]=' + shopFilter : ''}${
          isFormedFilter ? ';&' + 'isFormed=' + isFormedFilter : ''
        }${orderStatus ? ';&' + 'status=' + orderStatus : ''}`,
      )

      if (this.columnMenuSettings[column]) {
        runInAction(() => {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            [column]: { ...this.columnMenuSettings[column], filterData: data },
          }
        })
      }

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)

      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  getFilter(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(this.columnMenuSettings, this.nameSearchValue, exclusion, filtersFields, [
        'amazonTitle',
        'id',
        'asin',
        'skuByClient',
        'item',
      ]),
    )
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings[field].currentFilterData = value
  }

  onLeaveColumnField() {
    this.onHover = null
  }

  onClickResetFilters() {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      ...dataGridFiltersInitializer(filtersFields),
    }

    this.getOrders()
    this.getDataGridState()
  }

  onChangeIsFormed(value) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      isFormedData: {
        ...this.columnMenuSettings.isFormedData,
        isFormed: value,
      },
    }

    this.getOrders()
  }

  setDestinationsFavouritesItem(item) {
    SettingsModel.setDestinationsFavouritesItem(item)
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
    this.getOrders()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
    this.getOrders()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, this.getDataGridTableKey(this.history.location.pathname))
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[this.getDataGridTableKey(this.history.location.pathname)]

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(
        this.startFilterModel
          ? {
              ...this.startFilterModel,
              items: this.startFilterModel.items.map(el => ({ ...el, value: el.value.map(e => t(e)) })),
            }
          : state.filterModel,
      )
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    this.getOrders()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
    this.getOrders()
  }

  onSelectionModel(model) {
    this.selectedRowIds = model
  }

  async loadData() {
    try {
      this.setDefaultStatuses()
      this.getDataGridState()

      await this.getShops()
      await this.getOrders()

      this.getDestinations()
      this.getStorekeepers()
      this.getPlatformSettings()
    } catch (error) {
      console.log(error)
    }
  }

  async getShops() {
    try {
      const result = await ShopModel.getMyShopNames()

      runInAction(() => {
        this.shopsData = addIdDataConverter(result)
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  getDataGridTableKey = pathname => {
    if (pathname) {
      switch (pathname) {
        case routsPathes.CLIENT_ORDERS:
          return DataGridTablesKeys.CLIENT_ORDERS
        case routsPathes.CLIENT_PENDING_ORDERS:
          return DataGridTablesKeys.CLIENT_PENDING_ORDERS

        default:
          return DataGridTablesKeys.CLIENT_ORDERS
      }
    }
  }

  setOrderStatus = pathname => {
    if (pathname) {
      switch (pathname) {
        case routsPathes.CLIENT_ORDERS:
          return [
            OrderStatus.AT_PROCESS,
            OrderStatus.READY_TO_PROCESS,
            OrderStatus.READY_FOR_PAYMENT,
            OrderStatus.PAID_TO_SUPPLIER,
            OrderStatus.TRACK_NUMBER_ISSUED,
            OrderStatus.VERIFY_RECEIPT,
            OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE,
            OrderStatus.IN_STOCK,
            OrderStatus.CANCELED_BY_BUYER,
            OrderStatus.CANCELED_BY_CLIENT,
            OrderStatus.PARTIALLY_PAID,
          ]
        case routsPathes.CLIENT_PENDING_ORDERS:
          return [OrderStatus.FORMED, OrderStatus.PENDING, OrderStatus.READY_FOR_BUYOUT]

        default:
          return [OrderStatus.AT_PROCESS, OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]
      }
    }
  }

  setDefaultStatuses() {
    if (!this.chosenStatus.length) {
      this.filteredStatus = this.setOrderStatus(this.history.location.pathname)
    } else {
      this.filteredStatus = this.chosenStatus
    }

    this.orderStatusDataBase = this.setOrderStatus(this.history.location.pathname)
  }

  async onClickManyReorder() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      runInAction(() => {
        this.reorderOrdersData = []
      })

      const [storekeepers, destinations, result] = await Promise.all([
        StorekeeperModel.getStorekeepers(),
        ClientModel.getDestinations(),
        UserModel.getPlatformSettings(),
      ])

      for (let i = 0; i < this.selectedRowIds.length; i++) {
        const orderId = this.selectedRowIds[i]

        const order = await ClientModel.getOrderById(orderId)

        runInAction(() => {
          this.reorderOrdersData = [...this.reorderOrdersData, order]
        })
      }

      runInAction(() => {
        this.storekeepers = storekeepers
        this.destinations = destinations
        this.amountLimit = this.platformSettings = result
      })

      this.onTriggerOpenModal('showOrderModal')
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  onConfirmCancelManyReorder() {
    this.confirmModalSettings = {
      isWarning: true,
      confirmTitle: t(TranslationKey.Attention),
      confirmMessage: t(TranslationKey['Cancel selected orders']) + '?',
      onClickConfirm: () => this.onClickCancelManyReorder(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitCancelOrder(orderId) {
    try {
      await ClientModel.cancelOrder(orderId)
    } catch (error) {
      console.log(error)
    }
  }

  async onClickCancelManyReorder() {
    try {
      for (let i = 0; i < this.selectedRowIds.length; i++) {
        const orderId = this.selectedRowIds[i]
        await this.onSubmitCancelOrder(orderId)
      }

      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onClickReorder(item, isPending) {
    try {
      if (isPending) {
        await this.onClickContinueBtn(item)
        return
      }

      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const res = await OrderModel.checkPendingOrderByProductGuid(item?.product?._id)

      const resultWithoutCurrentOrder = res?.filter(order => order?._id !== item?._id)

      if (resultWithoutCurrentOrder?.length) {
        runInAction(() => {
          this.existingProducts = [
            {
              _id: item?._id,
              asin: item?.product?.asin,
              orders: resultWithoutCurrentOrder,
            },
          ]
        })

        this.onTriggerOpenModal('showCheckPendingOrderFormModal')
      } else {
        await this.onClickContinueBtn(item)
      }
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  async onClickContinueBtn(item) {
    try {
      const [storekeepers, destinations, result, order] = await Promise.all([
        StorekeeperModel.getStorekeepers(),
        ClientModel.getDestinations(),
        UserModel.getPlatformSettings(),
        ClientModel.getOrderById(item._id),
      ])

      runInAction(() => {
        this.storekeepers = storekeepers

        this.destinations = destinations

        this.platformSettings = result

        this.reorderOrdersData = [order]
      })

      this.onTriggerOpenModal('showOrderModal')

      if (this.showCheckPendingOrderFormModal) {
        this.onTriggerOpenModal('showCheckPendingOrderFormModal')
      }
    } catch (error) {
      console.log(error)
    }
  }

  onClickPandingOrder(id) {
    const win = window.open(`${window.location.origin}/client/my-orders/pending-orders/order?orderId=${id}`, '_blank')
    win.focus()
  }

  async getOrders() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const orderStatuses = this.filteredStatus.map(item => OrderStatusByKey[item]).join(',')
      const currentStatuses = this.columnMenuSettings.status?.currentFilterData.join(',')

      const result = await ClientModel.getOrdersPag({
        filters: this.getFilter(),

        status: this.columnMenuSettings.status?.currentFilterData.length ? currentStatuses : orderStatuses,

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : this.isPendingOrdering ? 'deadline' : 'createdAt',
        sortType: this.sortModel.length
          ? this.sortModel[0].sort.toUpperCase()
          : this.isPendingOrdering
          ? 'ASC'
          : 'DESC',
      })

      runInAction(() => {
        this.rowCount = result.count

        this.baseNoConvertedOrders = result.rows

        this.orders = clientOrdersDataConverter(result.rows, this.shopsData)
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)

      console.log(error)

      runInAction(() => {
        this.baseNoConvertedOrders = []
        this.orders = []
      })

      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  onDoubleClickBarcode = item => {
    this.selectedProduct = item

    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  async onClickSaveBarcode(tmpBarCode) {
    runInAction(() => {
      this.uploadedFiles = []
    })

    if (tmpBarCode.length) {
      await onSubmitPostImages.call(this, { images: tmpBarCode, type: 'uploadedFiles' })
    }

    await ClientModel.updateProductBarCode(this.selectedProduct._id, { barCode: this.uploadedFiles[0] })

    this.onTriggerOpenModal('showSetBarcodeModal')

    runInAction(() => {
      this.selectedProduct = undefined
    })
  }

  async createOrder(orderObject) {
    try {
      const requestData = getObjectFilteredByKeyArrayBlackList(orderObject, [
        'barCode',
        'tmpBarCode',
        'tmpIsPendingOrder',
        '_id',
        'tmpTransparencyFile',
        'transparency',
      ])

      if (orderObject.tmpIsPendingOrder) {
        await ClientModel.createFormedOrder(requestData)
      } else {
        await ClientModel.createOrder(requestData)
      }

      await this.updateUserInfo()
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.showInfoModalTitle = `${t(TranslationKey["You can't order"])} "${error.body.message}"`
      })
      this.onTriggerOpenModal('showInfoModal')
      runInAction(() => {
        this.error = error
      })
    }
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  async onSubmitOrderProductModal(ordersDataState) {
    try {
      runInAction(() => {
        this.error = undefined
      })
      this.onTriggerOpenModal('showOrderModal')

      for (let i = 0; i < ordersDataState.length; i++) {
        const orderObject = ordersDataState[i]

        runInAction(() => {
          this.uploadedFiles = []
        })

        if (orderObject.tmpBarCode.length) {
          await onSubmitPostImages.call(this, { images: orderObject.tmpBarCode, type: 'uploadedFiles' })

          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: this.uploadedFiles[0] })
        } else if (!orderObject.barCode) {
          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: null })
        }

        if (this.isPendingOrdering) {
          const dataToRequest = getObjectFilteredByKeyArrayWhiteList(orderObject, [
            'amount',
            'orderSupplierId',
            'images',
            'totalPrice',
            'item',
            'needsResearch',
            'deadline',
            'priority',
            'expressChinaDelivery',
            'clientComment',

            'destinationId',
            'storekeeperId',
            'logicsTariffId',
          ])

          await OrderModel.changeOrderData(orderObject._id, dataToRequest)

          await ClientModel.updateOrderStatusToReadyToProcess(orderObject._id)
        } else {
          await this.createOrder(orderObject)
        }
      }

      this.loadData()
      this.updateUserInfo()

      if (!this.error) {
        runInAction(() => {
          this.alertShieldSettings = {
            showAlertShield: true,
            alertShieldMessage: t(TranslationKey['The order has been created']),
          }

          setTimeout(() => {
            this.alertShieldSettings = {
              ...this.alertShieldSettings,
              showAlertShield: false,
            }

            setTimeout(() => {
              this.alertShieldSettings = {
                showAlertShield: false,
                alertShieldMessage: '',
              }
            }, 1000)
          }, 3000)
        })
      }
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onConfirmSubmitOrderProductModal({ ordersDataState, totalOrdersCost }) {
    this.confirmModalSettings = {
      isWarning: false,
      confirmTitle: t(TranslationKey['You are making an order, are you sure?']),
      confirmMessage: ordersDataState.some(el => el.tmpIsPendingOrder)
        ? t(TranslationKey['Pending order will be created'])
        : `${t(TranslationKey['Total amount'])}: ${totalOrdersCost}. ${t(TranslationKey['Confirm order'])}?`,
      onClickConfirm: () => this.onSubmitOrderProductModal(ordersDataState),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickOpenNewTab(orderId) {
    const win = window.open(
      `/client/my-orders/${window.location.pathname
        .split('/')
        .at(-1)}/order?orderId=${orderId}&order-human-friendly-id=${orderId}`,
      '_blank',
    )

    win.focus()
  }

  async getOrderById(orderId) {
    try {
      const resolve = await ClientModel.getOrderById(orderId)

      runInAction(() => {
        this.order = resolve
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onClickMyOrderModal(row) {
    if (window.getSelection().toString()) {
      return
    }

    await this.getOrderById(row.originalData._id)

    // await this.getDestinations()
    // await this.getStorekeepers()
    // await this.getPlatformSettings()

    this.onTriggerOpenModal('showMyOrderModal')

    if (this.showMyOrderModal) {
      this.switcherCondition = SwitcherConditions.BASIC_INFORMATION
    }
  }

  onClickChangeCondition(value) {
    this.switcherCondition = value

    if (value === SwitcherConditions.BOXES_TO_ORDER) {
      this.getBoxesOfOrder(this.order._id)
    }
  }

  async getBoxesOfOrder(orderId) {
    try {
      const result = await BoxesModel.getBoxesOfOrder(orderId)

      runInAction(() => {
        this.orderBoxes = result.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getDestinations() {
    try {
      const response = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = response
      })
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getStorekeepers() {
    try {
      const response = await StorekeeperModel.getStorekeepers()

      runInAction(() => {
        this.storekeepers = response
      })
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getPlatformSettings() {
    try {
      const response = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.platformSettings = response
      })
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }
}
