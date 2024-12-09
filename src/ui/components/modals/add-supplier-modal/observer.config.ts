import { action, computed, observable } from 'mobx'

export const observerConfig = {
  countries: observable,
  paymentMethods: observable,
  images: observable,

  showImportTemplateModal: observable,
  showAddSupplierProductModal: observable,

  countriesRequestStatus: observable,
  paymentMethodsRequestStatus: observable,
  productsRequestStatus: observable,
  productsInfinityModel: observable,

  productIsloading: computed,
  requestIsloading: computed,

  getSuppliersPaymentMethods: action.bound,
  getCountries: action.bound,
  createSupplier: action.bound,
  setImages: action.bound,

  onOpenImportTemplateModal: action.bound,
  onCloseImportTemplateModal: action.bound,
  onImportProducts: action.bound,
  onOpenAddSupplierProductModal: action.bound,
  onCloseAddSupplierProductModal: action.bound,
  transformSupplierToCreateEditSupplier: action.bound,
}
