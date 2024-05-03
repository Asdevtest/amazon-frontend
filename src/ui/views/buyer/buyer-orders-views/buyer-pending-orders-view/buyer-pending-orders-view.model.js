import { makeAutoObservable, runInAction, toJS } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { routsPathes } from '@constants/navigation/routs-pathes'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'
import { creatSupplier, patchSuppliers } from '@constants/white-list'

import { BuyerModel } from '@models/buyer-model'
import { OrderModel } from '@models/order-model'
import { ProductModel } from '@models/product-model'
import { SupplierModel } from '@models/supplier-model'
import { TableSettingsModel } from '@models/table-settings'
import { UserModel } from '@models/user-model'

import { buyerMyOrdersViewColumns } from '@components/table/table-columns/buyer/buyer-my-orders-columns'

import { calcOrderTotalPrice, calcOrderTotalPriceInYuann } from '@utils/calculation'
import { buyerMyOrdersDataConverter } from '@utils/data-grid-data-converters'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { objectToUrlQs, toFixed } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'

import { updateOrderKeys } from './buyer-pending-orders-view.constants'

export class BuyerMyOrdersViewModel {
  history = undefined
  requestStatus = undefined

  ordersMy = []
  baseNoConvertedOrders = []

  orderStatusDataBase = [OrderStatus.PENDING, OrderStatus.READY_FOR_BUYOUT]
  chosenStatus = []
  filteredStatus = []

  get currentData() {
    return this.ordersMy
  }

  createBoxesResult = []

  nameSearchValue = ''

  showOrderModal = false
  selectedOrder = undefined
  barcode = ''
  showConfirmModal = false

  paymentMethods = []
  hsCodeData = undefined

  dataToCancelOrder = { orderId: undefined, buyerComment: undefined }

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  rowCount = 0
  sortModel = []
  startFilterModel = undefined
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = buyerMyOrdersViewColumns()

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  progressValue = 0
  showProgress = false
  readyImages = []

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

  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor({ history }) {
    this.history = history

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
    this.setDataGridState()
    // this.getOrdersMy()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, this.setDataGridTablesKeys(this.history.location.pathname))
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(this.setDataGridTablesKeys(this.history.location.pathname))

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

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
    this.getOrdersMy()
  }

  onSelectionModel(model) {
    this.rowSelectionModel = model
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      this.getDataGridState()
      await this.getOrdersMy()
      this.getSuppliersPaymentMethods()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async onSaveOrderItem(orderId, orderItem) {
    try {
      await BuyerModel.changeOrderItem(orderId, orderItem)

      toast.success(t(TranslationKey['Data saved successfully']))

      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async onClickOrder(orderId) {
    try {
      const orderData = await BuyerModel.getOrderById(orderId)

      runInAction(() => {
        this.selectedOrder = orderData
      })

      await this.onClickHsCode(orderData.product._id)

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

      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitSaveOrder({ order, orderFields, photosToLoad, hsCode }) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await onSubmitPostImages.call(this, { images: photosToLoad, type: 'readyImages' })

      const orderFieldsToSave = {
        ...orderFields,
        images: this.readyImages,
      }

      if (order.status === OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]) {
        await OrderModel.changeOrderComments(order._id, { buyerComment: orderFields.buyerComment })
      } else {
        await this.onSaveOrder(order, orderFieldsToSave)

        if (orderFields.status === `${OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]}`) {
          await OrderModel.orderReadyForBoyout(order._id)
        }
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

      this.onTriggerOpenModal('showOrderModal')

      this.loadData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async onSaveOrder(order, updateOrderData) {
    try {
      const updateOrderDataFiltered = getObjectFilteredByKeyArrayWhiteList(
        {
          ...updateOrderData,
          orderSupplierId: updateOrderData.orderSupplier?._id,
          totalPrice: toFixed(calcOrderTotalPrice(updateOrderData?.orderSupplier, updateOrderData?.amount), 2),
          priceInYuan: toFixed(calcOrderTotalPriceInYuann(updateOrderData?.orderSupplier, updateOrderData?.amount), 2),
        },
        updateOrderKeys,
        true,
      )

      await OrderModel.changeOrderData(order._id, updateOrderDataFiltered)
    } catch (error) {
      console.error(error)
    }
  }

  async getSuppliersPaymentMethods() {
    try {
      const response = await SupplierModel.getSuppliersPaymentMethods()

      runInAction(() => {
        this.paymentMethods = response
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

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    this.getOrdersMy()
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
      this.filteredStatus = this.orderStatusDataBase
    } else {
      this.filteredStatus = this.chosenStatus
    }
    this.orderStatusDataBase = [OrderStatus.PENDING, OrderStatus.READY_FOR_BUYOUT]
  }

  async getOrdersMy() {
    try {
      const filter = objectToUrlQs({
        or: [
          { asin: { $contains: this.nameSearchValue } },
          { amazonTitle: { $contains: this.nameSearchValue } },
          { skuByClient: { $contains: this.nameSearchValue } },
          { id: { $eq: this.nameSearchValue } },
          { item: { $eq: this.nameSearchValue } },
        ].filter(
          el =>
            ((isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))) && !el.id) ||
            !(isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))),
        ),
      })

      // НЕ было до создания фильтрации по статусам (2 строки)
      this.setDefaultStatuses()
      const orderStatus = this.filteredStatus.map(item => OrderStatusByKey[item]).join(', ')

      const result = await BuyerModel.getOrdersMyPag({
        filters: this.nameSearchValue ? filter : null,

        filtersOrder: null,

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

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
      runInAction(() => {
        this.baseNoConvertedOrders = []
        this.ordersMy = []
      })
      console.error(error)
    }
  }

  async onClickHsCode(productId) {
    try {
      const response = await ProductModel.getProductsHsCodeByGuid(productId)

      runInAction(() => {
        this.hsCodeData = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
