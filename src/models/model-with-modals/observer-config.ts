import { action, computed, observable } from 'mobx'

export const observerConfig = {
  _confirmModalSettings: observable,
  _warningInfoModalSettings: observable,

  confirmModalSettings: computed,
  warningInfoModalSettings: computed,

  onTriggerOpenModal: action.bound,
}
