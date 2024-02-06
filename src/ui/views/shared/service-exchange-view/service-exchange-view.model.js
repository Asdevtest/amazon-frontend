import { makeAutoObservable, runInAction } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { ViewTableModeStateKeys } from '@constants/table/view-table-mode-state-keys'

import { AnnouncementsModel } from '@models/announcements-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'

import { Specs } from '@typings/enums/specs'

import { filterFields } from './service-exchange-viewservice-exchange-view.constants'

export class ServiceExchangeViewModel {
  history = undefined

  announcements = []

  selectedSpec = Specs.DEFAULT

  showImageModal = false

  viewMode = tableViewMode.LIST
  sortMode = tableSortMode.DESK

  bigImagesOptions = {}
  nameSearchValue = ''

  columnMenuSettings = {
    ...dataGridFiltersInitializer(filterFields),
  }

  options = {
    offset: 0,
    limit: 16,
    filters: this.getFilter(),
  }

  get currentData() {
    return this.announcements
  }

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  loadData() {
    try {
      this.getSpecs()

      this.getNotYoursAnnouncements()
    } catch (error) {
      console.log(error)
    }
  }

  async getSpecs() {
    try {
      const response = await UserModel.getSpecs(false)

      runInAction(() => {
        this.specs = response
      })
    } catch (error) {
      console.log(error)
    }
  }

  /* async getVacAnnouncementsData() {
    try {
      const result = await AnnouncementsModel.getVacAnnouncements({
        filters: this.getFilter(),
      })

      runInAction(() => {
        this.announcements = result
      })
    } catch (error) {
      console.log(error)
    }
  } */

  async getNotYoursAnnouncements() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const result = await AnnouncementsModel.getNotYoursAnnouncements(this.options)

      runInAction(() => {
        this.announcements = result.rows
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  async loadMoreDataHadler() {
    if (this.requestStatus !== loadingStatuses.SUCCESS) {
      return
    }

    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      this.options.offset += this.options.limit

      const result = await AnnouncementsModel.getNotYoursAnnouncements(this.options)

      runInAction(() => {
        this.announcements = [...this.announcements, ...result.rows]
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings[field].currentFilterData = value
  }

  getFilter(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(this.columnMenuSettings, this.nameSearchValue, exclusion, filterFields, [
        'title',
        'description',
      ]),
    )
  }

  onClickSpec(specType) {
    this.selectedSpec = specType

    // spec - for "_id:string", specType - for "type:number"
    this.onChangeFullFieldMenuItem(specType === Specs.DEFAULT ? [] : [specType], 'specType', true)

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

  onChangeViewMode(value) {
    this.viewMode = value

    this.setTableModeState()
  }

  setTableModeState() {
    const state = { viewMode: this.viewMode, sortMode: this.sortMode }

    SettingsModel.setViewTableModeState(state, ViewTableModeStateKeys.MY_SERVICES)
  }

  onClickThumbnail(data) {
    this.bigImagesOptions = data

    this.onTriggerOpenModal('showImageModal')
  }

  setBigImagesOptions(data) {
    this.bigImagesOptions = data
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }
}
