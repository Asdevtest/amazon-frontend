import { makeAutoObservable, runInAction } from 'mobx'

import { FeedbackModel } from '@models/feedback-model'

import { IFeedback } from '@typings/models/feedbacks/feedback'

export class ReviewsFormModel {
  reviews: IFeedback[] = []

  constructor(id?: string) {
    this.getReviewsByUserId(id)

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getReviewsByUserId(id?: string) {
    try {
      const response = (await FeedbackModel.getFeedback(id)) as unknown as IFeedback[]

      runInAction(() => {
        this.reviews = response
      })
    } catch (error) {
      console.error(error)
    }
  }
}
