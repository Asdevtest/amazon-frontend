import { action, computed, observable } from 'mobx'

export const navbarObserverConfig = {
  patchNote: observable,
  showFeedbackModal: observable,
  showConfirmModal: observable,
  showVersionHistoryModal: observable,
  confirmModalSettings: observable,

  patchNotes: computed,
  userInfo: computed,
  simpleChats: computed,
  unreadMessages: computed,

  sendFeedbackAboutPlatform: action.bound,
  submitResetLocalStorageAndCach: action.bound,
  getPatchNote: action.bound,
  onResetPatchNote: action.bound,
  onClickVersion: action.bound,
  onClickResetVersion: action.bound,
  onTriggerOpenModal: action.bound,
}
