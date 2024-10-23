import { makeAutoObservable, runInAction } from 'mobx'

import { AnnouncementsModel } from '@models/announcements-model'
import { UserModel } from '@models/user-model'

import { onSubmitPostImages } from '@utils/upload-files'

import { IRequest } from '@typings/models/requests/request'
import { IFullUser } from '@typings/shared/full-user'
import { HistoryType } from '@typings/types/history'

export class CreateOrEditServicesViewModel {
  history?: HistoryType
  requestId?: string
  requestToEdit?: IRequest
  uploadedFiles = []

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }

  constructor(history: HistoryType) {
    this.history = history

    if (history.location.state) {
      // @ts-ignore
      this.requestId = history.location.state.requestId
    }

    this.getAnnouncementsDataByGuid()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getAnnouncementsDataByGuid() {
    try {
      if (this.requestId) {
        const response = (await AnnouncementsModel.getAnnouncementsByGuid({
          guid: this.requestId,
        })) as unknown as IRequest

        runInAction(() => {
          this.requestToEdit = response
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  async onClickCreateBtn(data: any) {
    try {
      if (data.linksToMediaFiles?.length) {
        // @ts-ignore
        await onSubmitPostImages.call(this, { images: data.linksToMediaFiles, type: 'uploadedFiles' })
      }

      const dataWithFiles = {
        ...data,
        linksToMediaFiles: this.uploadedFiles,
      }

      await AnnouncementsModel.createAnnouncement(dataWithFiles)
    } catch (error) {
      console.error(error)
    } finally {
      this.history?.push('/freelancer/freelance/my-services')
    }
  }

  async onClickEditBtn(data: any) {
    try {
      if (data.linksToMediaFiles?.length) {
        // @ts-ignore
        await onSubmitPostImages.call(this, { images: data.linksToMediaFiles, type: 'uploadedFiles' })
      }

      const dataWithFiles = {
        ...data,
        linksToMediaFiles: this.uploadedFiles,
      }

      await AnnouncementsModel.editAnnouncement(this.requestToEdit?._id, dataWithFiles)
    } catch (error) {
      console.error(error)
    } finally {
      this.history?.push('/freelancer/freelance/my-services')
    }
  }

  onClickBackBtn() {
    this.history?.goBack()
  }
}
