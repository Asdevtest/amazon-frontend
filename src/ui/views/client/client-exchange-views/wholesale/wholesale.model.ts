import { RadioChangeEvent } from 'antd'
import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { InfiniteScrollModel } from '@models/infinite-scroll-model'

import { t } from '@utils/translations'

import { ISupplierExchange } from '@typings/models/suppliers/supplier-exchange'

import { WholesaleTabs, wholesaleConfig } from './wholesale.config'

export class WholesaleViewModel extends InfiniteScrollModel<ISupplierExchange> {
  wholesaleTab: WholesaleTabs = WholesaleTabs.Suppliers
  showSelectShopsModal = false
  supplierCardId?: string

  get suppliers() {
    return this.data
  }
  get products() {
    return this.suppliers.flatMap((supplier: ISupplierExchange) => supplier.supplierCards)
  }
  get supplierMode() {
    return this.wholesaleTab === WholesaleTabs.Suppliers
  }
  get isEmpty() {
    return (this.supplierMode && this.suppliers.length === 0) || (!this.supplierMode && this.products.length === 0)
  }

  constructor() {
    super({ method: ClientModel.getSuppliersExchange, searchFields: ['xid'] })

    this.getData()
    makeObservable(this, wholesaleConfig)
  }

  onChangeWholesaleTab(event: RadioChangeEvent) {
    this.wholesaleTab = event.target.value
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
