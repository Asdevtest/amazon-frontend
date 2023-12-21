/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { dataGridFiltersConverter } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'

import { IColumnVisibilityModel, IPaginationModel, ISortModel, RowHandlers } from '@typings/data-grid'
import { IProductIdeaNotification } from '@typings/product'
import { IUser } from '@typings/user'

import { GeneralNotificationsColumns } from '../../../components/table/table-columns/general-notifications-columns/general-notifications-columns'

interface IVariations {
  isArchive: boolean
  showIdeaModal: boolean
}

export class GeneralNotificationsViewModel {
  history: History | undefined = undefined
  requestStatus = loadingStatuses.success

  // * Pagination & Sorting & Filtering

  rowCount = 0
  sortModel: Array<ISortModel> = []
  densityModel = 'compact'
  paginationModel: IPaginationModel = { page: 0, pageSize: 100 }
  columnVisibilityModel: IColumnVisibilityModel = {}
  filterModel: GridFilterModel = { items: [] }
  selectedRowIds: Array<string> = []
  curNotificationType: string | number | null | undefined = undefined

  // * Table settings

  rowHandlers: RowHandlers = {
    navigateToHandler: (notification: any, type: string) => this.navigateToHandler(notification, type),
  }

  // * Search

  searchValue = ''

  // * dataGrid data

  notificationsData = []
  columnsModel = GeneralNotificationsColumns(this.rowHandlers, this.userInfo)

  // * Modal state

  isArchive = false
  showIdeaModal = false

  // * Data for Modals

  currentProduct: IProductIdeaNotification | undefined = undefined

  currentIdeaId: string | undefined = undefined

  // * Getters

  get userInfo(): IUser | undefined {
    return UserModel.userInfo
  }
  get languageTag() {
    return SettingsModel.languageTag
  }

  get currentData() {
    return this.notificationsData
  }

  constructor({ history }: { history: History }) {
    this.history = history

    reaction(
      () => this.isArchive,
      () => this.getUserNotifications(),
    )

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async onClickReadButton() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await UserModel.addNotificationsToArchive(this.selectedRowIds)
      await this.getUserNotifications()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
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
        filters: this.getFilter(),
      })

      runInAction(() => {
        this.notificationsData = notificationDataConverter(response.rows) || []

        this.rowCount = response.count || 0
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
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
    this.filterModel = model

    this.setDataGridState()
    this.getUserNotifications()
  }

  onColumnVisibilityModelChange(model: IColumnVisibilityModel) {
    this.columnVisibilityModel = model

    this.setDataGridState()
    this.getUserNotifications()
  }

  onChangeSortingModel(sortModel: Array<ISortModel>) {
    this.sortModel = sortModel

    this.setDataGridState()
    this.getUserNotifications()
  }

  setRequestStatus(requestStatus: loadingStatuses) {
    this.requestStatus = requestStatus
  }

  onPaginationModelChange(model: IPaginationModel) {
    this.paginationModel = model

    this.setDataGridState()
    this.getUserNotifications()
  }

  onSelectionModel(model: Array<string>) {
    this.selectedRowIds = model
  }

  toggleVariationHandler(variation: keyof IVariations) {
    this[variation] = !this[variation]
  }

  navigateToHandler(notification: any, type: string) {
    if (!this.userInfo) return

    if (type === NotificationType.Order) {
      if (checkIsClient(UserRoleCodeMap[this.userInfo?.role])) {
        window
          .open(
            `/${UserRoleCodeMapForRoutes[this.userInfo?.role]}/my-orders/orders/order?orderId=${
              notification?._id
            }&order-human-friendly-id=${notification?.id}`,
          )
          ?.focus()
      } else if (checkIsBuyer(UserRoleCodeMap[this.userInfo?.role])) {
        const isVacOrders = !!notification?.vacOrders.length

        window
          .open(
            `/${UserRoleCodeMapForRoutes[this.userInfo?.role]}/${isVacOrders ? 'free-orders' : 'all-orders'}?orderId=${
              isVacOrders ? notification?.vacOrders?.[0]?.id : notification?.needConfirmOrders?.[0]?.id
            }`,
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

  onClickToChangeNotificationType(notificationType: string | number | null | undefined) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.curNotificationType = notificationType

      this.getUserNotifications()

      this.setRequestStatus(loadingStatuses.success)
    } catch (err) {
      this.setRequestStatus(loadingStatuses.failed)
      console.error(err)
    }
  }

  getFilter() {
    return objectToUrlQs(
      dataGridFiltersConverter({}, this.searchValue, '', [], ['data'], {
        ...(this.curNotificationType && {
          type: {
            $eq: this.curNotificationType,
          },
        }),
      }),
    )
  }

  onSearchSubmit(searchValue: string) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.searchValue = searchValue

      this.getUserNotifications()

      this.setRequestStatus(loadingStatuses.success)
    } catch (err) {
      this.setRequestStatus(loadingStatuses.failed)
      console.error(err)
    }
  }
}
