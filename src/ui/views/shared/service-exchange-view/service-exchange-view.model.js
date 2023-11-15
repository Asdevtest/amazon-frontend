import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { freelanceRequestType, freelanceRequestTypeByKey } from '@constants/statuses/freelance-request-type'
import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { ViewTableModeStateKeys } from '@constants/table/view-table-mode-state-keys'

import { AnnouncementsModel } from '@models/announcements-model'
import { SettingsModel } from '@models/settings-model'

export class ServiceExchangeViewModel {
  history = undefined

  announcements = []
  currentData = []

  selectedTaskType = freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]

  showImageModal = false

  viewMode = tableViewMode.LIST
  sortMode = tableSortMode.DESK

  bigImagesOptions = {}

  nameSearchValue = undefined

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.announcements,
      () => (this.currentData = this.getCurrentData()),
    )

    reaction(
      () => this.nameSearchValue,
      () => (this.currentData = this.getCurrentData()),
    )
  }

  async loadData() {
    try {
      await this.getVacAnnouncementsData()
    } catch (error) {
      console.log(error)
    }
  }

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(this.announcements).filter(
        el =>
          el.title.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el.description.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el.createdBy.name.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
      )
    } else {
      return toJS(this.announcements)
    }
  }

  async getVacAnnouncementsData() {
    try {
      const result = await AnnouncementsModel.getVacAnnouncements(
        Number(this.selectedTaskType) === Number(freelanceRequestTypeByKey[freelanceRequestType.DEFAULT])
          ? null
          : this.selectedTaskType,
      )
      runInAction(() => {
        this.announcements = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  onClickOrderBtn(data) {
    this.history.push(
      `/client/freelance/my-requests/create-request?announcementId=${data?._id}&executorId=${data?.createdBy?._id}`,
    )
  }

  async onClickTaskType(taskType) {
    this.selectedTaskType = taskType

    await this.getVacAnnouncementsData()
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
}
