import { computed, observable } from 'mobx'

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
}
