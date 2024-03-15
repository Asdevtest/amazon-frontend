import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { AnnouncementsModel } from '@models/announcements-model'
import { FeedbackModel } from '@models/feedback-model'
import { UserModel } from '@models/user-model'

import { FreelancerFreelanceColumns } from '@components/table/table-columns/freelancer/freelancer-freelance-columns'

import { freelancerServiceDetaildsDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { t } from '@utils/translations'

export class ServiceDetailsViewModel {
  history = undefined
  uploadedFiles = []

  requestStatus = undefined

  announcementData = undefined
  announcementId = undefined

  rowCount = 0
  currentData = []
  sortModel = []
  filterModel = { items: [] }

  showConfirmModal = false
  showReviewModal = false

  currentReviews = []
  currentReviewModalUser = undefined

  confirmModalSettings = {
    isWarning: false,
    confirmTitle: '',
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  densityModel = 'compact'

  handlers = {
    onClickOpenButton: id => this.onClickOpenBtn(id),
  }

  columnsModel = FreelancerFreelanceColumns(this.handlers)

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  get user() {
    return UserModel.userInfo
  }

  constructor({ history }) {
    runInAction(() => {
      const url = new URL(window.location.href)

      this.history = history

      runInAction(() => {
        this.announcementId = url.searchParams.get('serviceId')
      })
    })
    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.announcementData,
      () =>
        runInAction(() => {
          this.currentData = this.getCurrentData()
        }),
    )
  }

  getCurrentData() {
    return toJS(freelancerServiceDetaildsDataConverter(this.announcementData))
  }

  async loadData() {
    try {
      await this.getAnnouncementsDataByGuid()
    } catch (error) {
      console.log(error)
    }
  }

  async getAnnouncementsDataByGuid() {
    try {
      await AnnouncementsModel.getAnnouncementsByGuid(this.announcementId).then(result => {
        runInAction(() => {
          this.announcementData = result
          this.rowCount = result.length
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onClickCloseAnnouncementBtn() {
    try {
      this.confirmModalSettings = {
        isWarning: true,
        confirmTitle: t(TranslationKey['Attention. Are you sure?']),
        confirmMessage: t(TranslationKey['After assent the announcement will be deleted']),
        onClickConfirm: () => this.deleteAnnouncementsByGuid(),
      }
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
    }
  }

  async deleteAnnouncementsByGuid() {
    try {
      await AnnouncementsModel.deleteAnnouncementsByGuid(this.announcementId)
      this.history.push(`/freelancer/freelance/my-services`)
    } catch (error) {
      console.log(error)
    }
  }

  onClickOpenBtn(id) {
    this.history.push(
      `/freelancer/freelance/my-services/service-detailds/custom-service-type?requestId=${id}&announcementId=${this.announcementId}`,
    )
  }

  onClickEditBtn() {
    this.history.push(`/freelancer/freelance/my-services/service-detailds/edit-service`, {
      requestId: toJS(this.announcementId),
    })
  }

  onClickBackBtn() {
    this.history.push(`/freelancer/freelance/my-services`)
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
  }

  onPaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })
    this.getAnnouncementsDataByGuid()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.getAnnouncementsDataByGuid()
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.getAnnouncementsDataByGuid()
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  async getReviews(guid) {
    try {
      const result = await FeedbackModel.getFeedback(guid)

      runInAction(() => {
        this.currentReviews = result.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onClickReview(user) {
    await this.getReviews(user._id)
    this.currentReviewModalUser = user
    this.onTriggerOpenModal('showReviewModal')
  }
}
