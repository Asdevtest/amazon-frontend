/* eslint-disable no-unused-vars */
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {routsPathes} from '@constants/routs-pathes'
import {TranslationKey} from '@constants/translations/translation-key'

import {BoxesModel} from '@models/boxes-model'
import {BuyerModel} from '@models/buyer-model'
import {OrderModel} from '@models/order-model'
import {ProductModel} from '@models/product-model'
import {SettingsModel} from '@models/settings-model'
import {SupplierModel} from '@models/supplier-model'
import {UserModel} from '@models/user-model'

import {buyerMyOrdersViewColumns} from '@components/table-columns/buyer/buyer-my-orders-columns'

import {calcOrderTotalPrice} from '@utils/calculation'
import {buyerMyOrdersDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {toFixed} from '@utils/text'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

const updateOrderKeys = ['amount', 'orderSupplierId', 'images', 'totalPrice', 'item', 'buyerComment', 'priceInYuan']

export class BuyerMyOrdersViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  ordersMy = []
  baseNoConvertedOrders = []

  // НЕ было до создания фильтрации по статусам (2 строки)
  orderStatusDataBase = [OrderStatus.PENDING, OrderStatus.READY_FOR_BUYOUT]
  chosenStatus = []

  currentData = []

  curBoxesOfOrder = []

  createBoxesResult = []

  volumeWeightCoefficient = undefined
  yuanToDollarRate = undefined

  nameSearchValue = ''

  hsCodeData = {}

  showEditHSCodeModal = false

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

  showSuccessModalText = ''

  dataToCancelOrder = {orderId: undefined, buyerComment: undefined}

  firstRowId = undefined

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  rowCount = 0
  sortModel = []
  startFilterModel = undefined
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = buyerMyOrdersViewColumns(this.firstRowId)

  progressValue = 0
  showProgress = false
  readyImages = []

  get userInfo() {
    return UserModel.userInfo
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
    this.history = history

    if (location.state?.orderId) {
      this.onClickOrder(location.state.orderId)

      const state = {...history.location.state}
      delete state.orderId
      history.replace({...history.location, state})
    }

    if (location?.state?.dataGridFilter) {
      this.startFilterModel = location.state.dataGridFilter
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
      () => {
        this.currentData = this.getCurrentData()
      },
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()

      this.ordersMy = buyerMyOrdersDataConverter(this.baseNoConvertedOrders)
    }
  }

  setDataGridTablesKeys = pathname => {
    if (pathname) {
      switch (pathname) {
        case routsPathes.BUYER_MY_ORDERS_NEED_TRACK_NUMBER:
          return DataGridTablesKeys.BUYER_MY_ORDERS_NOT_PAID
        case routsPathes.BUYER_MY_ORDERS_INBOUND:
          return DataGridTablesKeys.BUYER_MY_ORDERS_NEED_TRACK_NUMBER
        case routsPathes.BUYER_MY_ORDERS_CONFIRMATION_REQUIRED:
          return DataGridTablesKeys.BUYER_MY_ORDERS_INBOUND
        case routsPathes.BUYER_MY_ORDERS_CLOSED_AND_CANCELED:
          return DataGridTablesKeys.BUYER_MY_ORDERS_CONFIRMATION_REQUIRED
        case routsPathes.BUYER_MY_ORDERS_ALL_ORDERS:
          return DataGridTablesKeys.BUYER_MY_ORDERS_CLOSED_AND_CANCELED
        default:
          return DataGridTablesKeys.BUYER_MY_ORDERS_ALL_ORDERS
      }
    }
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

    SettingsModel.setDataGridState(requestState, this.setDataGridTablesKeys(this.history.location.pathname))
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[this.setDataGridTablesKeys(this.history.location.pathname)]

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
      this.columnsModel = buyerMyOrdersViewColumns(this.firstRowId).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
    this.curPage = 0
    this.getOrdersMy()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel
    this.getOrdersMy()
  }

  onSelectionModel(model) {
    this.selectionModel = model
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
        this.error = error.body.message
      }
    }
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

  async onSaveOrderItem(orderId, orderItem) {
    try {
      await BuyerModel.changeOrderItem(orderId, orderItem)

      this.showSuccessModalText = t(TranslationKey['Data saved successfully'])

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
      this.curBoxesOfOrder = []
    }
  }

  async onClickOrder(orderId) {
    try {
      const orderData = await BuyerModel.getOrderById(orderId)

      this.selectedOrder = orderData
      this.getBoxesOfOrder(orderId)

      const result = await UserModel.getPlatformSettings()

      this.yuanToDollarRate = result.yuanToDollarRate

      this.volumeWeightCoefficient = result.volumeWeightCoefficient

      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.log(error)
    }
  }

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

  async onSubmitSaveOrder({order, orderFields, photosToLoad}) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.readyImages = []
      if (photosToLoad.length) {
        await onSubmitPostImages.call(this, {images: photosToLoad, type: 'readyImages'})
      }

      const orderFieldsToSave = {
        ...orderFields,
        images: order.images === null ? this.readyImages : order.images.concat(this.readyImages),
      }

      if (order.status === OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]) {
        await OrderModel.changeOrderComments(order._id, {buyerComment: orderFields.buyerComment})
      } else {
        await this.onSaveOrder(order, orderFieldsToSave)

        if (orderFields.status === `${OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]}`) {
          await OrderModel.orderReadyForBoyout(order._id)
        }
      }

      this.setRequestStatus(loadingStatuses.success)
      this.onTriggerOpenModal('showOrderModal')

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

  async onSaveOrder(order, updateOrderData) {
    try {
      const updateOrderDataFiltered = getObjectFilteredByKeyArrayWhiteList(
        {
          ...updateOrderData,
          orderSupplierId: updateOrderData.orderSupplier?._id,
          totalPrice: toFixed(calcOrderTotalPrice(updateOrderData?.orderSupplier, updateOrderData?.amount), 2),
        },
        updateOrderKeys,
        true,
      )

      await OrderModel.changeOrderData(order._id, updateOrderDataFiltered)
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
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

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    this.getOrdersMy()
  }

  // Убирает и добавляет статусы в массив выбранных статусов
  onClickOrderStatusData(status) {
    console.log('status', status)
    runInAction(() => {
      if (status) {
        if (status === 'ALL') {
          this.chosenStatus = this.orderStatusDataBase
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
      this.chosenStatus = this.orderStatusDataBase
    }
    this.chosenStatus = [...this.chosenStatus]
  }

  async getOrdersMy() {
    try {
      const filter = isNaN(this.nameSearchValue)
        ? `or[0][asin][$contains]=${this.nameSearchValue};or[1][amazonTitle][$contains]=${this.nameSearchValue};or[2][skusByClient][$contains]=${this.nameSearchValue};or[3][item][$eq]=${this.nameSearchValue};`
        : `or[0][asin][$contains]=${this.nameSearchValue};or[1][amazonTitle][$contains]=${this.nameSearchValue};or[2][skusByClient][$contains]=${this.nameSearchValue};or[3][id][$eq]=${this.nameSearchValue};or[4][item][$eq]=${this.nameSearchValue};`

      // НЕ было до создания фильтрации по статусам (2 строки)
      this.setDefaultStatuses()
      const orderStatus = this.chosenStatus.map(item => OrderStatusByKey[item]).join(', ')

      const result = await BuyerModel.getOrdersMyPag({
        filters: this.nameSearchValue ? filter : null,

        filtersOrder: null,

        limit: this.rowsPerPage,
        offset: this.curPage * this.rowsPerPage,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',

        // Было до создания фильтрации по статусам
        // status: `${OrderStatusByKey[OrderStatus.PENDING]}, ${OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]}`,
        status: orderStatus,
      })

      runInAction(() => {
        this.rowCount = result.count

        this.baseNoConvertedOrders = result.rows

        this.ordersMy = buyerMyOrdersDataConverter(result.rows)
      })
    } catch (error) {
      this.baseNoConvertedOrders = []
      this.ordersMy = []
      console.log(error)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onTriggerShowBarcodeModal() {
    this.showBarcodeModal = !this.showBarcodeModal
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e
    this.getOrdersMy()
  }
}
