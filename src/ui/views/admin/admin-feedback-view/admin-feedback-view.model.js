import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {UserRoleCodeMapForRoutes} from '@constants/user-roles'

import {AdministratorModel} from '@models/administrator-model'
import {ChatModel} from '@models/chat-model'
import {RequestModel} from '@models/request-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {adminFeedbackViewColumns} from '@components/table-columns/admin/admin-feedback-columns/admin-feedback-columns'

import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class AdminFeedbackViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  isWarning = false
  feedbackList = []
  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  rowHandlers = {
    onClickWriteBtn: id => this.onClickWriteBtn(id),
  }
  columnsModel = adminFeedbackViewColumns(this.rowHandlers)

  get curUser() {
    return UserModel.userInfo
  }

  get simpleChats() {
    return ChatModel.simpleChats || []
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()
    }
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_FEEDBACK)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_FEEDBACK]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = adminFeedbackViewColumns(this.rowHandlers).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onSelectionModel(model) {
    this.selectedBatches = model
  }

  getCurrentData() {
    return toJS(this.feedbackList)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      await this.getFeedbackList()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e
  }

  async getFeedbackList() {
    try {
      const result = await AdministratorModel.getFeedback()

      runInAction(() => {
        this.feedbackList = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onClickWriteBtn(anotherUserId) {
    try {
      if (!this.simpleChats.some(el => el.users.map(e => e._id).includes(anotherUserId))) {
        await RequestModel.createSimpleChatByUserId(anotherUserId)
      }

      this.history.push(`/${UserRoleCodeMapForRoutes[this.curUser.role]}/messages`, {
        anotherUserId,
      })
    } catch (e) {
      console.log(e)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
