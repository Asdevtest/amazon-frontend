import { action, computed, observable } from 'mobx'

export const vacantRequestsConfig = {
  specOption: observable,
  showRequestDetailModal: observable,
  currentRequestDetails: observable,
  searchMyRequestsIds: observable,
  viewMode: observable,
  sortMode: observable,

  userInfo: computed,

  onChangeSpec: action.bound,
  onClickViewMore: action.bound,
  getRequestDetail: action.bound,
  onOpenRequestDetailModal: action.bound,
  onClickSuggest: action.bound,
  onClickOpenInNewTab: action.bound,
}

export const fieldsForSearch = ['asin', 'amazonTitle', 'skuByClient']
