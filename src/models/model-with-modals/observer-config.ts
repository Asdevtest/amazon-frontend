import { action, observable } from 'mobx'

export const observerConfig = {
  confirmModalSettings: observable,

  onTriggerOpenModal: action.bound,
}
