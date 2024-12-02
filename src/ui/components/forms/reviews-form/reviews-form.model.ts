import { makeAutoObservable, runInAction } from 'mobx'

import { FeedbackModel } from '@models/feedback-model'

import { IFeedback, IFeedbacks } from '@typings/models/administrators/feedback'

export class ReviewsFormModel {
  reviews: IFeedback[] = []

  constructor(id?: string, isSupplier?: boolean) {
    isSupplier ? this.getSupplierReviewsById(id) : this.getReviewsById(id)

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getReviewsById(id?: string) {
    try {
      const response = (await FeedbackModel.getFeedback(id)) as unknown as IFeedback[]

      runInAction(() => {
        this.reviews = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getSupplierReviewsById(id?: string) {
    try {
      const response = (await FeedbackModel.getSupplierReviewsById(id)) as unknown as IFeedbacks

      runInAction(() => {
        this.reviews = response.rows || []
      })
    } catch (error) {
      console.error(error)
    }
  }
}
