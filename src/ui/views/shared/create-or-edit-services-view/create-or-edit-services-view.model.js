import { makeAutoObservable, runInAction } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { AnnouncementsModel } from '@models/announcements-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

export class CreateOrEditServicesViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  requestToEdit = {}

  pathname = null

  uploadedFiles = []

  requestId = undefined

  userInfo = undefined

  constructor({ history, location }) {
    runInAction(() => {
      this.history = history
      this.pathname = location.pathname

      if (location.state) {
        this.requestId = location.state.requestId
      }
    })

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getAnnouncementsDataByGuid() {
    try {
      if (this.requestId) {
        const result = await AnnouncementsModel.getAnnouncementsByGuid(this.requestId)

        runInAction(() => {
          this.requestToEdit = result
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async loadData() {
    try {
      await this.getAnnouncementsDataByGuid()

      runInAction(() => {
        this.userInfo = UserModel.userInfo
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onClickCreateBtn(data, files) {
    try {
      runInAction(() => {
        this.uploadedFiles = []
      })

      if (files.length) {
        await onSubmitPostImages.call(this, { images: files, type: 'uploadedFiles' })
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

  async onClickEditBtn(data, files) {
    try {
      if (files?.length) {
        await onSubmitPostImages.call(this, { images: files, type: 'uploadedFiles' })
      }

      const dataWithFiles = {
        ...data,
        linksToMediaFiles: [...this.uploadedFiles],
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
