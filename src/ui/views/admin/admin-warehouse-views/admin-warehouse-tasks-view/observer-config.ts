import { action, computed, observable } from 'mobx'

export const observerConfig = {
  currentTask: observable,
  showTaskInfoModal: observable,

  platformSettings: computed,

  setCurrentOpenedTask: action.bound,
}
