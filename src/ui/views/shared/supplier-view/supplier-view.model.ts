import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { InfiniteScrollModel } from '@models/infinite-scroll-model'
import { SupplierV2Model } from '@models/supplier-v2-model/supplier-v2-model'

import { t } from '@utils/translations'

import { ISupplierCard, ISupplierExchange } from '@typings/models/suppliers/supplier-exchange'
import { HistoryType } from '@typings/types/history'

import { filterFields, supplierConfig } from './supplier-view.config'

export class SupplierViewModel extends InfiniteScrollModel<ISupplierCard> {
  showSelectShopsModal = false
  supplierCardIds: string[] = []

  get supplier(): ISupplierExchange {
    return this.meta?.supplier
  }
  get products() {
    return this.data
  }
  get showFilter() {
    return this.products?.length > 1 || this.filtersCount > 0
  }
  get productsAll() {
    return this.products?.length > 12
  }
  get productsBig() {
    return this.products?.length <= 12
  }

  constructor(history: HistoryType) {
    const options = {
      guid: history.location.search.slice(1),
    }

    super({
      method: SupplierV2Model.getSupplierCards,
      options,
      filterFields,
    })

    this.getData()
    makeObservable(this, supplierConfig)
  }

  onToggleSelectShopsModal() {
    this.showSelectShopsModal = !this.showSelectShopsModal
  }

  onChangeSupplierCard(cardId?: string) {
    if (cardId) {
      const foundCardById = this.supplierCardIds.find(id => id === cardId)

      if (foundCardById) {
        this.supplierCardIds = this.supplierCardIds.filter(id => id !== cardId)
      } else {
        this.supplierCardIds.push(cardId)
      }
    }
  }

  onSelectSupplierCard(cardId: string) {
    this.supplierCardIds = [cardId]
    this.onToggleSelectShopsModal()
  }

  async onAddToInventory(shopId: string) {
    try {
      const data = {
        supplierCardId: this.supplierCardIds,
        shopId,
      }
      await ClientModel.createSupplierProduct(data)
      toast.success(t(TranslationKey['Data saved successfully']))
      this.onToggleSelectShopsModal()
    } catch (error) {
      toast.error(t(TranslationKey['Data not saved']))
    } finally {
      runInAction(() => {
        this.supplierCardIds = []
      })
    }
  }
}
