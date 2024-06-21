import { makeAutoObservable, runInAction } from 'mobx'

export class ModeratorMyProductsViewModel {
  history = undefined
  requestStatus = undefined

  productsMy = []

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }
}
