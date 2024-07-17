import { action, observable } from 'mobx'

export const observerConfig = {
  showBoxViewModal: observable,
  curBox: observable,

  setCurrentOpenedBox: action.bound,
}
