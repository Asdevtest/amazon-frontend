import { makeObservable, runInAction } from 'mobx'

import { BuyerModel } from '@models/buyer-model'
import { DefaultModel } from '@models/default-model'
import { InfiniteScrollModel } from '@models/infinite-scroll-model'
import { ProductModel } from '@models/product-model'
import { SupplierV2Model } from '@models/supplier-v2-model/supplier-v2-model'

import { ISupplierCardFull } from '@typings/models/suppliers/supplier-card'
import { ISupplierV2Light } from '@typings/models/suppliers/supplier-v2'

import { ModelParams } from './bind-supplier-card-to-product-modal.types'
import { observerConfig } from './observer.config'

export class BindSupplierCardModal extends DefaultModel {
  supplierModel: InfiniteScrollModel<ISupplierV2Light>
  supplierCardModal: InfiniteScrollModel<ISupplierCardFull>

  selectedProductId?: string
  selectedSupplierId?: string
  selectedSupplierCardId?: string

  constructor({ product, supplierId, supplierCardId }: ModelParams) {
    super({
      getMainDataMethod: BuyerModel.getProductsMyLight,
    })

    makeObservable(this, observerConfig)

    this.supplierModel = new InfiniteScrollModel({
      method: SupplierV2Model.getSuppliersLight,
      searchFields: ['companyName'],
      filterFields: ['supplier'],
    })

    this.supplierCardModal = new InfiniteScrollModel({
      method: SupplierV2Model.getSupplierCards,
      searchFields: ['cardName'],
      filterFields: ['supplierCard'],
    })

    if (supplierId) {
      this.supplierModel.filtersOtions = {
        supplier: {
          $eq: supplierId,
        },
      }

      this.supplierCardModal.setOptions({
        guid: supplierId,
      })

      runInAction(() => {
        this.selectedSupplierId = supplierId
      })
    }

    if (supplierCardId) {
      this.supplierCardModal.filtersOtions = {
        supplierCard: {
          $eq: supplierCardId,
        },
      }

      this.supplierCardModal.getData()

      runInAction(() => {
        this.selectedSupplierCardId = supplierCardId
      })
    }

    this.supplierModel.getData()

    if (!product) {
      this.getCurrentData()
    }
  }

  onChangeSelectedSupplier(supplierId: string) {
    runInAction(() => {
      this.selectedSupplierId = supplierId
    })

    this.supplierCardModal.setOptions({
      offset: 0,
      guid: supplierId,
    })

    this.supplierCardModal.getData()
  }

  onChangeSelectedSupplierCard(supplierCardId: string) {
    runInAction(() => {
      this.selectedSupplierCardId = supplierCardId
    })
  }

  onChangeSelectedProduct(productId: string) {
    runInAction(() => {
      this.selectedProductId = productId
    })
  }

  async onBindSupplierCardToProduct(productId: string, supplierCardIds: string[]) {
    try {
      this.setLoading(true)

      ProductModel.addSuppliersToProduct(productId, supplierCardIds)
    } catch (error) {
      console.error(error)
    } finally {
      this.setLoading(false)
    }
  }
}