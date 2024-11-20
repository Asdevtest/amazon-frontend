import { action, computed, observable } from 'mobx'

export const observerConfig = {
  countries: observable,
  paymentMethods: observable,
  images: observable,
  products: observable,

  showImportTemplateModal: observable,

  countriesRequestStatus: observable,
  paymentMethodsRequestStatus: observable,
  productsRequestStatus: observable,
  importProductsRequestStatus: observable,

  productIsloading: computed,
  importProductsIsloading: computed,

  getSuppliersPaymentMethods: action.bound,
  getCountries: action.bound,
  createSupplier: action.bound,
  setImages: action.bound,
  getProductsCards: action.bound,

  onOpenImportTemplateModal: action.bound,
  onCloseImportTemplateModal: action.bound,
  onImportProducts: action.bound,
}
