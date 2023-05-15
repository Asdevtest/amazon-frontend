import {makeAutoObservable, runInAction} from 'mobx'

import {TranslationKey} from '@constants/translations/translation-key'

import {AnnouncementsModel} from '@models/announcements-model'
import {ClientModel} from '@models/client-model'
import {RequestModel} from '@models/request-model'
import {UserModel} from '@models/user-model'

import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'
import {toFixed} from '@utils/text'
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

  permissionsData = []

  announcementId = undefined
  announcements = []
  choosenAnnouncements = []

  bigImagesOptions = {}

  showImageModal = false
  showConfirmModal = false

  readyImages = []
  progressValue = 0
  showProgress = false

  confirmModalSettings = {
    isWarning: false,
    message: '',
    smallMessage: '',
    onSubmit: () => {},
    onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
  }

  constructor({history, location}) {
    runInAction(() => {
      this.history = history

      if (location.state) {
        this.requestId = location.state.requestId
        this.announcementId = location.state.announcementId
      }
    })

    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async getPlatformSettingsData() {
    this.platformSettingsData = await UserModel.getPlatformSettings()
  }

  async loadData() {
    try {
      await this.getCustomRequestCur()
      await this.getAnnouncementData()
      await this.getProductPermissionsData()
      await this.getPlatformSettingsData()
    } catch (error) {
      runInAction(() => {
        this.error = error
      })
      console.log(error)
    }
  }

  async getProductPermissionsData() {
    try {
      this.permissionsData = await ClientModel.getProductPermissionsData()
    } catch (error) {
      runInAction(() => {
        this.error = error
      })
      console.log(error)
    }
  }

  async toPublishRequest(requestId, totalCost) {
    try {
      await RequestModel.toPublishRequest(requestId, {totalCost})

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  pushSuccess() {
    runInAction(() => {
      this.showAcceptMessage = true
      this.acceptMessage = t(TranslationKey['An request has been created'])
    })

    this.history.push('/client/freelance/my-requests', {
      showAcceptMessage: this.showAcceptMessage,
      acceptMessage: this.acceptMessage,
    })
  }

  async onSubmitCreateRequest(data, files, withPublish, announcement) {
    try {
      runInAction(() => {
        this.uploadedFiles = []
      })

      if (files.length) {
        await onSubmitPostImages.call(this, {images: files.map(el => el.file), type: 'uploadedFiles'})
      }

      const dataWithFiles = {
        ...data,
        request: getObjectFilteredByKeyArrayBlackList(
          {
            ...data.request,
            announcementId: announcement?._id || null,
            linksToMediaFiles: this.uploadedFiles.map((el, i) => ({fileLink: el, commentByClient: files[i].comment})),
          },
          ['discountedPrice'],
        ),
        details: {
          ...data.details,
          // linksToMediaFiles: this.uploadedFiles.map((el, i) => ({fileLink: el, commentByClient: files[i].comment})),
        },
      }

      const resp = await RequestModel.createRequest(dataWithFiles)

      if (withPublish) {
        const result = await RequestModel.calculateRequestCost(resp.guid)

        runInAction(() => {
          this.confirmModalSettings = {
            isWarning: false,
            message: `${t(TranslationKey['The exact cost of the request will be:'])} ${toFixed(
              result.totalCost,
              2,
            )} $. ${t(TranslationKey['Confirm the publication?'])}`,
            onSubmit: () => {
              this.toPublishRequest(resp.guid, result.totalCost)
              this.pushSuccess()
            },

            onCancel: () => {
              this.pushSuccess()
            },
          }
        })

        this.onTriggerOpenModal('showConfirmModal')
      } else {
        this.pushSuccess()
      }
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

  async onSubmitEditRequest(data, files, announcement) {
    try {
      if (files.length) {
        await onSubmitPostImages.call(this, {images: files.map(el => el.file), type: 'uploadedFiles'})
      }

      const dataWithFiles = {
        ...data,
        request: getObjectFilteredByKeyArrayBlackList(
          {
            ...data.request,
            announcementId: announcement?._id ? announcement?._id : null,
            linksToMediaFiles: [
              ...this.uploadedFiles.map((el, i) => ({fileLink: el, commentByClient: files[i].comment})),
            ],
          },
          ['discountedPrice'],
          undefined,
          undefined,
          true,
        ),
        details: {
          ...data.details,
        },
      }

      await RequestModel.editRequest(this.requestToEdit.request._id, dataWithFiles)

      runInAction(() => {
        this.showAcceptMessage = true
        this.acceptMessage = t(TranslationKey['The request has been changed'])
      })

      this.history.push(`/client/freelance/my-requests/custom-request?request-id=${this.requestToEdit.request._id}`, {
        showAcceptMessage: this.showAcceptMessage,
        acceptMessage: this.acceptMessage,
        // request: this.requestToEdit.request,
      })
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.showAcceptMessage = true
        this.acceptMessage = t(TranslationKey['The request has not been changed'])
      })

      this.history.push(`/client/freelance/my-requests/custom-request?request-id=${this.requestToEdit.request._id}`, {
        showAcceptMessage: this.showAcceptMessage,
        acceptMessage: this.acceptMessage,
        // request: this.requestToEdit.request,
      })
      // this.history.push('/client/freelance/my-requests/custom-request', {
      //   showAcceptMessage: this.showAcceptMessage,
      //   acceptMessage: this.acceptMessage,
      //   request: this.requestToEdit.request,
      // })

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

  async getCustomRequestCur() {
    if (this.requestId) {
      try {
        const result = await RequestModel.getCustomRequestById(this.requestId)

        runInAction(() => {
          this.requestToEdit = result
        })
      } catch (error) {
        console.log(error)
        runInAction(() => {
          this.error = error
        })
      }
    }
  }

  async getAnnouncementData() {
    const id = this.announcementId || this.requestToEdit?.request?.announcementId
    if (id) {
      this.choosenAnnouncements = await AnnouncementsModel.getAnnouncementsByGuid(id)
    }
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

  setBigImagesOptions(data) {
    runInAction(() => {
      this.bigImagesOptions = data
    })
  }
}
