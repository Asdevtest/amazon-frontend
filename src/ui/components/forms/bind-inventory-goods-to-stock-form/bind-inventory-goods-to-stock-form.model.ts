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
  initialAsin: string
  productId: string
  targetKeys: Key[] = []
  constructor(asin: string, productId: string) {
    this.initialAsin = asin
    this.productId = productId
    if (asin) {
      const recFilter = this.constructFilter('')
      this.getStockGoodsByFilters(recFilter)
    }
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  get dataWithKeys() {
    return this.sellerBoard.map((item: any) => ({ ...item, key: item._id }))
  }

  setLoading(loading: boolean) {
    this.loading = loading
  }

  onChange = (nextTargetKeys: Key[]) => {
    this.targetKeys = nextTargetKeys
  }

  constructFilter(searchTerm: string) {
    if (searchTerm) {
      return qs
        .stringify(
          {
            or: [
              { asin: { $contains: searchTerm } },
              { title: { $contains: searchTerm } },
              { sku: { $contains: searchTerm } },
            ],
          },
          { encode: false },
        )
        .replace(/&/g, ';')
    } else return qs.stringify({ asin: { $contains: this.initialAsin } }, { encode: false }).replace(/&/g, ';')
  }

  setSearchInputValue(value: string) {
    this.searchInputValue = value
    const filter = this.constructFilter(value)
    this.getStockGoodsByFilters(filter)
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

  async onSubmitBindStockGoods() {
    try {
      const selectedItems = this.dataWithKeys.filter((item: any) => this.targetKeys.includes(item.key))

      // Map over selected items to get sku and shopId
      const warehouseStocks = selectedItems.map((el: any) => ({
        sku: el.sku,
        shopId: el.shop?._id, // Ensure el.shop exists
      }))

      const data = {
        productId: this.productId,
        warehouseStocks,
      }
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
