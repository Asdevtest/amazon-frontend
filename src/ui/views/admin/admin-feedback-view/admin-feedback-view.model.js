import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'

import { AdministratorModel } from '@models/administrator-model'
import { ChatModel } from '@models/chat-model'
import { ChatsModel } from '@models/chats-model'
import { TableSettingsModel } from '@models/table-settings'
import { UserModel } from '@models/user-model'

import { adminFeedbackViewColumns } from '@components/table/table-columns/admin/admin-feedback-columns/admin-feedback-columns'

import { feedBackDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'

import { loadingStatus } from '@typings/enums/loading-status'

export class AdminFeedbackViewModel {
  history = undefined
  requestStatus = undefined

  showReplyFeedbackModal = false

  selectedFeedback = undefined
  nameSearchValue = ''
  feedbackList = []

  rowCount = 0
  sortModel = []
  filterModel = { items: [] }
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}
  rowHandlers = {
    onClickOpenFeedbackBtn: item => this.onClickOpenFeedbackBtn(item),
  }
  columnsModel = adminFeedbackViewColumns(this.rowHandlers)

  get userInfo() {
    return UserModel.userInfo
  }

  get simpleChats() {
    return ChatModel.simpleChats
  }

  get currentData() {
    if (this.nameSearchValue) {
      return this.feedbackList.filter(
        el =>
          el.originalData.user.name.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el.originalData.user.email.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
      )
    } else {
      return this.feedbackList
    }
  }

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeNameSearchValue(e) {
    this.nameSearchValue = e.target.value
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.ADMIN_FEEDBACK)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.ADMIN_FEEDBACK)

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  onChangeFilterModel(model) {
    this.filterModel = model
    this.setDataGridState()
  }

  onPaginationModelChange(model) {
    this.paginationModel = model
    this.setDataGridState()
  }

  onColumnVisibilityModel(model) {
    this.columnVisibilityModel = model
    this.setDataGridState()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel
    this.setDataGridState()
  }

  onSelectionModel(model) {
    this.selectedBatches = model
  }

  loadData() {
    try {
      this.getDataGridState()
      this.getFeedbackList()
    } catch (error) {
      console.error(error)
    }
  }

  async getFeedbackList() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await AdministratorModel.getFeedback()

      runInAction(() => {
        this.feedbackList = feedBackDataConverter(result.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt')))
        this.rowCount = this.feedbackList.length
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  onClickOpenFeedbackBtn(feedback) {
    this.selectedFeedback = feedback

    this.onTriggerOpenModal('showReplyFeedbackModal')
  }

  async onClickWriteBtn(anotherUserId) {
    try {
      if (!this.simpleChats.some(el => el.users.map(e => e._id).includes(anotherUserId))) {
        await ChatsModel.createSimpleChatByUserId(anotherUserId)
      }

      this.history.push(`/${UserRoleCodeMapForRoutes[this.userInfo.role]}/messages`, {
        anotherUserId,
      })
    } catch (e) {
      console.error(e)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
