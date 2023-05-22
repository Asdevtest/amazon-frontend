import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { RequestSubType, RequestType } from '@constants/requests/request-type'
import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { ViewTableModeStateKeys } from '@constants/table/view-table-mode-state-keys'

import { RequestProposalModel } from '@models/request-proposal'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

export class DealsOnReviewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined
  dealsOnReview = true

  deals = []
  viewMode = tableViewMode.LIST
  sortMode = tableSortMode.DESK

  get user() {
    return UserModel.userInfo
  }

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeViewMode(event, nextView) {
    runInAction(() => {
      this.viewMode = nextView
    })
  }

  getCurrentData() {
    return toJS(this.deals)
  }

  setTableModeState() {
    const state = { viewMode: this.viewMode, sortMode: this.sortMode }

    SettingsModel.setViewTableModeState(state, ViewTableModeStateKeys.DEALS_ON_REVIEW)
  }

  getTableModeState() {
    const state = SettingsModel.viewTableModeState[ViewTableModeStateKeys.DEALS_ON_REVIEW]

    runInAction(() => {
      if (state) {
        this.viewMode = state.viewMode
        this.sortMode = state.sortMode
      }
    })
  }

  onTriggerSortMode() {
    runInAction(() => {
      if (this.sortMode === tableSortMode.DESK) {
        this.sortMode = tableSortMode.ASC
      } else {
        this.sortMode = tableSortMode.DESK
      }
    })

    this.setTableModeState()
  }

  async loadData() {
    try {
      await this.getDealsVacant()
    } catch (error) {
      console.log(error)
    }
  }

  async getDealsVacant() {
    try {
      const result = await RequestProposalModel.getRequestProposalsForSupervisor(
        RequestType.CUSTOM,
        RequestSubType.LINKED_TO_ME,
      )

      runInAction(() => {
        this.deals = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onClickViewMore(id, proposalId) {
    try {
      this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/deals-on-review/deal-on-review`, {
        requestId: id,
        curProposalId: proposalId,
      })
    } catch (error) {
      this.onTriggerOpenModal('showWarningModal')
      console.log(error)
    }
  }

  setActionStatus(actionStatus) {
    runInAction(() => {
      this.actionStatus = actionStatus
    })
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
