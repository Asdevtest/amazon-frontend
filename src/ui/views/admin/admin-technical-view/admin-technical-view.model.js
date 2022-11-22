import {makeAutoObservable} from 'mobx'

import {AdministratorModel} from '@models/administrator-model'

export class AdminTechnicalViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  drawerOpen = false

  serverWorkOn = false

  constructor({history}) {
    this.history = history

    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onBackBtn() {
    this.history.push('/admin/settings')
  }

  async loadData() {
    try {
      const result = await AdministratorModel.getSettings()

      this.serverWorkOn = !result.dynamicSettings.tech_pause
    } catch (err) {
      console.log(err)
    }
  }

  async onTriggerTechnicalWorks() {
    try {
      const res = await AdministratorModel.toggleServer()

      this.serverWorkOn = !res.tech_pause
    } catch (err) {
      console.log(err)
    }
  }

  onTriggerDrawer = () => {
    this.drawerOpen = !this.drawerOpen
  }
}
