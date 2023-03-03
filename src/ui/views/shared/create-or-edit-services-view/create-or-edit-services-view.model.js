/* eslint-disable no-unused-vars */
import {makeAutoObservable, runInAction} from 'mobx'

import {TranslationKey} from '@constants/translations/translation-key'

import {AnnouncementsModel} from '@models/announcements-model'
import {RequestModel} from '@models/request-model'

import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

export class CreateOrEditServicesViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  drawerOpen = false

  requestToEdit = {}

  pathname = null

  uploadedFiles = []

  readyImages = []
  progressValue = 0
  showProgress = false

  constructor({history, location}) {
    runInAction(() => {
      this.history = history
      this.pathname = location.pathname

      if (location.state) {
        this.requestToEdit = location.state.request
      }
    })

    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async onClickCreateBtn(data, files) {
    try {
      runInAction(() => {
        this.uploadedFiles = []
      })

      if (files.length) {
        await onSubmitPostImages.call(this, {images: files, type: 'uploadedFiles'})
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
        acceptMessage: t(TranslationKey['The request was not created']),
      })

      runInAction(() => {
        this.error = error
      })
    }
  }

  async onClickEditBtn(data, files) {
    try {
      if (files?.length) {
        await onSubmitPostImages.call(this, {images: files, type: 'uploadedFiles'})
      }

      const dataWithFiles = {
        ...data,
        linksToMediaFiles: [...data.linksToMediaFiles, ...this.uploadedFiles],
      }

      await AnnouncementsModel.editAnnouncement(this.requestToEdit._id, dataWithFiles)

      this.history.push('/freelancer/freelance/my-services', {
        showAcceptMessage: true,
        acceptMessage: t(TranslationKey['Service edited']),
      })
    } catch (error) {
      runInAction(() => {
        this.error = error
        console.log(error)
      })

      this.history.push('/freelancer/freelance/my-services', {
        showAcceptMessage: true,
        acceptMessage: t(TranslationKey['Service not edited']),
      })
    }
  }

  onClickBackBtn() {
    this.history.push('/freelancer/freelance/my-services')
  }

  onTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }
}
