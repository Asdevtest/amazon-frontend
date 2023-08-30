/* eslint-disable @typescript-eslint/ban-ts-comment */
import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { GridFilterModel } from '@mui/x-data-grid'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { notificationDataConverter } from '@utils/data-grid-data-converters'

import { IColumnVisibilityModel, IPaginationModel, ISortModel, RowHandlers } from '@typings/data-grid'

import { GeneralNotificationsColumns } from './general-notifications-columns/general-notifications-columns'

export class GeneralNotificationsViewModel {
  requestStatus: string = loadingStatuses.success
  isArchive = false

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
    navigateToHandler: (type: string, value: string) => this.navigateToHandler(type, value),
  }

  // * dataGrid data

  currentData = []
  notificationsData = []

  columnsModel = GeneralNotificationsColumns(this.rowHandlers)

  get currentUser() {
    return UserModel.userInfo
  }

  get languageTag() {
    return SettingsModel.languageTag
  }

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.notificationsData,
      () => {
        this.currentData = this.getCurrentData()
      },
    )

    reaction(
      () => this.isArchive,
      () => this.getUserNotifications(),
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
    return this.notificationsData
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

  navigateToHandler(type: string, value: string) {
    console.log(type, value)
  }
}
