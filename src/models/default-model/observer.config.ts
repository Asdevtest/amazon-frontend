import { action, computed, observable } from 'mobx'

export const observerConfig = {
  history: observable,
  requestStatus: observable,
  currentData: observable,
  rowCount: observable,
  meta: observable,

  platformSettings: computed,

  getCurrentData: action.bound,
  setRequestStatus: action.bound,
  initHistory: action.bound,
}
