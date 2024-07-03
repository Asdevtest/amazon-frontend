import { action, computed, observable } from 'mobx'

export const observerConfig = {
  tariffIdToChange: observable,
  curBox: observable,
  showBoxViewModal: observable,
  showSelectionStorekeeperAndTariffModal: observable,
  showEditHSCodeModal: observable,
  showConfirmModal: observable,
  hsCodeData: observable,
  storekeepersData: observable,
  uploadedFiles: observable,

  userInfo: computed,
  platformSettings: computed,

  onSubmitChangeBoxFields: action.bound,
  onClickSaveHsCode: action.bound,
  onClickHsCode: action.bound,
  getStorekeepers: action.bound,
  onTriggerOpenConfirmModal: action.bound,
  onSubmitSelectTariff: action.bound,
  onClickConfirmTarrifChangeBtn: action.bound,
  onTriggerOpenRejectModal: action.bound,
  setCurrentOpenedBox: action.bound,
  onClickRejectOrderPriceChangeBtn: action.bound,
}
