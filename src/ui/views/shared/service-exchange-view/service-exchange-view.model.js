import { makeAutoObservable, runInAction } from 'mobx'

import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { ViewTableModeStateKeys } from '@constants/table/view-table-mode-state-keys'

import { AnnouncementsModel } from '@models/announcements-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'

import { loadingStatus } from '@typings/enums/loading-status'
import { Specs } from '@typings/enums/specs'

import { filterFields, searchFields } from './service-exchange-view.constants'

export class ServiceExchangeViewModel {
  history = undefined

  announcements = []

  specOption = Specs.DEFAULT

  viewMode = tableViewMode.LIST
  sortMode = tableSortMode.DESK

  nameSearchValue = ''
  rowCount = 0
  columnMenuSettings = {
    ...dataGridFiltersInitializer(filterFields),
  }

  options = {
    offset: 0,
    limit: 12,
    filters: this.getFilter(),
  }

  get currentData() {
    return this.announcements
  }

  constructor({ history }) {
    this.history = history
    this.loadData()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  loadData() {
    this.getSpecs()

    this.getNotYoursAnnouncements()
  }

  async getSpecs() {
    try {
      const response = await UserModel.getSpecs(false)

      runInAction(() => {
        this.specs = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getNotYoursAnnouncements() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await AnnouncementsModel.getNotYoursAnnouncements(this.options)

      runInAction(() => {
        this.announcements = result.rows
        this.rowCount = result.count
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async loadMoreDataHadler() {
    if (this.requestStatus === loadingStatus.IS_LOADING) {
      return
    }

    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      this.options.offset += this.options.limit

      if (this.options.offset >= this.rowCount) {
        this.setRequestStatus(loadingStatus.SUCCESS)

        return
      }

      const result = await AnnouncementsModel.getNotYoursAnnouncements(this.options)

      runInAction(() => {
        this.announcements = [...this.announcements, ...result.rows]
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings[field].currentFilterData = value
  }

  getFilter(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(this.columnMenuSettings, this.nameSearchValue, exclusion, filterFields, searchFields),
    )
  }

  onChangeSpec(value) {
    this.specOption = value

    // spec - for "_id:string", specType - for "type:number"
    this.onChangeFullFieldMenuItem(value === Specs.DEFAULT ? [] : [value], 'specType', true)

    this.options.offset = 0
    this.options.filters = this.getFilter()

    this.getNotYoursAnnouncements()
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue
    this.options.offset = 0
    this.options.filters = this.getFilter()

    this.getNotYoursAnnouncements()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onClickOrderBtn(data) {
    this.history.push(
      `/client/freelance/my-requests/create-request?announcementId=${data?._id}&executorId=${data?.createdBy?._id}`,
    )
  }

  onChangeViewMode(event) {
    const currentValue = event.target.value
    this.viewMode = currentValue

    this.setTableModeState()
  }

  setTableModeState() {
    const state = { viewMode: this.viewMode, sortMode: this.sortMode }

    SettingsModel.setViewTableModeState(state, ViewTableModeStateKeys.MY_SERVICES)
  }
}
