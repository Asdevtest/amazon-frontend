import { action, observable } from 'mobx'

export const supervisorSettingsConfig = {
  condition: observable,
  failedData: observable,
  asinsToEdit: observable,
  showAsinCheckerModal: observable,
  showEditAsinCheckerModal: observable,
  showFailedAsinsModal: observable,

  onSubmitAsins: action.bound,
  onSubmitEditAsin: action.bound,
  onEditAsin: action.bound,
  onRemoveAsin: action.bound,
  onRemoveAsins: action.bound,
  onChangeСondition: action.bound,
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

export const fieldsForSearch = ['asin', 'reason']
