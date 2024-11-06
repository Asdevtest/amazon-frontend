import type { Key } from 'antd/es/table/interface'
import { makeAutoObservable, runInAction, toJS } from 'mobx'
import qs from 'qs'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { SellerBoardModel } from '@models/seller-board-model'

import { t } from '@utils/translations'

export class BindInventoryGoodsToStockFormModel {
  sellerBoard: any = []
  searchInputValue: string = ''
  initialAsin: string
  productId: string
  targetKeys: Key[] = []
  onCloseModal: () => void

  constructor(asin: string, productId: string, onCloseModal: () => void) {
    this.initialAsin = asin
    this.productId = productId
    this.onCloseModal = onCloseModal
    if (asin) {
      const recFilter = this.constructFilter('')
      this.getStockGoodsByFilters(recFilter)
    }
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  get dataWithKeys() {
    return this.sellerBoard.map((item: any) => ({ ...item, key: item._id }))
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

  onChange = (nextTargetKeys: Key[]) => {
    this.targetKeys = nextTargetKeys
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

      const warehouseStocks = selectedItems.map((el: any) => ({
        sku: el.sku,
        shopId: el.shop?._id,
      }))

      const data = {
        productId: this.productId,
        warehouseStocks,
      }
      await SellerBoardModel.bindStockProductsBySku(data)
      this.onCloseModal()

      toast.success(t(TranslationKey['Goods are bound']))
    } catch (error) {
      toast.error(t(TranslationKey["You can't bind"]))

      console.error(error)
    }
  }
}
