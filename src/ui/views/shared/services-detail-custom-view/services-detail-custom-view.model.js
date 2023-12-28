/* eslint-disable no-unused-vars */
import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { AnnouncementsModel } from '@models/announcements-model'
import { FeedbackModel } from '@models/feedback-model'
import { RequestModel } from '@models/request-model'

import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'

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
  showReviewModal = false

  currentReviews = []
  currentReviewModalUser = undefined

  loadedFiles = []

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  constructor({ history, location }) {
    runInAction(() => {
      this.history = history

      const url = new URL(window.location.href)

      this.requestId = url.searchParams.get('requestId')
      this.announcementId = url.searchParams.get('announcementId')
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)
      this.getCustomRequestById()
      this.getAnnouncementsDataById()
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
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

  async getReviews(guid) {
    try {
      const result = await FeedbackModel.getFeedback(guid)

      runInAction(() => {
        this.currentReviews = result.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onClickReview(user) {
    await this.getReviews(user._id)
    this.currentReviewModalUser = user
    this.onTriggerOpenModal('showReviewModal')
  }
}
