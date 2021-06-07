import {makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {SupervisorModel} from '@models/supervisor-model'

export class SupervisorReadyToCheckViewModel {
  history = undefined
  requestStatus = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async getProducsVacant() {
    try {
      console.log(loadingStatuses)
      this.requestStatus = loadingStatuses.isLoading
      this.error = undefined
      const result = await SupervisorModel.getProducsVacant()
      console.log(result)
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      console.log(loadingStatuses)
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }
}
