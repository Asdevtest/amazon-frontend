import { action, computed, observable } from 'mobx'

export const observerConfig = {
  categories: observable,

  images: observable,
  unitImages: observable,

  categoriesLoadingStatus: observable,

  systemYuanToDollarRate: computed,
  volumeWeightCoefficient: computed,

  setImages: action.bound,
  setUnitImages: action.bound,
}
