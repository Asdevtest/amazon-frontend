import { makeObservable } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { SellerBoardModel } from '@models/seller-board-model'

import { t } from '@utils/translations'

import { stockGoodsColumns } from './bind-stock-goods-to-inventory-columns'
import { bindStockGoodsToInventoryFormConfig, searchFields } from './bind-stock-goods-to-inventory-form.config'

export class BindStockGoodsToInventoryFormModel extends DataGridFilterTableModel {
  choosenGoods: any
  initialChoosenGoods: any
  selectedProduct: string = ''
  onCloseModal: () => void

  constructor(goodsToSelect: any, onCloseModal: () => void) {
    const columnProps = {
      onSelectProduct: (selectedRow: any) => this.onSelectProduct(selectedRow),
      selectedProduct: () => this.selectedProduct,
    }
    const chosenGoodscolumnsModel = stockGoodsColumns(columnProps)

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
      columnsModel: chosenGoodscolumnsModel,
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

  onSelectProduct(selectedRow: any) {
    this.selectedProduct = selectedRow._id
  }

  onDeleteGoods(id: string) {
    const filteredArray = this.choosenGoods.filter((el: any) => el._id !== id)
    this.choosenGoods = filteredArray
  }
  onResetData() {
    this.choosenGoods = this.initialChoosenGoods
    this.selectedProduct = ''
  }

  async onSubmitBindStockGoods() {
    this.setLoading(true)
    try {
      const warehouseStocks = this.choosenGoods.map((el: any) => ({ sku: el.sku, shopId: el.shop._id }))

      const data = {
        productId: this.selectedProduct,
        warehouseStocks,
      }
      await SellerBoardModel.bindStockProductsBySku(data)
      this.setLoading(false)
      this.onCloseModal()

      toast.success(t(TranslationKey['Goods are bound']))
    } catch (error) {
      toast.error(t(TranslationKey["You can't bind"]))
      this.setLoading(false)
      console.error(error)
    }
  }
}
