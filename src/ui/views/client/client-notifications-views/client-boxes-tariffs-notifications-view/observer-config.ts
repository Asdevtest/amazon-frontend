import { action, computed, observable } from 'mobx'

export const observerConfig = {
  tariffIdToChange: observable,
  curBox: observable,
  curBoxId: observable,
  showBoxViewModal: observable,
  showSelectionStorekeeperAndTariffModal: observable,
  showConfirmModal: observable,
  storekeepersData: observable,
  uploadedFiles: observable,

  userInfo: computed,
  platformSettings: computed,

  getStorekeepers: action.bound,
  onTriggerOpenConfirmModal: action.bound,
  onSubmitSelectTariff: action.bound,
  onClickConfirmTarrifChangeBtn: action.bound,
  onTriggerOpenRejectModal: action.bound,
  setCurrentOpenedBox: action.bound,
  onClickRejectOrderPriceChangeBtn: action.bound,
}
