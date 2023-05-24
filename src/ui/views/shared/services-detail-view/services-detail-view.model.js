/* eslint-disable no-unused-vars */
import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AnnouncementsModel } from '@models/announcements-model'
import { ChatModel } from '@models/chat-model'
import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { FreelancerFreelanceColumns } from '@components/table/table-columns/freelancer/freelancer-freelance-columns'

import { freelancerServiceDetaildsDataConverter } from '@utils/data-grid-data-converters'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

export class ServiceDetailsViewModel {
  history = undefined
  error = undefined
  uploadedFiles = []

  requestStatus = undefined

  announcementData = undefined
  announcementId = undefined

  rowCount = 0
  currentData = []
  sortModel = []
  filterModel = { items: [] }

  showConfirmModal = false

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

  get languageTag() {
    return SettingsModel.languageTag || {}
  }

  constructor({ history, location }) {
    runInAction(() => {
      this.history = history

      if (location.state) {
        runInAction(() => {
          this.announcementId = location.state.data
        })
      }
    })
    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.announcementData,
      () =>
        runInAction(() => {
          this.currentData = this.getCurrentData()
          // console.log('this.currentData', this.currentData)
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
      const result = await AnnouncementsModel.getAnnouncementsByGuid(this.announcementId)
      runInAction(() => {
        this.announcementData = result
        this.rowCount = result.length
      })
    } catch (error) {
      this.error = error
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
      this.error = error
      console.log(error)
    }
  }

  async deleteAnnouncementsByGuid() {
    try {
      await AnnouncementsModel.deleteAnnouncementsByGuid(this.announcementId)
      this.history.push(`/freelancer/freelance/my-services`)
    } catch (error) {
      this.error = error
      console.log(error)
    }
  }

  onClickOpenBtn(id) {
    this.history.push(`/freelancer/freelance/my-services/service-detailds/custom-service-type`, {
      requestId: id,
      announcementId: this.announcementId,
    })
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

  onChangePaginationModelChange(model) {
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
}
