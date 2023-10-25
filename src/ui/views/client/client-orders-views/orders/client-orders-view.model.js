import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { routsPathes } from '@constants/navigation/routs-pathes'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { GeneralModel } from '@models/general-model'
import { OrderModel } from '@models/order-model'
import { SettingsModel } from '@models/settings-model'
import { ShopModel } from '@models/shop-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { clientOrdersViewColumns } from '@components/table/table-columns/client/client-orders-columns'

import { addIdDataConverter, clientOrdersDataConverter } from '@utils/data-grid-data-converters'
import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

const filtersFields = [
  'id',
  'item',
  'shopIds',
  'priority',
  'asin',
  'skusByClient',
  'amazonTitle',
  'status',
  'amount',
  'storekeeper',
  'destination',
  'productionTerm',
  'deadline',
  'needsResearch',
  'totalPrice',
  'clientComment',
  'buyerComment',
  'createdAt',
  'updatedAt',
]

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

  existingProducts = []
  shopsData = []

  alertShieldSettings = {
    showAlertShield: false,
    alertShieldMessage: '',
  }

  selectedProduct = undefined
  reorderOrdersData = []
  uploadedFiles = []

  storekeepers = []
  destinations = []
  platformSettings = undefined

  onHover = null

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
  columnsModel = clientOrdersViewColumns(
    this.rowHandlers,
    () => this.columnMenuSettings,
    () => this.onHover,
  )

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }

  get isPendingOrdering() {
    return this.history.location.pathname === routsPathes.CLIENT_PENDING_ORDERS
  }

  // НЕ было до создания фильтрации по статусам

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.onLeaveColumnField()
      this.getOrders()
      this.getDataGridState()
    },

    filterRequestStatus: undefined,

    isFormedData: { isFormed: null, onChangeIsFormed: value => this.onChangeIsFormed(value) },

    ...filtersFields.reduce(
      (ac, cur) =>
        (ac = {
          ...ac,
          [cur]: {
            filterData: [],
            currentFilterData: [],
          },
        }),
      {},
    ),
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

  async onClickFilterBtn(column) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const curShops = this.columnMenuSettings.shopIds.currentFilterData?.map(shop => shop._id).join(',')
      const shopFilter = this.columnMenuSettings.shopIds.currentFilterData && column !== 'shopIds' ? curShops : null
      const isFormedFilter = this.columnMenuSettings.isFormedData.isFormed

      const orderStatus = this.filteredStatus.map(item => OrderStatusByKey[item]).join(',')

      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'orders'),
        column,
        `clients/pag/orders?filters=${this.getFilter(column)}${
          shopFilter ? ';&' + '[shopIds][$eq]=' + shopFilter : ''
        }${isFormedFilter ? ';&' + 'isFormed=' + isFormedFilter : ''}${
          orderStatus ? ';&' + 'status=' + orderStatus : ''
        }`,
      )

      if (this.columnMenuSettings[column]) {
        this.columnMenuSettings = {
          ...this.columnMenuSettings,
          [column]: { ...this.columnMenuSettings[column], filterData: data },
        }
      }

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)

      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  getFilter(exclusion) {
    const idFilter = exclusion !== 'id' && this.columnMenuSettings.id?.currentFilterData.join(',')
    const itemFilter = exclusion !== 'item' && this.columnMenuSettings.item?.currentFilterData.join(',')

    const shopIdsFilter =
      exclusion !== 'shopIds' && this.columnMenuSettings.shopIds?.currentFilterData?.map(el => el._id).join(',')

    const priorityFilter = exclusion !== 'priority' && this.columnMenuSettings.priority?.currentFilterData.join(',')

    const asinFilter = exclusion !== 'asin' && this.columnMenuSettings.asin?.currentFilterData.join(',')
    const skusByClientFilter =
      exclusion !== 'skusByClient' && this.columnMenuSettings.skusByClient?.currentFilterData.join(',')
    const amazonTitleFilter =
      exclusion !== 'amazonTitle' && this.columnMenuSettings.amazonTitle?.currentFilterData.map(el => `${el}`).join(',')

    // const statusFilter = exclusion !== 'status' && this.columnMenuSettings.status?.currentFilterData.join(',')

    const amountFilter = exclusion !== 'amount' && this.columnMenuSettings.amount?.currentFilterData.join(',')

    const storekeeperFilter =
      exclusion !== 'storekeeper' && this.columnMenuSettings.storekeeper?.currentFilterData?.map(el => el._id).join(',')

    const destinationFilter =
      exclusion !== 'destination' && this.columnMenuSettings.destination?.currentFilterData?.map(el => el._id).join(',')

    const productionTermFilter =
      exclusion !== 'productionTerm' && this.columnMenuSettings.productionTerm?.currentFilterData.join(',')

    const deadlineFilter = exclusion !== 'deadline' && this.columnMenuSettings.deadline?.currentFilterData.join(',')

    const needsResearchFilter =
      exclusion !== 'needsResearch' && this.columnMenuSettings.needsResearch?.currentFilterData.join(',')

    const totalPriceFilter =
      exclusion !== 'totalPrice' && this.columnMenuSettings.totalPrice?.currentFilterData.join(',')

    const clientCommentFilter =
      exclusion !== 'clientComment' &&
      this.columnMenuSettings.clientComment?.currentFilterData.map(item => `"${item}"`).join(',')
    const buyerCommentFilter =
      exclusion !== 'buyerComment' &&
      this.columnMenuSettings.buyerComment?.currentFilterData.map(item => `"${item}"`).join(',')

    const createdAtFilter = exclusion !== 'createdAt' && this.columnMenuSettings.createdAt?.currentFilterData.join(',')
    const updatedAtFilter = exclusion !== 'updatedAt' && this.columnMenuSettings.updatedAt?.currentFilterData.join(',')

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

      ...(idFilter && {
        id: { $eq: idFilter },
      }),
      ...(itemFilter && {
        item: { $eq: itemFilter },
      }),

      ...(shopIdsFilter && {
        shopIds: { $eq: shopIdsFilter },
      }),

      ...(priorityFilter && {
        priority: { $eq: priorityFilter },
      }),

      ...(asinFilter && {
        asin: { $eq: asinFilter },
      }),
      ...(skusByClientFilter && {
        skusByClient: { $eq: skusByClientFilter },
      }),
      ...(amazonTitleFilter && {
        amazonTitle: { $eq: amazonTitleFilter },
      }),

      // ...(statusFilter && {
      //   status: { $eq: statusFilter },
      // }),

      ...(amountFilter && {
        amount: { $eq: amountFilter },
      }),

      ...(storekeeperFilter && {
        storekeeper: { $eq: storekeeperFilter },
      }),

      ...(destinationFilter && {
        destinationId: { $eq: destinationFilter },
      }),

      ...(productionTermFilter && {
        productionTerm: { $eq: productionTermFilter },
      }),

      ...(deadlineFilter && {
        deadline: { $eq: deadlineFilter },
      }),

      ...(needsResearchFilter && {
        needsResearch: { $eq: needsResearchFilter },
      }),

      ...(totalPriceFilter && {
        totalPrice: { $eq: totalPriceFilter },
      }),

      ...(clientCommentFilter && {
        clientComment: { $eq: clientCommentFilter },
      }),
      ...(buyerCommentFilter && {
        buyerComment: { $eq: buyerCommentFilter },
      }),
      ...(createdAtFilter && {
        createdAt: { $eq: createdAtFilter },
      }),
      ...(updatedAtFilter && {
        updatedAt: { $eq: updatedAtFilter },
      }),
    })

    return filter
  }

  onChangeFullFieldMenuItem(value, field) {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        [field]: {
          ...this.columnMenuSettings[field],
          currentFilterData: value,
        },
      }
    })
  }

  onLeaveColumnField() {
    this.onHover = null
  }

  onClickResetFilters() {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,

        ...filtersFields.reduce(
          (ac, cur) =>
            (ac = {
              ...ac,
              [cur]: {
                filterData: [],
                currentFilterData: [],
              },
            }),
          {},
        ),
      }
    })

    this.getOrders()
    this.getDataGridState()
  }

  onChangeIsFormed(value) {
    runInAction(() => {
      // this.isFormed = value

      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        isFormedData: {
          ...this.columnMenuSettings.isFormedData,
          isFormed: value,
        },
      }
    })

    this.getOrders()
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
      this.setDataGridState()
      this.getOrders()
    })
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedRowIds = model
    })
  }

  getCurrentData() {
    return toJS(this.orders)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.setDefaultStatuses()
      this.getDataGridState()

      await this.getShops()
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

  async getShops() {
    try {
      const result = await ShopModel.getMyShopNames()

      runInAction(() => {
        this.shopsData = addIdDataConverter(result)
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
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

  setDefaultStatuses() {
    if (!this.chosenStatus.length) {
      this.filteredStatus = this.setOrderStatus(this.history.location.pathname)
    } else {
      this.filteredStatus = this.chosenStatus
    }
    this.orderStatusDataBase = this.setOrderStatus(this.history.location.pathname)
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
      const res = await OrderModel.checkPendingOrderByProductGuid(item.product._id)

      if (res?.length) {
        runInAction(() => {
          this.existingProducts = [
            {
              _id: item?.product._id,
              asin: item?.product?.asin,
              orders: res,
            },
          ]
        })

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
    console.log('item', item)
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

  async getOrders() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const orderStatuses = this.filteredStatus.map(item => OrderStatusByKey[item]).join(',')
      const currentStatuses = this.columnMenuSettings.status?.currentFilterData.join(',')

      const result = await ClientModel.getOrdersPag({
        filters: this.getFilter(),

        status: this.columnMenuSettings.status?.currentFilterData.length ? currentStatuses : orderStatuses,

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

        this.orders = clientOrdersDataConverter(result.rows, this.shopsData)
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)

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

  async onSubmitOrderProductModal(ordersDataState) {
    try {
      runInAction(() => {
        this.error = undefined
      })
      this.onTriggerOpenModal('showOrderModal')

      for (let i = 0; i < ordersDataState.length; i++) {
        const orderObject = ordersDataState[i]

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
          this.alertShieldSettings = {
            showAlertShield: true,
            alertShieldMessage: t(TranslationKey['The order has been created']),
          }

          setTimeout(() => {
            this.alertShieldSettings = {
              ...this.alertShieldSettings,
              showAlertShield: false,
            }

            setTimeout(() => {
              this.alertShieldSettings = {
                showAlertShield: false,
                alertShieldMessage: '',
              }
            }, 1000)
          }, 3000)
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
      this.confirmModalSettings = {
        isWarning: false,
        confirmTitle: t(TranslationKey['You are making an order, are you sure?']),
        confirmMessage: ordersDataState.some(el => el.tmpIsPendingOrder)
          ? t(TranslationKey['Pending order will be created'])
          : `${t(TranslationKey['Total amount'])}: ${totalOrdersCost}. ${t(TranslationKey['Confirm order'])}?`,
        onClickConfirm: () => this.onSubmitOrderProductModal(ordersDataState),
      }
    })

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickTableRow(order) {
    const win = window.open(
      `/client/my-orders/${window.location.pathname.split('/').at(-1)}/order?orderId=${
        order.originalData._id
      }&order-human-friendly-id=${order.originalData.id}`,
      '_blank',
    )

    win.focus()

    /* this.history.push(
      `/client/my-orders/${window.location.pathname.split('/').at(-1)}/order?orderId=${
        order.originalData._id
      }&order-human-friendly-id=${order.originalData.id}`,
    ) */
  }

  onTriggerOpenModal(modalState) {
    runInAction(() => {
      this[modalState] = !this[modalState]
    })
  }
}
