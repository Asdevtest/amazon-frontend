import type { Key } from 'antd/es/table/interface'
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
  searchInputValue: string = ''
  targetKeys: Key[] = []
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

  get dataWithKeys() {
    return this.sellerBoard.map((item: any) => ({ ...item, key: item._id }))
  }

  get filteredData() {
    if (!this.searchInputValue) return this.dataWithKeys
    return this.dataWithKeys.filter((item: any) =>
      item.title.toLowerCase().includes(this.searchInputValue.toLowerCase()),
    )
  }

  onChange = (nextTargetKeys: Key[]) => {
    this.targetKeys = nextTargetKeys
  }

  async getStockGoodsByFilters(filter?: any) {
    try {
      const result = await SellerBoardModel.getStockGoodsByFilters(filter)

      runInAction(() => {
        this.sellerBoard = result?.rows
      })
    } catch (error) {
      console.error(error)
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
