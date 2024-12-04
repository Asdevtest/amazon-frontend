import { makeObservable, runInAction } from 'mobx'

import { DefaultModel } from '@models/default-model'
import { FeedbackModel } from '@models/feedback-model'
import { SupplierModel } from '@models/supplier-model'
import { SupplierV2Model } from '@models/supplier-v2-model/supplier-v2-model'

import { SuppliersViewModel } from '@views/buyer/suppliers-view/suppliers-view.model'
import { TableView } from '@views/buyer/suppliers-view/suppliers-view.type'

import { ISupplierFeedback } from '@typings/models/suppliers/supplier-feedback'

import { observerConfig } from './observer.config'

export class SupplierModalModel extends DefaultModel {
  supplierCardsModel: SuppliersViewModel

  feedbacks: ISupplierFeedback[] = []

  showImportTemplateModal: boolean = false

  constructor(supplierId: string) {
    const defaultGetCurrentDataOptions = () => supplierId

    super({
      getMainDataMethod: SupplierModel?.getSupplier,
      defaultGetCurrentDataOptions,
    })

    this.supplierCardsModel = new SuppliersViewModel(TableView.CARDS)
    this.supplierCardsModel.getMainDataMethod = SupplierV2Model.getSupplierCards
    this.supplierCardsModel.defaultGetCurrentDataOptions = () => ({
      guid: supplierId,
    })
    this.supplierCardsModel.sortModel = [{ field: 'updatedAt', sort: 'desc' }]
    this.supplierCardsModel.handleHideColumns(['supplier'])
    this.supplierCardsModel.columnsModel = this.supplierCardsModel.columnsModel?.map(column => {
      if (column?.field === 'supplier') {
        column.disableCustomSort = true
      }

      return column
    })

    makeObservable(this, observerConfig)

    this.getCurrentData()
    this.supplierCardsModel.getCurrentData()
    this.getSupplierFeedbacks(supplierId)
  }

  async getSupplierFeedbacks(supplierId: string) {
    try {
      const result = await FeedbackModel.getSupplierFeedbacks(supplierId)

      runInAction(() => {
        this.feedbacks = result?.rows as unknown as ISupplierFeedback[]
      })
    } catch (error) {
      console.error(error)
    }
  }

  onOpenImportTemplateModal() {
    this.onTriggerOpenModal('showImportTemplateModal', true)
  }
  onCloseImportTemplateModal() {
    this.onTriggerOpenModal('showImportTemplateModal', false)
  }
}
