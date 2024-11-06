import { makeAutoObservable, runInAction } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { ViewTableModeStateKeys } from '@constants/table/view-table-mode-state-keys'

import { RequestProposalModel } from '@models/request-proposal'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { sortObjectsArrayByFiledDateWithParseISO, sortObjectsArrayByFiledDateWithParseISOAsc } from '@utils/date-time'

import { RequestSubType, RequestType } from '@typings/enums/request/request-type'
import { IProposal } from '@typings/models/proposals/proposal'
import { IFullUser } from '@typings/shared/full-user'
import { HistoryType } from '@typings/types/history'

export class DealsOnReviewModel {
  history?: HistoryType
  deals: IProposal[] = []
  viewMode = tableViewMode.LIST
  sortMode = tableSortMode.DESK

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }

  get currentData() {
    return this.deals?.sort(
      (this.sortMode === tableSortMode.DESK
        ? sortObjectsArrayByFiledDateWithParseISO
        : sortObjectsArrayByFiledDateWithParseISOAsc)('updatedAt'),
    )
  }

  constructor(history: HistoryType) {
    this.history = history
    this.getDealsVacant()
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setTableModeState() {
    const state = { sortMode: this.sortMode }

    SettingsModel.setViewTableModeState(state, ViewTableModeStateKeys.DEALS_ON_REVIEW)
  }

  getTableModeState() {
    // @ts-ignore
    const state = SettingsModel.viewTableModeState[ViewTableModeStateKeys.DEALS_ON_REVIEW]

    if (state) {
      this.sortMode = state.sortMode
    }
  }

  onTriggerSortMode() {
    if (this.sortMode === tableSortMode.DESK) {
      this.sortMode = tableSortMode.ASC
    } else {
      this.sortMode = tableSortMode.DESK
    }

    this.setTableModeState()
  }

  async getDealsVacant() {
    try {
      const result = (await RequestProposalModel.getRequestProposalsForSupervisor(
        RequestType.CUSTOM,
        RequestSubType.LINKED_TO_ME,
      )) as unknown as IProposal[]

      runInAction(() => {
        this.deals = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickViewMore(id: string, proposalId: string) {
    this.history?.push(`/${UserRoleCodeMapForRoutes[this.userInfo?.role]}/freelance/deals-on-review/deal-on-review`, {
      requestId: id,
      curProposalId: proposalId,
    })
  }
}
