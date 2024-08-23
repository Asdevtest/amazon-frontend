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

  constructor({ history }) {
    this.history = history

    if (history?.location?.state) {
      this.shopSellId = history.location.state.shopSellId
    }

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  loadData() {
    try {
      this.getShopInfoById()
    } catch (error) {
      console.error(error)
    }
  }

  async getShopInfoById() {
    try {
      const result = await ShopSellModel.getShopSellById(this.shopSellId)

      runInAction(() => {
        this.shopInfo = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  onClickEditBtn() {
    this.history.push('/client/trading-shops/sell-shops/edit-trading-traiding-shop', { request: this.shopInfo })
  }
}
