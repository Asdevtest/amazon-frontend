/* eslint-disable no-unused-vars */
import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { freelanceRequestType, freelanceRequestTypeByKey } from '@constants/statuses/freelance-request-type'
import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { ViewTableModeStateKeys } from '@constants/table/view-table-mode-state-keys'

import { AnnouncementsModel } from '@models/announcements-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

export class ServiceExchangeViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  announcements = []
  currentData = []

  selectedTaskType = freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]

  showConfirmModal = false

  showImageModal = false

  selectedProposal = undefined

  viewMode = tableViewMode.LIST
  sortMode = tableSortMode.DESK

  bigImagesOptions = {}

  nameSearchValue = undefined

  get user() {
    return UserModel.userInfo
  }

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.announcements,
      () =>
        runInAction(() => {
          this.currentData = this.getCurrentData()
        }),
    )

    reaction(
      () => this.nameSearchValue,
      () =>
        runInAction(() => {
          this.currentData = this.getCurrentData()
        }),
    )
  }

  async loadData() {
    try {
      await this.getVacAnnouncementsData()
    } catch (error) {
      runInAction(() => {
        this.error = error
      })
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
      const result = await AnnouncementsModel.getVacAnnouncements({
        type:
          Number(this.selectedTaskType) === Number(freelanceRequestTypeByKey[freelanceRequestType.DEFAULT])
            ? null
            : this.selectedTaskType,
      })
      runInAction(() => {
        this.announcements = result
      })
    } catch (error) {
      runInAction(() => {
        this.error = error
      })
      console.log(error)
    }
  }

  onClickOrderBtn(data) {
    this.history.push('/client/freelance/my-requests/create-request', {
      announcementId: data?._id,
      executor: data?.createdBy,
    })
  }

  async onClickTaskType(taskType) {
    runInAction(() => {
      this.selectedTaskType = taskType
    })
    await this.getVacAnnouncementsData()
  }

  onChangeViewMode(value) {
    runInAction(() => {
      this.viewMode = value
    })
    this.setTableModeState()
  }

  setTableModeState() {
    const state = { viewMode: this.viewMode, sortMode: this.sortMode }

    SettingsModel.setViewTableModeState(state, ViewTableModeStateKeys.MY_SERVICES)
  }

  onClickThumbnail(data) {
    runInAction(() => {
      this.bigImagesOptions = data
    })
    this.onTriggerOpenModal('showImageModal')
  }

  setBigImagesOptions(data) {
    runInAction(() => {
      this.bigImagesOptions = data
    })
  }

  onTriggerOpenModal(modalState) {
    runInAction(() => {
      this[modalState] = !this[modalState]
    })
  }

  onSearchSubmit(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }
}
