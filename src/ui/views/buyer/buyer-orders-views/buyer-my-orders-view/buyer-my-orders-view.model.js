import {transformAndValidate} from 'class-transformer-validator'
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveSubCategory} from '@constants/navbar-active-category'
import {OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {routsPathes} from '@constants/routs-pathes'
import {TranslationKey} from '@constants/translations/translation-key'

import {BoxesModel} from '@models/boxes-model'
import {BoxesCreateBoxContract} from '@models/boxes-model/boxes-model.contracts'
import {BuyerModel} from '@models/buyer-model'
import {ProductModel} from '@models/product-model'
import {SettingsModel} from '@models/settings-model'
import {SupplierModel} from '@models/supplier-model'
import {UserModel} from '@models/user-model'

import {buyerMyOrdersViewColumns} from '@components/table-columns/buyer/buyer-my-orders-columns'

// import {calcOrderTotalPrice} from '@utils/calculation'
import {buyerMyOrdersDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
// import {resetDataGridFilter} from '@utils/filters'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {toFixed} from '@utils/text'
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

  'amount',
  'orderSupplierId',

  'item',
  'priceInYuan',
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
      default:
        return navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_NOT_PAID
    }
  }
}

export class BuyerMyOrdersViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  // НЕ было до создания фильтрации по статусам (3 строки)
  orderStatusDataBase = []
  chosenStatus = []
  filteredStatus = []

  yuanToDollarRate = undefined

  ordersMy = []
  baseNoConvertedOrders = []

  currentData = []

  curBoxesOfOrder = []

  createBoxesResult = []

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

  pathnameNotPaid = false

  rowCount = 0
  sortModel = []
  startFilterModel = undefined
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = buyerMyOrdersViewColumns(this.firstRowId)
  columnVisibilityModel = undefined

  progressValue = 0
  showProgress = false
  readyImages = []

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

    // else {
    //       this.startFilterModel = resetDataGridFilter
    //     }

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
          this.pathnameNotPaid = true
          return DataGridTablesKeys.BUYER_MY_ORDERS_NOT_PAID
      }
    }
  }

  setUpdateSupplierData() {
    this.updateSupplierData = !this.updateSupplierData
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
          ]
        default:
          return [OrderStatus.AT_PROCESS, OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]
      }
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

  async onClickSaveSupplierBtn({supplier, photosOfSupplier, productId}) {
    try {
      this.readyImages = []

      if (photosOfSupplier.length) {
        await onSubmitPostImages.call(this, {images: photosOfSupplier, type: 'readyImages'})
      }

      supplier = {
        ...supplier,
        amount: parseFloat(supplier?.amount) || '',

        minlot: parseInt(supplier?.minlot) || '',
        price: parseFloat(supplier?.price) || '',
        images: supplier.images.concat(this.readyImages),
      }
      const supplierUpdateData = getObjectFilteredByKeyArrayBlackList(supplier, ['_id'])

      if (supplier._id) {
        await SupplierModel.updateSupplier(supplier._id, supplierUpdateData)
      } else {
        const createSupplierResult = await SupplierModel.createSupplier(supplierUpdateData)
        await ProductModel.addSuppliersToProduct(productId, [createSupplierResult.guid])
      }

      const orderData = await BuyerModel.getOrderById(this.selectedOrder._id)
      this.selectedOrder = orderData

      // await BuyerModel.updateProduct(
      //           productId,
      //           getObjectFilteredByKeyArrayWhiteList(
      //             this.product, ['currentSupplierId']
      //           ),
      //         )
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onClickSaveWithoutUpdateSupData(DataForSaveOrder, orderFields) {
    if (orderFields.status !== `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}` && orderFields.status < 20) {
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

    const result = await UserModel.getPlatformSettings()

    runInAction(() => {
      this.yuanToDollarRate = result.yuanToDollarRate
    })

    try {
      supplier = {
        ...supplier,
        // amount: parseFloat(supplier?.amount) || '',

        // minlot: parseInt(supplier?.minlot) || '',
        // price: parseFloat(supplier?.price) || '',
        // images: supplier.images.concat(this.readyImages),
        yuanRate: this.yuanToDollarRate,
        amount: orderFields.amount,
        priceInYuan: orderFields.priceInYuan,
        batchDeliveryCostInYuan: orderFields.batchDeliveryCostInYuan,
      }
      const supplierUpdateData = getObjectFilteredByKeyArrayBlackList(supplier, [
        '_id',
        'createdAt',
        'createdBy',
        'paymentMethod',
        'updatedAt',
      ])

      if (supplier._id) {
        await SupplierModel.updateSupplier(supplier._id, supplierUpdateData)
      } else {
        const createSupplierResult = await SupplierModel.createSupplier(supplierUpdateData)
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

  setDataGridState() {
    const requestState = {
      sorting: {sortModel: this.sortModel},
      filter: {filterModel: this.filterModel},
      pagination: {pageSize: this.rowsPerPage},
      density: {value: this.densityModel},
      columnVisibilityModel: this.columnVisibilityModel,
    }

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
      }
    })
  }

  // setDataGridState(state) {
  //   this.firstRowId = state.sorting.sortedRows[0]
  //   const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
  //     'sorting',
  //     'filter',
  //     'pagination',
  //     'density',
  //     'columns',
  //   ])

  //   SettingsModel.setDataGridState(requestState, this.setDataGridTablesKeys(this.history.location.pathname))
  // }

  // getDataGridState() {
  //   const state = SettingsModel.dataGridState[this.setDataGridTablesKeys(this.history.location.pathname)]

  //   if (state) {
  //     this.sortModel = state.sorting.sortModel
  //     this.filterModel = this.startFilterModel
  //       ? {
  //           ...this.startFilterModel,
  //           items: this.startFilterModel.items.map(el => ({...el, value: el.value.map(e => t(e))})),
  //         }
  //       : state.filter.filterModel
  //     this.rowsPerPage = state.pagination.pageSize

  //     this.densityModel = state.density.value
  //     this.columnsModel = buyerMyOrdersViewColumns(this.firstRowId).map(el => ({
  //       ...el,
  //       hide: state.columns?.lookup[el?.field]?.hide,
  //     }))
  //   }
  // }

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
    return toJS(this.ordersMy)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      await this.getOrdersMy()

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
      console.log(error)
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

      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.yuanToDollarRate = result.yuanToDollarRate
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })

      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.log(error)
    }
  }

  // async onSubmitSaveHsCode(productId, hsCode) {
  //   try {
  //     await ProductModel.editProductsHsCods([{productId, hsCode}])
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  async onSubmitCancelOrder() {
    try {
      await BuyerModel.returnOrder(this.dataToCancelOrder.orderId, {buyerComment: this.dataToCancelOrder.buyerComment})

      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.log(error)
    }
  }

  // this.warningInfoModalSettings = {
  //   isWarning: false,
  //   title: t(TranslationKey['Data saved successfully']),
  // }

  // this.onTriggerOpenModal('showWarningInfoModal')

  async onSubmitSaveOrder({
    order,
    orderFields,
    boxesForCreation,
    photosToLoad,
    // hsCode,
    trackNumber,
    commentToWarehouse,
  }) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const isMismatchOrderPrice = parseFloat(orderFields.totalPriceChanged) - parseFloat(orderFields.totalPrice) > 0

      if (isMismatchOrderPrice) {
        this.onTriggerOpenModal('showOrderPriceMismatchModal')
      }

      runInAction(() => {
        this.readyImages = []
      })
      if (photosToLoad.length) {
        await onSubmitPostImages.call(this, {images: photosToLoad, type: 'readyImages'})
      }

      const orderFieldsToSave = {
        ...orderFields,
        images: order.images === null ? this.readyImages : order.images.concat(this.readyImages),
      }

      await this.onSaveOrder(order, orderFieldsToSave)

      if (
        boxesForCreation.length > 0 &&
        !isMismatchOrderPrice &&
        orderFields.status !== `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`
      ) {
        await this.onSubmitCreateBoxes({order, boxesForCreation, trackNumber, commentToWarehouse})
      }

      if (orderFields.totalPriceChanged !== toFixed(order.totalPriceChanged, 2) && isMismatchOrderPrice) {
        await BuyerModel.setOrderTotalPriceChanged(order._id, {totalPriceChanged: orderFields.totalPriceChanged})
      } else {
        if (orderFields.totalPriceChanged !== toFixed(order.totalPriceChanged, 2)) {
          await BuyerModel.setOrderTotalPriceChanged(order._id, {totalPriceChanged: orderFields.totalPriceChanged})
        }

        if (orderFields.status === `${OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]}`) {
          await BuyerModel.orderPayToSupplier(order._id)
        }

        if (orderFields.status === `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}`) {
          await BuyerModel.orderTrackNumberIssued(order._id)
        }

        if (orderFields.status === `${OrderStatusByKey[OrderStatus.IN_STOCK]}`) {
          await BuyerModel.orderSetInStock(order._id, {refundPrice: Number(orderFields.tmpRefundToClient)})
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
      }

      this.setRequestStatus(loadingStatuses.success)
      if (orderFields.status !== `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`) {
        runInAction(() => {
          this.dataToCancelOrder = {orderId: order._id, buyerComment: orderFields.buyerComment}
        })
        this.onTriggerOpenModal('showOrderModal')
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
        trackNumberFile: this.uploadedFiles[0] ? this.uploadedFiles[0] : data.trackNumberFile,
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
          // totalPrice: toFixed(calcOrderTotalPrice(updateOrderData?.orderSupplier, updateOrderData?.amount), 2),
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
          trackNumberFile: this.readyImages.length ? this.readyImages[0] : '',
        }

        await this.onCreateBox(elementOrderBox, order)

        if (elementOrderBox.tmpUseToUpdateSupplierBoxDimensions) {
          const supplierUpdateData = getObjectFilteredByKeyArrayBlackList(
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
            ['_id', 'yuanRate', 'createdAt', 'updatedAt', 'createdBy'],
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
      const filter = isNaN(this.nameSearchValue)
        ? `or[0][asin][$contains]=${this.nameSearchValue};or[1][amazonTitle][$contains]=${this.nameSearchValue};or[2][skusByClient][$contains]=${this.nameSearchValue};or[3][item][$eq]=${this.nameSearchValue};`
        : `or[0][asin][$contains]=${this.nameSearchValue};or[1][amazonTitle][$contains]=${this.nameSearchValue};or[2][skusByClient][$contains]=${this.nameSearchValue};or[3][id][$eq]=${this.nameSearchValue};or[4][item][$eq]=${this.nameSearchValue};`

      // НЕ было до создания фильтрации по статусам (2 строки)
      this.setDefaultStatuses()
      const orderStatus = this.filteredStatus.map(item => OrderStatusByKey[item]).join(', ')

      const result = await BuyerModel.getOrdersMyPag({
        filters: this.nameSearchValue ? filter : null,

        limit: this.rowsPerPage,
        offset: this.curPage * this.rowsPerPage,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',

        // Было до создания фильтрации по статусам
        // status: this.setOrderStatus(this.history.location.pathname),
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
}
