import { action, computed, observable } from 'mobx'

export const observerConfig = {
  categories: observable,

  images: observable,
  unitImages: observable,

  categoriesLoadingStatus: observable,
  suppliersInfinityModel: observable,

  systemYuanToDollarRate: computed,
  volumeWeightCoefficient: computed,

  setImages: action.bound,
  setUnitImages: action.bound,

  transformValueToCreateSupplier: action.bound,
  createSupplierCard: action.bound,
  uploadFiles: action.bound,
}
