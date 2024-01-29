import { makeAutoObservable, runInAction } from 'mobx'

import { UserRole, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { AnnouncementsModel } from '@models/announcements-model'
import { RequestModel } from '@models/request-model'
import { UserModel } from '@models/user-model'

import { getObjectFilteredByKeyArrayBlackList } from '@utils/object'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

export class CreateOrEditRequestViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  acceptMessage = null
  showAcceptMessage = false

  platformSettingsData = null

  requestToEdit = undefined
  createRequestForIdeaData = undefined

  uploadedFiles = []

  permissionsData = []
  masterUsersData = []

  announcementId = undefined
  announcements = []
  choosenAnnouncements = {}

  bigImagesOptions = {}

  showImageModal = false
  showConfirmModal = false

  readyImages = []
  progressValue = 0
  showProgress = false

  requestId = undefined
  executor = undefined

  showCheckRequestByTypeExists = false

  confirmModalSettings = {
    isWarning: false,
    message: '',
    smallMessage: '',
    onSubmit: () => {},
    onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
  }

  constructor({ history, location }) {
    const url = new URL(window.location.href)
    runInAction(() => {
      this.history = history

      this.createRequestForIdeaData = {
        productId: url.searchParams.get('parentProduct'),
        asin: url.searchParams.get('asin'),
      }

      const announcementId = url.searchParams.get('announcementId')
      if (announcementId) {
        this.announcementId = announcementId
      }

      if (location.state) {
        this.requestId = location.state.requestId
      }
    })

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getPlatformSettingsData() {
    this.platformSettingsData = await UserModel.getPlatformSettings()
  }

  async loadData() {
    try {
      await Promise.all([this.getCustomRequestCur(), this.getProductPermissionsData(), this.getPlatformSettingsData()])

      await this.getAnnouncementData()
    } catch (error) {
      runInAction(() => {
        this.error = error
      })
      console.log(error)
    }
  }

  async getProductPermissionsData() {
    try {
      // await ClientModel.getProductPermissionsData().then(result => {
      //   runInAction(() => {
      //     this.permissionsData = result.rows
      //   })
      // })
    } catch (error) {
      runInAction(() => {
        this.error = error
      })
      console.log(error)
    }
  }

  async getMasterUsersData(specsType, guid = '') {
    try {
      this.masterUsersData = await UserModel.getMasterUsers(mapUserRoleEnumToKey[UserRole.FREELANCER], guid, specsType)
    } catch (error) {
      runInAction(() => {
        this.error = error
      })
      console.log(error)
    }
  }

  async toPublishRequest(requestId, totalCost) {
    try {
      await RequestModel.toPublishRequest(requestId, { totalCost })

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
        await onSubmitPostImages.call(this, { images: files.map(el => el.file), type: 'uploadedFiles' })
      }

      const dataWithFiles = {
        ...data,
        request: getObjectFilteredByKeyArrayBlackList(
          {
            ...data.request,
            executorId: data?.request?.executorId || null,
            announcementId: announcement?._id || null,
            linksToMediaFiles: this.uploadedFiles.map((el, i) => ({ fileLink: el, commentByClient: files[i].comment })),
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
              withPublish && this.toPublishRequest(resp.guid, result.totalCost)
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

      if (error?.response?.error?.url?.includes('calculate_request_cost')) {
        this.pushSuccess()
      } else {
        this.history.push('/client/freelance/my-requests', {
          showAcceptMessage: true,
          acceptMessage: t(TranslationKey['The request was not created']),
          error: true,
        })
      }

      runInAction(() => {
        this.error = error
      })
    }
  }

  async onSubmitEditRequest(data, files, announcement) {
    try {
      if (files.length) {
        await onSubmitPostImages.call(this, { images: files.map(el => el.file), type: 'uploadedFiles' })
      }

      const dataWithFiles = {
        ...data,
        request: getObjectFilteredByKeyArrayBlackList(
          {
            ...data.request,
            executorId: data?.request?.executorId || null,
            announcementId: announcement?._id ? announcement?._id : null,
            linksToMediaFiles: [
              ...this.uploadedFiles.map((el, i) => ({ fileLink: el, commentByClient: files[i].comment })),
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
        error: true,
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

  async onClickChoosePerformer(spec) {
    this.announcements = await AnnouncementsModel.getVacAnnouncements(spec)
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
    const guid = this.announcementId || this.requestToEdit?.request?.announcementId
    if (guid) {
      const result = await AnnouncementsModel.getAnnouncementsByGuid(guid)
      runInAction(() => {
        this.choosenAnnouncements = result
        this.executor = result?.createdBy
      })
    }
  }

  async checkRequestByTypeExists(spec, id) {
    const result = await RequestModel.getExistingRequestsTypeRequests(spec, id)

    return result
  }

  onClickExistingRequest(item) {
    const win = window.open(`/client/freelance/my-requests/custom-request?request-id=${item._id}`, '_blank')

    win.focus()
  }

  onTriggerOpenModal(modalState) {
    runInAction(() => {
      this[modalState] = !this[modalState]
    })
  }

  setBigImagesOptions(data) {
    runInAction(() => {
      this.bigImagesOptions = data
    })
  }
}
