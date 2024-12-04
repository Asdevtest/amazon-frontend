import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { InfiniteScrollModel } from '@models/infinite-scroll-model'

import { t } from '@utils/translations'

import { ISupplierExchange } from '@typings/models/suppliers/supplier-exchange'

import { wholesaleConfig } from './wholesale.config'

export class WholesaleViewModel extends InfiniteScrollModel<ISupplierExchange> {
  showSelectShopsModal = false
  supplierCardIds: string[] = []

  get items() {
    return this.data
  }
  get showFilter() {
    return this.items?.length > 1 || this.filtersCount > 0
  }

  constructor(isSupplierMode: boolean) {
    const searchField = isSupplierMode ? 'xid' : 'cardName'

    super({
      method: isSupplierMode ? ClientModel.getSuppliersExchange : ClientModel.getSuppliersExchangeCards,
      searchFields: [searchField],
    })

    this.getData()
    makeObservable(this, wholesaleConfig)
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
        supplierCardIds: this.supplierCardIds,
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
