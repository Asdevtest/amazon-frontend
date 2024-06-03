import { action, computed, observable } from 'mobx'

export const linkRequestFormConfig = {
  product: observable,

  userInfo: computed,
  selectedRequest: computed,

  onClickCreateRequest: action.bound,
  onBindIdeaToRequest: action.bound,
}
