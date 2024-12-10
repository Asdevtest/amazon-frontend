import { action, computed, observable } from 'mobx'

export const observerConfig = {
  curRequest: observable,
  curProposal: observable,
  specOption: observable,
  showRequestDesignerResultClientModal: observable,
  showMainRequestResultModal: observable,
  showRequestResultModal: observable,
  specs: observable,

  userInfo: computed,

  onChangeSpec: action.bound,
  onClickOpenRequest: action.bound,
  onClickOpenResult: action.bound,
  getSpecs: action.bound,
}
