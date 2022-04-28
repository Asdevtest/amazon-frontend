import {transformAndValidate} from 'class-transformer-validator'
import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {OrderStatus, OrderStatusByKey} from '@constants/order-status'

import {BoxesModel} from '@models/boxes-model'
import {BoxesCreateBoxContract} from '@models/boxes-model/boxes-model.contracts'
import {BuyerModel} from '@models/buyer-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {buyerMyOrdersViewColumns} from '@components/table-columns/buyer/buyer-my-orders-columns'

import {buyerMyOrdersDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
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
]

export class BuyerMyOrdersViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  error = undefined

  ordersMy = []
  curBoxesOfOrder = []

  volumeWeightCoefficient = undefined

  drawerOpen = false
  showBarcodeModal = false
  showOrderModal = false
  selectedOrder = undefined
  barcode = ''
  showNoDimensionsErrorModal = false
  showWarningNewBoxesModal = false
  showSuccessModal = false
  showOrderPriceMismatchModal = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = buyerMyOrdersViewColumns()

  progressValue = 0
  showProgress = false
  readyImages = []

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setDataGridState(state) {
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
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = buyerMyOrdersViewColumns().map(el => ({
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
    return toJS(this.ordersMy)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
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

  async onClickOrder(order) {
    try {
      const orderData = await BuyerModel.getOrderById(order.originalData._id)

      this.selectedOrder = orderData
      this.getBoxesOfOrder(order.originalData._id)

      const result = await UserModel.getPlatformSettings()

      this.volumeWeightCoefficient = result.volumeWeightCoefficient

      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitSaveOrder(order, orderFields, boxesForCreation, photosToLoad) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const isMismatchOrderPrice = orderFields.totalPriceChanged - orderFields.totalPrice > 0

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

      if (boxesForCreation.length > 0 && !isMismatchOrderPrice) {
        await this.onSubmitCreateBoxes(order, boxesForCreation)
      }

      if (orderFields.totalPriceChanged !== order.totalPriceChanged && isMismatchOrderPrice) {
        await BuyerModel.setOrderTotalPriceChanged(order._id, {totalPriceChanged: orderFields.totalPriceChanged})
      } else {
        if (orderFields.totalPriceChanged !== order.totalPriceChanged) {
          await BuyerModel.setOrderTotalPriceChanged(order._id, {totalPriceChanged: orderFields.totalPriceChanged})
        }

        if (orderFields.status === `${OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]}`) {
          await BuyerModel.orderPayToSupplier(order._id)
        }

        if (orderFields.status === `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}`) {
          await BuyerModel.orderTrackNumberIssued(order._id)
        }

        if (orderFields.status === `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`) {
          await BuyerModel.returnOrder(order._id, {buyerComment: orderFields.buyerComment})
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

      for (let i = 0; i < formFieldsArr.length; i++) {
        const elementOrderBox = formFieldsArr[i]

        await this.onCreateBox(elementOrderBox, order)
      }

      if (!this.error) {
        this.onTriggerOpenModal('showSuccessModal')
      }
      await this.getBoxesOfOrder(order._id)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async onCreateBox(formFields, order) {
    try {
      const createBoxData = {
        ...getObjectFilteredByKeyArrayBlackList(formFields, [
          'items',
          'tmpBarCode',
          'tmpWarehouses',
          'tmpDeliveryMethod',
          'tmpStatus',
          'weightFinalAccountingKgSupplier',

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

      await BuyerModel.postTask({
        taskId: 0,
        boxes: [],
        boxesBefore: [createBoxResult.guid],
        operationType: 'receive',
        clientComment: order.clientComment || '',
      })
      return
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.error = error
      })
      throw new Error('Error during box creation')
    }
  }

  async getOrdersMy() {
    try {
      const result = await BuyerModel.getOrdersMy()
      runInAction(() => {
        this.ordersMy = buyerMyOrdersDataConverter(result).sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
      })
    } catch (error) {
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
  }

  actionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }
}
