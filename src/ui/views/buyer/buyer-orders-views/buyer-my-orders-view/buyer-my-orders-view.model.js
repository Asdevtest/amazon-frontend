import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { routsPathes } from '@constants/navigation/routs-pathes'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { TaskPriorityStatus, mapTaskPriorityStatusEnumToKey } from '@constants/task/task-priority-status'
import { TranslationKey } from '@constants/translations/translation-key'
import { creatSupplier, patchSuppliers } from '@constants/white-list'

import { BoxesModel } from '@models/boxes-model'
import { BuyerModel } from '@models/buyer-model'
import { GeneralModel } from '@models/general-model'
import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
import { SupplierModel } from '@models/supplier-model'
import { UserModel } from '@models/user-model'

import { BuyerReadyForPaymentColumns } from '@components/table/table-columns/buyer/buyer-ready-for-payment-columns'

import { buyerMyOrdersDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { getTableByColumn, objectToUrlQs, toFixed } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'

import { filtersFields, updateOrderKeys } from './buyer-my-orders-view.constants'

export class BuyerMyOrdersViewModel {
  history = undefined
  requestStatus = undefined

  orderStatusDataBase = []
  chosenStatus = []
  filteredStatus = []
  paymentMethods = []
  ordersMy = []
  baseNoConvertedOrders = []
  isReadyForPayment = undefined
  curBoxesOfOrder = []
  createBoxesResult = []
  paymentAmount = undefined
  nameSearchValue = ''
  selectedOrder = undefined
  barcode = ''
  currentOrder = undefined
  updateSupplierData = false
  hsCodeData = undefined
  curBox = undefined
  dataToCancelOrder = { orderId: undefined, buyerComment: undefined }
  progressValue = 0
  showProgress = false
  readyImages = []

  showBarcodeModal = false
  showOrderModal = false
  showNoDimensionsErrorModal = false
  showWarningNewBoxesModal = false
  showSuccessModal = false
  showOrderPriceMismatchModal = false
  showConfirmModal = false
  showWarningInfoModal = false
  showPaymentMethodsModal = false
  showEditHSCodeModal = false
  showSuccessModalText = ''
  showBoxViewModal = false

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }
  confirmModalSettings = {
    title: '',
    isWarning: false,
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  rowHandlers = {
    onClickPaymentMethodsCell: row => this.onClickPaymentMethodsCell(row),
  }
  rowCount = 0
  sortModel = []
  startFilterModel = undefined
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = BuyerReadyForPaymentColumns(this.rowHandlers, () => this.columnMenuSettings, false)
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}
  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.onLeaveColumnField()
      this.getOrdersMy()
      this.getDataGridState()
    },

    filterRequestStatus: undefined,

    ...dataGridFiltersInitializer(filtersFields),
  }

  get currentData() {
    return this.ordersMy
  }

  get userInfo() {
    return UserModel.userInfo
  }

  get orderStatusData() {
    return {
      orderStatusDataBase: this.orderStatusDataBase,
      chosenStatus: this.chosenStatus,
      onClickOrderStatusData: this.onClickOrderStatusData,
    }
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor({ history }) {
    this.history = history

    if (
      routsPathes.BUYER_MY_ORDERS_PARTIALLY_PAID === history.location.pathname ||
      routsPathes.BUYER_MY_ORDERS_READY_FOR_PAYMENT === history.location.pathname
    ) {
      this.columnsModel = BuyerReadyForPaymentColumns(this.rowHandlers, () => this.columnMenuSettings, true)
    }

    const orderId = new URL(window.location.href)?.searchParams?.get('orderId')
    if (orderId) {
      this.history.push(`${history.location.pathname}`)
      this.onClickOrder(orderId)
    }

    if (history.location.state?.orderId) {
      this.onClickOrder(history.location.state.orderId)

      const state = { ...history.location.state }
      delete state.orderId
      history.replace({ ...history.location, state })
    }

    if (history.location?.state?.dataGridFilter) {
      this.startFilterModel = history.location.state.dataGridFilter
    }

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatus.IS_LOADING)

      const orderStatus = this.filteredStatus.map(item => OrderStatusByKey[item]).join(',')

      const endpoint = `buyers/orders/pag/my?filters=${this.getFilter(column)}${
        orderStatus ? ';&' + 'status=' + orderStatus : ''
      }`

      const data = await GeneralModel.getDataForColumn(getTableByColumn(column, 'orders'), column, endpoint)

      if (this.columnMenuSettings[column]) {
        runInAction(() => {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            [column]: { ...this.columnMenuSettings[column], filterData: data },
          }
        })
      }

      this.setFilterRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatus.FAILED)

      console.error(error)
    }
  }

  getFilter(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(this.columnMenuSettings, this.nameSearchValue, exclusion, filtersFields, [
        'amazonTitle',
        'asin',
        'id',
        'item',
        'skuByClient',
      ]),
    )
  }

  setFilterRequestStatus(requestStatus) {
    this.columnMenuSettings.filterRequestStatus = requestStatus
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings[field].currentFilterData = value
  }

  onClickResetFilters() {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,

      ...dataGridFiltersInitializer(filtersFields),
    }

    this.getOrdersMy()
    this.getDataGridState()
  }

  setDataGridTablesKeys = pathname => {
    if (pathname) {
      switch (pathname) {
        case routsPathes.BUYER_MY_ORDERS_NEED_TRACK_NUMBER:
          return OrderStatusByKey[DataGridTablesKeys.BUYER_MY_ORDERS_NEED_TRACK_NUMBER]
        case routsPathes.BUYER_MY_ORDERS_INBOUND:
          return DataGridTablesKeys.BUYER_MY_ORDERS_INBOUND
        case routsPathes.BUYER_MY_ORDERS_CONFIRMATION_REQUIRED:
          return DataGridTablesKeys.BUYER_MY_ORDERS_CONFIRMATION_REQUIRED
        case routsPathes.BUYER_MY_ORDERS_CLOSED_AND_CANCELED:
          return DataGridTablesKeys.BUYER_MY_ORDERS_CLOSED_AND_CANCELED
        case routsPathes.BUYER_MY_ORDERS_ALL_ORDERS:
          return DataGridTablesKeys.BUYER_MY_ORDERS_ALL_ORDERS
        default:
          return DataGridTablesKeys.BUYER_MY_ORDERS_NOT_PAID
      }
    }
  }

  setUpdateSupplierData(value) {
    this.updateSupplierData = value
  }

  setOrderStatus = pathname => {
    if (pathname) {
      switch (pathname) {
        case routsPathes.BUYER_MY_ORDERS_NEED_TRACK_NUMBER:
          return [OrderStatus.PAID_TO_SUPPLIER]
        case routsPathes.BUYER_MY_ORDERS_INBOUND:
          return [OrderStatus.TRACK_NUMBER_ISSUED]
        case routsPathes.BUYER_MY_ORDERS_CONFIRMATION_REQUIRED:
          return [OrderStatus.VERIFY_RECEIPT]
        case routsPathes.BUYER_MY_ORDERS_READY_FOR_PAYMENT:
          return [OrderStatus.READY_FOR_PAYMENT]
        case routsPathes.BUYER_MY_ORDERS_PARTIALLY_PAID:
          return [OrderStatus.PARTIALLY_PAID]
        case routsPathes.BUYER_MY_ORDERS_CLOSED_AND_CANCELED:
          return [OrderStatus.IN_STOCK, OrderStatus.CANCELED_BY_BUYER, OrderStatus.CANCELED_BY_CLIENT]

        case routsPathes.BUYER_MY_ORDERS_ALL_ORDERS:
          return [
            OrderStatus.AT_PROCESS,
            OrderStatus.PAID_TO_SUPPLIER,
            OrderStatus.TRACK_NUMBER_ISSUED,
            OrderStatus.VERIFY_RECEIPT,
            OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE,
            OrderStatus.IN_STOCK,
            OrderStatus.CANCELED_BY_BUYER,
            OrderStatus.CANCELED_BY_CLIENT,
            OrderStatus.READY_FOR_PAYMENT,
            OrderStatus.PARTIALLY_PAID,
          ]
        default:
          return [OrderStatus.AT_PROCESS, OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]
      }
    }
  }

  async getBuyersOrdersPaymentByStatus() {
    if (
      Number(OrderStatusByKey[this.orderStatusDataBase]) === Number(OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT])
    ) {
      const response = await BuyerModel.getBuyersOrdersPaymentByStatus(OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT])

      runInAction(() => {
        this.paymentAmount = response
      })
    } else if (
      Number(OrderStatusByKey[this.orderStatusDataBase]) === Number(OrderStatusByKey[OrderStatus.PARTIALLY_PAID])
    ) {
      const response = await BuyerModel.getBuyersOrdersPaymentByStatus(OrderStatusByKey[OrderStatus.PARTIALLY_PAID])

      runInAction(() => {
        this.paymentAmount = response
      })
    } else if (
      this.orderStatusDataBase.some(
        status =>
          Number(OrderStatusByKey[status]) === Number(OrderStatusByKey[OrderStatus.AT_PROCESS]) ||
          Number(OrderStatusByKey[status]) === Number(OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]),
      ) &&
      this.orderStatusDataBase.length === 2
    ) {
      const response = await BuyerModel.getBuyersOrdersPaymentByStatus(
        [
          Number(OrderStatusByKey[OrderStatus.AT_PROCESS]),
          Number(OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]),
        ].join(','),
      )

      runInAction(() => {
        this.paymentAmount = response
      })
    }
  }

  onClickOrderStatusData(status) {
    if (status) {
      if (status === 'ALL') {
        this.chosenStatus = []
      } else {
        if (this.chosenStatus.some(item => item === status)) {
          this.chosenStatus = this.chosenStatus.filter(item => item !== status)
        } else {
          this.chosenStatus.push(status)
        }
      }
    }

    this.getOrdersMy()
  }

  setDefaultStatuses() {
    if (!this.chosenStatus.length) {
      this.filteredStatus = this.setOrderStatus(this.history.location.pathname)
    } else {
      this.filteredStatus = this.chosenStatus
    }
    this.orderStatusDataBase = this.setOrderStatus(this.history.location.pathname)
  }

  async getSuppliersPaymentMethods() {
    try {
      const response = await SupplierModel.getSuppliersPaymentMethods()

      runInAction(() => {
        this.paymentMethods = response.map(paymentMethod => ({
          isChecked: false,
          paymentDetails: '',
          paymentImages: [],
          paymentMethod,
        }))
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickSaveSupplierBtn({ supplier, itemId, editPhotosOfSupplier, editPhotosOfUnit }) {
    try {
      supplier = {
        ...supplier,
        amount: parseFloat(supplier?.amount) || '',
        paymentMethods: supplier.paymentMethods.map(item => getObjectFilteredByKeyArrayWhiteList(item, ['_id'])),
        minlot: parseInt(supplier?.minlot) || '',
        price: parseFloat(supplier?.price) || '',
        heightUnit: supplier?.heightUnit || null,
        widthUnit: supplier?.widthUnit || null,
        lengthUnit: supplier?.lengthUnit || null,
        weighUnit: supplier?.weighUnit || null,
      }

      await onSubmitPostImages.call(this, { images: editPhotosOfSupplier, type: 'readyImages' })
      supplier = {
        ...supplier,
        images: this.readyImages,
      }

      await onSubmitPostImages.call(this, { images: editPhotosOfUnit, type: 'readyImages' })
      supplier = {
        ...supplier,
        imageUnit: this.readyImages,
      }

      if (supplier._id) {
        const supplierUpdateData = getObjectFilteredByKeyArrayWhiteList(
          supplier,
          patchSuppliers,
          undefined,
          undefined,
          true,
        )

        await SupplierModel.updateSupplier(supplier._id, supplierUpdateData)
      } else {
        const supplierCreat = getObjectFilteredByKeyArrayWhiteList(supplier, creatSupplier)
        const createSupplierResult = await SupplierModel.createSupplier(supplierCreat)

        await ProductModel.addSuppliersToProduct(itemId, [createSupplierResult.guid])
      }

      const orderData = await BuyerModel.getOrderById(this.selectedOrder._id)

      runInAction(() => {
        this.selectedOrder = orderData
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickSaveWithoutUpdateSupData(DataForSaveOrder, orderFields) {
    if (orderFields.status !== OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER] && orderFields.status < 20) {
      runInAction(() => {
        this.confirmModalSettings = {
          title: t(TranslationKey.Attention),
          isWarning: false,
          confirmMessage: t(
            TranslationKey[
              'The price per unit in the order is different from the supplier price, do you want to continue?'
            ],
          ),
          onClickConfirm: () => {
            this.onSubmitSaveOrder(DataForSaveOrder)
            this.onTriggerOpenModal('showConfirmModal')
          },
        }
      })

      this.onTriggerOpenModal('showConfirmModal')
    } else {
      this.onSubmitSaveOrder(DataForSaveOrder)
    }
  }

  async onClickUpdataSupplierData({ supplier, productId, orderFields }) {
    this.updateSupplierData = false

    try {
      supplier = {
        ...supplier,
        paymentMethods: supplier.paymentMethods.map(item => getObjectFilteredByKeyArrayWhiteList(item, ['_id'])),
        yuanRate: this.platformSettings?.yuanToDollarRate,
        amount: orderFields.amount,
        price: orderFields.price,
        priceInYuan: orderFields.priceInYuan,
        batchDeliveryCostInYuan: orderFields.batchDeliveryCostInYuan,
        batchDeliveryCostInDollar: orderFields.batchDeliveryCostInDollar,
        batchTotalCostInDollar: orderFields.batchTotalCostInDollar,
      }

      if (supplier._id) {
        const supplierUpdateData = getObjectFilteredByKeyArrayWhiteList(supplier, patchSuppliers)
        await SupplierModel.updateSupplier(supplier._id, supplierUpdateData)
      } else {
        const supplierCreat = getObjectFilteredByKeyArrayWhiteList(supplier, creatSupplier)
        const createSupplierResult = await SupplierModel.createSupplier(supplierCreat)
        await ProductModel.addSuppliersToProduct(productId, [createSupplierResult.guid])
      }

      const orderData = await BuyerModel.getOrderById(this.selectedOrder._id)

      runInAction(() => {
        this.selectedOrder = orderData
      })
    } catch (error) {
      console.error(error)
    }
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, this.setDataGridTablesKeys(this.history.location.pathname))
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[this.setDataGridTablesKeys(this.history.location.pathname)]

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

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
    this.getOrdersMy()
  }

  async onClickSaveHsCode(hsCode) {
    await ProductModel.editProductsHsCods([
      {
        productId: hsCode._id,
        chinaTitle: hsCode.chinaTitle || null,
        hsCode: hsCode.hsCode || null,
        material: hsCode.material || null,
        productUsage: hsCode.productUsage || null,
      },
    ])

    this.onTriggerOpenModal('showEditHSCodeModal')
    this.loadData()

    runInAction(() => {
      this.selectedProduct = undefined
    })
  }

  async onClickHsCode(id) {
    const response = await ProductModel.getProductsHsCodeByGuid(id)

    runInAction(() => {
      this.hsCodeData = response
    })

    this.onTriggerOpenModal('showEditHSCodeModal')
  }

  async setColumnsModel() {
    const response = await this.setOrderStatus(this.history.location.pathname)

    runInAction(() => {
      this.isReadyForPayment = response.some(status => status === OrderStatus.READY_FOR_PAYMENT)
    })
  }

  onClickPaymentMethodsCell(row) {
    this.currentOrder = row

    this.onTriggerOpenModal('showPaymentMethodsModal')
  }

  async loadData() {
    try {
      await this.setColumnsModel()
      this.getDataGridState()
      await this.getOrdersMy()

      this.getBuyersOrdersPaymentByStatus()
      this.getSuppliersPaymentMethods()
    } catch (error) {
      console.error(error)
    }
  }

  async onSaveOrderItem(orderId, orderItem) {
    try {
      await BuyerModel.changeOrderItem(orderId, orderItem)

      runInAction(() => {
        this.showSuccessModalText = t(TranslationKey['Data saved successfully'])
      })

      this.onTriggerOpenModal('showSuccessModal')

      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async getBoxesOfOrder(orderId) {
    try {
      const result = await BoxesModel.getBoxesOfOrder(orderId)
      runInAction(() => {
        this.curBoxesOfOrder = result.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt')).reverse()
      })
    } catch (error) {
      console.error(error)

      runInAction(() => {
        this.curBoxesOfOrder = []
      })
    }
  }

  async onClickOrder(orderId) {
    try {
      const orderData = await BuyerModel.getOrderById(orderId)

      runInAction(() => {
        this.selectedOrder = orderData
      })

      this.getBoxesOfOrder(orderId)

      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitCancelOrder() {
    try {
      await BuyerModel.returnOrder(this.dataToCancelOrder.orderId, {
        buyerComment: this.dataToCancelOrder.buyerComment,
      })
      await UserModel.getUsersInfoCounters()
      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.error(error)
    }
  }

  async setCurrentOpenedBox(id) {
    try {
      const box = await BoxesModel.getBoxById(id)

      runInAction(() => {
        this.curBox = box
      })

      this.onTriggerOpenModal('showBoxViewModal')
    } catch (error) {
      console.error(error)
    }
  }

  async saveOrderPayment(order, orderPayments) {
    if (Number(order.status) === Number(OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT])) {
      try {
        const validOrderPayments = []

        for (const payment of orderPayments) {
          await onSubmitPostImages.call(this, { images: payment.paymentImages, type: 'readyImages' })

          const updatedPayment = {
            paymentMethodId: payment.paymentMethod._id,
            paymentDetails: payment.paymentDetails,
            paymentImages: this.readyImages,
          }

          validOrderPayments.push(updatedPayment)
        }

        await BuyerModel.patchBuyersOrdersPaymentByGuid(order._id, { orderPayments: validOrderPayments })

        this.loadData()
      } catch (error) {
        console.error(error)
        this.setRequestStatus(loadingStatus.FAILED)
      }
    }
  }

  async onSubmitSaveOrder({
    order,
    orderFields,
    boxesForCreation,
    photosToLoad,
    hsCode,
    trackNumber,
    commentToWarehouse,
    editPaymentDetailsPhotos,
    orderPayments,
  }) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const isMismatchOrderPrice = parseFloat(orderFields.totalPriceChanged) - parseFloat(orderFields.totalPrice) > 0

      if (isMismatchOrderPrice && toFixed(orderFields.totalPriceChanged, 2) !== toFixed(orderFields.totalPrice, 2)) {
        this.onTriggerOpenModal('showOrderPriceMismatchModal')
      }

      orderFields = {
        ...orderFields,
        partiallyPaid: Number(orderFields.partiallyPaid) || 0,
        partialPaymentAmountRmb: Number(orderFields.partialPaymentAmountRmb) || 0,
      }

      await onSubmitPostImages.call(this, { images: photosToLoad, type: 'readyImages' })

      orderFields = {
        ...orderFields,
        images: this.readyImages,
      }

      await onSubmitPostImages.call(this, { images: editPaymentDetailsPhotos, type: 'readyImages' })

      orderFields = {
        ...orderFields,
        paymentDetails: this.readyImages,
      }

      await this.onSaveOrder(order, orderFields)

      await this.saveOrderPayment(order, orderPayments)

      if (
        boxesForCreation.length > 0 &&
        !isMismatchOrderPrice &&
        orderFields.status !== `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`
      ) {
        await this.onSubmitCreateBoxes({ order, boxesForCreation, trackNumber, commentToWarehouse })
      }

      if (
        orderFields.status === OrderStatusByKey[OrderStatus.AT_PROCESS] ||
        orderFields.status === OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]
      ) {
        if (toFixed(orderFields.totalPriceChanged, 2) !== toFixed(orderFields.totalPrice, 2)) {
          await BuyerModel.setOrderTotalPriceChanged(order._id, { totalPriceChanged: orderFields.totalPriceChanged })
        }
      }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.AT_PROCESS]}`) {
        await BuyerModel.setOrdersAtProcess(order._id)
      }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]}`) {
        await BuyerModel.orderPayToSupplier(order._id)
      }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}`) {
        await BuyerModel.orderTrackNumberIssued(order._id)
      }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.IN_STOCK]}`) {
        await BuyerModel.orderSetInStock(order._id, { refundPrice: Number(orderFields.tmpRefundToClient) })
      }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT]}`) {
        const validOrderPayments = []

        for (const payment of orderPayments) {
          await onSubmitPostImages.call(this, { images: payment.paymentImages, type: 'readyImages' })

          const updatedPayment = {
            paymentMethodId: payment.paymentMethod._id,
            paymentDetails: payment.paymentDetails,
            paymentImages: this.readyImages,
          }

          validOrderPayments.push(updatedPayment)
        }

        await BuyerModel.orderReadyForPayment(order._id, { orderPayments: validOrderPayments })
      }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.PARTIALLY_PAID]}`) {
        await BuyerModel.orderPartiallyPaid(order._id)
      }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`) {
        runInAction(() => {
          this.dataToCancelOrder = { orderId: order._id, buyerComment: orderFields.buyerComment }
          this.confirmModalSettings = {
            title: t(TranslationKey['Attention. Are you sure?']),
            isWarning: true,
            confirmMessage: t(TranslationKey['Are you sure you want to cancel the order?']),
            onClickConfirm: () => {
              this.onSubmitCancelOrder()
            },
          }
        })

        this.onTriggerOpenModal('showConfirmModal')
      }

      if (hsCode) {
        await ProductModel.editProductsHsCods([
          {
            productId: hsCode._id,
            chinaTitle: hsCode.chinaTitle || null,
            hsCode: hsCode.hsCode || null,
            material: hsCode.material || null,
            productUsage: hsCode.productUsage || null,
          },
        ])
      }

      if (orderFields.status !== `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`) {
        runInAction(() => {
          this.dataToCancelOrder = { orderId: order._id, buyerComment: orderFields.buyerComment }
        })
        this.onTriggerOpenModal('showOrderModal')
        UserModel.getUsersInfoCounters()
      }

      this.loadData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)

      console.error(error)
    }
  }

  async onSubmitChangeBoxFields(data, inModal) {
    try {
      await onSubmitPostImages.call(this, { images: data.trackNumberFile, type: 'uploadedFiles' })

      await BoxesModel.editAdditionalInfo(data._id, {
        trackNumberText: data.trackNumberText,
        trackNumberFile: this.uploadedFiles,
      })

      this.getBoxesOfOrder(this.selectedOrder._id)

      !inModal && this.onTriggerOpenModal('showBoxViewModal')

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['Data saved successfully']),
        }
      })

      this.onTriggerOpenModal('showWarningInfoModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onSaveOrder(order, updateOrderData) {
    try {
      const updateOrderDataFiltered = getObjectFilteredByKeyArrayWhiteList(
        {
          ...updateOrderData,
          orderSupplierId: updateOrderData.orderSupplier._id,
          amount: updateOrderData?.amount,
          priceInYuan: updateOrderData.priceInYuan,
          priceBatchDeliveryInYuan: updateOrderData.priceBatchDeliveryInYuan,
        },
        updateOrderKeys,
        true,
      )
      await BuyerModel.editOrder(order._id, {
        ...updateOrderDataFiltered,
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitCreateBoxes({ order, boxesForCreation, trackNumber, commentToWarehouse }) {
    try {
      runInAction(() => {
        this.createBoxesResult = []
      })

      if (trackNumber?.files.length) {
        await onSubmitPostImages.call(this, { images: trackNumber.files, type: 'readyImages' })
      }

      for (let i = 0; i < boxesForCreation.length; i++) {
        const elementOrderBox = {
          ...boxesForCreation[i],
          trackNumberText: trackNumber?.text || '',
          trackNumberFile: this.readyImages.length ? this.readyImages : [],
        }

        await this.onCreateBox(elementOrderBox, order)

        if (elementOrderBox.tmpUseToUpdateSupplierBoxDimensions) {
          const supplierUpdateData = getObjectFilteredByKeyArrayWhiteList(
            {
              ...order.orderSupplier,
              paymentMethods: order?.orderSupplier?.paymentMethods?.map(paymentMethod => ({
                _id: paymentMethod._id,
              })),
              boxProperties: {
                amountInBox: elementOrderBox.items[0].amount || 0,
                boxHeightCm: parseFloat(elementOrderBox?.heightCmSupplier) || 0,
                boxLengthCm: parseFloat(elementOrderBox?.lengthCmSupplier) || 0,
                boxWeighGrossKg: parseFloat(elementOrderBox?.weighGrossKgSupplier) || 0,
                boxWidthCm: parseFloat(elementOrderBox?.widthCmSupplier) || 0,
              },
            },
            patchSuppliers,
          )

          await SupplierModel.updateSupplier(order.orderSupplier._id, supplierUpdateData)
        }
      }

      await BuyerModel.postTask({
        taskId: 0,
        boxes: [],
        boxesBefore: this.createBoxesResult,
        operationType: 'receive',
        clientComment: order.clientComment || '',
        buyerComment: commentToWarehouse || '',
        priority:
          order.priority === mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.PROBLEMATIC]
            ? mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.URGENT]
            : mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.STANDART],
      })

      runInAction(() => {
        this.showSuccessModalText = t(TranslationKey['A task was created for the warehouse: "Receive a box"'])
      })

      this.onTriggerOpenModal('showSuccessModal')

      await this.getBoxesOfOrder(order._id)
    } catch (error) {
      console.error(error)
    }
  }

  async onCreateBox(formFields) {
    try {
      const createBoxData = {
        ...getObjectFilteredByKeyArrayBlackList(formFields, [
          'items',
          'tmpBarCode',
          'tmpWarehouses',
          'tmpDeliveryMethod',
          'tmpStatus',
          'weightFinalAccountingKgSupplier',
          'tmpUseToUpdateSupplierBoxDimensions',
          'tmpUseCurrentSupplierDimensions',

          'deliveryMethod',
          'volumeWeightKgSupplier',
          'warehouse',
        ]),
        lengthCmSupplier: parseFloat(formFields?.lengthCmSupplier) || 0,
        widthCmSupplier: parseFloat(formFields?.widthCmSupplier) || 0,
        heightCmSupplier: parseFloat(formFields?.heightCmSupplier) || 0,
        weighGrossKgSupplier: parseFloat(formFields?.weighGrossKgSupplier) || 0,

        items: [
          {
            productId: formFields.items[0].product._id,
            amount: formFields.items[0].amount,
            orderId: this.selectedOrder._id,

            transparencyFile: formFields?.items?.[0]?.transparencyFile || '',
            isBarCodeAlreadyAttachedByTheSupplier: formFields?.items?.[0]?.isBarCodeAlreadyAttachedByTheSupplier,
            isTransparencyFileAlreadyAttachedByTheSupplier:
              formFields?.items?.[0]?.isTransparencyFileAlreadyAttachedByTheSupplier,
          },
        ],
      }

      const createBoxResult = await BoxesModel.createBox(createBoxData)

      runInAction(() => {
        this.createBoxesResult = [...this.createBoxesResult, createBoxResult.guid]
      })
      return
    } catch (error) {
      console.error(error)
    }
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    this.getOrdersMy()
  }

  async getOrdersMy() {
    try {
      this.setDefaultStatuses()
      const orderStatuses = this.filteredStatus.map(item => OrderStatusByKey[item]).join(',')
      const currentStatuses = this.columnMenuSettings.status?.currentFilterData.join(',')

      const result = await BuyerModel.getOrdersMyPag({
        filters: this.getFilter(),

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',

        status: this.columnMenuSettings.status?.currentFilterData.length ? currentStatuses : orderStatuses,
      })

      runInAction(() => {
        this.rowCount = result.count

        this.baseNoConvertedOrders = result.rows

        this.ordersMy = buyerMyOrdersDataConverter(result.rows)
      })
    } catch (error) {
      runInAction(() => {
        this.baseNoConvertedOrders = []
        this.ordersMy = []
      })
      console.error(error)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onTriggerShowBarcodeModal() {
    this.showBarcodeModal = !this.showBarcodeModal
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
    this.getOrdersMy()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
    this.getOrdersMy()
  }

  onLeaveColumnField() {
    this.onHover = null
  }
}
