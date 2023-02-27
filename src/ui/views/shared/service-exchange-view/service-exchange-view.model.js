/* eslint-disable no-unused-vars */
import {makeAutoObservable, runInAction} from 'mobx'

import {tableSortMode, tableViewMode} from '@constants/table-view-modes'

import {UserModel} from '@models/user-model'

export class ServiceExchangeViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false

  selectedTaskType = 'ALL'

  showConfirmModal = false
  selectedProposal = undefined

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

  onClickTaskType(taskType) {
    this.selectedTaskType = taskType
  }
}
