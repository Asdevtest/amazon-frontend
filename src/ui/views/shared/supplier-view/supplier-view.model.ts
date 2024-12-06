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
    if (!this.supplierCardIds.length) {
      toast.warn('Вы не выбрали элементы')
      return
    }

    this.showSelectShopsModal = !this.showSelectShopsModal
  }

  onChangeSupplierCards(checkedValues: string[]) {
    this.supplierCardIds = checkedValues
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
      toast.success(t(TranslationKey['Selected items have been successfully added to the inventory']))
      this.onToggleSelectShopsModal()
    } catch (error) {
      toast.error(t(TranslationKey['Selected items have not been added to the inventory']))
    } finally {
      runInAction(() => {
        this.supplierCardIds = []
      })
    }
  }
}
