/* eslint-disable no-unused-vars */
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'
import {UserRoleCodeMapForRoutes} from '@constants/user-roles'

import {AnnouncementsModel} from '@models/announcements-model'
import {ChatModel} from '@models/chat-model'
import {RequestModel} from '@models/request-model'
import {RequestProposalModel} from '@models/request-proposal'
import {UserModel} from '@models/user-model'

import {FreelancerFreelanceColumns} from '@views/freelancer/freelancer-freelance-columns'

import {freelancerServiceDetaildsDataConverter} from '@utils/data-grid-data-converters'
import {toFixed} from '@utils/text'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

export class ServiceDetailsViewModel {
  history = undefined
  error = undefined
  uploadedFiles = []
  drawerOpen = false

  requestStatus = undefined

  announcementData = undefined
  announcementId = undefined

  curPage = 0
  rowsPerPage = 15

  currentData = []

  sortModel = []
  filterModel = {items: []}
  columnVisibilityModel = undefined

  densityModel = 'compact'

  handlers = {
    onClickOpenButton: id => this.onClickOpenBtn(id),
  }

  columnsModel = FreelancerFreelanceColumns(this.handlers)

  get user() {
    return UserModel.userInfo
  }

  constructor({history, location}) {
    runInAction(() => {
      this.history = history

      if (location.state) {
        runInAction(() => {
          this.announcementId = location.state.data
        })
      }
    })
    makeAutoObservable(this, undefined, {autoBind: true})

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
      const result = await AnnouncementsModel.getAnnouncementsByGuid(this.announcementId)
      runInAction(() => {
        this.announcementData = result
      })
    } catch (error) {
      this.error = error
      console.log(error)
    }
  }

  onClickOpenBtn(id) {
    this.history.push(`/freelancer/freelance/my-services/service-detailds/edit-service/custom-service-type`, {
      requestId: id,
      announcementId: this.announcementId,
    })
  }

  onClickEditBtn() {
    this.history.push(`/freelancer/freelance/my-services/service-detailds/edit-service`, {
      request: this.announcementData,
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

  onChangeCurPage(e) {
    runInAction(() => {
      this.curPage = e
    })
    this.getAnnouncementsDataByGuid()
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e
      this.curPage = 0
    })

    this.getAnnouncementsDataByGuid()
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.getAnnouncementsDataByGuid()
  }

  onTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }
}
