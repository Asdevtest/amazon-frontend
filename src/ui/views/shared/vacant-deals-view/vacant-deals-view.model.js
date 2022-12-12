import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {RequestSubType, RequestType} from '@constants/request-type'
import {tableSortMode, tableViewMode} from '@constants/table-view-modes'
import {UserRoleCodeMapForRoutes} from '@constants/user-roles'
import {ViewTableModeStateKeys} from '@constants/view-table-mode-state-keys'

import {RequestProposalModel} from '@models/request-proposal'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

export class VacantDealsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false
  showConfirmModal = false
  requestId = undefined
  proposalId = undefined
  client = {}

  requests = []
  deals = []

  viewMode = tableViewMode.LIST
  sortMode = tableSortMode.DESK

  get user() {
    return UserModel.userInfo
  }

  constructor({history}) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, {autoBind: true})
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
    const state = {viewMode: this.viewMode, sortMode: this.sortMode}

    SettingsModel.setViewTableModeState(state, ViewTableModeStateKeys.VACANT_DEALS)
  }

  getTableModeState() {
    const state = SettingsModel.viewTableModeState[ViewTableModeStateKeys.VACANT_DEALS]

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
        RequestSubType.VACANT,
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
      this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/vacant-deals/deal-details`, {
        requestId: id,
        curProposalId: proposalId,
      })
    } catch (error) {
      this.onTriggerOpenModal('showWarningModal')
      console.log(error)
    }
  }

  async onClickGetToWork(id, requestId) {
    try {
      await RequestProposalModel.requestProposalLinkOrUnlinkSupervisor(id, {action: 'LINK'})
      this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/deals-on-review/deal-on-review`, {
        requestId,
        curProposalId: id,
      })
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      this.onTriggerOpenModal('showWarningModal')
      console.log(error)
    }
  }

  onClickGetToWorkModal(proposalId, requestId) {
    runInAction(() => {
      this.proposalId = proposalId
      this.requestId = requestId
    })

    this.onTriggerOpenModal('showConfirmModal')
  }

  onTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
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
