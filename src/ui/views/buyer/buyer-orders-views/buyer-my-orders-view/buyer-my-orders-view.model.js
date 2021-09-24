import {transformAndValidate} from 'class-transformer-validator'
import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {BoxesModel} from '@models/boxes-model'
import {BoxesCreateBoxContract} from '@models/boxes-model/boxes-model.contracts'
import {BuyerModel} from '@models/buyer-model'
import {SettingsModel} from '@models/settings-model'

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

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.BUYER_MY_ORDERS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.BUYER_MY_ORDERS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.curPage = state.pagination.page
      this.rowsPerPage = state.pagination.pageSize
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e.pageSize
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
    this.selectedOrder = order
    this.getBoxesOfOrder(order._id)
    this.onTriggerOpenModal('showOrderModal')
  }

  async onSubmitSaveOrder(order, orderFields, boxesForCreation) {
    try {
      await this.onSaveOrder(order, orderFields, boxesForCreation)

      if (boxesForCreation.length > 0) {
        await this.onSubmitCreateBoxes(order._id, boxesForCreation)
      }

      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onSaveOrder(order, updateOrderData) {
    try {
      const updateOrderDataFiltered = {
        ...getObjectFilteredByKeyArrayWhiteList(updateOrderData, updateOrderKeys, true),
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

  async onSubmitCreateBoxes(orderId, formFieldsArr) {
    this.error = undefined

    for (let i = 0; i < formFieldsArr.length; i++) {
      const elementOrderBox = formFieldsArr[i]

      await this.onCreateBox(elementOrderBox)
    }

    if (!this.error) {
      this.onTriggerOpenModal('showSuccessModal')
    }
    await this.getBoxesOfOrder(orderId)
  }

  async onCreateBox(formFields) {
    try {
      const createBoxData = {
        ...getObjectFilteredByKeyArrayBlackList(formFields, ['items']),
        clientId: this.selectedOrder.createdBy._id,
        deliveryMethod: formFields.deliveryMethod,
        lengthCmSupplier: parseFloat(formFields?.lengthCmSupplier) || 0,
        widthCmSupplier: parseFloat(formFields?.widthCmSupplier) || 0,
        heightCmSupplier: parseFloat(formFields?.heightCmSupplier) || 0,
        weighGrossKgSupplier: parseFloat(formFields?.weighGrossKgSupplier) || 0,
        volumeWeightKgSupplier: parseFloat(formFields?.volumeWeightKgSupplier) || 0,
        items: [
          {
            product: formFields.items[0].product._id,
            amount: formFields.items[0].amount,
            order: this.selectedOrder._id,
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
      })
      return
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.error = error
      })
    }
  }

  async getOrdersMy() {
    try {
      const result = await BuyerModel.getOrdersMy()
      runInAction(() => {
        this.ordersMy = result.sort(sortObjectsArrayByFiledDate('createDate')).map(order => ({
          ...order,
          id: order._id,
        }))
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
    this.curPage = e.page
  }

  actionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }
}
