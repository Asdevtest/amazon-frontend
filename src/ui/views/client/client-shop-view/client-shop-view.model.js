import { makeAutoObservable, runInAction } from 'mobx'

import { ShopSellModel } from '@models/shop-sell-model'
import { UserModel } from '@models/user-model'

export class ClientShopViewModel {
  history = undefined
  shopInfo = undefined

  shopSellId = undefined

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({ history, location }) {
    runInAction(() => {
      this.history = history

      if (location.state) {
        this.shopSellId = location.state.shopSellId
      }
    })

    makeAutoObservable(this, undefined, { autoBind: true })
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

  onClickEditBtn() {
    this.history.push('/client/trading-shops/sell-shops/edit-trading-traiding-shop', { request: this.shopInfo })
  }
}
