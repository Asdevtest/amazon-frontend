import { action, observable } from 'mobx'

export const observerConfig = {
  history: observable,
  requestStatus: observable,
  currentData: observable,
  rowCount: observable,
  meta: observable,
  loading: observable,

  getCurrentData: action.bound,
  setRequestStatus: action.bound,
  initHistory: action.bound,
  setLoading: action.bound,
}
