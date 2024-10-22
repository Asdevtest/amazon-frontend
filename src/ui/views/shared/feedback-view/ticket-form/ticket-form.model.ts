import { makeAutoObservable, runInAction } from 'mobx'

import { OtherModel } from '@models/other-model'

import { IFeedback } from '@typings/models/administrators/feedback'

export class TicketFormModel {
  feedback?: IFeedback

  get showResponseBlock() {
    return this.feedback?.responseText || !!this.feedback?.responseMedia
  }

  constructor(feedbackId?: string) {
    this.getFeedback(feedbackId)

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getFeedback(id?: string) {
    try {
      const response = (await OtherModel.getFeedback(id)) as unknown as IFeedback

      runInAction(() => {
        this.feedback = response
      })
    } catch (error) {
      console.error(error)
    }
  }
}
