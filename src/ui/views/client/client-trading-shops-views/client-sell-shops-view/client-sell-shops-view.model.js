import {makeAutoObservable, runInAction} from 'mobx'

export class ClientSellShopsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false

  constructor({history}) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  // async onClickViewMore() {
  //   try {
  //     this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/trading-shops/sell-shops/traiding-shop`)
  //   } catch (error) {
  //     this.onTriggerOpenModal('showWarningModal')
  //     console.log(error)
  //   }
  // }

  onTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
