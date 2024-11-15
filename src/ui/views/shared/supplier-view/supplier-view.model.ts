import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'

import { t } from '@utils/translations'

import { ISupplierExchange } from '@typings/models/suppliers/supplier-exchange'

import { supplierConfig } from './supplier-view.config'

export class SupplierViewModel {
  showSelectShopsModal = false
  suppplier?: ISupplierExchange

  constructor() {
    makeObservable(this, supplierConfig)
  }

  async onGetSupplier(id: string) {
    try {
      // const response = await ClientModel.getSupplier(id)

      runInAction(() => {
        // this.suppplier = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  onToggleSelectShopsModal() {
    this.showSelectShopsModal = !this.showSelectShopsModal
  }

  async onAddToInventory(shopId: string) {
    try {
      const data = {
        supplierCardId: '',
        shopId,
      }
      await ClientModel.createSupplierProduct(data)
      toast.success(t(TranslationKey['Data saved successfully']))
      this.onToggleSelectShopsModal()
    } catch (error) {
      toast.error(t(TranslationKey['Data not saved']))
    }
  }
}
