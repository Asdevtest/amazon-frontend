import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { OrderModel } from '@models/order-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { clientProductOrdersViewColumns } from '@components/table/table-columns/client/client-product-orders-columns'

import { clientOrdersDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

export const chosenStatuses = {
  ALL: 'ALL',
  AT_PROCESS: 'AT_PROCESS',
  CANCELED: 'CANCELED',
  COMPLETED: 'COMPLETED',
}

const selectedStatus = [
  OrderStatusByKey[OrderStatus.AT_PROCESS],
  OrderStatusByKey[OrderStatus.READY_TO_PROCESS],
  OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE],
  OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED],
  OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT],
  OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER],
]

const canceledStatus = [
  OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT],
  OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER],
]

const completedStatus = [OrderStatusByKey[OrderStatus.IN_STOCK], OrderStatusByKey[OrderStatus.VERIFY_RECEIPT]]

export class OrdersModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  productId = undefined

  successModalText = ''
  nameSearchValue = ''
  orders = []
  drawerOpen = false

  showOrderModal = false
  showSetBarcodeModal = false
  showConfirmModal = false
  showSuccessModal = false

  ordersDataStateToSubmit = undefined
  selectedProduct = undefined
  reorderOrder = undefined
  uploadedFiles = []

  isPendingOrdering = false

  storekeepers = []
  destinations = []
  platformSettings = undefined

  confirmModalSettings = {
    isWarning: false,
    confirmTitle: '',
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  rowHandlers = {
    onClickReorder: (item, isPendingOrder) => this.onClickReorder(item, isPendingOrder),
  }

  columnsModel = clientProductOrdersViewColumns(this.rowHandlers, () => this.isSomeFilterOn)
  columnVisibilityModel = {}

  constructor({ history, productId }) {
    runInAction(() => {
      this.history = history

      this.productId = productId
    })

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
  }

  isCheckedStatus = {
    [chosenStatuses.ALL]: true,
    [chosenStatuses.AT_PROCESS]: true,
    [chosenStatuses.CANCELED]: true,
    [chosenStatuses.COMPLETED]: true,
  }

  get orderStatusData() {
    return {
      chosenStatuses,
      chosenStatusSettings: this.isCheckedStatus,
      onCheckboxChange: this.onCheckboxChange,
    }
  }

  onCheckboxChange(event) {
    const { name, checked } = event.target
    const { ALL, AT_PROCESS, CANCELED, COMPLETED } = chosenStatuses

    if (name === ALL) {
      this.isCheckedStatus = {
        [ALL]: checked,
        [AT_PROCESS]: checked,
        [CANCELED]: checked,
        [COMPLETED]: checked,
      }
    } else {
      this.isCheckedStatus = {
        ...this.isCheckedStatus,
        [name]: checked,
      }

      if (this.isCheckedStatus[AT_PROCESS] && this.isCheckedStatus[CANCELED] && this.isCheckedStatus[COMPLETED]) {
        this.isCheckedStatus = {
          ...this.isCheckedStatus,
          [ALL]: true,
        }
      } else {
        this.isCheckedStatus = {
          ...this.isCheckedStatus,
          [ALL]: false,
        }
      }
    }
  }

  onClickResetFilters() {
    const { ALL, AT_PROCESS, CANCELED, COMPLETED } = chosenStatuses

    this.isCheckedStatus = {
      [ALL]: true,
      [AT_PROCESS]: true,
      [CANCELED]: true,
      [COMPLETED]: true,
    }

    this.getOrdersByProductId()
  }

  get isSomeFilterOn() {
    return { isActiveFilter: Object.values(this.isCheckedStatus).includes(false) }
  }

  getCurrentData() {
    const { ALL, AT_PROCESS, CANCELED, COMPLETED } = chosenStatuses

    let filteredOrders = toJS(this.orders)

    if (!this.isCheckedStatus[ALL]) {
      filteredOrders = filteredOrders.filter(el => {
        const { status } = el.originalData

        return (
          (this.isCheckedStatus[AT_PROCESS] && selectedStatus.includes(status)) ||
          (this.isCheckedStatus[CANCELED] && canceledStatus.includes(status)) ||
          (this.isCheckedStatus[COMPLETED] && completedStatus.includes(status))
        )
      })
    }

    return toJS(filteredOrders)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getOrdersByProductId()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async getOrdersByProductId() {
    try {
      const result = await ClientModel.getOrdersByProductId(this.productId)

      runInAction(() => {
        this.orders = clientOrdersDataConverter(result).sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.orders = []
        this.error = error
      })
    }
  }

  async onClickReorder(item, isPendingOrder) {
    try {
      const [storekeepers, destinations, result, order] = await Promise.all([
        StorekeeperModel.getStorekeepers(),
        ClientModel.getDestinations(),
        UserModel.getPlatformSettings(),
        ClientModel.getOrderById(item._id),
      ])

      runInAction(() => {
        this.storekeepers = storekeepers

        this.destinations = destinations

        this.platformSettings = result

        this.reorderOrder = order

        this.isPendingOrdering = !!isPendingOrder
      })

      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.log(error)
    }
  }

  onDoubleClickBarcode = item => {
    this.selectedProduct = item

    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  async onClickSaveBarcode(tmpBarCode) {
    this.uploadedFiles = []

    if (tmpBarCode.length) {
      await onSubmitPostImages.call(this, { images: tmpBarCode, type: 'uploadedFiles' })
    }

    await ClientModel.updateProductBarCode(this.selectedProduct._id, { barCode: this.uploadedFiles[0] })

    this.onTriggerOpenModal('showSetBarcodeModal')
    runInAction(() => {
      this.selectedProduct = undefined
    })
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  async createOrder(orderObject) {
    try {
      const requestData = getObjectFilteredByKeyArrayBlackList(orderObject, [
        'barCode',
        'tmpBarCode',
        'tmpIsPendingOrder',
        '_id',
      ])

      if (orderObject.tmpIsPendingOrder) {
        await ClientModel.createFormedOrder(requestData)
      } else {
        await ClientModel.createOrder(requestData)
      }

      await this.updateUserInfo()

      this.loadData()
    } catch (error) {
      console.log(error)

      this.showInfoModalTitle = `${t(TranslationKey["You can't order"])} "${error.body.message}"`
      this.onTriggerOpenModal('showInfoModal')
      this.error = error
    }
  }

  async onSubmitOrderProductModal() {
    try {
      this.error = undefined
      this.onTriggerOpenModal('showOrderModal')

      for (let i = 0; i < this.ordersDataStateToSubmit.length; i++) {
        const product = this.ordersDataStateToSubmit[i]

        this.uploadedFiles = []

        if (product.tmpBarCode.length) {
          await onSubmitPostImages.call(this, { images: product.tmpBarCode, type: 'uploadedFiles' })

          await ClientModel.updateProductBarCode(product.productId, { barCode: this.uploadedFiles[0] })
        } else if (!product.barCode) {
          await ClientModel.updateProductBarCode(product.productId, { barCode: null })
        }

        if (this.isPendingOrdering) {
          const dataToRequest = getObjectFilteredByKeyArrayWhiteList(product, [
            'amount',
            'orderSupplierId',
            'images',
            'totalPrice',
            'item',
            'needsResearch',
            'deadline',
            'priority',
            'expressChinaDelivery',
            'clientComment',
            'destinationId',
            'storekeeperId',
            'logicsTariffId',
          ])
          await OrderModel.changeOrderData(product._id, dataToRequest)
          await ClientModel.updateOrderStatusToReadyToProcess(product._id)
        } else {
          await this.createOrder(product)
        }

        // await this.createOrder(product)
      }

      if (!this.error) {
        this.successModalText = this.isPendingOrdering
          ? t(TranslationKey['The order has been updated'])
          : t(TranslationKey['The order has been created'])
        this.onTriggerOpenModal('showSuccessModal')
      }
      this.onTriggerOpenModal('showConfirmModal')
      // this.onTriggerOpenModal('showOrderModal')
      // const noProductBaseUpdate = true
      // await this.getProductsMy(noProductBaseUpdate)

      this.loadData()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onConfirmSubmitOrderProductModal({ ordersDataState, totalOrdersCost }) {
    this.ordersDataStateToSubmit = ordersDataState

    this.confirmModalSettings = {
      isWarning: false,
      confirmTitle: t(TranslationKey['You are making an order, are you sure?']),
      confirmMessage: ordersDataState.some(el => el.tmpIsPendingOrder)
        ? t(TranslationKey['Pending order will be created'])
        : `${t(TranslationKey['Total amount'])}: ${totalOrdersCost}. ${t(TranslationKey['Confirm order'])}?`,
      onClickConfirm: () => this.onSubmitOrderProductModal(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickTableRow(order) {
    this.history.push(
      `/client/my-orders/orders/order?orderId=${order.originalData._id}&order-human-friendly-id=${order.originalData.id}`,
    )
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
