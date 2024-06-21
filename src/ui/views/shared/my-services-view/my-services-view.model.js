import { makeAutoObservable, runInAction } from 'mobx'

import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { ViewTableModeStateKeys } from '@constants/table/view-table-mode-state-keys'

import { AnnouncementsModel } from '@models/announcements-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'

import { Specs } from '@typings/enums/specs'

import { filterFields } from './my-services-view.constants'

export class MyServicesViewModel {
  history = undefined

  selectedSpec = Specs.DEFAULT
  announcements = []
  nameSearchValue = undefined
  viewMode = tableViewMode.LIST
  sortMode = tableSortMode.DESK
  archive = false

  showConfirmModal = false

  columnMenuSettings = {
    onClickFilterBtn: () => {},
    onChangeFullFieldMenuItem: () => {},
    onClickAccept: () => {},

    ...dataGridFiltersInitializer(filterFields),
    archive: { currentFilterData: [false] }, // default init value
  }

  get userInfo() {
    return UserModel.userInfo
  }

  get currentData() {
    if (this.nameSearchValue) {
      return this.announcements.filter(
        el =>
          el.title.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el.description.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
      )
    } else {
      return this.announcements
    }
  }

  constructor({ history }) {
    this.history = history

    this.getMyAnnouncements()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getMyAnnouncements() {
    try {
      const response = await AnnouncementsModel.getMyAnnouncements({
        filters: this.getFilter(),
      })

      runInAction(() => {
        this.announcements = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  getFilter(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(this.columnMenuSettings, this.nameSearchValue, exclusion, filterFields, []),
    )
  }

  onClickCreateService() {
    this.history.push(`/freelancer/freelance/my-services/create-service`)
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings[field].currentFilterData = value
  }

  onClickSpec(specType) {
    this.selectedSpec = specType

    // spec - for "_id:string", specType - for "type:number"
    this.onChangeFullFieldMenuItem(specType === Specs.DEFAULT ? [] : [specType], 'specType')

    this.getMyAnnouncements()
  }

  onToggleArchive() {
    this.archive = !this.archive

    this.onChangeFullFieldMenuItem([this.archive], 'archive')

    this.getMyAnnouncements()
  }

  onChangeViewMode(value) {
    this.viewMode = value

    this.setTableModeState()
  }

  setTableModeState() {
    const state = { viewMode: this.viewMode, sortMode: this.sortMode }

    SettingsModel.setViewTableModeState(state, ViewTableModeStateKeys.MY_SERVICES)
  }

  onClickOpenButton(data) {
    this.history.push(`/freelancer/freelance/my-services/service-detailds?serviceId=${data._id}`)
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }

  onSearchSubmit(e) {
    this.nameSearchValue = e.target.value
  }
}
