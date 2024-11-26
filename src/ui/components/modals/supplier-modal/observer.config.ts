import { action, observable } from 'mobx'

export const observerConfig = {
  supplierCardsModel: observable,
  feedbacks: observable,

  showImportTemplateModal: observable,

  getSupplierFeedbacks: action.bound,
  onOpenImportTemplateModal: action.bound,
  onCloseImportTemplateModal: action.bound,
}
