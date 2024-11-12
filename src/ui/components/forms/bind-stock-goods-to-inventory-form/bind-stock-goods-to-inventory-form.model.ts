import { makeObservable } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { SellerBoardModel } from '@models/seller-board-model'

import { t } from '@utils/translations'

import { IStockGood } from '@typings/models/seller-boards/stock-good'

import { bindStockGoodsToInventoryFormConfig, searchFields } from './bind-stock-goods-to-inventory-form.config'
import { stockGoodsColumns } from './columns/stock-goods-columns'

export class BindStockGoodsToInventoryFormModel extends DataGridFilterTableModel {
  choosenGoods: IStockGood[]
  initialChoosenGoods: IStockGood[]
  selectedProduct: string = ''
  onCloseModal: () => void

  constructor(goodsToSelect: IStockGood[], onCloseModal: () => void) {
    const columnProps = {
      onSelectProduct: (selectedRow: IStockGood) => this.onSelectProduct(selectedRow),
      selectedProduct: () => this.selectedProduct,
    }
    const columnsModel = stockGoodsColumns(columnProps)

    const defaultFilterParams = () => {
      if (this.currentSearchValue) {
        return
      }
      return {
        asin: {
          $eq: this.choosenGoods?.[0]?.asin,
        },
      }
    }
    super({
      getMainDataMethod: ClientModel.getProductPermissionsData,
      columnsModel,
      filtersFields: searchFields,
      mainMethodURL: '/clients/products/light',
      fieldsForSearch: searchFields,
      defaultFilterParams,
    })

    this.onCloseModal = onCloseModal
    this.initialChoosenGoods = goodsToSelect
    this.choosenGoods = goodsToSelect

    this.getTableSettingsPreset()

    makeObservable(this, bindStockGoodsToInventoryFormConfig)
  }

  get disableResetButton() {
    return !this.selectedProduct && this.choosenGoods.length === this.initialChoosenGoods.length
  }

  get disableBindButton() {
    return !this.selectedProduct || this.choosenGoods.length < 1
  }

  onSelectProduct(selectedRow: IStockGood) {
    this.selectedProduct = selectedRow._id
  }

  onDeleteGoods(id: string) {
    const filteredArray = this.choosenGoods.filter(el => el._id !== id)
    this.choosenGoods = filteredArray
  }
  onResetData() {
    this.choosenGoods = this.initialChoosenGoods
    this.selectedProduct = ''
  }

  async onSubmitBindStockGoods() {
    this.setLoading(true)
    try {
      const warehouseStocks = this.choosenGoods.map((el: IStockGood) => ({ sku: el.sku, shopId: el.shop._id }))

      const data = {
        productId: this.selectedProduct,
        warehouseStocks,
      }
      await SellerBoardModel.bindStockProductsBySku(data)
      this.onCloseModal()

      toast.success(t(TranslationKey['Goods are bound']))
    } catch (error) {
      toast.error(t(TranslationKey["You can't bind"]))
      console.error(error)
    } finally {
      this.setLoading(false)
    }
  }
}
