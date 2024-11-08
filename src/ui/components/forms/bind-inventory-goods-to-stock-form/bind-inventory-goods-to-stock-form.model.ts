import type { Key } from 'antd/es/table/interface'
import { makeObservable } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { SellerBoardModel } from '@models/seller-board-model'

import { t } from '@utils/translations'

import { bindInventoryGoodsToStockFormConfig, searchFields } from './bind-inventory-goods-to-stock.config'

export class BindInventoryGoodsToStockFormModel extends DataGridFilterTableModel {
  initialAsin: string
  productId: string
  targetKeys: Key[] = []
  onCloseModal: () => void

  constructor(props: { asin: string; productId: string; onCloseModal: () => void }) {
    const defaultFilterParams = () => {
      if (this.currentSearchValue) {
        return
      }
      return {
        asin: {
          $eq: this.initialAsin,
        },
      }
    }

    const defaultGetCurrentDataOptions = () => ({
      limit: 100,
    })

    super({
      getMainDataMethod: SellerBoardModel.getStockGoodsByFilters,
      columnsModel: [],
      filtersFields: [],
      mainMethodURL: '',
      fieldsForSearch: searchFields,
      defaultFilterParams,
      defaultGetCurrentDataOptions,
    })

    this.initialAsin = props.asin
    this.productId = props.productId
    this.onCloseModal = props.onCloseModal

    this.getCurrentData()
    makeObservable(this, bindInventoryGoodsToStockFormConfig)
  }

  get dataWithKeys() {
    return this.currentData.map((item: any) => ({ ...item, key: item._id }))
  }

  onChange = (nextTargetKeys: Key[]) => {
    this.targetKeys = nextTargetKeys
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
