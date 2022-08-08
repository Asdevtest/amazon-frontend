import {makeAutoObservable, runInAction} from 'mobx'

import {ShopSellModel} from '@models/shop-sell-model'

export class ClientShopViewModel {
  history = undefined
  shopInfo = undefined
  drawerOpen = false

  shopSellId = undefined

  constructor({history, location}) {
    this.history = history

    if (location.state) {
      this.shopSellId = location.state.shopSellId
    }

    makeAutoObservable(this, undefined, {autoBind: true})
  }
  async loadData() {
    try {
      await this.getShopInfoById()
    } catch (error) {
      console.log(error)
    }
  }

  async getShopInfoById() {
    try {
      const result = await ShopSellModel.getShopSellById(this.shopSellId)

      runInAction(() => {
        this.shopInfo = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
}
