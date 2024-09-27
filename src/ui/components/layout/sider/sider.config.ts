import { action, computed, observable } from 'mobx'

export const navbarObserverConfig = {
  patchNote: observable,
  showFeedbackModal: observable,
  showVersionHistoryModal: observable,

  patchNotes: computed,
  userInfo: computed,
  simpleChats: computed,
  unreadMessages: computed,

  sendFeedbackAboutPlatform: action.bound,
  onClickResetVersion: action.bound,
  getPatchNote: action.bound,
  onResetPatchNote: action.bound,
  onClickVersion: action.bound,
  onTriggerOpenModal: action.bound,
}
