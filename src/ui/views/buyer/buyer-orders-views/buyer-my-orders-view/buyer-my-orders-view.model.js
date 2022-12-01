import {transformAndValidate} from 'class-transformer-validator'
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {BoxesModel} from '@models/boxes-model'
import {BoxesCreateBoxContract} from '@models/boxes-model/boxes-model.contracts'
import {BuyerModel} from '@models/buyer-model'
import {ProductModel} from '@models/product-model'
import {SettingsModel} from '@models/settings-model'
import {SupplierModel} from '@models/supplier-model'
import {UserModel} from '@models/user-model'

import {buyerMyOrdersViewColumns} from '@components/table-columns/buyer/buyer-my-orders-columns'

import {buyerMyOrdersDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {resetDataGridFilter} from '@utils/filters'
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

  'item',
]

export class BuyerMyOrdersViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

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

  showSuccessModalText = ''

  dataToCancelOrder = {orderId: undefined, buyerComment: undefined}

  firstRowId = undefined

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
    } else {
      this.startFilterModel = resetDataGridFilter
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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.BUYER_MY_ORDERS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.BUYER_MY_ORDERS]

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

      this.volumeWeightCoefficient = result.volumeWeightCoefficient

      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitSaveHsCode(productId, hsCode) {
    try {
      await ProductModel.editProductsHsCods([{productId, hsCode}])
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

  async onSubmitSaveOrder(order, orderFields, boxesForCreation, photosToLoad, hsCode) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const isMismatchOrderPrice = parseFloat(orderFields.totalPriceChanged) - parseFloat(orderFields.totalPrice) > 0

      if (isMismatchOrderPrice) {
        this.onTriggerOpenModal('showOrderPriceMismatchModal')
      }

      this.readyImages = []
      if (photosToLoad.length) {
        await onSubmitPostImages.call(this, {images: photosToLoad, type: 'readyImages'})
      }

      const orderFieldsToSave = {
        ...orderFields,
        images: order.images === null ? this.readyImages : order.images.concat(this.readyImages),
      }

      await this.onSaveOrder(order, orderFieldsToSave)

      if (hsCode) {
        await this.onSubmitSaveHsCode(order.product._id, hsCode)
      }

      if (
        boxesForCreation.length > 0 &&
        !isMismatchOrderPrice &&
        orderFields.status !== `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`
      ) {
        await this.onSubmitCreateBoxes(order, boxesForCreation)
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

        if (orderFields.status === `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`) {
          this.dataToCancelOrder = {orderId: order._id, buyerComment: orderFields.buyerComment}
          this.onTriggerOpenModal('showConfirmModal')
          // await BuyerModel.returnOrder(order._id, {buyerComment: orderFields.buyerComment})
        }
      }

      this.setRequestStatus(loadingStatuses.success)
      if (orderFields.status !== `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`) {
        this.dataToCancelOrder = {orderId: order._id, buyerComment: orderFields.buyerComment}
        this.onTriggerOpenModal('showOrderModal')
        // await BuyerModel.returnOrder(order._id, {buyerComment: orderFields.buyerComment})
      }

      this.loadData()
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async onSaveOrder(order, updateOrderData) {
    try {
      const updateOrderDataFiltered = getObjectFilteredByKeyArrayWhiteList(updateOrderData, updateOrderKeys, true)

      await BuyerModel.editOrder(order._id, updateOrderDataFiltered)
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onSubmitCreateBoxes(order, formFieldsArr) {
    try {
      this.error = undefined

      this.createBoxesResult = []

      for (let i = 0; i < formFieldsArr.length; i++) {
        const elementOrderBox = formFieldsArr[i]

        await this.onCreateBox(elementOrderBox, order)

        if (elementOrderBox.tmpUseToUpdateSupplierBoxDimensions) {
          const supplierUpdateData = getObjectFilteredByKeyArrayBlackList(
            {
              ...order.product.currentSupplier,
              boxProperties: {
                amountInBox: elementOrderBox.items[0].amount || 0,
                boxHeightCm: parseFloat(elementOrderBox?.heightCmSupplier) || 0,
                boxLengthCm: parseFloat(elementOrderBox?.lengthCmSupplier) || 0,
                boxWeighGrossKg: parseFloat(elementOrderBox?.weighGrossKgSupplier) || 0,
                boxWidthCm: parseFloat(elementOrderBox?.widthCmSupplier) || 0,
              },
            },
            ['_id', 'yuanRate'],
          )

          await SupplierModel.updateSupplier(order.product.currentSupplier._id, supplierUpdateData)
        }
      }

      await BuyerModel.postTask({
        taskId: 0,
        boxes: [],
        boxesBefore: [...this.createBoxesResult /* createBoxResult.guid*/],
        operationType: 'receive',
        clientComment: order.clientComment || '',
      })

      if (!this.error) {
        this.showSuccessModalText = t(TranslationKey['A task was created for the warehouse: "Receive a box"'])

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

      this.createBoxesResult = [...this.createBoxesResult, createBoxResult.guid]

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
    this.nameSearchValue = searchValue

    this.getOrdersMy()
  }

  async getOrdersMy() {
    try {
      const filter = isNaN(this.nameSearchValue)
        ? `or[0][asin][$contains]=${this.nameSearchValue};or[1][amazonTitle][$contains]=${this.nameSearchValue};or[2][skusByClient][$contains]=${this.nameSearchValue};or[3][item][$eq]=${this.nameSearchValue};`
        : `or[0][asin][$contains]=${this.nameSearchValue};or[1][amazonTitle][$contains]=${this.nameSearchValue};or[2][skusByClient][$contains]=${this.nameSearchValue};or[3][id][$eq]=${this.nameSearchValue};or[4][item][$eq]=${this.nameSearchValue};`

      const result = await BuyerModel.getOrdersMyPag({
        filters: this.nameSearchValue ? filter : null,

        filtersOrder: null,

        limit: this.rowsPerPage,
        offset: this.curPage * this.rowsPerPage,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
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
