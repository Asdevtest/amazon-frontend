/* eslint-disable no-unused-vars */
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {
  freelanceRequestTypeByCode,
  freelanceRequestType,
  freelanceRequestTypeByKey,
} from '@constants/freelance-request-type'
import {tableSortMode, tableViewMode} from '@constants/table-view-modes'
import {UserRoleCodeMap, UserRoleCodeMapForRoutes} from '@constants/user-roles'
import {ViewTableModeStateKeys} from '@constants/view-table-mode-state-keys'

import {AnnouncementsModel} from '@models/announcements-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {checkIsFreelancer} from '@utils/checks'

export class MyServicesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false

  showAcceptMessage = null
  acceptMessage = null

  selectedTaskType = freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]

  userInfo = []
  userRole = undefined

  announcements = []

  currentData = []

  bigImagesOptions = {}

  nameSearchValue = undefined

  showConfirmModal = false
  selectedProposal = undefined

  viewMode = tableViewMode.LIST
  sortMode = tableSortMode.DESK

  showImageModal = false

  constructor({history, location}) {
    runInAction(() => {
      this.history = history
    })

    if (location.state) {
      this.acceptMessage = location.state.acceptMessage
      this.showAcceptMessage = location.state.showAcceptMessage

      const state = {...history.location.state}
      delete state.acceptMessage
      delete state.showAcceptMessage
      history.replace({...history.location, state})
    }

    makeAutoObservable(this, undefined, {autoBind: true})

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

    runInAction(() => {
      if (this.showAcceptMessage) {
        setTimeout(() => {
          this.acceptMessage = ''
          this.showAcceptMessage = false
        }, 3000)
      }
    })
  }

  async getUserInfo() {
    const result = await UserModel.userInfo
    this.userInfo = result
    this.userRole = UserRoleCodeMap[result.role]
  }

  async loadData() {
    try {
      await this.getUserInfo()
      await this.getMyAnnouncementsData()
    } catch (error) {
      console.log(error)
    }
  }

  async getMyAnnouncementsData() {
    try {
      const result = await AnnouncementsModel.getMyAnnouncements({
        type:
          Number(this.selectedTaskType) === Number(freelanceRequestTypeByKey[freelanceRequestType.DEFAULT])
            ? null
            : this.selectedTaskType,
      })
      runInAction(() => {
        this.announcements = result
      })
    } catch (error) {
      this.error = error
      console.log(error)
    }
  }

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(this.announcements).filter(
        el =>
          el.title.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el.description.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
      )
    } else {
      return toJS(this.announcements)
    }
  }

  onClickCreateServiceBtn() {
    this.history.push(`/freelancer/freelance/my-services/create-service`)
  }

  async onClickTaskType(taskType) {
    runInAction(() => {
      this.selectedTaskType = taskType
    })
    await this.getMyAnnouncementsData()
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

  onClickOpenButton(data) {
    this.history.push(`/freelancer/freelance/my-services/service-detailds`, {
      data: data._id,
    })
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

  onSearchSubmit(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }
}
