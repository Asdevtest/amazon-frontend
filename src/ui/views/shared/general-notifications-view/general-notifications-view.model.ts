/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { History } from 'history'
import { makeAutoObservable, reaction, runInAction } from 'mobx'

import { GridFilterModel } from '@mui/x-data-grid'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { NotificationType } from '@constants/keys/notifications'
import { UserRoleCodeMap, UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { checkIsBuyer, checkIsClient } from '@utils/checks'
import { notificationDataConverter } from '@utils/data-grid-data-converters'

import { IColumnVisibilityModel, IPaginationModel, ISortModel, RowHandlers } from '@typings/data-grid'
import { IProductIdeaNotification } from '@typings/product'
import { IUser } from '@typings/user'

import { GeneralNotificationsColumns } from './general-notifications-columns/general-notifications-columns'

export class GeneralNotificationsViewModel {
  requestStatus: string = loadingStatuses.success
  isArchive = false
  history: History | undefined = undefined

  // * Pagination & Sort

  rowCount = 0
  sortModel: Array<ISortModel> = []
  densityModel = 'compact'
  paginationModel: IPaginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel: IColumnVisibilityModel = {}
  filterModel: GridFilterModel = { items: [] }
  selectedRowIds: Array<string> = []

  // * Table settings

  rowHandlers: RowHandlers = {
    navigateToHandler: (notification: any, type: string) => this.navigateToHandler(notification, type),
  }

  // * Search

  searchValue = ''

  // * dataGrid data

  currentData = []
  notificationsData = []
  columnsModel = GeneralNotificationsColumns(this.rowHandlers)

  // * Modal state

  showIdeaModal = false

  // * Data for Modals

  currentProduct: IProductIdeaNotification | undefined = undefined

  currentIdeaId: string | undefined = undefined

  // * Getters

  get currentUser(): IUser | undefined {
    return UserModel.userInfo
  }
  get languageTag() {
    return SettingsModel.languageTag
  }

  constructor({ history }: { history: History }) {
    makeAutoObservable(this, undefined, { autoBind: true })

    runInAction(() => {
      this.history = history
    })

    reaction(
      () => this.notificationsData,
      () => (this.currentData = this.getCurrentData()),
    )

    reaction(
      () => this.isArchive,
      () => this.getUserNotifications(),
    )

    reaction(
      () => this.searchValue,
      () => (this.currentData = this.getCurrentData()),
    )
  }

  async onClickReadButton() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await UserModel.addNotificationsToArchive(this.selectedRowIds)
      await this.getUserNotifications()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log('error', error)
    }
  }

  async loadData() {
    this.getUserNotifications()
  }

  async getUserNotifications() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const response = await UserModel.getUsersNotificationsPagMy({
        archive: this.isArchive,

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',

        // storekeeperId: opts.storekeeperId,
      })

      runInAction(() => {
        this.notificationsData = notificationDataConverter(response.rows) || []
        this.rowCount = response.count
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log('error', error)
    }
  }

  getCurrentData() {
    console.log(this.notificationsData)

    if (this.searchValue) {
      const searchValue = String(this.searchValue).toLowerCase()

      return this.notificationsData.filter((notification: any) => {
        const product = notification?.product

        return (
          String(product?.asin)?.toLowerCase()?.includes(searchValue) ||
          String(product?.skusByClient?.[0])?.toLowerCase()?.includes(searchValue) ||
          String(product?.humanFriendlyId)?.toLowerCase()?.includes(searchValue) ||
          String(product?.title)?.toLowerCase()?.includes(searchValue) ||
          String(product?.amazonTitle)?.toLowerCase()?.includes(searchValue)
        )
      })
    } else {
      return this.notificationsData
    }
  }

  setDataGridState() {
    const requestState = {
      sortModel: this.sortModel,
      filterModel: this.filterModel,
      paginationModel: this.paginationModel,
      columnVisibilityModel: this.columnVisibilityModel,
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.GENERAL_NOTIFICATIONS)
  }

  onChangeFilterModel(model: GridFilterModel) {
    runInAction(() => {
      this.filterModel = model
    })
    this.setDataGridState()
    this.getUserNotifications()
  }

  onColumnVisibilityModelChange(model: IColumnVisibilityModel) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
    this.getUserNotifications()
  }

  onChangeSortingModel(sortModel: Array<ISortModel>) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.setDataGridState()
    this.getUserNotifications()
  }

  setRequestStatus(requestStatus: string) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangePaginationModelChange(model: IPaginationModel) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
    this.getUserNotifications()
  }

  onSelectionModel(model: Array<string>) {
    this.selectedRowIds = model
  }

  toggleVariationHandler(variation: string) {
    runInAction(() => {
      // @ts-ignore
      this[variation] = !this[variation]
    })
  }

  navigateToHandler(notification: any, type: string) {
    if (!this.currentUser) return

    if (type === NotificationType.Order) {
      if (checkIsClient(UserRoleCodeMap[this.currentUser?.role])) {
        window
          .open(
            `/${UserRoleCodeMapForRoutes[this.currentUser?.role]}/my-orders/orders/order?orderId=${
              notification?._id
            }&order-human-friendly-id=${notification?.id}`,
          )
          ?.focus()
      } else if (checkIsBuyer(UserRoleCodeMap[this.currentUser?.role])) {
        const isVacOrders = !!notification?.vacOrders.length
        console.log(notification)
        window
          .open(
            `/${UserRoleCodeMapForRoutes[this.currentUser?.role]}/${
              isVacOrders ? 'free-orders' : 'all-orders'
            }?orderId=${isVacOrders ? notification?.vacOrders?.[0]?.id : notification?.needConfirmOrders?.[0]?.id}`,
          )
          ?.focus()
      }
    } else if (type === 'user') {
      window.open(`/another-user?${notification?.creator?._id}`)?.focus()
    } else if (type === NotificationType.Idea) {
      this.currentProduct = notification.parentProduct
      this.currentIdeaId = notification.ideaId

      this.toggleVariationHandler('showIdeaModal')
    }
  }

  onChangeSearchValue(value: string) {
    this.searchValue = value
  }
}
