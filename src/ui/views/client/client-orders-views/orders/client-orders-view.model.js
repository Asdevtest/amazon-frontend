import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveSubCategory} from '@constants/navbar-active-category'
import {OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {routsPathes} from '@constants/routs-pathes'
import {TranslationKey} from '@constants/translations/translation-key'

import {ClientModel} from '@models/client-model'
import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {clientOrdersViewColumns} from '@components/table-columns/client/client-orders-columns'

import {clientOrdersDataConverter} from '@utils/data-grid-data-converters'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

const setNavbarActiveSubCategory = pathname => {
  if (pathname) {
    switch (pathname) {
      case routsPathes.CLIENT_ORDERS:
        return navBarActiveSubCategory.SUB_NAVBAR_CLIENT_ORDERS
      case routsPathes.CLIENT_PENDING_ORDERS:
        return navBarActiveSubCategory.SUB_NAVBAR_CLIENT_PENDING_ORDERS

      default:
        return navBarActiveSubCategory.SUB_NAVBAR_CLIENT_ORDERS
    }
  }
}

export class ClientOrdersViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  error = undefined

  successModalText = ''
  nameSearchValue = ''
  orders = []
  baseNoConvertedOrders = []

  drawerOpen = false

  currentData = []
  selectedRowIds = []

  showOrderModal = false
  showSetBarcodeModal = false
  showConfirmModal = false
  showSuccessModal = false

  ordersDataStateToSubmit = undefined
  selectedProduct = undefined
  reorderOrdersData = []
  uploadedFiles = []

  storekeepers = []
  destinations = []
  volumeWeightCoefficient = undefined

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
  firstRowId = undefined
  startFilterModel = undefined
  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = clientOrdersViewColumns(this.rowHandlers, this.firstRowId)

  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }

  get navbarActiveSubCategory() {
    return setNavbarActiveSubCategory(this.history.location.pathname)
  }

  constructor({history, location}) {
    runInAction(() => {
      this.history = history

      if (location?.state?.dataGridFilter) {
        this.startFilterModel = location.state.dataGridFilter
      }
    })
    // else {
    //       this.startFilterModel = resetDataGridFilter
    //     }

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

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()

      runInAction(() => {
        this.orders = clientOrdersDataConverter(this.baseNoConvertedOrders)
      })
    }
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
  }

  setDataGridState(state) {
    runInAction(() => {
      this.firstRowId = state.sorting.sortedRows[0]
    })

    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_ORDERS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_ORDERS]

    runInAction(() => {
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
        this.columnsModel = clientOrdersViewColumns(this.rowHandlers, this.firstRowId).map(el => ({
          ...el,
          hide: state.columns?.lookup[el?.field]?.hide,
        }))
      }
    })
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e
      this.curPage = 0
    })

    this.getOrders()
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

  onChangeDrawerOpen(e, value) {
    runInAction(() => {
      this.drawerOpen = value
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

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
  setOrderStatus = pathname => {
    if (pathname) {
      switch (pathname) {
        case routsPathes.CLIENT_ORDERS:
          return `${OrderStatusByKey[OrderStatus.READY_TO_PROCESS]}, ${
            OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]
          }, ${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}, ${OrderStatusByKey[OrderStatus.VERIFY_RECEIPT]}, ${
            OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]
          }, ${OrderStatusByKey[OrderStatus.IN_STOCK]}, ${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}, ${
            OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT]
          }`
        case routsPathes.CLIENT_PENDING_ORDERS:
          return `${OrderStatusByKey[OrderStatus.FORMED]}, ${OrderStatusByKey[OrderStatus.PENDING]}, ${
            OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]
          }`

        default:
          return `${OrderStatusByKey[OrderStatus.AT_PROCESS]}, ${
            OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]
          }`
      }
    }
  }

  async getOrders() {
    try {
      const filter = isNaN(this.nameSearchValue)
        ? `or[0][asin][$contains]=${this.nameSearchValue};or[1][amazonTitle][$contains]=${this.nameSearchValue};or[2][skusByClient][$contains]=${this.nameSearchValue};or[3][item][$eq]=${this.nameSearchValue};`
        : `or[0][asin][$contains]=${this.nameSearchValue};or[1][amazonTitle][$contains]=${this.nameSearchValue};or[2][skusByClient][$contains]=${this.nameSearchValue};or[3][id][$eq]=${this.nameSearchValue};or[4][item][$eq]=${this.nameSearchValue};`

      const result = await ClientModel.getOrdersPag({
        filters: this.nameSearchValue ? filter : null,

        status: this.setOrderStatus(this.history.location.pathname),

        limit: this.rowsPerPage,
        offset: this.curPage * this.rowsPerPage,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
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
      runInAction(() => {
        this.reorderOrdersData = []
      })

      const storekeepers = await StorekeeperModel.getStorekeepers()

      const destinations = await ClientModel.getDestinations()

      const result = await UserModel.getPlatformSettings()

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

        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })

      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
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
      const storekeepers = await StorekeeperModel.getStorekeepers()

      const destinations = await ClientModel.getDestinations()

      const result = await UserModel.getPlatformSettings()

      const order = await ClientModel.getOrderById(item._id)

      runInAction(() => {
        this.storekeepers = storekeepers

        this.destinations = destinations

        this.volumeWeightCoefficient = result.volumeWeightCoefficient

        this.reorderOrdersData = [order]
      })

      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.log(error)
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
      await onSubmitPostImages.call(this, {images: tmpBarCode, type: 'uploadedFiles'})
    }

    await ClientModel.updateProductBarCode(this.selectedProduct._id, {barCode: this.uploadedFiles[0]})

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
          await onSubmitPostImages.call(this, {images: orderObject.tmpBarCode, type: 'uploadedFiles'})

          await ClientModel.updateProductBarCode(orderObject.productId, {barCode: this.uploadedFiles[0]})
        } else if (!orderObject.barCode) {
          await ClientModel.updateProductBarCode(orderObject.productId, {barCode: null})
        }

        await this.createOrder(orderObject)
      }

      this.loadData()

      if (!this.error) {
        runInAction(() => {
          this.successModalText = t(TranslationKey['The order has been created'])
        })
        this.onTriggerOpenModal('showSuccessModal')
      }
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onConfirmSubmitOrderProductModal({ordersDataState, totalOrdersCost}) {
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
    this.history.push({
      // pathname: '/client/orders/order',
      pathname: `${this.history.location.pathname}/order`,

      search: order.originalData._id,
    })
  }

  onTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  onChangeCurPage(e) {
    runInAction(() => {
      this.curPage = e
    })
    this.getOrders()
    this.setDataGridState()
  }

  onTriggerOpenModal(modalState) {
    runInAction(() => {
      this[modalState] = !this[modalState]
    })
  }
}
