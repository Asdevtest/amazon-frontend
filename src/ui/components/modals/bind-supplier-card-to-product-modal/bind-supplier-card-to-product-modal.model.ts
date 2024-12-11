import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { BuyerModel } from '@models/buyer-model'
import { DefaultModel } from '@models/default-model'
import { IdeaModel } from '@models/ideas-model'
import { InfiniteScrollModel } from '@models/infinite-scroll-model'
import { ProductModel } from '@models/product-model'
import { SupplierV2Model } from '@models/supplier-v2-model/supplier-v2-model'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
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

  get productsMap() {
    return this.currentData.reduce((acc, item) => {
      acc[item._id] = item
      return acc
    }, {})
  }

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
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await ProductModel.addSuppliersToProduct(productId, supplierCardIds)

      toast.success(t(TranslationKey['Supplier card successfully added to product']))
    } catch (error) {
      console.error(error)
    } finally {
      this.setRequestStatus(loadingStatus.SUCCESS)
    }
  }

  async onBindSupplierCardToIdea(ideaId: string, supplierCardIds: string[]) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await IdeaModel.addSuppliersToIdea(ideaId, { supplierCardIds })

      toast.success(t(TranslationKey['Supplier card successfully added to idea']))
    } catch (error) {
      console.error(error)
    } finally {
      this.setRequestStatus(loadingStatus.SUCCESS)
    }
  }
}
