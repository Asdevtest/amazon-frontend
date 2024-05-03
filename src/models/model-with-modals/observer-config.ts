import { action, observable } from 'mobx'

export const observerConfig = {
  confirmModalSettings: observable,
  warningInfoModalSettings: observable,

  onTriggerOpenModal: action.bound,
}
