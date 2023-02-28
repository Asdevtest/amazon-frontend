/* eslint-disable no-unused-vars */
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {tableSortMode, tableViewMode} from '@constants/table-view-modes'
import {UserRoleCodeMapForRoutes} from '@constants/user-roles'
import {ViewTableModeStateKeys} from '@constants/view-table-mode-state-keys'

import {AnnouncementsModel} from '@models/announcements-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

export class MyServicesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false

  selectedTaskType = 'ALL'

  announcements = []

  currentData = []

  bigImagesOptions = {}

  showConfirmModal = false
  selectedProposal = undefined

  viewMode = tableViewMode.LIST
  sortMode = tableSortMode.DESK

  showImageModal = false

  get userInfo() {
    return UserModel.userInfo || {}
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
      await this.getMyAnnouncementsData()
    } catch (error) {
      console.log(error)
    }
  }

  async getMyAnnouncementsData() {
    try {
      const result = await AnnouncementsModel.getMyAnnouncements()
      runInAction(() => {
        this.announcements = result
      })
    } catch (error) {
      this.error = error
      console.log(error)
    }
  }

  getCurrentData() {
    // if (this.nameSearchValue) {
    //   return toJS(this.announcements).filter(el => el.title.toLowerCase().includes(this.nameSearchValue.toLowerCase()))
    // } else {
    return toJS(this.announcements)
    // }
  }

  onClickCreateServiceBtn() {
    console.log(this.userInfo)
    this.history.push(`/freelancer/freelance/my-services/create-service`)
  }

  onClickTaskType(taskType) {
    this.selectedTaskType = taskType
    if (taskType === 'ALL') {
      this.currentData = this.announcements
    } else {
      this.currentData = this.announcements.filter(item => item.type === +taskType)
    }
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
    this.bigImagesOptions = data
    this.onTriggerOpenModal('showImageModal')
  }

  onTriggerOpenModal(modalState) {
    runInAction(() => {
      this[modalState] = !this[modalState]
    })
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })
  }
}
