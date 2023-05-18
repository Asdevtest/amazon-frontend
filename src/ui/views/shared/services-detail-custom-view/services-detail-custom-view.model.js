/* eslint-disable no-unused-vars */
import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { AnnouncementsModel } from '@models/announcements-model'
import { ChatModel } from '@models/chat-model'
import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'

export class ServicesDetailCustomViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  requestId = undefined
  announcementId = undefined

  request = undefined
  announcementData = undefined

  requestProposals = undefined
  showWarningModal = false
  showConfirmModal = false

  loadedFiles = []

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  constructor({ history, location }) {
    runInAction(() => {
      this.history = history

      if (location.state) {
        // console.log(location.state)
        this.requestId = location.state.requestId
        this.announcementId = location.state.announcementId
      }
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getCustomRequestById()
      this.getAnnouncementsDataById()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getCustomRequestById() {
    try {
      const requestData = await RequestModel.getCustomRequestById(this.requestId)

      runInAction(() => {
        this.request = requestData
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async getAnnouncementsDataById() {
    try {
      const result = await AnnouncementsModel.getAnnouncementsByGuid(this.announcementId)
      runInAction(() => {
        this.announcementData = result
      })
    } catch (error) {
      this.error = error
      console.log(error)
    }
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onClickBackBtn() {
    this.history.goBack()
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }

  onClickSuggestDealBtn() {
    this.history.push('/freelancer/freelance/my-services/service-detailds/custom-service-type/create-proposal', {
      request: toJS(this.request),
    })
  }
}
