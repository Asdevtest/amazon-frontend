import { makeAutoObservable, runInAction } from 'mobx'
import qs from 'qs'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { SellerBoardModel } from '@models/seller-board-model'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

export class BindStockGoodsToInventoryFormModel {
  loading = false
  inventoryProducts: any = []
  searchInputValue: string = ''
  initialAsin: string
  // productId: string
  choosenGoods: any
  selectedProduct: any = []

  constructor(asin: string, goodsToSelect: any) {
    this.initialAsin = asin
    this.choosenGoods = goodsToSelect

    // this.productId = productId

    if (asin) {
      const recFilter = this.constructFilter('')
      this.getProductsMy(recFilter)
    }
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setLoading(loading: boolean) {
    this.loading = loading
  }

  constructFilter(searchTerm: string) {
    if (searchTerm) {
      return qs
        .stringify(
          {
            or: [{ asin: { $contains: searchTerm } }, { amazonTitle: { $contains: searchTerm } }],
          },
          { encode: false },
        )
        .replace(/&/g, ';')
    } else return qs.stringify({ asin: { $contains: this.initialAsin } }, { encode: false }).replace(/&/g, ';')
  }

  setSearchInputValue(value: string) {
    this.searchInputValue = value
    const filter = this.constructFilter(value)
    this.getProductsMy(filter)
  }

  onSelectProduct(selection: any[]) {
    if (selection.length > 1) {
      this.selectedProduct = selection[selection.length - 1]
    } else if (selection.length === 1) {
      this.selectedProduct = selection[0]
    } else {
      this.selectedProduct = []
    }
  }

  async getProductsMy(filters?: any) {
    try {
      const result = await ClientModel.getProductPermissionsData({ filters })

      runInAction(() => {
        this.inventoryProducts = result.rows
      })

      if (!this.inventoryProducts.length) {
        this.getProductsMy()
      }
    } catch (error) {
      console.error(error)
    }
  }
}
