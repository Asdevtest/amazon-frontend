import { makeAutoObservable, runInAction } from 'mobx'

import { AnnouncementsModel } from '@models/announcements-model'
import { FeedbackModel } from '@models/feedback-model'
import { RequestModel } from '@models/request-model'

import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'

import { loadingStatus } from '@typings/enums/loading-status'

export class ServicesDetailCustomViewModel {
  history = undefined
  requestStatus = undefined

  requestId = undefined
  announcementId = undefined

  request = undefined
  announcementData = undefined

  requestProposals = undefined
  showReviewModal = false

  currentReviews = []
  currentReviewModalUser = undefined

  loadedFiles = []

  constructor({ history }) {
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
      this.setRequestStatus(loadingStatus.IS_LOADING)
      this.getCustomRequestById()
      this.getAnnouncementsDataById()
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async getCustomRequestById() {
    try {
      const requestData = await RequestModel.getCustomRequestById(this.requestId)

      runInAction(() => {
        this.request = requestData
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getAnnouncementsDataById() {
    try {
      const result = await AnnouncementsModel.getAnnouncementsByGuid(this.announcementId)
      runInAction(() => {
        this.announcementData = result
      })
    } catch (error) {
      console.error(error)
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
    this.history.push(
      `/freelancer/freelance/my-services/service-detailds/custom-service-type/create-proposal?requestId=${this.request?.request?._id}`,
    )
  }

  async getReviews(guid) {
    try {
      const result = await FeedbackModel.getFeedback(guid)

      runInAction(() => {
        this.currentReviews = result.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickReview(user) {
    await this.getReviews(user._id)
    this.currentReviewModalUser = user
    this.onTriggerOpenModal('showReviewModal')
  }
}
