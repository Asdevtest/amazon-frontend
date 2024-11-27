import { makeAutoObservable, runInAction } from 'mobx'
import { ChangeEvent } from 'react'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { OtherModel } from '@models/other-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

import { FeedbackStatus, FeedbackStatusConst } from '@typings/enums/feedback-status'
import { Roles } from '@typings/enums/roles'
import { IFeedback } from '@typings/models/administrators/feedback'
import { IFullUser } from '@typings/shared/full-user'
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
  showMediaBlock = false

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }
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
  get showUploadButton() {
    return !this.showResponseBlock && !this.loading && this.userInfo?.role === Roles.ADMIN
  }

  constructor({ feedbackId, onUdateData, onClose }: TicketFormProps) {
    this.onUdateData = onUdateData
    this.onClose = onClose
    this.getFeedback(feedbackId)

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getFeedback(id?: string) {
    try {
      runInAction(() => (this.loading = true))

      const response = (await OtherModel.getFeedback(id)) as unknown as IFeedback

      runInAction(() => {
        this.feedback = response
        this.responseMedia = response.responseMedia || []
        this.responseText = response.responseText || ''
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
      toast.success(t(TranslationKey['The request status has been successfully changed.']))
    } catch (error) {
      toast.error(t(TranslationKey['There was an error changing the request status. Try again.']))
    }
  }

  async onApproveFeedback() {
    try {
      await AdministratorModel.approveFeedback(this.feedback?._id)
      toast.success(t(TranslationKey['The request status has been successfully changed.']))
    } catch (error) {
      toast.error(t(TranslationKey['There was an error changing the request status. Try again.']))
    }
  }

  async onRejectFeedback() {
    try {
      await AdministratorModel.rejectFeedback(this.feedback?._id)
      toast.success(t(TranslationKey['The request status has been successfully changed.']))
    } catch (error) {
      toast.error(t(TranslationKey['There was an error changing the request status. Try again.']))
    }
  }

  async onSendReplyToFeedback() {
    try {
      const data = {
        responseText: this.responseText,
        responseMedia: await OtherModel.getFileUrls(this.responseMedia),
      }
      await AdministratorModel.sendReplyToFeedback(this.feedback?._id, data)
      toast.success(t(TranslationKey['The response to the request has been successfully sent!']))
      this.onClose?.()
      this.onUdateData?.()
    } catch (error) {
      toast.error(t(TranslationKey['There was an error sending the response to the request. Try again.']))
    }
  }

  onChangeResponseText(e: ChangeEvent<HTMLTextAreaElement>) {
    this.responseText = e.target.value
  }

  onChangeResponseMedia(media: UploadFileType[]) {
    this.responseMedia = media
  }

  onToggleResponseBlock() {
    this.showMediaBlock = !this.showMediaBlock
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
