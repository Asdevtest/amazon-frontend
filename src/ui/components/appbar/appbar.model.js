import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {UserRole} from '@constants/user-roles'

import {BuyerModel} from '@models/buyer-model'
import {ClientModel} from '@models/client-model'
import {ResearcherModel} from '@models/researcher-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {SupervisorModel} from '@models/supervisor-model'

const userRoleModels = {
  [UserRole.SUPERVISOR]: SupervisorModel,
  [UserRole.RESEARCHER]: ResearcherModel,
  [UserRole.BUYER]: BuyerModel,
  [UserRole.CLIENT]: ClientModel,
  [UserRole.STOREKEEPER]: StorekeeperModel,
}

export class AppbarModel {
  requestStatus = undefined
  error = undefined
  userRole = undefined

  balance = 0

  constructor({userRole}) {
    this.userRole = userRole
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async getBalance() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      const result = await userRoleModels[this.userRole].getBalance()
      runInAction(() => {
        this.balance = result
      })
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      this.error = error
      console.log(error)
    }
  }
}
