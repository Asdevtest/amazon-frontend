import {makeAutoObservable} from 'mobx'

export class ClientSellShopsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  // async onClickViewMore() {
  //   try {
  //     this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/trading-shops/sell-shops/shop`)
  //   } catch (error) {
  //     this.onTriggerOpenModal('showWarningModal')
  //     console.log(error)
  //   }
  // }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
