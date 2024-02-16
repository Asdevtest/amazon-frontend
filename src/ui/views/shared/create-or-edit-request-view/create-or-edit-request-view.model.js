import { makeAutoObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { UserRole, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AnnouncementsModel } from '@models/announcements-model'
import { ClientModel } from '@models/client-model'
import { RequestModel } from '@models/request-model'
import { UserModel } from '@models/user-model'

import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getObjectFilteredByKeyArrayBlackList } from '@utils/object'
import { objectToUrlQs, toFixed } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { Specs } from '@typings/enums/specs'

export class CreateOrEditRequestViewModel {
  history = undefined
  requestStatus = undefined

  acceptMessage = null
  showAcceptMessage = false
  platformSettingsData = null
  requestToEdit = undefined
  createRequestForIdeaData = undefined
  uploadedFiles = []
  specs = []
  masterUsersData = []
  announcementId = undefined
  announcements = []
  choosenAnnouncements = {}
  productMedia = undefined
  bigImagesOptions = {}
  showImageModal = false
  showConfirmModal = false
  showGalleryModal = false
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

  columnMenuSettings = {
    ...dataGridFiltersInitializer(['specType']),
  }

  constructor({ history }) {
    const url = new URL(window.location.href)

    this.history = history

    this.createRequestForIdeaData = {
      productId: url.searchParams.get('parentProduct'),
      asin: url.searchParams.get('asin'),
    }

    const announcementId = url.searchParams.get('announcementId')
    if (announcementId) {
      this.announcementId = announcementId
    }

    if (history.location.state) {
      this.requestId = history.location.state.requestId
    }

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getPlatformSettingsData() {
    try {
      const response = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.platformSettingsData = response
      })
    } catch (error) {
      console.log(error)
    }
  }

  loadData() {
    try {
      this.getCustomRequestCur()
      this.getPlatformSettingsData()
      this.getAnnouncementData()
      this.getSpecs()
    } catch (error) {
      console.log(error)
    }
  }

  async getMasterUsersData(specsType, guid = '') {
    try {
      const response = await UserModel.getMasterUsers(mapUserRoleEnumToKey[UserRole.FREELANCER], guid, specsType)

      runInAction(() => {
        this.masterUsersData = response
      })
    } catch (error) {
      console.log(error)
    }
  }

  async toPublishRequest(requestId, totalCost) {
    try {
      await RequestModel.toPublishRequest(requestId, { totalCost })

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
    }
  }

  pushSuccess() {
    this.showAcceptMessage = true
    this.acceptMessage = t(TranslationKey['An request has been created'])

    this.history.push('/client/freelance/my-requests', {
      showAcceptMessage: this.showAcceptMessage,
      acceptMessage: this.acceptMessage,
    })
  }

  async onSubmitCreateRequest(data, files, withPublish, announcement) {
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
    }
  }

  onClickThumbnail(data) {
    this.bigImagesOptions = data
    this.onTriggerOpenModal('showImageModal')
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings[field].currentFilterData = value
  }

  async onClickChoosePerformer(specType) {
    try {
      this.onChangeFullFieldMenuItem(specType === Specs.DEFAULT ? [] : [specType], 'specType', true)

      const response = await AnnouncementsModel.getVacAnnouncements({ filters: this.getFilter() })

      runInAction(() => {
        this.announcements = response
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getCustomRequestCur() {
    if (this.requestId) {
      try {
        this.setRequestStatus(loadingStatuses.IS_LOADING)

        const result = await RequestModel.getCustomRequestById(this.requestId)

        runInAction(() => {
          this.requestToEdit = result
        })

        this.setRequestStatus(loadingStatuses.SUCCESS)
      } catch (error) {
        console.log(error)
        this.setRequestStatus(loadingStatuses.FAILED)
      }
    }
  }

  async getAnnouncementData() {
    const guid = this.announcementId || this.requestToEdit?.request?.announcementId

    if (guid) {
      try {
        const result = await AnnouncementsModel.getAnnouncementsByGuid(guid)

        runInAction(() => {
          this.choosenAnnouncements = result
          this.executor = result?.createdBy
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  async checkRequestByTypeExists(id, specType) {
    try {
      const result = await RequestModel.getExistingRequestsTypeRequests(id, specType)

      return result
    } catch (error) {
      console.log(error)
    }
  }

  onClickExistingRequest(item) {
    const win = window.open(`/client/freelance/my-requests/custom-request?request-id=${item._id}`, '_blank')

    win.focus()
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }

  setBigImagesOptions(data) {
    this.bigImagesOptions = data
  }

  async getSpecs() {
    try {
      const response = await UserModel.getSpecs(false)

      runInAction(() => {
        this.specs = response
      })
    } catch (error) {
      console.log(error)
    }
  }

  getFilter(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(this.columnMenuSettings, this.nameSearchValue, exclusion, ['specType'], []),
    )
  }

  async getProductMediaById(id) {
    try {
      const response = await ClientModel.getProductMediaById(id)

      runInAction(() => {
        this.productMedia = response
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onClickAddMediaFromProduct(id) {
    if (id) {
      await this.getProductMediaById(id)
    } else {
      toast.warning(t(TranslationKey['Product not selected!']))
    }

    if (this.productMedia) {
      this.onTriggerOpenModal('showGalleryModal')
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
