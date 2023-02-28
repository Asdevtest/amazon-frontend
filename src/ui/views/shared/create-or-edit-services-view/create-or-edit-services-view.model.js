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

  acceptMessage = null
  showAcceptMessage = false

  drawerOpen = false

  requestToEdit = undefined

  uploadedFiles = []

  readyImages = []
  progressValue = 0
  showProgress = false

  constructor({history, location}) {
    runInAction(() => {
      this.history = history

      if (location.state) {
        this.requestToEdit = location.state.request
      }
    })

    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async onClickCreateOrEditBtn(data, files) {
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

      runInAction(() => {
        this.showAcceptMessage = true
        this.acceptMessage = t(TranslationKey['The service was created'])
      })

      this.history.push('/freelancer/freelance/my-services', {
        showAcceptMessage: this.showAcceptMessage,
        acceptMessage: this.acceptMessage,
      })
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.showAcceptMessage = true
        this.acceptMessage = t(TranslationKey['The request was not created'])
      })

      this.history.push('/freelancer/freelance/my-services', {
        showAcceptMessage: this.showAcceptMessage,
        acceptMessage: this.acceptMessage,
      })

      runInAction(() => {
        this.error = error
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
