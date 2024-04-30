import { action, computed, observable } from 'mobx'

export const generalNotificationsConfig = {
  notifications: computed,
  userInfo: computed,

  archive: observable,
  curNotificationType: observable,
  currentProduct: observable,
  currentIdeaId: observable,
  showIdeaModal: observable,

  onClickReadButton: action.bound,
  toggleVariationHandler: action.bound,
  navigateToHandler: action.bound,
  onClickToChangeNotificationType: action.bound,
}
