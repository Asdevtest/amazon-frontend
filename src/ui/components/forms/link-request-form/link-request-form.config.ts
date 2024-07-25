import { action, computed, observable } from 'mobx'

export const linkRequestFormConfig = {
  product: observable,

  selectedRequest: computed,

  onClickCreateRequest: action.bound,
  onBindIdeaToRequest: action.bound,
}
