import { RadioChangeEvent } from 'antd'
import { makeAutoObservable, runInAction } from 'mobx'

import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { ViewTableModeStateKeys } from '@constants/table/view-table-mode-state-keys'

import { AnnouncementsModel } from '@models/announcements-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'

import { Specs } from '@typings/enums/specs'
import { IAnnoucement } from '@typings/models/announcements/annoucement'
import { IFullUser } from '@typings/shared/full-user'
import { HistoryType } from '@typings/types/history'

import { filterFields } from './my-services-view.constants'

export class MyServicesViewModel {
  history?: HistoryType
  specOption = Specs.DEFAULT
  announcements: IAnnoucement[] = []
  nameSearchValue = ''
  viewMode = tableViewMode.LIST
  sortMode = tableSortMode.DESK
  archive = false
  showConfirmModal = false
  columnMenuSettings = {
    ...dataGridFiltersInitializer(filterFields),
    archive: { currentFilterData: [false] }, // default init value
    specType: { currentFilterData: [] as Specs[] }, // default init value
  }

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
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

  constructor(history: HistoryType) {
    this.history = history

    this.getMyAnnouncements()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getMyAnnouncements() {
    try {
      const response = (await AnnouncementsModel.getMyAnnouncements({
        filters: this.getFilter(),
      })) as unknown as IAnnoucement[]

      runInAction(() => {
        this.announcements = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  getFilter() {
    return objectToUrlQs(dataGridFiltersConverter(this.columnMenuSettings, this.nameSearchValue, '', filterFields, []))
  }

  onClickCreateService() {
    this.history?.push(`/freelancer/freelance/my-services/create-service`)
  }

  onChangeFullFieldMenuItem(value: boolean[] | Specs[], field: 'archive' | 'specType') {
    this.columnMenuSettings[field].currentFilterData = value
  }

  onChangeSpec(value: Specs) {
    this.specOption = value

    // spec - for "_id:string", specType - for "type:number"
    this.onChangeFullFieldMenuItem(value === Specs.DEFAULT ? [] : [value], 'specType')

    this.getMyAnnouncements()
  }

  onToggleArchive() {
    this.archive = !this.archive

    this.onChangeFullFieldMenuItem([this.archive], 'archive')

    this.getMyAnnouncements()
  }

  onChangeViewMode(event: RadioChangeEvent) {
    const currentValue = event.target.value
    this.viewMode = currentValue

    this.setTableModeState()
  }

  setTableModeState() {
    const state = { viewMode: this.viewMode, sortMode: this.sortMode }

    SettingsModel.setViewTableModeState(state, ViewTableModeStateKeys.MY_SERVICES)
  }

  onClickOpenButton(data: IAnnoucement) {
    this.history?.push(`/freelancer/freelance/my-services/service-detailds?${data._id}`)
  }

  onSearchSubmit(value: string) {
    this.nameSearchValue = value.trim()
  }
}
