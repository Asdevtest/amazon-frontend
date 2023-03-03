import {makeAutoObservable, runInAction} from 'mobx'

import {TranslationKey} from '@constants/translations/translation-key'

import {AnnouncementsModel} from '@models/announcements-model'
import {RequestModel} from '@models/request-model'
import {UserModel} from '@models/user-model'

import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

export class CreateOrEditRequestViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  acceptMessage = null
  showAcceptMessage = false

  platformSettingsData = null

  drawerOpen = false

  requestToEdit = undefined

  uploadedFiles = []

  announcements = []

  bigImagesOptions = {}

  showImageModal = false

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

  async getPlatformSettingsData() {
    this.platformSettingsData = await UserModel.getPlatformSettings()
  }

  async onSubmitCreateRequest(data, files) {
    try {
      runInAction(() => {
        this.uploadedFiles = []
      })

      if (files.length) {
        await onSubmitPostImages.call(this, {images: files, type: 'uploadedFiles'})
      }

      const dataWithFiles = {
        ...data,
        request: getObjectFilteredByKeyArrayBlackList(
          {
            ...data.request,
            announcementId: data.request.announcementId._id,
          },
          ['discountedPrice'],
        ),
        details: {...data.details, linksToMediaFiles: this.uploadedFiles},
      }

      await RequestModel.createRequest(dataWithFiles)

      runInAction(() => {
        this.showAcceptMessage = true
        this.acceptMessage = t(TranslationKey['An request has been created'])
      })

      this.history.push('/client/freelance/my-requests', {
        showAcceptMessage: this.showAcceptMessage,
        acceptMessage: this.acceptMessage,
      })
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.showAcceptMessage = true
        this.acceptMessage = t(TranslationKey['The request was not created'])
      })

      this.history.push('/client/freelance/my-requests', {
        showAcceptMessage: this.showAcceptMessage,
        acceptMessage: this.acceptMessage,
      })

      runInAction(() => {
        this.error = error
      })
    }
  }

  async onSubmitEditRequest(data, files) {
    try {
      if (files.length) {
        await onSubmitPostImages.call(this, {images: files, type: 'uploadedFiles'})
      }

      const dataWithFiles = {
        ...data,
        request: getObjectFilteredByKeyArrayBlackList(
          {
            ...data.request,
            announcementId: data.request.announcementId._id,
          },
          ['discountedPrice'],
        ),
        details: {...data.details, linksToMediaFiles: [...data.details.linksToMediaFiles, ...this.uploadedFiles]},
      }

      await RequestModel.editRequest(this.requestToEdit.request._id, dataWithFiles)

      runInAction(() => {
        this.showAcceptMessage = true
        this.acceptMessage = t(TranslationKey['The request has been changed'])
      })

      this.history.push('/client/freelance/my-requests/custom-request', {
        showAcceptMessage: this.showAcceptMessage,
        acceptMessage: this.acceptMessage,
        request: this.requestToEdit.request,
      })
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.showAcceptMessage = true
        this.acceptMessage = t(TranslationKey['The request has not been changed'])
      })

      this.history.push('/client/freelance/my-requests/custom-request', {
        showAcceptMessage: this.showAcceptMessage,
        acceptMessage: this.acceptMessage,
        request: this.requestToEdit.request,
      })

      runInAction(() => {
        this.error = error
      })
    }
  }

  onClickThumbnail(data) {
    this.bigImagesOptions = data
    this.onTriggerOpenModal('showImageModal')
  }

  async onClickChoosePerformer(typeTask) {
    this.announcements = await AnnouncementsModel.getVacAnnouncements({
      type: typeTask,
    })
  }

  onTriggerOpenModal(modalState) {
    runInAction(() => {
      this[modalState] = !this[modalState]
    })
  }

  onTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }
}
