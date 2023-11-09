import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { AdministratorModel } from '@models/administrator-model'
import { ChatModel } from '@models/chat-model'
import { ChatsModel } from '@models/chats-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { adminFeedbackViewColumns } from '@components/table/table-columns/admin/admin-feedback-columns/admin-feedback-columns'

import { feedBackDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'

export class AdminFeedbackViewModel {
  history = undefined
  requestStatus = undefined

  selectedFeedback = undefined

  showReplyFeedbackModal = false

  nameSearchValue = ''
  isWarning = false
  feedbackList = []

  rowCount = 0
  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  rowHandlers = {
    onClickOpenFeedbackBtn: item => this.onClickOpenFeedbackBtn(item),
  }
  columnsModel = adminFeedbackViewColumns(this.rowHandlers)

  get curUser() {
    return UserModel.userInfo
  }

  get simpleChats() {
    return ChatModel.simpleChats || []
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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_FEEDBACK)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_FEEDBACK]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
  }

  onChangePaginationModel(model) {
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

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(this.feedbackList).filter(
        el =>
          el.originalData.user.name.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el.originalData.user.email.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
      )
    } else {
      return toJS(this.feedbackList)
    }
  }

  loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.getDataGridState()
      this.getFeedbackList()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async getFeedbackList() {
    try {
      const result = await AdministratorModel.getFeedback()

      runInAction(() => {
        this.feedbackList = feedBackDataConverter(result.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt')))
        this.rowCount = this.feedbackList.length
      })
    } catch (error) {
      console.log(error)
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
