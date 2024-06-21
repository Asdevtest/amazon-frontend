import { action, computed, observable } from 'mobx'

export const observerConfig = {
  curNotificationType: observable,
  isArchive: observable,
  showIdeaModal: observable,
  currentProduct: observable,
  currentIdeaId: observable,
  sortFields: observable,

  userInfo: computed,
  currentConvertedData: computed,

  onClickReadButton: action.bound,
  toggleVariationHandler: action.bound,
  navigateToHandler: action.bound,
  onClickToChangeNotificationType: action.bound,
}
