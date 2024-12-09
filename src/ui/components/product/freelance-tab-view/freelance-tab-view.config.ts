import { action, computed, observable } from 'mobx'

export const freelanceTabConfig = {
  nameSearchValue: observable,
  curRequest: observable,
  curProposal: observable,
  specOption: observable,
  showRequestDesignerResultClientModal: observable,
  showMainRequestResultModal: observable,
  showRequestResultModal: observable,
  searchRequests: observable,
  specs: observable,

  userInfo: computed,

  loadData: action.bound,
  onChangeSpec: action.bound,
  onClickOpenRequest: action.bound,
  onClickOpenResult: action.bound,
  getSpecs: action.bound,
}
