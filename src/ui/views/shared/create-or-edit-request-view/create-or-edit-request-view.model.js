/* eslint-disable @typescript-eslint/no-empty-function */
import { makeAutoObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { UserRole, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
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

import { loadingStatus } from '@typings/enums/loading-status'
import { Specs } from '@typings/enums/specs'

export class CreateOrEditRequestViewModel {
  history = undefined
  requestStatus = loadingStatus.IS_LOADING // for first render

  requestToEdit = undefined
  createRequestForIdeaData = undefined
  uploadedFiles = []
  specs = []
  masterUsersData = []
  announcementId = undefined
  announcements = []
  choosenAnnouncements = undefined
  productMedia = undefined
  showConfirmModal = false
  showGalleryModal = false
  requestId = undefined
  executor = undefined

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

  get platformSettings() {
    return UserModel.platformSettings
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

  async loadData() {
    try {
      // status change is required for loading
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await this.getCustomRequestCur()
      this.getAnnouncementData()
      this.getSpecs()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async getMasterUsersData(specsType, guid = '') {
    try {
      const response = await UserModel.getMasterUsers(mapUserRoleEnumToKey[UserRole.FREELANCER], guid, specsType)

      runInAction(() => {
        this.masterUsersData = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async toPublishRequest(requestId, totalCost) {
    try {
      await RequestModel.toPublishRequest(requestId, { totalCost })

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  pushSuccess() {
    this.history.push('/client/freelance/my-requests')
  }

  async onSubmitCreateRequest(data, files, withPublish, announcement) {
    try {
      if (files.length) {
        await onSubmitPostImages.call(this, { images: files.map(el => el.fileLink), type: 'uploadedFiles' })
      }

      const dataWithFiles = {
        ...data,
        request: getObjectFilteredByKeyArrayBlackList(
          {
            ...data.request,
            executorId: data?.request?.executorId || null,
            announcementId: announcement?._id || null,
            linksToMediaFiles: this.uploadedFiles.map((el, i) => ({
              fileLink: el,
              commentByClient: files[i].commentByClient,
            })),
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
      console.error(error)

      this.pushSuccess()
    }
  }

  async onSubmitEditRequest(data, files, announcement) {
    try {
      if (files.length) {
        await onSubmitPostImages.call(this, { images: files.map(el => el.fileLink), type: 'uploadedFiles' })
      }

      const dataWithFiles = {
        ...data,
        request: getObjectFilteredByKeyArrayBlackList(
          {
            ...data.request,
            executorId: data?.request?.executorId || null,
            announcementId: announcement?._id ? announcement?._id : null,
            linksToMediaFiles: [
              ...this.uploadedFiles.map((el, i) => ({ fileLink: el, commentByClient: files[i].commentByClient })),
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
    } catch (error) {
      console.error(error)
    } finally {
      this.history.push(`/client/freelance/my-requests/custom-request?request-id=${this.requestToEdit.request._id}`)
    }
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
      console.error(error)
    }
  }

  async getCustomRequestCur() {
    if (this.requestId) {
      try {
        const result = await RequestModel.getCustomRequestById(this.requestId)

        runInAction(() => {
          this.requestToEdit = result
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  async getAnnouncementData() {
    const guid = this.announcementId || this.requestToEdit?.request?.announcementId

    if (guid) {
      try {
        const result = await AnnouncementsModel.getAnnouncementsByGuid({ guid })

        runInAction(() => {
          this.choosenAnnouncements = result
          this.executor = result?.createdBy
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  async checkRequestByTypeExists(id, specType) {
    try {
      const result = await RequestModel.getExistingRequestsTypeRequests(id, specType)

      return result
    } catch (error) {
      console.error(error)
    }
  }

  onClickExistingRequest(item) {
    const win = window.open(`/client/freelance/my-requests/custom-request?request-id=${item._id}`, '_blank')

    win.focus()
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }

  async getSpecs() {
    try {
      const response = await UserModel.getSpecs(false)

      runInAction(() => {
        this.specs = response
      })
    } catch (error) {
      console.error(error)
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
      console.error(error)
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
