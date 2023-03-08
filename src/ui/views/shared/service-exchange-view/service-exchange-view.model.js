/* eslint-disable no-unused-vars */
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {freelanceRequestType, freelanceRequestTypeByKey} from '@constants/freelance-request-type'
import {tableSortMode, tableViewMode} from '@constants/table-view-modes'
import {ViewTableModeStateKeys} from '@constants/view-table-mode-state-keys'

import {AnnouncementsModel} from '@models/announcements-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

export class ServiceExchangeViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false

  announcements = []
  currentData = []

  selectedTaskType = freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]

  showConfirmModal = false

  showImageModal = false

  selectedProposal = undefined

  viewMode = tableViewMode.LIST
  sortMode = tableSortMode.DESK

  bigImagesOptions = {}

  get user() {
    return UserModel.userInfo
  }

  constructor({history}) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => this.announcements,
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
        console.log('this.announcements', this.announcements)
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
      announcementId: data._id,
    })
  }

  getCurrentData() {
    return toJS(this.announcements)
  }

  async onClickTaskType(taskType) {
    runInAction(() => {
      this.selectedTaskType = taskType
    })
    await this.getVacAnnouncementsData()
  }

  onChangeViewMode(event, nextView) {
    runInAction(() => {
      this.viewMode = nextView
    })
    this.setTableModeState()
  }

  setTableModeState() {
    const state = {viewMode: this.viewMode, sortMode: this.sortMode}

    SettingsModel.setViewTableModeState(state, ViewTableModeStateKeys.MY_SERVICES)
  }

  onClickThumbnail(data) {
    runInAction(() => {
      this.bigImagesOptions = data
    })
    this.onTriggerOpenModal('showImageModal')
  }

  onTriggerOpenModal(modalState) {
    runInAction(() => {
      this[modalState] = !this[modalState]
    })
  }
}
