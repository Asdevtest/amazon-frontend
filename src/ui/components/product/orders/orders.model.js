import { makeAutoObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { chosenStatusesByFilter } from '@constants/statuses/inventory-product-orders-statuses'
import { TranslationKey } from '@constants/translations/translation-key'
import { createFormedOrder, createOrderRequestWhiteList } from '@constants/white-list'

import { ClientModel } from '@models/client-model'
import { OrderModel } from '@models/order-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { clientProductOrdersViewColumns } from '@components/table/table-columns/client/client-product-orders-columns'

import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'

import { getActiveStatuses } from './helpers/get-active-statuses'
import { canceledStatus, completedStatus, selectedStatus } from './orders.constant'

export class OrdersModel {
  requestStatus = undefined

  productId = undefined

  nameSearchValue = ''
  orders = []
  drawerOpen = false

  showOrderModal = false
  showSetBarcodeModal = false
  showConfirmModal = false

  ordersDataStateToSubmit = undefined
  selectedProduct = undefined
  reorderOrder = undefined
  uploadedFiles = []

  isPendingOrdering = false

  storekeepers = []
  destinations = []

  paginationModel = { page: 0, pageSize: 15 }

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

  isCheckedStatusByFilter = {}

  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor({ productId, showAtProcessOrders }) {
    this.productId = productId

    this.isCheckedStatusByFilter = getActiveStatuses(showAtProcessOrders)

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model
  }

  get orderStatusData() {
    return {
      isCheckedStatusByFilter: this.isCheckedStatusByFilter,
      onCheckboxChange: this.onCheckboxChange,
    }
  }

  onCheckboxChange(event) {
    const { name, checked } = event.target
    const { ALL, AT_PROCESS, CANCELED, COMPLETED } = chosenStatusesByFilter

    if (name === ALL) {
      this.isCheckedStatusByFilter = {
        [ALL]: checked,
        [AT_PROCESS]: checked,
        [CANCELED]: checked,
        [COMPLETED]: checked,
      }
    } else {
      this.isCheckedStatusByFilter = {
        ...this.isCheckedStatusByFilter,
        [name]: checked,
      }

      if (
        this.isCheckedStatusByFilter[AT_PROCESS] &&
        this.isCheckedStatusByFilter[CANCELED] &&
        this.isCheckedStatusByFilter[COMPLETED]
      ) {
        this.isCheckedStatusByFilter = {
          ...this.isCheckedStatusByFilter,
          [ALL]: true,
        }
      } else {
        this.isCheckedStatusByFilter = {
          ...this.isCheckedStatusByFilter,
          [ALL]: false,
        }
      }
    }
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.loadData()
  }

  onClickResetFilters() {
    const { ALL, AT_PROCESS, CANCELED, COMPLETED } = chosenStatusesByFilter

    this.isCheckedStatusByFilter = {
      [ALL]: true,
      [AT_PROCESS]: true,
      [CANCELED]: true,
      [COMPLETED]: true,
    }

    this.getOrdersByProductId()
  }

  get isSomeFilterOn() {
    return { isActiveFilter: Object.values(this.isCheckedStatusByFilter).includes(false) }
  }

  getCurrentData() {
    const { ALL, AT_PROCESS, CANCELED, COMPLETED } = chosenStatusesByFilter

    if (!this.isCheckedStatusByFilter[ALL]) {
      return this.orders.filter(el => {
        const { status } = el.originalData

        return (
          (this.isCheckedStatusByFilter[AT_PROCESS] && selectedStatus.includes(status)) ||
          (this.isCheckedStatusByFilter[CANCELED] && canceledStatus.includes(status)) ||
          (this.isCheckedStatusByFilter[COMPLETED] && completedStatus.includes(status))
        )
      })
    }

    return this.orders
  }

  loadData() {
    try {
      this.getOrdersByProductId()
    } catch (error) {
      console.error(error)
    }
  }

  async getOrdersByProductId() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      const result = await ClientModel.getOrdersByProductId(this.productId)

      runInAction(() => {
        this.orders = result
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this.orders = []
      })
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async onClickReorder(item, isPendingOrder) {
    try {
      const [storekeepers, destinations, order] = await Promise.all([
        StorekeeperModel.getStorekeepers(),
        ClientModel.getDestinations(),
        ClientModel.getOrderById(item._id),
      ])

      runInAction(() => {
        this.storekeepers = storekeepers
        this.destinations = destinations
        this.reorderOrder = order
        this.isPendingOrdering = !!isPendingOrder
      })

      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.error(error)
    }
  }

  onDoubleClickBarcode = item => {
    this.selectedProduct = item

    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  async onClickSaveBarcode(tmpBarCode) {
    try {
      if (tmpBarCode.length) {
        await onSubmitPostImages.call(this, { images: tmpBarCode, type: 'uploadedFiles' })
      }

      await ClientModel.updateProductBarCode(this.selectedProduct._id, { barCode: this.uploadedFiles[0] })

      this.onTriggerOpenModal('showSetBarcodeModal')

      runInAction(() => {
        this.selectedProduct = undefined
      })
    } catch (error) {
      console.error(error)
    }
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  async createOrder(orderObject) {
    try {
      const requestData = getObjectFilteredByKeyArrayWhiteList(orderObject, createOrderRequestWhiteList)

      if (orderObject.tmpIsPendingOrder) {
        await ClientModel.createFormedOrder(requestData)
      } else {
        await ClientModel.createOrder(requestData)
      }

      await this.updateUserInfo()

      this.loadData()
    } catch (error) {
      console.error(error)

      this.showInfoModalTitle = `${t(TranslationKey["You can't order"])} "${error.body.message}"`
      this.onTriggerOpenModal('showInfoModal')
    }
  }

  async onSubmitOrderProductModal() {
    try {
      this.onTriggerOpenModal('showOrderModal')

      for (let i = 0; i < this.ordersDataStateToSubmit.length; i++) {
        let product = this.ordersDataStateToSubmit[i]
        let uploadedTransparencyFiles = []

        if (product.tmpBarCode.length) {
          await onSubmitPostImages.call(this, { images: product.tmpBarCode, type: 'uploadedFiles' })

          await ClientModel.updateProductBarCode(product.productId, { barCode: this.uploadedFiles[0] })
        } else if (!product.barCode) {
          await ClientModel.updateProductBarCode(product.productId, { barCode: null })
        }

        if (product.tmpTransparencyFile.length) {
          uploadedTransparencyFiles = await onSubmitPostImages.call(this, {
            images: product.tmpTransparencyFile,
            type: 'uploadedFiles',
          })

          product = {
            ...product,
            transparencyFile: uploadedTransparencyFiles[0],
          }
        }

        if (product.tmpIsPendingOrder) {
          await ClientModel.createFormedOrder(getObjectFilteredByKeyArrayWhiteList(product, createFormedOrder))
        } else if (this.isPendingOrdering) {
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
            'transparencyFile',
          ])
          await OrderModel.changeOrderData(product._id, dataToRequest)
          await ClientModel.updateOrderStatusToReadyToProcess(product._id)
        } else {
          await this.createOrder(getObjectFilteredByKeyArrayWhiteList(product, createOrderRequestWhiteList))
        }
      }

      toast.success(
        this.isPendingOrdering
          ? t(TranslationKey['The order has been updated'])
          : t(TranslationKey['The order has been created']),
      )

      this.onTriggerOpenModal('showConfirmModal')

      this.loadData()
    } catch (error) {
      console.error(error)
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
    window
      .open(
        `/client/my-orders/orders/order?orderId=${order.originalData._id}&order-human-friendly-id=${order.originalData.id}`,
        '_blank',
      )
      .focus()
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
