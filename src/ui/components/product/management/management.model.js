import { makeAutoObservable, runInAction } from 'mobx'

import { AdministratorModel } from '@models/administrator-model'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { UserRolesForAdminProductBindingChange } from '@constants/keys/user-roles'

export class AdminManagementModel {
  history = undefined

  requestStatus = ''

  members = {
    buyers: [],
    clients: [],
    researchers: [],
    supervisors: [],
  }

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getMembers()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async getMembers() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const promises = UserRolesForAdminProductBindingChange.map(roleCode =>
        AdministratorModel.getUsersByRole(roleCode),
      )

      const result = await Promise.allSettled(promises)

      runInAction(() => {
        this.updateMembersWithResult(this.members, result)
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  updateMembersWithResult(members, result) {
    let index = 0

    for (const key in members) {
      if (members.hasOwnProperty.call(members, key)) {
        members[key] = result[index]?.status === loadingStatuses.fulfilled ? result[index]?.value : []
        index++
      }
    }
  }
}
