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
    if (!this.supplierCardIds.length) {
      toast.warn(t(TranslationKey['Please select at least one supplier card']))
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

  async onAddToInventory(shopId: string | null) {
    try {
      const data = {
        supplierCardIds: this.supplierCardIds,
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
