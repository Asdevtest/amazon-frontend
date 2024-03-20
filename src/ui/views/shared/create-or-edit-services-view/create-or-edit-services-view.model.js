import { makeAutoObservable, runInAction } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { AnnouncementsModel } from '@models/announcements-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'
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
      console.log(error)
    }
  }

  loadData() {
    try {
      this.getAnnouncementsDataByGuid()
    } catch (error) {
      console.log(error)
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

      this.history.push('/freelancer/freelance/my-services', {
        showAcceptMessage: true,
        acceptMessage: t(TranslationKey['The service was created']),
      })
    } catch (error) {
      console.log(error)

      this.history.push('/freelancer/freelance/my-services', {
        showAcceptMessage: true,
        acceptMessage: t(TranslationKey['The service was not created']),
        error: true,
      })
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

      this.history.push('/freelancer/freelance/my-services', {
        showAcceptMessage: true,
        acceptMessage: t(TranslationKey['Service edited']),
      })
    } catch (error) {
      console.log(error)

      this.history.push('/freelancer/freelance/my-services', {
        showAcceptMessage: true,
        acceptMessage: t(TranslationKey['Service not edited']),
        error: true,
      })
    }
  }

  onClickBackBtn() {
    this.history.goBack()
  }
}
