import { action, computed, observable, override } from 'mobx'

export const supervisorSettingsConfig = {
  asins: observable,
  failedData: override,
  asinsToEdit: override,
  showAsinCheckerModal: override,
  showEditAsinCheckerModal: override,
  showFailedAsinsModal: override,
  showConfirmCloseAsinCheckerModal: override,

  userInfo: computed,

  onSubmitAsins: action.bound,
  nEditAsins: action.bound,
  onRemoveAsin: action.bound,
  onRemoveAsins: action.bound,
  onClickRemoveBtn: action.bound,
  onClickRemoveSelectedBtn: action.bound,
  onClickEditBtn: action.bound,
}

export const tabsValues = {
  ONLINE_ARBITRAGE_CHINA: 'ONLINE_ARBITRAGE_CHINA',
  DROPSHIPPING: 'DROPSHIPPING',
  PRIVATE_LABEL: 'PRIVATE_LABEL',
  WHOLE_SALE_USA: 'WHOLE_SALE_USA',
}

export const switcherSettings = [
  { label: () => 'ONLINE ARBITRAGE CHINA', value: tabsValues.ONLINE_ARBITRAGE_CHINA },
  { label: () => 'DROPSHIPPING', value: tabsValues.DROPSHIPPING },
  { label: () => 'PRIVATE LABEL', value: tabsValues.PRIVATE_LABEL },
  { label: () => 'WHOLE SALE USA', value: tabsValues.WHOLE_SALE_USA },
]
