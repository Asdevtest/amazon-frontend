import { makeAutoObservable, runInAction } from 'mobx'

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
    onClickFilterBtn: () => {},
    onChangeFullFieldMenuItem: () => {},
    onClickAccept: () => {},

    filterRequestStatus: undefined,

    ...dataGridFiltersInitializer(filterFields),
  }

  get currentData() {
    if (this.nameSearchValue) {
      return this.announcements.filter(
        el =>
          el.title.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el.description.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el.createdBy.name.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
      )
    } else {
      return this.announcements
    }
  }

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  loadData() {
    try {
      this.getVacAnnouncementsData()

      this.getSpecs()
    } catch (error) {
      console.log(error)
    }
  }

  async getVacAnnouncementsData() {
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
  }

  getFilter(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(this.columnMenuSettings, this.nameSearchValue, exclusion, filterFields, []),
    )
  }

  onClickOrderBtn(data) {
    this.history.push(
      `/client/freelance/my-requests/create-request?announcementId=${data?._id}&executorId=${data?.createdBy?._id}`,
    )
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings[field].currentFilterData = value
  }

  onClickSpec(specType) {
    this.selectedSpec = specType

    // spec - for "_id:string", specType - for "type:number"
    this.onChangeFullFieldMenuItem(specType === Specs.DEFAULT ? [] : [specType], 'specType', true)

    this.getVacAnnouncementsData()
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

  onSearchChange(e) {
    this.nameSearchValue = e.target.value
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
}
