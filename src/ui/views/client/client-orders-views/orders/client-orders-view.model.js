import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { routsPathes } from '@constants/navigation/routs-pathes'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { OrderStatus, OrderStatusByKey } from '@constants/statuses/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { OrderModel } from '@models/order-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { clientOrdersViewColumns } from '@components/table/table-columns/client/client-orders-columns'

import { clientOrdersDataConverter } from '@utils/data-grid-data-converters'
import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

export class ClientOrdersViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  error = undefined

  nameSearchValue = ''
  orders = []
  baseNoConvertedOrders = []

  // НЕ было до создания фильтрации по статусам (3 строки)
  orderStatusDataBase = []
  chosenStatus = []
  filteredStatus = []

  currentData = []
  selectedRowIds = []

  showOrderModal = false
  showSetBarcodeModal = false
  showConfirmModal = false
  showCheckPendingOrderFormModal = false

  isOrder = []
  existingOrders = []
  checkPendingData = []

  showAcceptMessage = undefined
  acceptMessage = undefined

  ordersDataStateToSubmit = undefined
  selectedProduct = undefined
  reorderOrdersData = []
  uploadedFiles = []

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
    onClickReorder: item => this.onClickReorder(item),
  }

  rowCount = 0
  startFilterModel = undefined
  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  amountLimit = 1000
  columnsModel = clientOrdersViewColumns(this.rowHandlers)

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }

  get isPendingOrdering() {
    return this.history.location.pathname === routsPathes.CLIENT_PENDING_ORDERS
  }

  // НЕ было до создания фильтрации по статусам
  get orderStatusData() {
    return {
      orderStatusDataBase: this.orderStatusDataBase,
      chosenStatus: this.chosenStatus,
      onClickOrderStatusData: this.onClickOrderStatusData,
    }
  }

  constructor({ history, location }) {
    runInAction(() => {
      this.history = history

      if (location?.state?.dataGridFilter) {
        this.startFilterModel = location.state.dataGridFilter
      }
    })
    // else {
    //       this.startFilterModel = resetDataGridFilter
    //     }

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.orders,
      () => {
        runInAction(() => {
          this.currentData = this.getCurrentData()
        })
      },
    )
  }

  setDestinationsFavouritesItem(item) {
    SettingsModel.setDestinationsFavouritesItem(item)
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })

    this.setDataGridState()
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
    this.getOrders()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
    this.getOrders()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, this.getDataGridTableKey(this.history.location.pathname))
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[this.getDataGridTableKey(this.history.location.pathname)]

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

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })

    this.getOrders()
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.setDataGridState()
    this.getOrders()
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedRowIds = model
    })
  }

  getCurrentData() {
    return toJS(this.orders)
  }

  // getCurrentReorderData() {
  //   return toJS(this.reorderOrder)
  // }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      await this.getOrders()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
      runInAction(() => {
        if (error.body && error.body.message) {
          this.error = error.body.message
        }
      })
    }
  }

  getDataGridTableKey = pathname => {
    if (pathname) {
      switch (pathname) {
        case routsPathes.CLIENT_ORDERS:
          return DataGridTablesKeys.CLIENT_ORDERS
        case routsPathes.CLIENT_PENDING_ORDERS:
          return DataGridTablesKeys.CLIENT_PENDING_ORDERS

        default:
          return DataGridTablesKeys.CLIENT_ORDERS
      }
    }
  }

  // Было до создания фильтрации по статусам
  // setOrderStatus = pathname => {
  //   if (pathname) {
  //     switch (pathname) {
  //       case routsPathes.CLIENT_ORDERS:
  // return `${OrderStatusByKey[OrderStatus.AT_PROCESS]}, ${OrderStatusByKey[OrderStatus.READY_TO_PROCESS]}, ${
  //           OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]
  //         }, ${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}, ${OrderStatusByKey[OrderStatus.VERIFY_RECEIPT]}, ${
  //           OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]
  //         }, ${OrderStatusByKey[OrderStatus.IN_STOCK]}, ${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}, ${
  //           OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT]
  //         }`
  //       case routsPathes.CLIENT_PENDING_ORDERS:
  //         return `${OrderStatusByKey[OrderStatus.FORMED]}, ${OrderStatusByKey[OrderStatus.PENDING]}, ${
  //           OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]
  //         }`

  //       default:
  //         return `${OrderStatusByKey[OrderStatus.AT_PROCESS]}, ${
  //           OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]
  //         }`
  //     }
  //   }
  // }

  // НЕ было до создания фильтрации по статусам
  setOrderStatus = pathname => {
    if (pathname) {
      switch (pathname) {
        case routsPathes.CLIENT_ORDERS:
          return [
            OrderStatus.AT_PROCESS,
            OrderStatus.READY_TO_PROCESS,
            OrderStatus.READY_FOR_PAYMENT,
            OrderStatus.PAID_TO_SUPPLIER,
            OrderStatus.TRACK_NUMBER_ISSUED,
            OrderStatus.VERIFY_RECEIPT,
            OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE,
            OrderStatus.IN_STOCK,
            OrderStatus.CANCELED_BY_BUYER,
            OrderStatus.CANCELED_BY_CLIENT,
            OrderStatus.PARTIALLY_PAID,
          ]
        case routsPathes.CLIENT_PENDING_ORDERS:
          return [OrderStatus.FORMED, OrderStatus.PENDING, OrderStatus.READY_FOR_BUYOUT]

        default:
          return [OrderStatus.AT_PROCESS, OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]
      }
    }
  }

  // Убирает и добавляет статусы в массив выбранных статусов
  onClickOrderStatusData(status) {
    runInAction(() => {
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
      this.getOrders()
    })
  }

  setDefaultStatuses() {
    if (!this.chosenStatus.length) {
      this.filteredStatus = this.setOrderStatus(this.history.location.pathname)
    } else {
      this.filteredStatus = this.chosenStatus
    }
    this.orderStatusDataBase = this.setOrderStatus(this.history.location.pathname)
  }

  async getOrders() {
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
          { item: { $eq: this.nameSearchValue } },
          { id: { $eq: this.nameSearchValue } },
        ].filter(
          el =>
            ((isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))) && !el.id) ||
            !(isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))),
        ),
      })

      this.setDefaultStatuses()
      const orderStatus = this.filteredStatus.map(item => OrderStatusByKey[item]).join(', ')

      const result = await ClientModel.getOrdersPag({
        filters: this.nameSearchValue ? filter : null,

        status: orderStatus,

        // Было до создания фильтрации по статусам
        // status: this.setOrderStatus(this.history.location.pathname),

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : this.isPendingOrdering ? 'deadline' : 'createdAt',
        sortType: this.sortModel.length
          ? this.sortModel[0].sort.toUpperCase()
          : this.isPendingOrdering
          ? 'ASC'
          : 'DESC',
      })

      runInAction(() => {
        this.rowCount = result.count

        this.baseNoConvertedOrders = result.rows

        this.orders = clientOrdersDataConverter(result.rows)
      })
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.baseNoConvertedOrders = []
        this.orders = []
      })

      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  async onClickManyReorder() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      runInAction(() => {
        this.reorderOrdersData = []
      })

      const [storekeepers, destinations, result] = await Promise.all([
        StorekeeperModel.getStorekeepers(),
        ClientModel.getDestinations(),
        UserModel.getPlatformSettings(),
      ])

      for (let i = 0; i < this.selectedRowIds.length; i++) {
        const orderId = this.selectedRowIds[i]

        const order = await ClientModel.getOrderById(orderId)

        runInAction(() => {
          this.reorderOrdersData = [...this.reorderOrdersData, order]
        })
      }

      runInAction(() => {
        this.storekeepers = storekeepers

        this.destinations = destinations

        this.amountLimit = this.platformSettings = result
      })

      this.onTriggerOpenModal('showOrderModal')
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onConfirmCancelManyReorder() {
    runInAction(() => {
      this.confirmModalSettings = {
        isWarning: true,
        confirmTitle: t(TranslationKey.Attention),
        confirmMessage: t(TranslationKey['Cancel selected orders']) + '?',
        onClickConfirm: () => this.onClickCancelManyReorder(),
      }
    })

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitCancelOrder(orderId) {
    try {
      await ClientModel.cancelOrder(orderId)
    } catch (error) {
      console.log(error)
    }
  }

  async onClickCancelManyReorder() {
    try {
      for (let i = 0; i < this.selectedRowIds.length; i++) {
        const orderId = this.selectedRowIds[i]
        await this.onSubmitCancelOrder(orderId)
      }

      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onClickReorder(item) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      const pendingOrders = []
      const correctIds = []

      const res = await OrderModel.checkPendingOrderByProductGuid(item.product._id)

      if (res.length > 0) {
        correctIds.push(item.product._id)
        pendingOrders.push(res.filter(el => el.id !== item.id))
      }

      this.checkPendingData = pendingOrders

      if (this.checkPendingData.length > 0 && this.checkPendingData[0].length > 0) {
        this.existingOrders = await this.currentData
          .filter(product => correctIds.includes(product.originalData.product._id))
          .map(prod => prod.originalData.product)

        this.isOrder = item

        this.onTriggerOpenModal('showCheckPendingOrderFormModal')
      } else {
        await this.onClickContinueBtn(item)
      }
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async onClickContinueBtn(item) {
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

        this.reorderOrdersData = [order]
      })

      this.onTriggerOpenModal('showOrderModal')

      if (this.showCheckPendingOrderFormModal) {
        this.onTriggerOpenModal('showCheckPendingOrderFormModal')
      }
    } catch (error) {
      console.log(error)
    }
  }

  onClickPandingOrder(id) {
    const win = window.open(`${window.location.origin}/client/my-orders/pending-orders/order?orderId=${id}`, '_blank')
    win.focus()
  }

  onDoubleClickBarcode = item => {
    runInAction(() => {
      this.selectedProduct = item
    })

    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  async onClickSaveBarcode(tmpBarCode) {
    runInAction(() => {
      this.uploadedFiles = []
    })

    if (tmpBarCode.length) {
      await onSubmitPostImages.call(this, { images: tmpBarCode, type: 'uploadedFiles' })
    }

    await ClientModel.updateProductBarCode(this.selectedProduct._id, { barCode: this.uploadedFiles[0] })

    this.onTriggerOpenModal('showSetBarcodeModal')
    runInAction(() => {
      this.selectedProduct = undefined
    })
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
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.showInfoModalTitle = `${t(TranslationKey["You can't order"])} "${error.body.message}"`
      })
      this.onTriggerOpenModal('showInfoModal')
      runInAction(() => {
        this.error = error
      })
    }
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  async onSubmitOrderProductModal() {
    try {
      runInAction(() => {
        this.error = undefined
      })
      this.onTriggerOpenModal('showOrderModal')

      for (let i = 0; i < this.ordersDataStateToSubmit.length; i++) {
        const orderObject = this.ordersDataStateToSubmit[i]

        runInAction(() => {
          this.uploadedFiles = []
        })

        if (orderObject.tmpBarCode.length) {
          await onSubmitPostImages.call(this, { images: orderObject.tmpBarCode, type: 'uploadedFiles' })

          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: this.uploadedFiles[0] })
        } else if (!orderObject.barCode) {
          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: null })
        }

        if (this.isPendingOrdering) {
          const dataToRequest = getObjectFilteredByKeyArrayWhiteList(orderObject, [
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

          await OrderModel.changeOrderData(orderObject._id, dataToRequest)

          await ClientModel.updateOrderStatusToReadyToProcess(orderObject._id)
        } else {
          await this.createOrder(orderObject)
        }
      }

      this.loadData()
      this.updateUserInfo()

      if (!this.error) {
        runInAction(() => {
          this.acceptMessage = t(TranslationKey['The order has been created'])
          this.showAcceptMessage = true
          if (this.showAcceptMessage) {
            setTimeout(() => {
              this.acceptMessage = ''
              this.showAcceptMessage = false
            }, 3000)
          }
        })
      }
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onConfirmSubmitOrderProductModal({ ordersDataState, totalOrdersCost }) {
    runInAction(() => {
      this.ordersDataStateToSubmit = ordersDataState

      this.confirmModalSettings = {
        isWarning: false,
        confirmTitle: t(TranslationKey['You are making an order, are you sure?']),
        confirmMessage: ordersDataState.some(el => el.tmpIsPendingOrder)
          ? t(TranslationKey['Pending order will be created'])
          : `${t(TranslationKey['Total amount'])}: ${totalOrdersCost}. ${t(TranslationKey['Confirm order'])}?`,
        onClickConfirm: () => this.onSubmitOrderProductModal(),
      }
    })

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickTableRow(order) {
    const win = window.open(
      `/client/my-orders/orders/order?order-id=${order.originalData._id}&order-human-friendly-id=${order.originalData.id}`,
      '_blank',
    )

    win.focus()
  }

  onTriggerOpenModal(modalState) {
    runInAction(() => {
      this[modalState] = !this[modalState]
    })
  }
}
