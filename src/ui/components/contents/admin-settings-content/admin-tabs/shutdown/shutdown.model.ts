import { makeAutoObservable, runInAction } from 'mobx'

export class ShutdownModel {
  serverEnabled = false

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async onToggleServer(checked: boolean) {
    try {
      runInAction(() => (this.serverEnabled = checked))

      /* const response = await AdministratorModel.toggleServer()

      runInAction(() => (this.serverEnabled = !response.tech_pause)) */
    } catch (error) {
      console.error(error)
    }
  }
}
