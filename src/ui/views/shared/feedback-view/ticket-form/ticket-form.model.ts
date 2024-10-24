import { makeAutoObservable, runInAction } from 'mobx'
import { ChangeEvent } from 'react'

import { AdministratorModel } from '@models/administrator-model'
import { OtherModel } from '@models/other-model'

import { FeedbackStatus, FeedbackStatusConst } from '@typings/enums/feedback-status'
import { IFeedback } from '@typings/models/administrators/feedback'
import { UploadFileType } from '@typings/shared/upload-file'

import { getStatusText } from '../feedback-view.config'

import { TicketFormProps } from './ticket-form'

export class TicketFormModel {
  feedback?: IFeedback
  responseMedia: UploadFileType[] = []
  responseText = ''
  onUdateData?: VoidFunction
  onClose?: VoidFunction
  loading = false

  get showResponseBlock() {
    return !!this.feedback?.responseText || !!this.feedback?.responseMedia?.length
  }
  get statusOptions() {
    return Object.values(FeedbackStatusConst).map(status => ({
      label: getStatusText(Number(status)),
      value: status,
      disabled: status === FeedbackStatus.CREATED,
    }))
  }

  constructor({ creator, feedbackId, onUdateData, onClose }: TicketFormProps) {
    this.onUdateData = onUdateData
    this.onClose = onClose
    this.getFeedback(feedbackId, creator)

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getFeedback(id?: string, creator?: boolean) {
    try {
      runInAction(() => (this.loading = true))
      const method = creator ? AdministratorModel.getFeedback : OtherModel.getFeedback
      const response = (await method(id)) as unknown as IFeedback

      runInAction(() => {
        this.feedback = response
        this.responseMedia = response.responseMedia || []
        this.responseText = response.responseText
      })
    } catch (error) {
      console.error(error)
    } finally {
      runInAction(() => (this.loading = false))
    }
  }

  async onInProcessFeedback() {
    try {
      await AdministratorModel.inProcessFeedback(this.feedback?._id)
    } catch (error) {
      console.error(error)
    }
  }

  async onApproveFeedback() {
    try {
      await AdministratorModel.approveFeedback(this.feedback?._id)
    } catch (error) {
      console.error(error)
    }
  }

  async onRejectFeedback() {
    try {
      await AdministratorModel.rejectFeedback(this.feedback?._id)
    } catch (error) {
      console.error(error)
    }
  }

  async onSendReplyToFeedback() {
    try {
      const data = {
        responseText: this.responseText,
        responseMedia: this.responseMedia,
      }
      await AdministratorModel.sendReplyToFeedback(this.feedback?._id, data)
      this.onClose?.()
      this.onUdateData?.()
    } catch (error) {
      console.error(error)
    }
  }

  onChangeResponseText(e: ChangeEvent<HTMLTextAreaElement>) {
    this.responseText = e.target.value
  }

  onChangeResponseMedia(media: UploadFileType[]) {
    this.responseMedia = media
  }

  onChangeStatus(status: FeedbackStatus) {
    switch (status) {
      case FeedbackStatus.IN_PROCESS:
        this.onInProcessFeedback()
        break
      case FeedbackStatus.ACCEPTED:
        this.onApproveFeedback()
        break
      case FeedbackStatus.REJECTED:
        this.onRejectFeedback()
        break
      default:
        break
    }

    this.onUdateData?.()
  }
}
