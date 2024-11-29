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
  supplierCardId?: string

  get items() {
    return this.data
  }
  get showFilter() {
    return this.items?.length > 1 || this.filtersCount > 0
  }

  constructor(isSupplierMode: boolean) {
    super({
      method: isSupplierMode ? ClientModel.getSuppliersExchange : ClientModel.getSuppliersExchangeCards,
      searchFields: ['xid'],
    })

    this.getData()
    makeObservable(this, wholesaleConfig)
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
