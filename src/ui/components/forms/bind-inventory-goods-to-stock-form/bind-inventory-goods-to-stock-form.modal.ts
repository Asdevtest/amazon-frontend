import { makeAutoObservable, runInAction, toJS } from 'mobx'
import qs from 'qs'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { SellerBoardModel } from '@models/seller-board-model'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

export class BindInventoryGoodsToStockFormModel {
  loading = false
  sellerBoard: any = []
  constructor(asin: string) {
    if (asin) {
      const recFilter = qs.stringify({ asin: { $contains: asin } }, { encode: false }).replace(/&/, ';')
      this.getStockGoodsByFilters(recFilter)
    }
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setLoading(loading: boolean) {
    this.loading = loading
  }

  async getStockGoodsByFilters(filter?: any, isRecCall?: boolean) {
    try {
      const result = await SellerBoardModel.getStockGoodsByFilters(filter)

      runInAction(() => {
        this.sellerBoard = result?.rows
      })
    } catch (error) {
      console.error(error)
      if (isRecCall) {
        this.getStockGoodsByFilters()
      } else {
        this.sellerBoard = []
      }
    }
  }

  async onSubmitBindStockGoods(data: any) {
    try {
      await SellerBoardModel.bindStockProductsBySku(data)
      //   this.onTriggerOpenModal('showBindInventoryGoodsToStockModal')

      toast.success(t(TranslationKey['Goods are bound']))

      //   await this.getCurrentData()
    } catch (error) {
      toast.error(t(TranslationKey["You can't bind"]))

      console.error(error)
    }
  }
}
