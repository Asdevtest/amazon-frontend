import { makeAutoObservable, runInAction } from 'mobx'

import { AnnouncementsModel } from '@models/announcements-model'
import { UserModel } from '@models/user-model'

import { onSubmitPostImages } from '@utils/upload-files'

export class CreateOrEditServicesViewModel {
  history = undefined

  requestId = undefined
  requestToEdit = undefined
  uploadedFiles = []

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({ history }) {
    this.history = history

    if (history.location.state) {
      this.requestId = history.location.state.requestId
    }

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getAnnouncementsDataByGuid() {
    try {
      if (this.requestId) {
        const response = await AnnouncementsModel.getAnnouncementsByGuid(this.requestId)

        runInAction(() => {
          this.requestToEdit = response
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  loadData() {
    try {
      this.getAnnouncementsDataByGuid()
    } catch (error) {
      console.error(error)
    }
  }

  async onClickCreateBtn(data) {
    try {
      if (data.linksToMediaFiles?.length) {
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
      this.history.push('/freelancer/freelance/my-services')
    }
  }

  async onClickEditBtn(data) {
    try {
      if (data.linksToMediaFiles?.length) {
        await onSubmitPostImages.call(this, { images: data.linksToMediaFiles, type: 'uploadedFiles' })
      }

      const dataWithFiles = {
        ...data,
        linksToMediaFiles: this.uploadedFiles,
      }

      await AnnouncementsModel.editAnnouncement(this.requestToEdit._id, dataWithFiles)
    } catch (error) {
      console.error(error)
    } finally {
      this.history.push('/freelancer/freelance/my-services')
    }
  }

  onClickBackBtn() {
    this.history.goBack()
  }
}
