import { makeAutoObservable, runInAction } from 'mobx'

import { AnnouncementsModel } from '@models/announcements-model'
import { FeedbackModel } from '@models/feedback-model'
import { RequestModel } from '@models/request-model'

import { IAnnoucement } from '@typings/models/announcements/annoucement'
import { IFeedback } from '@typings/models/feedbacks/feedback'
import { ICustomRequest } from '@typings/models/requests/custom-request'
import { ICreatedBy } from '@typings/shared/created-by'
import { HistoryType } from '@typings/types/history'

export class ServicesDetailCustomViewModel {
  history?: HistoryType
  requestId?: string | null
  announcementId?: string | null
  request?: ICustomRequest
  announcementData?: IAnnoucement
  showReviewModal = false
  currentReviews: IFeedback[] = []
  currentReviewModalUser?: ICreatedBy

  constructor(history: HistoryType) {
    this.history = history
    const url = new URL(window.location.href)
    this.requestId = url.searchParams.get('requestId')
    this.announcementId = url.searchParams.get('announcementId')

    this.getCustomRequestById()
    this.getAnnouncementsDataById()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getCustomRequestById() {
    try {
      const response = (await RequestModel.getCustomRequestById(this.requestId)) as unknown as ICustomRequest

      runInAction(() => {
        this.request = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getAnnouncementsDataById() {
    try {
      const response = (await AnnouncementsModel.getAnnouncementsByGuid({
        guid: this.announcementId,
      })) as unknown as IAnnoucement

      runInAction(() => {
        this.announcementData = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  onClickBackBtn() {
    this.history?.goBack()
  }

  onTriggerReviewModal() {
    this.showReviewModal = !this.showReviewModal
  }

  onClickSuggestDealBtn() {
    this.history?.push(
      `/freelancer/freelance/my-services/service-detailds/custom-service-type/create-proposal?requestId=${this.request?.request?._id}`,
    )
  }

  async getReviews(id: string) {
    try {
      const response = (await FeedbackModel.getFeedback(id)) as unknown as IFeedback[]

      runInAction(() => {
        this.currentReviews = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickReview(user: ICreatedBy) {
    await this.getReviews(user._id)
    this.currentReviewModalUser = user
    this.onTriggerReviewModal()
  }
}
