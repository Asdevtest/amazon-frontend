import { makeAutoObservable, runInAction } from 'mobx'

import { AdministratorModel } from '@models/administrator-model'
import { UserModel } from '@models/user-model'

export class AdminSettingsFreelanceModel {
  specs = []

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  loadData() {
    try {
      this.getSpecs()
    } catch (error) {
      console.log(error)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async getSpecs() {
    try {
      const response = await UserModel.getSpecs(false)

      runInAction(() => {
        this.specs = response
      })
    } catch (error) {
      console.log(error)
    }
  }

  async createSpec(specTitle) {
    try {
      await AdministratorModel.createSpec(specTitle)

      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  async editSpec(id, spec) {
    try {
      await AdministratorModel.editSpec(id, spec)

      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  async removeSpec(id) {
    try {
      await AdministratorModel.removeSpec(id)

      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }
}
