import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {UserRoleCodeMapForRoutes} from '@constants/user-roles'

import {AdministratorModel} from '@models/administrator-model'
import {ChatModel} from '@models/chat-model'
import {ChatsModel} from '@models/chats-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {adminFeedbackViewColumns} from '@components/table-columns/admin/admin-feedback-columns/admin-feedback-columns'

import {feedBackDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class AdminFeedbackViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  selectedFeedback = undefined

  showReplyFeedbackModal = false

  nameSearchValue = ''
  drawerOpen = false
  isWarning = false
  feedbackList = []
  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
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

  constructor({history}) {
    runInAction(() => {
      this.history = history
    })
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
  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
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
      runInAction(() => {
        this.sortModel = state.sorting.sortModel
        this.filterModel = state.filter.filterModel
        this.rowsPerPage = state.pagination.pageSize

        this.densityModel = state.density.value
        this.columnsModel = adminFeedbackViewColumns(this.rowHandlers).map(el => ({
          ...el,
          hide: state.columns?.lookup[el?.field]?.hide,
        }))
      })
    }
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeDrawerOpen(e, value) {
    runInAction(() => {
      this.drawerOpen = value
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedBatches = model
    })
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
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  onChangeCurPage(e) {
    runInAction(() => {
      this.curPage = e
    })
  }

  async getFeedbackList() {
    try {
      const result = await AdministratorModel.getFeedback()

      runInAction(() => {
        runInAction(() => {
          this.feedbackList = feedBackDataConverter(result.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt')))
        })
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onClickOpenFeedbackBtn(feedback) {
    runInAction(() => {
      this.selectedFeedback = feedback
    })

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
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
