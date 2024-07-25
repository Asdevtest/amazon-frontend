import { action, observable } from 'mobx'

export const observerConfig = {
  currentTask: observable,
  showTaskInfoModal: observable,

  setCurrentOpenedTask: action.bound,
}
