import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { InfiniteScrollModel } from '@models/infinite-scroll-model'
import { SupplierV2Model } from '@models/supplier-v2-model/supplier-v2-model'

import { t } from '@utils/translations'

import { ISupplierCard, ISupplierExchange } from '@typings/models/suppliers/supplier-exchange'
import { HistoryType } from '@typings/types/history'

import { supplierConfig } from './supplier-view.config'

export class SupplierViewModel extends InfiniteScrollModel<ISupplierCard> {
  showSelectShopsModal = false
  supplierCardId?: string

  get supplier(): ISupplierExchange {
    return this.meta?.supplier
  }
  get products() {
    return this.data
  }
  get showFilter() {
    return this.products?.length > 1 || this.filtersCount > 0
  }

  constructor(history: HistoryType) {
    const options = {
      guid: history.location.search.slice(1),
    }

    super({
      method: SupplierV2Model.getSupplierCards,
      options,
      searchFields: ['cardName'],
      filterFields: ['priceMin', 'priceMax', 'categories', 'moqMin', 'moqMax'],
    })

    this.getData()
    makeObservable(this, supplierConfig)
  }

  onToggleSelectShopsModal() {
    this.showSelectShopsModal = !this.showSelectShopsModal
  }

  onSelectSupplierCard(cardId?: string) {
    this.supplierCardId = cardId
    this.onToggleSelectShopsModal()
  }

  async onAddToInventory(shopId: string) {
    try {
      const data = {
        supplierCardId: this.supplierCardId,
        shopId,
      }
      await ClientModel.createSupplierProduct(data)
      toast.success(t(TranslationKey['Data saved successfully']))
      this.onToggleSelectShopsModal()
    } catch (error) {
      toast.error(t(TranslationKey['Data not saved']))
    } finally {
      runInAction(() => {
        this.supplierCardId = undefined
      })
    }
  }
}
