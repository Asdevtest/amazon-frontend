import {transformAndValidate} from 'class-transformer-validator'
import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {BoxesModel} from '@models/boxes-model'
import {BoxesCreateBoxContract} from '@models/boxes-model/boxes-model.contracts'
import {BuyerModel} from '@models/buyer-model'

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
]

export class BuyerMyOrdersViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  error = undefined

  ordersMy = []
  drawerOpen = false
  showBarcodeModal = false
  showOrderModal = false
  rowsPerPage = 15
  curPage = 1
  selectedOrder = undefined
  barcode = ''
  showCreateOrEditBoxModal = false
  showNoDimensionsErrorModal = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getOrdersMy()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onClickOrder(order) {
    this.selectedOrder = order
    this.onTriggerShowOrderModal()
  }

  async onSubmitSaveOrder(order, orderFields) {
    this.onSaveOrder(order, orderFields)
  }

  async onSaveOrder(order, updateOrderData) {
    try {
      const updateOrderDataFiltered = getObjectFilteredByKeyArrayWhiteList(updateOrderData, updateOrderKeys, true)
      await BuyerModel.updateOrder(order._id, updateOrderDataFiltered)
      this.loadData()
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onSubmitCreateBoxes(boxId, formFieldsArr) {
    this.error = undefined

    for (let i = 0; i < formFieldsArr.length; i++) {
      const elementOrderBox = formFieldsArr[i]

      await this.onCreateBox(elementOrderBox)
    }

    if (!this.error) {
      runInAction(() => {
        this.selectedOrder = undefined
      })
      this.onTriggerShowOrderModal()
    }
  }

  async onCreateBox(formFields) {
    try {
      const createBoxData = {
        ...getObjectFilteredByKeyArrayBlackList(formFields, ['items']),
        clientId: this.selectedOrder.createdBy._id,
        deliveryMethod: formFields.deliveryMethod,
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

      this.error = error
    }
  }

  async getOrdersMy() {
    try {
      const result = await BuyerModel.getOrdersMy()
      runInAction(() => {
        this.ordersMy = result
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

  onTriggerShowOrderModal() {
    this.showOrderModal = !this.showOrderModal
  }

  onTriggerShowCreateOrEditBoxModal() {
    this.showCreateOrEditBoxModal = !this.showCreateOrEditBoxModal
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangePage(e, value) {
    this.curPage = value
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  actionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }
}
