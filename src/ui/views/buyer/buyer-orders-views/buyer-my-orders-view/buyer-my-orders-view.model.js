import {transformAndValidate} from 'class-transformer-validator'
import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {BACKEND_API_URL} from '@constants/env'
import {loadingStatuses} from '@constants/loading-statuses'

import {BoxesModel} from '@models/boxes-model'
import {BoxesCreateBoxContract} from '@models/boxes-model/boxes-model.contracts'
import {BuyerModel} from '@models/buyer-model'
import {OtherModel} from '@models/other-model'
import {SettingsModel} from '@models/settings-model'

import {buyerMyOrdersViewColumns} from '@components/table-columns/buyer/buyer-my-orders-columns'

import {buyerMyOrdersDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

const updateOrderKeys = [
  'status',
  'deliveryMethod',
  'warehouse',
  'barCode',
  'trackingNumberChina',
  'amountPaymentPerConsignmentAtDollars',
  'isBarCodeAlreadyAttachedByTheSupplier',
  'deliveryCostToTheWarehouse',
  'buyerComment',
  'totalPriceChanged',
  'images',
  'yuanToDollarRate',
]

const updateOrderKeysWithoutStatus = [
  'deliveryMethod',
  'warehouse',
  'barCode',
  'trackingNumberChina',
  'amountPaymentPerConsignmentAtDollars',
  'isBarCodeAlreadyAttachedByTheSupplier',
  'deliveryCostToTheWarehouse',
  'buyerComment',
  'totalPriceChanged',
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
  densityModel = 'standart'
  columnsModel = buyerMyOrdersViewColumns()

  progressValue = 0
  showProgress = false
  readyImages = []

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async onSubmitPostImages({images}) {
    const loadingStep = 100 / images.length

    this.readyImages = []
    this.showProgress = true

    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      await this.onPostImage(image)
      this.progressValue = this.progressValue + loadingStep
    }

    this.showProgress = false
    this.progressValue = 0
  }

  async onPostImage(imageData) {
    const formData = new FormData()
    formData.append('filename', imageData.file)

    try {
      const imageFile = await OtherModel.postImage(formData)

      this.readyImages.push(BACKEND_API_URL + '/uploads/' + imageFile.data.fileName)
    } catch (error) {
      this.error = error
    }
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
      this.filterModel = state.filter
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
        this.curBoxesOfOrder = result.sort(sortObjectsArrayByFiledDate('createdAt')).reverse()
      })
    } catch (error) {
      console.log(error)
      this.curBoxesOfOrder = []
    }
  }

  onClickOrder(order) {
    this.selectedOrder = order.originalData
    this.getBoxesOfOrder(order._id)
    this.onTriggerOpenModal('showOrderModal')
  }

  async onSubmitSaveOrder(order, orderFields, boxesForCreation, photosToLoad) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const isMismatchOrderPrice = orderFields.totalPriceChanged - orderFields.totalPrice > 0

      await this.onSubmitPostImages({images: photosToLoad})

      orderFields = {
        ...orderFields,
        images: order.images === null ? this.readyImages : order.images.concat(this.readyImages),
      }

      await this.onSaveOrder(order, orderFields, isMismatchOrderPrice)

      if (boxesForCreation.length > 0 && !isMismatchOrderPrice) {
        await this.onSubmitCreateBoxes(order, boxesForCreation)
      }

      this.setRequestStatus(loadingStatuses.success)
      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async onSaveOrder(order, updateOrderData, isMismatchOrderPrice) {
    try {
      if (isMismatchOrderPrice) {
        this.onTriggerOpenModal('showOrderPriceMismatchModal')
      }

      const updateOrderDataFiltered = {
        ...getObjectFilteredByKeyArrayWhiteList(
          updateOrderData,
          isMismatchOrderPrice ? updateOrderKeysWithoutStatus : updateOrderKeys,
          true,
        ),
        totalPriceChanged: parseFloat(updateOrderData?.totalPriceChanged) || 0,
      }
      await BuyerModel.updateOrder(order._id, updateOrderDataFiltered)

      this.loadData()
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
        ]),
        clientId: this.selectedOrder.createdBy._id,
        deliveryMethod: formFields.deliveryMethod,
        lengthCmSupplier: parseFloat(formFields?.lengthCmSupplier) || 0,
        widthCmSupplier: parseFloat(formFields?.widthCmSupplier) || 0,
        heightCmSupplier: parseFloat(formFields?.heightCmSupplier) || 0,
        weighGrossKgSupplier: parseFloat(formFields?.weighGrossKgSupplier) || 0,
        volumeWeightKgSupplier: parseFloat(formFields?.volumeWeightKgSupplier) || 0,
        items: [
          {
            productId: formFields.items[0].product._id,
            amount: formFields.items[0].amount,
            orderId: this.selectedOrder._id,
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
        this.ordersMy = buyerMyOrdersDataConverter(result).sort(sortObjectsArrayByFiledDate('createdAt'))
      })
    } catch (error) {
      this.ordersMy = []
      console.log(error)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onSelectedOrder(value) {
    this.selectedOrder = value
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
