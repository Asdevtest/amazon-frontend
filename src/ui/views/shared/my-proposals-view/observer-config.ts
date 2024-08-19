import { action, computed, observable } from 'mobx'

export const observerConfig = {
  currentProposal: observable,
  currentRequest: observable,
  selectedSpecType: observable,
  showRequestDetailModal: observable,
  showConfirmModal: observable,
  showRequestDesignerResultModal: observable,
  showRequestDesignerResultClientModal: observable,
  showMainRequestResultModal: observable,
  showRequestResultModal: observable,
  switcherCondition: observable,

  userInfo: computed,

  onClickDeleteBtn: action.bound,
  cancelProposalHandler: action.bound,
  onChangeRadioButtonOption: action.bound,
  onClickEditBtn: action.bound,
  onClickOpenBtn: action.bound,
  getProposalById: action.bound,
  getRequestById: action.bound,
  onClickResultBtn: action.bound,
  onOpenRequestDetailModal: action.bound,
  onClickChangeCatigory: action.bound,
  onClickSendAsResult: action.bound,
  onChangePerformer: action.bound,
}
