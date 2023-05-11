/* eslint-disable no-unused-vars */
import {transformAndValidate} from 'class-transformer-validator'
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid/data-grid-tables-keys'
import {navBarActiveSubCategory} from '@constants/navigation/navbar-active-category'
import {routsPathes} from '@constants/navigation/routs-pathes'
import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {OrderStatus, OrderStatusByKey} from '@constants/statuses/order-status'
import {mapTaskPriorityStatusEnumToKey, TaskPriorityStatus} from '@constants/task/task-priority-status'
import {TranslationKey} from '@constants/translations/translation-key'
import {creatSupplier, patchSuppliers} from '@constants/white-list'

import {BoxesModel} from '@models/boxes-model'
import {BoxesCreateBoxContract} from '@models/boxes-model/boxes-model.contracts'
import {BuyerModel} from '@models/buyer-model'
import {ProductModel} from '@models/product-model'
import {SettingsModel} from '@models/settings-model'
import {SupplierModel} from '@models/supplier-model'
import {UserModel} from '@models/user-model'

import {BuyerReadyForPaymentColumns} from '@components/table/table-columns/buyer/buyer-ready-for-payment-columns'

// import {calcOrderTotalPrice} from '@utils/calculation'
import {buyerMyOrdersDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
// import {resetDataGridFilter} from '@utils/filters'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {objectToUrlQs, toFixed} from '@utils/text'
// import {toFixed} from '@utils/text'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

const updateOrderKeys = [
  'deliveryMethod',
  'warehouse',
  'barCode',
  'trackingNumberChina',
  'amountPaymentPerConsignmentAtDollars',
  'deliveryCostToTheWarehouse',
  'buyerComment',
  'images',
  'yuanToDollarRate',
  'paymentDetails',

  'amount',
  'orderSupplierId',

  'item',
  'priceInYuan',
  'priceBatchDeliveryInYuan',
]

const setNavbarActiveSubCategory = pathname => {
  if (pathname) {
    switch (pathname) {
      case routsPathes.BUYER_MY_ORDERS_NEED_TRACK_NUMBER:
        return navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_NEED_TRACK_NUMBER
      case routsPathes.BUYER_MY_ORDERS_INBOUND:
        return navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_INBOUND
      case routsPathes.BUYER_MY_ORDERS_CONFIRMATION_REQUIRED:
        return navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_CONFIRMATION_REQUIRED
      case routsPathes.BUYER_MY_ORDERS_CLOSED_AND_CANCELED:
        return navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_CLOSED_AND_CANCELED
      case routsPathes.BUYER_MY_ORDERS_ALL_ORDERS:
        return navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_ALL_ORDERS
      case routsPathes.BUYER_MY_ORDERS_READY_FOR_PAYMENT:
        return navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_READY_FOR_PAYMENT
      default:
        return navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_NOT_PAID
    }
  }
}

const filtersFields = ['payments']

export class BuyerMyOrdersViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  // НЕ было до создания фильтрации по статусам (3 строки)
  orderStatusDataBase = []
  chosenStatus = []
  filteredStatus = []

  paymentMethods = []

  yuanToDollarRate = undefined

  ordersMy = []
  baseNoConvertedOrders = []

  currentData = []

  isReadyForPayment = undefined

  curBoxesOfOrder = []

  createBoxesResult = []

  imagesForLoad = []

  paymentAmount = undefined

  volumeWeightCoefficient = undefined

  nameSearchValue = ''

  drawerOpen = false
  showBarcodeModal = false
  showOrderModal = false
  selectedOrder = undefined
  barcode = ''
  showNoDimensionsErrorModal = false
  showWarningNewBoxesModal = false
  showSuccessModal = false
  showOrderPriceMismatchModal = false
  showConfirmModal = false
  showWarningInfoModal = false
  showPaymentMethodsModal = false

  currentOrder = undefined

  updateSupplierData = false

  hsCodeData = {}

  showEditHSCodeModal = false

  showSuccessModalText = ''

  dataToCancelOrder = {orderId: undefined, buyerComment: undefined}

  firstRowId = undefined

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

  rowCount = 0
  sortModel = []
  startFilterModel = undefined
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = BuyerReadyForPaymentColumns(this.firstRowId, this.rowHandlers, this.columnMenuSettings)

  rowHandlers = {
    onClickPaymentMethodCell: row => this.onClickPaymentMethodCell(row),
  }

  // columnsModel = []
  columnVisibilityModel = undefined

  progressValue = 0
  showProgress = false
  readyImages = []

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      // this.onLeaveColumnField()
      // this.getBoxesMy()
      // this.getDataGridState()
    },

    ...filtersFields.reduce(
      (ac, cur) =>
        (ac = {
          ...ac,
          [cur]: {
            filterData: [],
            currentFilterData: [],
          },
        }),
      {},
    ),
  }

  get userInfo() {
    return UserModel.userInfo
  }

  get navbarActiveSubCategory() {
    return setNavbarActiveSubCategory(this.history.location.pathname)
  }

  // НЕ было до создания фильтрации по статусам
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

  constructor({history, location}) {
    runInAction(() => {
      this.history = history
    })

    if (location.state?.orderId) {
      this.onClickOrder(location.state.orderId)

      const state = {...history.location.state}
      delete state.orderId
      history.replace({...history.location, state})
    }

    if (location?.state?.dataGridFilter) {
      runInAction(() => {
        this.startFilterModel = location.state.dataGridFilter
      })
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

    reaction(
      () => this.ordersMy,
      () =>
        runInAction(() => {
          this.currentData = this.getCurrentData()
        }),
    )

    reaction(
      () => this.columnMenuSettings.payments.currentFilterData,
      () =>
        runInAction(() => {
          this.currentData = this.getCurrentData()
        }),
    )
  }

  changeColumnsModel(newHideState) {
    runInAction(() => {
      this.columnsModel = this.columnsModel.map(el => ({
        ...el,
        hide: !!newHideState[el?.field],
      }))
    })
  }

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatuses.isLoading)

      if (column === 'payments') {
        const data = await SupplierModel.getSuppliersPaymentMethods()

        if (this.columnMenuSettings[column]) {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            [column]: {...this.columnMenuSettings[column], filterData: data.map(el => ({...el, name: el.title}))},
          }
        }
      }

      // const data = await GeneralModel.getDataForColumn(
      //   getTableByColumn(column, 'boxes'),
      //   column,

      //   `boxes/pag/clients_light?status=IN_STOCK&filters=;${this.getFilter(column)}${
      //     shopFilter ? ';&' + '[shopIds][$eq]=' + shopFilter : ''
      //   }${isFormedFilter ? ';&' + 'isFormed=' + isFormedFilter : ''}`,
      // )

      // if (this.columnMenuSettings[column]) {
      //   this.columnMenuSettings = {
      //     ...this.columnMenuSettings,
      //     [column]: {...this.columnMenuSettings[column], filterData: data},
      //   }
      // }

      this.setFilterRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatuses.failed)

      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  setFilterRequestStatus(requestStatus) {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        filterRequestStatus: requestStatus,
      }
    })
  }

  onChangeFullFieldMenuItem(value, field) {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        [field]: {
          ...this.columnMenuSettings[field],
          currentFilterData: value,
        },
      }
    })
  }

  // onLeaveColumnField() {
  //   this.onHover = null
  //   this.getDataGridState()
  // }

  onClickResetFilters() {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,

        ...filtersFields.reduce(
          (ac, cur) =>
            (ac = {
              ...ac,
              [cur]: {
                filterData: [],
                currentFilterData: [],
              },
            }),
          {},
        ),
      }
    })

    // this.getBoxesMy()
    // this.getDataGridState()
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()

      runInAction(() => {
        this.ordersMy = buyerMyOrdersDataConverter(this.baseNoConvertedOrders)
      })
    }
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
      this.paymentAmount = await BuyerModel.getBuyersOrdersPaymentByStatus(
        OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT],
      )
    } else if (
      this.orderStatusDataBase.some(
        status =>
          Number(OrderStatusByKey[status]) === Number(OrderStatusByKey[OrderStatus.AT_PROCESS]) ||
          Number(OrderStatusByKey[status]) === Number(OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]),
      ) &&
      this.orderStatusDataBase.length === 2
    ) {
      this.paymentAmount = await BuyerModel.getBuyersOrdersPaymentByStatus(
        [
          Number(OrderStatusByKey[OrderStatus.AT_PROCESS]),
          Number(OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]),
        ].join(','),
      )
    }
  }

  // Убирает и добавляет статусы в массив выбранных статусов
  onClickOrderStatusData(status) {
    runInAction(() => {
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
    })
  }

  // Запускается по дефолту со всеми статусами
  setDefaultStatuses() {
    if (!this.chosenStatus.length) {
      this.filteredStatus = this.setOrderStatus(this.history.location.pathname)
    } else {
      this.filteredStatus = this.chosenStatus
    }
    this.orderStatusDataBase = this.setOrderStatus(this.history.location.pathname)
  }

  async getSuppliersPaymentMethods() {
    this.paymentMethods = await SupplierModel.getSuppliersPaymentMethods()
  }

  async onClickSaveSupplierBtn({supplier, photosOfSupplier, productId, editPhotosOfSupplier}) {
    try {
      this.clearReadyImages()

      if (editPhotosOfSupplier?.length) {
        await onSubmitPostImages.call(this, {images: editPhotosOfSupplier, type: 'readyImages'})
      }

      supplier = {
        ...supplier,
        amount: parseFloat(supplier?.amount) || '',
        paymentMethods: supplier.paymentMethods.map(item => getObjectFilteredByKeyArrayWhiteList(item, ['_id'])),
        minlot: parseInt(supplier?.minlot) || '',
        price: parseFloat(supplier?.price) || '',
        images: this.readyImages,
      }

      this.clearReadyImages()

      if (photosOfSupplier?.length) {
        await onSubmitPostImages.call(this, {images: photosOfSupplier, type: 'readyImages'})

        supplier = {
          ...supplier,
          images: [...supplier.images, ...this.readyImages],
        }
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
      this.selectedOrder = orderData
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onClickSaveWithoutUpdateSupData(DataForSaveOrder, orderFields) {
    if (orderFields.status !== OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER] && orderFields.status < 20) {
      this.confirmModalSettings = {
        title: t(TranslationKey.Attention),
        isWarning: true,
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
      this.onTriggerOpenModal('showConfirmModal')
    } else {
      this.onSubmitSaveOrder(DataForSaveOrder)
    }
  }

  async onClickUpdataSupplierData({supplier, productId, orderFields}) {
    this.updateSupplierData = false

    this.getPlatformSettings()

    try {
      supplier = {
        ...supplier,
        paymentMethods: supplier.paymentMethods.map(item => getObjectFilteredByKeyArrayWhiteList(item, ['_id'])),
        yuanRate: this.yuanToDollarRate,
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
      this.selectedOrder = orderData
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
  }

  setFirstRowId(state) {
    runInAction(() => {
      this.firstRowId = state.sorting.sortedRows[0]
    })
  }

  setDataGridState(state) {
    // const requestState = {
    //   sorting: {sortModel: this.sortModel},
    //   filter: {filterModel: this.filterModel},
    //   pagination: {pageSize: this.rowsPerPage},
    //   density: {value: this.densityModel},
    //   columnVisibilityModel: this.columnVisibilityModel,
    // }

    if (!state) {
      return
    }

    this.firstRowId = state?.sorting?.sortedRows[0]
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, this.setDataGridTablesKeys(this.history.location.pathname))
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[this.setDataGridTablesKeys(this.history.location.pathname)]

    runInAction(() => {
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

        this.columnVisibilityModel = state.columnVisibilityModel

        this.columnsModel = BuyerReadyForPaymentColumns(this.firstRowId, this.rowHandlers, this.columnMenuSettings).map(
          el => ({
            ...el,
            hide: state.columns?.lookup[el?.field]?.hide,
          }),
        )
      }
    })
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e
      this.curPage = 0
    })
    this.setDataGridState()
    this.getOrdersMy()
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeDrawerOpen(e, value) {
    runInAction(() => {
      this.drawerOpen = value
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
      this.setDataGridState()
      this.getOrdersMy()
    })
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
    this.hsCodeData = await ProductModel.getProductsHsCodeByGuid(id)

    this.onTriggerOpenModal('showEditHSCodeModal')
  }

  getCurrentData() {
    if (this.columnMenuSettings.payments.currentFilterData.length) {
      const curPaymentsIds = this.columnMenuSettings.payments.currentFilterData.map(el => el._id)

      return toJS(this.ordersMy).filter(el => el.payments.some(item => curPaymentsIds.includes(item.paymentMethod._id)))
    } else {
      return toJS(this.ordersMy)
    }
  }

  async setColumnsModel() {
    const currentStatus = await this.setOrderStatus(this.history.location.pathname)

    this.isReadyForPayment = currentStatus.some(status => status === OrderStatus.READY_FOR_PAYMENT)
  }

  async onClickPaymentMethodCell(row) {
    await this.getSuppliersPaymentMethods()
    runInAction(() => {
      this.currentOrder = row
      this.onTriggerOpenModal('showPaymentMethodsModal')
    })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.setColumnsModel()
      this.getDataGridState()
      await this.getOrdersMy()
      this.getPlatformSettings()
      this.getBuyersOrdersPaymentByStatus()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
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
      console.log(error)
    }
  }

  async getBoxesOfOrder(orderId) {
    try {
      const result = await BoxesModel.getBoxesOfOrder(orderId)
      runInAction(() => {
        this.curBoxesOfOrder = result.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt')).reverse()
      })
    } catch (error) {
      // console.log(error)
      runInAction(() => {
        this.curBoxesOfOrder = []
      })
    }
  }

  async getPlatformSettings() {
    try {
      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.yuanToDollarRate = result.yuanToDollarRate
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onClickOrder(orderId) {
    try {
      const orderData = await BuyerModel.getOrderById(orderId)
      const hsCode = await ProductModel.getProductsHsCodeByGuid(orderData.product._id)

      await this.getSuppliersPaymentMethods()

      runInAction(() => {
        this.hsCodeData = hsCode
        this.selectedOrder = orderData

        this.clearImagesForLoad()

        this.updateImagesForLoad(orderData.images)
      })
      this.getBoxesOfOrder(orderId)

      this.getPlatformSettings()

      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.log(error)
    }
  }

  updateImagesForLoad(images) {
    if (!Array.isArray(images)) {
      return
    }

    const filteredImages = images.filter(el => !this.imagesForLoad.some(item => item.includes(el)))

    runInAction(() => {
      this.imagesForLoad = [...this.imagesForLoad, ...filteredImages.map(el => getAmazonImageUrl(el, true))]
    })
  }

  onChangeImagesForLoad(value) {
    runInAction(() => {
      this.imagesForLoad = value
    })
  }

  async onSubmitCancelOrder() {
    try {
      await BuyerModel.returnOrder(this.dataToCancelOrder.orderId, {buyerComment: this.dataToCancelOrder.buyerComment})
      await UserModel.getUserInfo()
      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async saveOrderPayment(order, orderPayments) {
    if (Number(order.status) === Number(OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT])) {
      try {
        orderPayments = [...orderPayments.filter(payment => payment?.paymentMethod?._id)]
        const validOrderPayments = []
        for (const payment of orderPayments) {
          if (payment?.photosForLoad?.length) {
            this.clearReadyImages()
            await onSubmitPostImages.call(this, {images: payment.photosForLoad, type: 'readyImages'})
          }

          const readyPhotosForLoad = await this.readyImages

          this.clearReadyImages()

          const validObj = {
            paymentMethodId: payment?.paymentMethod._id,
            paymentDetails: payment?.paymentDetails,
            paymentImages: readyPhotosForLoad,
          }

          if (payment?.paymentImages?.length) {
            this.clearReadyImages()
            await onSubmitPostImages.call(this, {images: payment.paymentImages, type: 'readyImages'})
          }

          const readyPaymentImages = await this.readyImages

          this.clearReadyImages()

          validOrderPayments.push({
            ...validObj,
            paymentImages: [...validObj.paymentImages, ...readyPaymentImages],
          })
        }

        await BuyerModel.PatchBuyersOrdersPaymentByGuid(order._id, {orderPayments: validOrderPayments})
        this.loadData()
      } catch (error) {
        console.log('error', error)
        this.setRequestStatus(loadingStatuses.failed)
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
    paymentDetailsPhotosToLoad,
    editPaymentDetailsPhotos,
    orderPayments,
  }) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const isMismatchOrderPrice = parseFloat(orderFields.totalPriceChanged) - parseFloat(orderFields.totalPrice) > 0

      if (isMismatchOrderPrice && toFixed(orderFields.totalPriceChanged, 2) !== toFixed(orderFields.totalPrice, 2)) {
        this.onTriggerOpenModal('showOrderPriceMismatchModal')
      }

      this.clearReadyImages()

      // if (this.imagesForLoad.length) {
      await onSubmitPostImages.call(this, {images: this.imagesForLoad || [], type: 'readyImages'})

      this.clearImagesForLoad()

      orderFields = {
        ...orderFields,
        images: this.readyImages,
      }
      // }

      this.clearReadyImages()

      if (photosToLoad?.length) {
        await onSubmitPostImages.call(this, {images: photosToLoad, type: 'readyImages'})

        orderFields = {
          ...orderFields,
          images: [...(orderFields.images || []), ...this.readyImages],
        }
      }

      this.clearReadyImages()

      // if (editPaymentDetailsPhotos?.length) {
      await onSubmitPostImages.call(this, {images: editPaymentDetailsPhotos || [], type: 'readyImages'})

      orderFields = {
        ...orderFields,
        paymentDetails: [/* ...orderFields.paymentDetails,  */ ...this.readyImages],
      }
      // }

      this.clearReadyImages()

      if (paymentDetailsPhotosToLoad?.length) {
        await onSubmitPostImages.call(this, {images: paymentDetailsPhotosToLoad, type: 'readyImages'})

        orderFields = {
          ...orderFields,
          paymentDetails: [...orderFields.paymentDetails, ...this.readyImages],
        }
      }

      this.clearReadyImages()

      await this.onSaveOrder(order, orderFields)

      this.saveOrderPayment(order, orderPayments)

      if (
        boxesForCreation.length > 0 &&
        !isMismatchOrderPrice &&
        orderFields.status !== `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`
      ) {
        await this.onSubmitCreateBoxes({order, boxesForCreation, trackNumber, commentToWarehouse})
      }

      // if (orderFields.totalPriceChanged !== toFixed(order.totalPriceChanged, 2) && isMismatchOrderPrice) {
      if (
        orderFields.status === OrderStatusByKey[OrderStatus.AT_PROCESS] ||
        orderFields.status === OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]
      ) {
        if (toFixed(orderFields.totalPriceChanged, 2) !== toFixed(orderFields.totalPrice, 2)) {
          await BuyerModel.setOrderTotalPriceChanged(order._id, {totalPriceChanged: orderFields.totalPriceChanged})
        }
      }

      // } else {
      // if (orderFields.totalPriceChanged !== toFixed(order.totalPriceChanged, 2)) {
      //   await BuyerModel.setOrderTotalPriceChanged(order._id, {totalPriceChanged: orderFields.totalPriceChanged})
      // }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]}`) {
        await BuyerModel.orderPayToSupplier(order._id)
      }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}`) {
        await BuyerModel.orderTrackNumberIssued(order._id)
      }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.IN_STOCK]}`) {
        await BuyerModel.orderSetInStock(order._id, {refundPrice: Number(orderFields.tmpRefundToClient)})
      }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT]}`) {
        orderPayments = [...orderPayments.filter(payment => payment?.paymentMethod?._id)]

        const validOrderPayments = []
        for (const payment of orderPayments) {
          if (payment?.photosForLoad?.length) {
            this.clearReadyImages()
            await onSubmitPostImages.call(this, {images: payment.photosForLoad, type: 'readyImages'})
          }

          const readyPhotosForLoad = await this.readyImages

          this.clearReadyImages()

          const validObj = {
            paymentMethodId: payment?.paymentMethod._id,
            paymentDetails: payment?.paymentDetails,
            paymentImages: readyPhotosForLoad,
          }

          if (payment?.paymentImages?.length) {
            this.clearReadyImages()
            await onSubmitPostImages.call(this, {images: payment.paymentImages, type: 'readyImages'})
          }

          const readyPaymentImages = await this.readyImages

          this.clearReadyImages()

          validOrderPayments.push({
            ...validObj,
            paymentImages: [...validObj.paymentImages, ...readyPaymentImages],
          })
        }

        await BuyerModel.orderReadyForPayment(order._id, {orderPayments: validOrderPayments})
      }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`) {
        runInAction(() => {
          this.dataToCancelOrder = {orderId: order._id, buyerComment: orderFields.buyerComment}
        })

        this.confirmModalSettings = {
          title: t(TranslationKey['Attention. Are you sure?']),
          isWarning: true,
          confirmMessage: t(TranslationKey['Are you sure you want to cancel the order?']),
          onClickConfirm: () => {
            this.onSubmitCancelOrder()
          },
        }
        this.onTriggerOpenModal('showConfirmModal')
        // await BuyerModel.returnOrder(order._id, {buyerComment: orderFields.buyerComment})
      }
      // }

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

      this.setRequestStatus(loadingStatuses.success)
      if (orderFields.status !== `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`) {
        runInAction(() => {
          this.dataToCancelOrder = {orderId: order._id, buyerComment: orderFields.buyerComment}
        })
        this.onTriggerOpenModal('showOrderModal')
        UserModel.getUserInfo()
        // await BuyerModel.returnOrder(order._id, {buyerComment: orderFields.buyerComment})
      }

      this.loadData()
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async onSubmitChangeBoxFields(data, inModal) {
    try {
      this.uploadedFiles = []

      if (data.tmpTrackNumberFile?.length) {
        await onSubmitPostImages.call(this, {images: data.tmpTrackNumberFile, type: 'uploadedFiles'})
      }

      await BoxesModel.editAdditionalInfo(data._id, {
        trackNumberText: data.trackNumberText,
        // trackNumberFile: this.uploadedFiles[0] ? this.uploadedFiles[0] : data.trackNumberFile,
        trackNumberFile: [...data.trackNumberFile, ...this.uploadedFiles],
      })

      // const dataToSubmitHsCode = data.items.map(el => ({productId: el.product._id, hsCode: el.product.hsCode}))
      // await ProductModel.editProductsHsCods(dataToSubmitHsCode)

      this.getBoxesOfOrder(this.selectedOrder._id)

      !inModal && this.onTriggerOpenModal('showBoxViewModal')

      this.warningInfoModalSettings = {
        isWarning: false,
        title: t(TranslationKey['Data saved successfully']),
      }

      this.onTriggerOpenModal('showWarningInfoModal')
    } catch (error) {
      console.log(error)
    }
  }

  // async onSaveOrder(order, updateOrderData) {
  //   try {
  //     const updateOrderDataFiltered = getObjectFilteredByKeyArrayWhiteList(updateOrderData, updateOrderKeys, true)

  // await BuyerModel.editOrder(order._id, updateOrderDataFiltered)
  //   } catch (error) {
  //     console.log(error)
  //     if (error.body && error.body.message) {
  //       runInAction(() => {
  //         this.error = error.body.message
  //       })
  //     }
  //   }
  // }

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
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onSubmitCreateBoxes({order, boxesForCreation, trackNumber, commentToWarehouse}) {
    try {
      runInAction(() => {
        this.error = undefined

        this.createBoxesResult = []
      })

      this.readyImages = []
      if (trackNumber?.files.length) {
        await onSubmitPostImages.call(this, {images: trackNumber.files, type: 'readyImages'})
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
        boxesBefore: [...this.createBoxesResult /* createBoxResult.guid*/],
        operationType: 'receive',
        clientComment: order.clientComment || '',
        buyerComment: commentToWarehouse || '',
        priority:
          order.priority === '40'
            ? mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.URGENT]
            : mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.STANDART],
      })

      if (!this.error) {
        runInAction(() => {
          this.showSuccessModalText = t(TranslationKey['A task was created for the warehouse: "Receive a box"'])
        })

        this.onTriggerOpenModal('showSuccessModal')
      }
      await this.getBoxesOfOrder(order._id)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async onCreateBox(formFields /* , order*/) {
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

            isBarCodeAlreadyAttachedByTheSupplier: formFields.items[0].isBarCodeAlreadyAttachedByTheSupplier,
          },
        ],
      }

      await transformAndValidate(BoxesCreateBoxContract, createBoxData)

      const createBoxResult = await BoxesModel.createBox(createBoxData)

      runInAction(() => {
        this.createBoxesResult = [...this.createBoxesResult, createBoxResult.guid]
      })

      // await BuyerModel.postTask({
      //   taskId: 0,
      //   boxes: [],
      //   boxesBefore: [createBoxResult.guid],
      //   operationType: 'receive',
      //   clientComment: order.clientComment || '',
      // })
      return
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.error = error
      })
      throw new Error('Error during box creation')
    }
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })

    this.getOrdersMy()
  }

  async getOrdersMy() {
    try {
      const filter = objectToUrlQs({
        or: [
          {asin: {$contains: this.nameSearchValue}},
          {amazonTitle: {$contains: this.nameSearchValue}},
          {skusByClient: {$contains: this.nameSearchValue}},
          {item: {$eq: this.nameSearchValue}},
          {id: {$eq: this.nameSearchValue}},
        ].filter(
          el =>
            ((isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))) && !el.id) ||
            !(isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))),
        ),
      })

      this.setDefaultStatuses()
      const orderStatus = this.filteredStatus.map(item => OrderStatusByKey[item]).join(', ')

      const result = await BuyerModel.getOrdersMyPag({
        filters: this.nameSearchValue ? filter : null,

        limit: this.rowsPerPage,
        offset: this.curPage * this.rowsPerPage,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
        status: orderStatus,
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
      console.log(error)
    }
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }

  onTriggerShowBarcodeModal() {
    runInAction(() => {
      this.showBarcodeModal = !this.showBarcodeModal
    })
  }

  onTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  onChangeCurPage(e) {
    runInAction(() => {
      this.curPage = e
    })
    this.setDataGridState()
    this.getOrdersMy()
  }

  clearReadyImages() {
    runInAction(() => {
      this.readyImages = []
    })
  }

  clearImagesForLoad() {
    runInAction(() => {
      this.imagesForLoad = []
    })
  }
}
