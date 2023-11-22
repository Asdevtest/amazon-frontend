import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { routsPathes } from '@constants/navigation/routs-pathes'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'
import { creatSupplier, patchSuppliers } from '@constants/white-list'

import { BoxesModel } from '@models/boxes-model'
import { BuyerModel } from '@models/buyer-model'
import { OrderModel } from '@models/order-model'
import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
import { SupplierModel } from '@models/supplier-model'
import { UserModel } from '@models/user-model'

import { buyerMyOrdersViewColumns } from '@components/table/table-columns/buyer/buyer-my-orders-columns'

import { calcOrderTotalPrice, calcOrderTotalPriceInYuann } from '@utils/calculation'
import { buyerMyOrdersDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { objectToUrlQs, toFixed } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { updateOrderKeys } from './buyer-pending-orders-view.constants'

export class BuyerMyOrdersViewModel {
  history = undefined
  requestStatus = undefined

  ordersMy = []
  baseNoConvertedOrders = []

  // НЕ было до создания фильтрации по статусам (3 строки)
  orderStatusDataBase = [OrderStatus.PENDING, OrderStatus.READY_FOR_BUYOUT]
  chosenStatus = []
  filteredStatus = []

  get currentData() {
    return this.ordersMy
  }

  curBoxesOfOrder = []

  createBoxesResult = []

  volumeWeightCoefficient = undefined
  platformSettings = undefined

  yuanToDollarRate = undefined

  nameSearchValue = ''

  hsCodeData = {}

  showEditHSCodeModal = false

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

  paymentMethods = []

  imagesForLoad = []

  showSuccessModalText = ''

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

  // НЕ было до создания фильтрации по статусам
  get orderStatusData() {
    return {
      orderStatusDataBase: this.orderStatusDataBase,
      chosenStatus: this.chosenStatus,
      onClickOrderStatusData: this.onClickOrderStatusData,
    }
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

    SettingsModel.setDataGridState(requestState, this.setDataGridTablesKeys(this.history.location.pathname))
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[this.setDataGridTablesKeys(this.history.location.pathname)]

    runInAction(() => {
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
    })
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
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      await this.getOrdersMy()
      this.getSuppliersPaymentMethods()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
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
      this.curBoxesOfOrder = []
    }
  }

  async onClickOrder(orderId) {
    try {
      const orderData = await BuyerModel.getOrderById(orderId)
      const hsCode = await ProductModel.getProductsHsCodeByGuid(orderData.product._id)

      runInAction(() => {
        this.hsCodeData = hsCode
        this.selectedOrder = orderData
      })

      this.clearImagesForLoad()
      this.updateImagesForLoad(orderData.images)
      this.getBoxesOfOrder(orderId)

      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.yuanToDollarRate = result.yuanToDollarRate
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
        this.platformSettings = result
      })

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

    this.imagesForLoad = [...this.imagesForLoad, ...filteredImages.map(el => getAmazonImageUrl(el, true))]
  }

  onChangeImagesForLoad(value) {
    this.imagesForLoad = value
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
      console.log(error)
    }
  }

  async onSubmitSaveOrder({ order, orderFields, photosToLoad, hsCode }) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.clearReadyImages()

      if (photosToLoad.length) {
        await onSubmitPostImages.call(this, { images: photosToLoad, type: 'readyImages' })
      }

      const orderFieldsToSave = {
        ...orderFields,
        images: this.readyImages,
      }

      this.clearReadyImages()

      if (this.imagesForLoad.length) {
        await onSubmitPostImages.call(this, { images: this.imagesForLoad, type: 'readyImages' })

        this.clearImagesForLoad()
      }

      const orderFieldsToSaveWithImagesForLoad = {
        ...orderFieldsToSave,
        images: [...orderFieldsToSave.images, ...this.readyImages],
      }

      this.clearReadyImages()

      if (order.status === OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]) {
        await OrderModel.changeOrderComments(order._id, { buyerComment: orderFields.buyerComment })
      } else {
        await this.onSaveOrder(order, orderFieldsToSaveWithImagesForLoad)

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
      runInAction(() => {
        this.uploadedFiles = []
      })

      if (data.tmpTrackNumberFile?.length) {
        await onSubmitPostImages.call(this, { images: data.tmpTrackNumberFile, type: 'uploadedFiles' })
      }

      await BoxesModel.editAdditionalInfo(data._id, {
        trackNumberText: data.trackNumberText,
        trackNumberFile: this.uploadedFiles[0] ? this.uploadedFiles[0] : data.trackNumberFile,
      })

      // const dataToSubmitHsCode = data.items.map(el => ({productId: el.product._id, hsCode: el.product.hsCode}))
      // await ProductModel.editProductsHsCods(dataToSubmitHsCode)

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
          priceInYuan: toFixed(calcOrderTotalPriceInYuann(updateOrderData?.orderSupplier, updateOrderData?.amount), 2),
        },
        updateOrderKeys,
        true,
      )

      await OrderModel.changeOrderData(order._id, updateOrderDataFiltered)
    } catch (error) {
      console.log(error)
    }
  }

  async getSuppliersPaymentMethods() {
    try {
      const response = await SupplierModel.getSuppliersPaymentMethods()

      runInAction(() => {
        this.paymentMethods = response
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onClickSaveSupplierBtn({ supplier, photosOfSupplier, productId, editPhotosOfSupplier }) {
    try {
      this.clearReadyImages()

      if (editPhotosOfSupplier.length) {
        await onSubmitPostImages.call(this, { images: editPhotosOfSupplier, type: 'readyImages' })
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

      if (photosOfSupplier.length) {
        await onSubmitPostImages.call(this, { images: photosOfSupplier, type: 'readyImages' })
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
      runInAction(() => {
        this.selectedOrder = orderData
      })
    } catch (error) {
      console.log(error)
    }
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    this.getOrdersMy()
  }

  // Убирает и добавляет статусы в массив выбранных статусов
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

  // Запускается по дефолту со всеми статусами
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
      // const filter =
      //   isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))
      //     ? `or[0][asin][$contains]=${this.nameSearchValue};or[1][amazonTitle][$contains]=${this.nameSearchValue};or[2][skusByClient][$contains]=${this.nameSearchValue};or[3][item][$eq]=${this.nameSearchValue};`
      //     : `or[0][asin][$contains]=${this.nameSearchValue};or[1][amazonTitle][$contains]=${this.nameSearchValue};or[2][skusByClient][$contains]=${this.nameSearchValue};or[3][id][$eq]=${this.nameSearchValue};or[4][item][$eq]=${this.nameSearchValue};`

      const filter = objectToUrlQs({
        or: [
          { asin: { $contains: this.nameSearchValue } },
          { amazonTitle: { $contains: this.nameSearchValue } },
          { skusByClient: { $contains: this.nameSearchValue } },
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
      console.log(error)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onTriggerShowBarcodeModal() {
    this.showBarcodeModal = !this.showBarcodeModal
  }

  clearReadyImages() {
    this.readyImages = []
  }

  clearImagesForLoad() {
    this.imagesForLoad = []
  }
}
