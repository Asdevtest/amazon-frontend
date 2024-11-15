import { action, computed, observable } from 'mobx'

export const observerConfig = {
  categories: observable,
  images: observable,

  categoriesLoadingStatus: observable,

  systemYuanToDollarRate: computed,

  setImages: action.bound,
}
